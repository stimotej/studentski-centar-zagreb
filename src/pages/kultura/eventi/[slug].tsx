import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import ImageTitle from "@/components/shared/ImageTitle";
import Layout from "@/components/shared/Layout";
import { getEventsPaths } from "@/features/paths";
import { getEvent } from "@/features/events";
import type { Event } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { revalidateTime } from "@/utils/constants";

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getEventsPaths();

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

type EventProps = {
  event: Event;
};

export const getStaticProps: GetStaticProps<EventProps> = async ({
  params,
}) => {
  const { slug } = params as StaticPathParams;

  const event = await getEvent(slug);

  return {
    props: {
      event,
    },
    revalidate: revalidateTime,
  };
};

const EventPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  event,
}) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Layout>
        <Spinner className="mx-auto mt-20" />
      </Layout>
    );

  if (!event)
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
        <ImageTitle image={event?.image || ""} title={event?.title || ""} />
      }
    >
      <div className="py-12">
        <DisplayHTML html={event?.content || ""} documents={event.documents} />
      </div>
    </Layout>
  );
};

export default EventPage;
