import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import ImageTitle from "@/components/shared/ImageTitle";
import Layout from "@/components/shared/Layout";
import { getEvent, useEvent } from "@/features/events";
import type { Event } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import eventKeys from "@/features/events/queries";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: events } = await axios.get<Event[]>("/events/courses", {
    params: {
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as StaticPathParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventKeys.event(slug), () => getEvent(slug));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const EventPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: event, isLoading } = useEvent(
    (Array.isArray(slug) ? slug[0] : slug) || ""
  );

  if (!isLoading && !event)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen tečaj/radionica</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(event?.title || "")}
      description={clearHtmlFromString(event?.content || "")}
      header={
        !isLoading && (
          <ImageTitle image={event?.image || ""} title={event?.title || ""} />
        )
      }
    >
      <div className="py-12">
        {isLoading ? (
          <Spinner className="mx-auto mt-20" />
        ) : (
          <DisplayHTML
            html={event?.content || ""}
            documents={event.documents}
          />
        )}
      </div>
    </Layout>
  );
};

export default EventPage;
