import EventCards from "@/components/kultura/EventCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { useEvents } from "@/features/events";
import React from "react";

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
