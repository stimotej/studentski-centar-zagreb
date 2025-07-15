import React, { useEffect, useRef, useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import PageTitle from "@/components/shared/PageTitle";
import Layout from "@/components/shared/Layout";
import Spinner from "@/components/elements/Spinner";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import FilterSelect from "@/components/elements/FilterSelect";
import { getInfiniteJobs, getJobPage, useJobs } from "@/features/jobs";
import JobCard from "@/components/jobs/JobCard";
import { getCategories } from "@/features/categories";
import {
  jobsCategoryId,
  jobsObrasciPostId,
  revalidateTime,
} from "@/utils/constants";
import { getBanners } from "@/features/banners";
import Image from "next/image";
import { getPosts } from "@/features/posts";
import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { useRouter } from "next/router";
import type {
  Banner,
  Category,
  JobsMeta,
  Post,
  PostsMeta,
} from "@/features/types";

type JobsProps = {
  initialJobs: Post<JobsMeta>[];
  totalPages: number;
  postObrasci: Post<PostsMeta>[];
  jobPage: Post<JobsMeta>;
  categories: Category[];
  banners: Banner[];
};

export const getStaticProps: GetStaticProps<JobsProps> = async () => {
  const initialJobsRes = await getInfiniteJobs();

  const postObrasci = await getPosts({
    include: [jobsObrasciPostId],
  });

  const jobPage = await getJobPage();
  const categories = await getCategories(jobsCategoryId);
  const banners = await getBanners();

  return {
    props: {
      initialJobs: initialJobsRes.data,
      totalPages: initialJobsRes.totalPages,
      postObrasci,
      jobPage,
      categories,
      banners,
    },
    revalidate: revalidateTime,
  };
};

const PosloviPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialJobs,
  totalPages,
  postObrasci,
  jobPage,
  categories,
  banners,
}) => {
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
  const isDefaultSearchSet = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: jobs,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useJobs(initialJobs, totalPages, {
    search: searchQuery,
    categories: category === jobsCategoryId ? undefined : [category],
    orderby: category === jobsCategoryId ? "date" : "featured",
  });

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
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
          ) : jobs?.pages && jobs?.pages[0].data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {jobs?.pages?.map((jobsGroup, index) => (
                  <React.Fragment key={index}>
                    {jobsGroup.data.map((job) => (
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
