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
import OTPBanner from "@/components/ads/OTPBanner";

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
    (post) => post.id === pocetnaOpceInformacijePost
  );

  const oglasZaPopunuRadnihMjestaPost = info?.find(
    (post) => post.id === pocetnaOglasZaPopunuRadnihMjestaPost
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
  return (
    <Layout
      description="Studentski Centar u Zagrebu, Sveučilište u Zagrebu; Kultura, Prehrana, Smještaj, Student servis, Sport, Teatar &TD"
      header={
        !!sliderPosts && (
          <Slider
            className="mt-[64px]"
            slides={sliderPosts.map((slide) => ({
              src: slide.image_url,
              title: slide.title.rendered,
              subtitle: slide.excerpt.rendered,
              actionTitle: "Saznaj više",
              actionHref: `/obavijesti/${slide.slug}`,
            }))}
          />
        )
      }
      bottomComponent={<HelpSection />}
    >
      <OTPBanner />
      <LinkCards />
      <div className="mt-6 flex flex-col gap-16 md:flex-row">
        <div className="w-full md:w-[70%]">
          <h2 className="text-2xl font-semibold">Obavijesti</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {!!obavijesti && obavijesti?.length > 0 ? (
              obavijesti?.map((obavijest) => (
                <PostCard
                  key={obavijest.id}
                  slug={obavijest.slug}
                  title={clearHtmlFromString(obavijest.title.rendered)}
                  category={obavijest.category}
                  date={obavijest.date}
                  excerpt={clearHtmlFromString(obavijest.excerpt.rendered)}
                  image={obavijest.image_url}
                />
              ))
            ) : (
              <div className="my-4 text-light">Nema obavijesti za prikaz</div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <ButtonLink href="/obavijesti" className="px-8 !rounded-full">
              Idi na obavijesti
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
            title={opceInformacijePost?.title.rendered || ""}
            content={opceInformacijePost?.meta.sadrzaj || ""}
            link={`/informacije/${opceInformacijePost?.slug}`}
          />
          <DisplayHTML
            html={oglasZaPopunuRadnihMjestaPost?.title.rendered || ""}
            className="mt-6 font-medium text-lg"
          />
          <SidebarLinks
            emptyText="Nema poslova za prikaz"
            className="mt-2"
            items={
              oglasZaPopunuRadnihMjestaPost?.meta.documents.map((file) => ({
                title: file.title,
                link: file.source_url,
              })) || []
            }
          />
          <h3 className="mt-6 font-medium text-lg">Teatar &TD</h3>
          <TeatarTDCard className="mt-2" />
          <h3 className="mt-6 font-medium text-lg">Kalendar</h3>
          <SidebarLinks
            emptyText="Nema evenata za prikaz"
            className="mt-2"
            items={
              calendarEvents?.map((event) => ({
                label:
                  event.post_type === "obavijesti"
                    ? dayjs(event.event_date).format("DD.MM.YYYY [u] HH:mm[h]")
                    : `${dayjs(event.event_date).format(
                        "DD.MM.YYYY [u] HH:mm[h]"
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
          <SectionTitle title="Informacije" className="mt-20" />
          <FAQCards
            items={
              faqs
                .filter((item) => item.categories.includes(faqPocetnaCategory))
                .slice(0, 8)
                .map((item) => ({
                  title: item.title.rendered,
                  content: item.content.rendered,
                })) || []
            }
            // loading={isLoadingFaqs}
          />
          {faqs?.filter((item) => item.categories.includes(faqPocetnaCategory))
            .length > 8 && (
            <ButtonLink href="/informacije" className="mx-auto mt-6">
              Vidi sve
            </ButtonLink>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Home;
