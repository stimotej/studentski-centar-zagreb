import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import ImageTitle from "@/components/shared/ImageTitle";
import Layout from "@/components/shared/Layout";
import { useEvent } from "@/features/events";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { useRouter } from "next/router";
import React from "react";

const EventPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: event, isLoading } = useEvent(
    (Array.isArray(slug) ? slug[0] : slug) || ""
  );

  if (!isLoading && !event)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen event</p>
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
