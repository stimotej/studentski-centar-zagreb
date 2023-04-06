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
      <EventCards
        events={events}
        loading={isLoading}
        className="my-12"
        classNameLoading="mt-12"
        classNameEmpty="mt-12"
      />
    </Layout>
  );
};

export default EventsPage;
