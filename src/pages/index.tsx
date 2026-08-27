import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Layout from "@/components/shared/Layout";
import Slider from "@/components/elements/Slider";
import LinkCards from "@/components/pocetna/LinkCards";
import PostCard from "@/components/obavijesti/PostCard";
import { getObavijestiHome, getSliderObavijesti } from "@/features/obavijesti";
import { getCalendarEvents } from "@/features/calendar";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import GeneralInfoCard from "@/components/pocetna/GeneralInfoCard";
import SidebarLinks from "@/components/pocetna/SidebarLinks";
import TeatarTDCard from "@/components/pocetna/TeatarTDCard";
import SectionTitle from "@/components/shared/SectionTitle";
import FAQCards from "@/components/shared/FAQCards";
import HelpSection from "@/components/pocetna/HelpSection";
import ButtonLink from "@/components/elements/ButtonLink";
import dayjs from "dayjs";
import {
  faqPocetnaCategory,
  pocetnaOglasZaPopunuRadnihMjestaPost,
  pocetnaOpceInformacijePost,
  revalidateTime,
} from "@/utils/constants";
import { getPosts } from "@/features/posts";
import DisplayHTML from "@/components/elements/DisplayHTML";
import type {
  CalendarEvent,
  ObavijestiMeta,
  Post,
  PostsMeta,
} from "@/features/types";
import Banner from "@/components/ads/Banner";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

type HomeProps = {
  sliderPosts: Post<ObavijestiMeta>[];
  obavijesti: Post<ObavijestiMeta>[];
  calendarEvents: CalendarEvent[];
  faqs: Post<PostsMeta>[];
  opceInformacijePost: Post<PostsMeta> | undefined;
  oglasZaPopunuRadnihMjestaPost: Post<PostsMeta> | undefined;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const sliderPosts = await getSliderObavijesti();
  const obavijesti = await getObavijestiHome();
  const calendarEvents = await getCalendarEvents();
  const faqs = await getPosts({
    categories: [faqPocetnaCategory],
  });

  const info = await getPosts({
    include: [pocetnaOpceInformacijePost, pocetnaOglasZaPopunuRadnihMjestaPost],
  });

  const opceInformacijePost = info?.find(
    (post) => post.id === pocetnaOpceInformacijePost,
  );

  const oglasZaPopunuRadnihMjestaPost = info?.find(
    (post) => post.id === pocetnaOglasZaPopunuRadnihMjestaPost,
  );

  return {
    props: {
      sliderPosts,
      obavijesti,
      calendarEvents,
      faqs,
      opceInformacijePost,
      oglasZaPopunuRadnihMjestaPost,
    },
    revalidate: revalidateTime,
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  sliderPosts,
  obavijesti,
  calendarEvents,
  faqs,
  opceInformacijePost,
  oglasZaPopunuRadnihMjestaPost,
}) => {
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);

  return (
    <Layout
      description={ui("home.metaTitle")}
      header={
        !!sliderPosts && (
          <Slider
            className="mt-[64px]"
            slides={sliderPosts.map((slide) => ({
              src: slide.image_url,
              title: t(slide.title.rendered, slide.meta.title_en),
              subtitle: t(slide.excerpt.rendered, slide.meta.excerpt_en),
              actionTitle: ui("common.readMore"),
              actionHref: `/obavijesti/${slide.slug}`,
            }))}
          />
        )
      }
      bottomComponent={<HelpSection />}
    >
      <Banner />
      <LinkCards />
      <div className="mt-6 flex flex-col gap-16 md:flex-row">
        <div className="w-full md:w-[70%]">
          <h2 className="text-2xl font-semibold">{ui("nav.obavijesti")}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {!!obavijesti && obavijesti?.length > 0 ? (
              obavijesti?.map((obavijest) => (
                <PostCard
                  key={obavijest.id}
                  slug={obavijest.slug}
                  title={clearHtmlFromString(
                    t(obavijest.title.rendered, obavijest.meta.title_en),
                  )}
                  category={obavijest.category}
                  date={obavijest.date}
                  excerpt={clearHtmlFromString(
                    t(obavijest.excerpt.rendered, obavijest.meta.excerpt_en),
                  )}
                  image={obavijest.image_url}
                />
              ))
            ) : (
              <div className="my-4 text-light">{ui("empty.obavijesti")}</div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <ButtonLink href="/obavijesti" className="px-8 !rounded-full">
              {ui("common.goToNews")}
            </ButtonLink>
          </div>

          {/* <Image
            src="/slike/YOUniversity_vizual_SC_FB_1200x630px.jpg"
            alt="YOUniversity_vizual_SC_FB"
            width={1200}
            height={630}
            className="w-full h-auto object-cover rounded-lg mt-16"
          /> */}
        </div>
        <div className="w-full md:w-[30%]">
          <GeneralInfoCard
            title={
              t(
                opceInformacijePost?.title.rendered,
                opceInformacijePost?.meta.title_en,
              ) || ""
            }
            content={
              t(
                opceInformacijePost?.meta.sadrzaj,
                opceInformacijePost?.meta.sadrzaj_en,
              ) || ""
            }
            link={`/informacije/${opceInformacijePost?.slug}`}
          />
          <DisplayHTML
            html={
              t(
                oglasZaPopunuRadnihMjestaPost?.title.rendered,
                oglasZaPopunuRadnihMjestaPost?.meta.title_en,
              ) || ""
            }
            className="mt-6 font-medium text-lg"
          />
          <SidebarLinks
            emptyText={ui("empty.jobs")}
            className="mt-2"
            items={
              oglasZaPopunuRadnihMjestaPost?.meta.documents.map((file) => ({
                title: file.title,
                link: file.source_url,
              })) || []
            }
          />
          <h3 className="mt-6 font-medium text-lg">{ui("nav.teatarTd")}</h3>
          <TeatarTDCard className="mt-2" />
          <h3 className="mt-6 font-medium text-lg">{ui("home.calendar")}</h3>
          <SidebarLinks
            emptyText={ui("empty.events")}
            className="mt-2"
            items={
              calendarEvents?.map((event) => ({
                label:
                  event.post_type === "obavijesti"
                    ? dayjs(event.event_date).format("DD.MM.YYYY [u] HH:mm[h]")
                    : `${dayjs(event.event_date).format(
                        "DD.MM.YYYY [u] HH:mm[h]",
                      )}, ${event.location}`,
                title: clearHtmlFromString(event.title),
                link:
                  event.post_type === "obavijesti"
                    ? `/obavijesti/${event.slug}`
                    : `/kultura/eventi/${event.slug}`,
              })) || []
            }
          />
        </div>
      </div>
      {!!faqs?.filter((item) => item.categories.includes(faqPocetnaCategory))
        .length && (
        <div className="mt-32">
          <SectionTitle title={ui("home.information")} className="mt-20" />
          <FAQCards
            items={
              faqs
                .filter((item) => item.categories.includes(faqPocetnaCategory))
                .slice(0, 8)
                .map((item) => ({
                  title: t(item.title.rendered, item.meta.title_en),
                  content: t(item.content.rendered, item.meta.content_en),
                })) || []
            }
            // loading={isLoadingFaqs}
          />
          {faqs?.filter((item) => item.categories.includes(faqPocetnaCategory))
            .length > 8 && (
            <ButtonLink href="/informacije" className="mx-auto mt-6">
              {ui("common.seeAll")}
            </ButtonLink>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Home;
