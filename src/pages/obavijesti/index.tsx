import React, { useState } from "react";
import { type GetStaticProps, type NextPage } from "next";
import PageTitle from "@/components/shared/PageTitle";
import Layout from "@/components/shared/Layout";
import { getInfiniteObavijesti, useObavijesti } from "@/features/obavijesti";
import Spinner from "@/components/elements/Spinner";
import PostCard from "@/components/obavijesti/PostCard";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import useDebounce from "@/hooks/useDebounce";
import FilterSelect from "@/components/elements/FilterSelect";
import { getCategories, useCategories } from "@/features/categories";
import { obavijestiCategoryId } from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import obavijestiKeys from "@/features/obavijesti/queries";
import categoryKeys from "@/features/categories/queries";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    obavijestiKeys.obavijestiFiltered({ search: "", categories: undefined }),
    getInfiniteObavijesti
  );
  await queryClient.prefetchQuery(
    categoryKeys.categoriesFiltered({ parent: obavijestiCategoryId }),
    () => getCategories(obavijestiCategoryId)
  );

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

const ObavijestiPage: NextPage = () => {
  const [category, setCategory] = useState<number>(obavijestiCategoryId);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const {
    data: obavijesti,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useObavijesti({
    search: debouncedSearch,
    categories: category === obavijestiCategoryId ? undefined : [category],
  });

  const { data: categories } = useCategories(obavijestiCategoryId);

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
          ) : obavijesti?.pages && obavijesti?.pages[0].length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {obavijesti?.pages?.map((obavijestGroup, index) => (
                  <React.Fragment key={index}>
                    {obavijestGroup.map((obavijest) => (
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži obavijesti..."
            type="search"
          />
          <FilterSelect
            value={category}
            onChange={setCategory}
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
