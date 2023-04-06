import Spinner from "@/components/elements/Spinner";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import { faqSmjestajCategory } from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const postsFilters = {
    categories: [faqSmjestajCategory],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const FAQPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [faqSmjestajCategory],
  });

  return (
    <Layout title="Često postavljana pitanja">
      <PageTitle title="Često postavljana pitanja" />
      {isLoading ? (
        <div className="py-24">
          <Spinner className="mx-auto" />
        </div>
      ) : !posts?.length ? (
        <p className="text-center text-light my-24">Nema pitanja za prikaz</p>
      ) : (
        <FAQCards
          items={
            posts?.map((item) => ({
              title: item.title.rendered,
              content: item.content.rendered,
            })) || []
          }
          loading={isLoading}
          className="my-12"
        />
      )}
    </Layout>
  );
};

export default FAQPage;
