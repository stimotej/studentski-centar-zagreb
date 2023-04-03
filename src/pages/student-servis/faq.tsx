import Spinner from "@/components/elements/Spinner";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { usePosts } from "@/features/posts";
import { faqStudentServisCategory } from "@/utils/constants";
import { type NextPage } from "next";
import React from "react";

const FAQPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [faqStudentServisCategory],
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
