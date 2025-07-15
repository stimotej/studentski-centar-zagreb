import React, { useEffect, useRef, useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import PageTitle from "@/components/shared/PageTitle";
import Layout from "@/components/shared/Layout";
import { getInfiniteObavijesti, useObavijesti } from "@/features/obavijesti";
import Spinner from "@/components/elements/Spinner";
import PostCard from "@/components/obavijesti/PostCard";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import FilterSelect from "@/components/elements/FilterSelect";
import { getCategories } from "@/features/categories";
import { obavijestiCategoryId, revalidateTime } from "@/utils/constants";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import type { Category, ObavijestiMeta, Post } from "@/features/types";
import { useRouter } from "next/router";

type ObavijestiProps = {
  initialObavijesti: Post<ObavijestiMeta>[];
  totalPages: number;
  categories: Category[];
};

export const getStaticProps: GetStaticProps<ObavijestiProps> = async () => {
  const initialObavijestiRes = await getInfiniteObavijesti();
  const categories = await getCategories(obavijestiCategoryId);

  return {
    props: {
      initialObavijesti: initialObavijestiRes.data,
      totalPages: initialObavijestiRes.totalPages,
      categories,
    },
    revalidate: revalidateTime,
  };
};

const ObavijestiPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ initialObavijesti, totalPages, categories }) => {
  const router = useRouter();

  const category = router.query.category
    ? Number(router.query.category)
    : obavijestiCategoryId;

  const searchQuery = router.query.q
    ? Array.isArray(router.query.q)
      ? router.query.q[0]
      : router.query.q
    : "";

  const [search, setSearch] = useState("");
  const isDefaultSearchSet = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: obavijesti,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useObavijesti(initialObavijesti, totalPages, {
    search: searchQuery,
    categories: category === obavijestiCategoryId ? undefined : [category],
  });

  useScrollRestoration();

  const handleChangeCategory = (value: number) => {
    const routerQuery = router.query;

    if (value === obavijestiCategoryId) {
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
      title="Obavijesti"
      description="Obavijesti Studentskog Centra u Zagrebu"
    >
      <PageTitle title="Obavijesti" />
      <div className="mt-12 flex flex-col-reverse gap-12 md:flex-row pb-12">
        <div className="w-full md:w-[75%]">
          {isLoading ? (
            <Spinner className="mx-auto" />
          ) : obavijesti?.pages && obavijesti?.pages[0].data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {obavijesti?.pages?.map((obavijestGroup, index) => (
                  <React.Fragment key={index}>
                    {obavijestGroup.data.map((obavijest) => (
                      <PostCard
                        key={obavijest.id}
                        slug={obavijest.slug}
                        title={clearHtmlFromString(obavijest.title.rendered)}
                        category={obavijest.category}
                        date={obavijest.date}
                        excerpt={clearHtmlFromString(
                          obavijest.excerpt.rendered
                        )}
                        image={obavijest.image_url}
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
            <div className="my-4 text-light">Nema obavijesti za prikaz</div>
          )}
        </div>
        <div className="w-full md:w-[25%]">
          <TextInput
            value={search}
            onChange={handleSearch}
            placeholder="Pretraži obavijesti..."
            type="search"
          />
          <FilterSelect
            value={category}
            onChange={handleChangeCategory}
            title="Kategorije"
            className="mt-8"
            items={
              categories
                ? [
                    { title: "Sve obavijesti", value: obavijestiCategoryId },
                    ...categories?.map((category) => ({
                      title: category.name,
                      value: category.id,
                    })),
                  ]
                : [{ title: "Sve obavijesti", value: obavijestiCategoryId }]
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default ObavijestiPage;
