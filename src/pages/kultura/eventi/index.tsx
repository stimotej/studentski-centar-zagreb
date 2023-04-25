import EventCards from "@/components/kultura/EventCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getEvents, useEvents } from "@/features/events";
import eventKeys from "@/features/events/queries";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { type GetStaticProps } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventKeys.events, getEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const EventsPage = () => {
  const { data: events, isLoading } = useEvents();
  return (
    <Layout title="Eventi">
      <PageTitle title="Kalendar evenata" />
      {/* <div className="flex flex-col lg:flex-row gap-6 my-12"> */}
      <EventCards
        events={events}
        loading={isLoading}
        className="w-full my-12"
        classNameLoading="mt-12"
        classNameEmpty="mt-12"
      />
      {/* <div className="w-full lg:w-1/3"></div> */}
      {/* </div> */}
    </Layout>
  );
};

export default EventsPage;
