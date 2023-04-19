import EventCards from "@/components/kultura/EventCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getCourses, useCourses } from "@/features/events";
import eventKeys from "@/features/events/queries";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventKeys.courses, getCourses);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const FAQPage: NextPage = () => {
  const { data: courses, isLoading } = useCourses();

  return (
    <Layout title="Tečajevi i radionice">
      <PageTitle title="Tečajevi i radionice" />

      <div className="flex gap-6 my-12">
        <EventCards
          events={courses}
          loading={isLoading}
          emptyMessage="Nema tečajeva/radionica za prikaz."
          className="w-2/3"
          classNameLoading="mt-12 w-2/3"
          classNameEmpty="mt-12 w-2/3"
        />
        <div className="w-1/3"></div>
      </div>
    </Layout>
  );
};

export default FAQPage;
