import EventCards from "@/components/kultura/EventCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getEvents } from "@/features/events";
import type { Event } from "@/features/types";
import { revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type EventsProps = {
  events: Event[];
};

export const getStaticProps: GetStaticProps<EventsProps> = async () => {
  const events = await getEvents();

  return {
    props: {
      events,
    },
    revalidate: revalidateTime,
  };
};

const EventsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  events,
}) => {
  return (
    <Layout title="Eventi">
      <PageTitle title="Kalendar evenata" />
      {/* <div className="flex flex-col lg:flex-row gap-6 my-12"> */}
      <EventCards
        events={events}
        loading={false}
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
