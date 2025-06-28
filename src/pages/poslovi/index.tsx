import React, { useEffect, useRef, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import PageTitle from "@/components/shared/PageTitle";
import Layout from "@/components/shared/Layout";
import Spinner from "@/components/elements/Spinner";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import useDebounce from "@/hooks/useDebounce";
import FilterSelect from "@/components/elements/FilterSelect";
import {
  getInfiniteJobs,
  getJobPage,
  useJobPage,
  useJobs,
} from "@/features/jobs";
import JobCard from "@/components/jobs/JobCard";
import { getCategories, useCategories } from "@/features/categories";
import { jobsCategoryId, jobsObrasciPostId } from "@/utils/constants";
import { useBanners, getBanners } from "@/features/banners";
import Image from "next/image";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import jobKeys from "@/features/jobs/queries";
import categoryKeys from "@/features/categories/queries";
import bannerKeys from "@/features/banners/queries";
import { getPosts, usePosts } from "@/features/posts";
import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import postsKeys from "@/features/posts/queries";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    jobKeys.jobsFiltered({
      search: "",
      categories: undefined,
    }),
    getInfiniteJobs
  );

  const postsFilters = {
    include: [jobsObrasciPostId],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  await queryClient.prefetchQuery(jobKeys.jobPage, getJobPage);

  await queryClient.prefetchQuery(
    categoryKeys.categoriesFiltered({ parent: jobsCategoryId }),
    () => getCategories(jobsCategoryId)
  );

  await queryClient.prefetchQuery(bannerKeys.banners, getBanners);

  // JSON parse and stringify -> solve [undefined] in pageParams for infinite query
  return {
    props: JSON.parse(
      JSON.stringify({
        dehydratedState: dehydrate(queryClient),
      })
    ) as { [key: string]: any },
    revalidate: 60 * 10,
  };
};

const PosloviPage: NextPage = () => {
  const router = useRouter();

  const category = router.query.category
    ? Number(router.query.category)
    : jobsCategoryId;

  const searchQuery = router.query.q
    ? Array.isArray(router.query.q)
      ? router.query.q[0]
      : router.query.q
    : "";

  const [search, setSearch] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDefaultSearchSet = useRef(false);

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: jobs,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useJobs({
    search: debouncedSearch,
    categories: category === jobsCategoryId ? undefined : [category],
    orderby: category === jobsCategoryId ? "date" : "featured",
  });

  const { data: postObrasci } = usePosts({
    include: [jobsObrasciPostId],
  });

  const { data: jobPage } = useJobPage();

  const { data: categories } = useCategories(jobsCategoryId);

  const { data: banners } = useBanners();

  useScrollRestoration();

  const handleChangeCategory = (value: number) => {
    const routerQuery = router.query;

    if (value === jobsCategoryId) {
      delete routerQuery.category;
    } else {
      routerQuery.category = value.toString();
    }

    router.push(
      {
        query: routerQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const routerQuery = router.query;

      if (value) {
        routerQuery.q = value;
      } else {
        delete routerQuery.q;
      }

      router.replace(
        {
          query: routerQuery,
        },
        undefined,
        { shallow: true }
      );
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchQuery && !isDefaultSearchSet.current) {
      setSearch(searchQuery);
      isDefaultSearchSet.current = true;
    }
  }, [searchQuery]);

  return (
    <Layout
      title={clearHtmlFromString(jobPage?.title.rendered ?? "Poslovi")}
      description="Ponuda poslova; Studentski centar u Zagrebu; Sveučilište u Zagrebu"
    >
      <PageTitle
        title={jobPage?.title.rendered ?? "Poslovi"}
        subtitle={jobPage?.excerpt.rendered}
      />
      <div className="mt-12 flex flex-col-reverse gap-12 md:flex-row pb-12">
        <div className="w-full md:w-[75%]">
          {isLoading ? (
            <Spinner className="mx-auto" />
          ) : jobs?.pages && jobs?.pages[0].length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {jobs?.pages?.map((jobsGroup, index) => (
                  <React.Fragment key={index}>
                    {jobsGroup.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.meta.title}
                        slug={job.slug}
                        companyName={job.meta.company_name}
                        description={job.meta.description}
                        paymentRate={job.meta.payment_rate}
                        companyPicture={job.company.image_url}
                        featured={job.meta.featured}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
              {hasNextPage ? (
                <div className="flex items-center justify-center w-full py-4">
                  <Button
                    loading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="mt-6"
                  >
                    Učitaj više
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="my-4 text-light">Nema poslova za prikaz</div>
          )}
        </div>
        <div className="w-full md:w-[25%]">
          <TextInput
            value={search}
            onChange={handleSearch}
            placeholder="Pretraži poslove..."
            type="search"
          />
          <FilterSelect
            value={category || 0}
            onChange={handleChangeCategory}
            title="Vrsta posla"
            className="md:mt-8"
            items={
              categories
                ? [
                    { title: "Svi poslovi", value: jobsCategoryId },
                    ...categories?.map((category) => ({
                      title: category.name,
                      value: category.id,
                    })),
                  ]
                : [{ title: "Svi poslovi", value: jobsCategoryId }]
            }
          />
          <LoginInfoCard
            title="Obrasci"
            content={postObrasci?.[0].content.rendered || ""}
            documents={postObrasci?.[0].meta.documents || []}
            className="mt-6 hidden md:block !p-0 !bg-transparent !shadow-none [&>div>div>p]:!text-sm"
          />
          {!!banners?.length && (
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-6 mt-8">
              {banners?.map((banner) => (
                <a href={banner.banner_url} key={banner.id}>
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    width={220}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <LoginInfoCard
        title="Obrasci"
        content={postObrasci?.[0].content.rendered || ""}
        documents={postObrasci?.[0].meta.documents || []}
        className="mt-6 md:hidden !p-0 !bg-transparent !shadow-none [&>div>div>p]:!text-sm"
      />
      {!!banners?.length && (
        <div className="grid md:hidden grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-6 my-8">
          {banners?.map((banner) => (
            <a href={banner.banner_url} key={banner.id}>
              <Image
                src={banner.image_url}
                alt={banner.title}
                width={220}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </a>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default PosloviPage;
