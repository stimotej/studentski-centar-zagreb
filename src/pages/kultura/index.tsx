import ButtonLink from "@/components/elements/ButtonLink";
import EventCards, { EventCard } from "@/components/kultura/EventCards";
import KulturaSlider from "@/components/kultura/KulturaSlider";
import UlazniceZaTD from "@/components/kultura/UlazniceZaTD";
import ContentCard from "@/components/shared/ContentCard";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import PagePosts from "@/components/shared/PagePosts";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  getNewEvents,
  getSliderEvents,
  useNewEvents,
  useSliderEvents,
} from "@/features/events";
import eventKeys from "@/features/events/queries";
import { getObavijestiPage, useObavijestiPage } from "@/features/obavijesti";
import obavijestiKeys from "@/features/obavijesti/queries";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import {
  faqKulturaCategory,
  infoKulturaLokacijeCategory,
  obavijestiKulturaCategory,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { GetStaticProps, NextPage } from "next";
import React from "react";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Spinner from "@/components/elements/Spinner";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventKeys.newEvents, getNewEvents);
  await queryClient.prefetchQuery(eventKeys.sliderEvents, getSliderEvents);

  const postsFilters = {
    categories: [faqKulturaCategory],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  const locationsFilters = {
    categories: [infoKulturaLokacijeCategory],
  };

  await queryClient.prefetchQuery(
    postsKeys.postsFiltered(locationsFilters),
    () => getPosts(locationsFilters)
  );

  await queryClient.prefetchQuery(
    obavijestiKeys.obavijestiFiltered({
      categories: [obavijestiKulturaCategory],
    }),
    () => getObavijestiPage(obavijestiKulturaCategory)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const KulturaPage: NextPage = () => {
  const { data: events, isLoading } = useNewEvents();
  const { data: sliderEvents } = useSliderEvents();

  const { data: posts, isLoading: isLoadingPosts } = usePosts({
    categories: [faqKulturaCategory],
  });

  const { data: locations, isLoading: isLoadingLocations } = usePosts({
    categories: [infoKulturaLokacijeCategory],
  });

  const todaysEvents = events?.filter((event) =>
    dayjs(event.event_date).isSame(dayjs(), "day")
  );

  return (
    <Layout
      title="Kultura"
      description="Kultura; Studentski centar u Zagrebu; Sveučilište u Zagrebu"
    >
      <PageTitle title="Kultura" />

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <KulturaSlider
          className="md:flex-1"
          slides={
            sliderEvents?.map((slide) => ({
              src: slide.image,
              title: slide.title,
              subtitle: clearHtmlFromString(slide.content),
              actionTitle: "Saznaj više",
              actionHref: `/kultura/eventi/${slide.slug}`,
            })) || []
          }
        />
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Danas</h3>
          {!!todaysEvents && todaysEvents?.length <= 0 ? (
            <div className="mt-2">
              <div className="text-light">Nema evenata na današnji dan</div>
              <ButtonLink
                href="#kalendar-evenata"
                className="mt-6"
                isRegularLink
                outlined
              >
                Kalendar evenata
              </ButtonLink>
            </div>
          ) : (
            todaysEvents
              ?.slice(0, 4)
              .map((event) => (
                <EventCard
                  key={event.slug}
                  date={event.event_date}
                  image={event.image}
                  link={`/kultura/eventi/${event.slug}`}
                  location={event.location}
                  type={event.type}
                  title={event.title}
                  withoutTimeline
                  dense
                />
              ))
          )}
        </div>
      </div>

      <PagePosts category={obavijestiKulturaCategory} className="mt-12" />

      <UlazniceZaTD className="my-12" />

      {isLoadingLocations ? (
        <Spinner className="mx-auto mb-12" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {locations?.map((location) => (
            <ContentCard
              key={location.id}
              image={location.image_url}
              title={clearHtmlFromString(location.title.rendered)}
              content={location.excerpt.rendered}
              action={{ title: "SAZNAJ VIŠE", href: location.meta.link }}
              className="flex-1"
            />
          ))}
        </div>
      )}
      <ContentCard
        title="Tečajevi i radionice"
        titleClassName="!text-xl md:!text-2xl font-semibold !text-blue-600 include-filters"
        content="Studentski centar u Zagrebu nudi širok izbor tečajeva i radionica za sve zainteresirane. Bez obzira na vaše iskustvo ili interese, imamo nešto za svakoga. Pridružite nam se i istražite što sve možete naučiti!"
        action={{
          title: "Idi na popis",
          href: "/kultura/tecajevi-i-radionice/",
        }}
        className="flex-1 mt-12"
      />
      <div id="kalendar-evenata" className="py-12">
        <SectionTitle title="Kalendar evenata" className="mt-12 mb-8" />
        <div className="flex flex-col lg:flex-row gap-6">
          <EventCards
            events={events}
            loading={isLoading}
            emptyMessage="Nema novih evenata za prikaz"
            className="w-full"
            // className="w-full lg:w-2/3"
          />
          {/* <div className="w-full lg:w-1/3"></div> */}
        </div>
        <ButtonLink
          href="/kultura/eventi"
          className="mx-auto mt-8 !rounded-full"
        >
          Vidi sve
        </ButtonLink>
      </div>
      {!!posts?.filter((item) => item.categories.includes(faqKulturaCategory))
        .length && (
        <div className="mb-24">
          <SectionTitle title="Često postavljana pitanja" />
          <FAQCards
            items={
              posts
                .filter((item) => item.categories.includes(faqKulturaCategory))
                .slice(0, 8)
                .map((item) => ({
                  title: item.title.rendered,
                  content: item.content.rendered,
                })) || []
            }
            loading={isLoadingPosts}
          />
          {posts?.filter((item) => item.categories.includes(faqKulturaCategory))
            .length > 8 && (
            <ButtonLink href="/kultura/faq" className="mx-auto mt-6">
              Vidi sve
            </ButtonLink>
          )}
        </div>
      )}
    </Layout>
  );
};

export default KulturaPage;
