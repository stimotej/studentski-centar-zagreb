import { type GetStaticProps, type NextPage } from "next";
import Layout from "@/components/shared/Layout";
import Slider from "@/components/elements/Slider";
import LinkCards from "@/components/pocetna/LinkCards";
import PostCard from "@/components/obavijesti/PostCard";
import {
  getObavijestiHome,
  getSliderObavijesti,
  useObavijestiHome,
  useSliderObavijesti,
} from "@/features/obavijesti";
import { getCalendarEvents } from "@/features/calendar";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import GeneralInfoCard from "@/components/pocetna/GeneralInfoCard";
import SidebarLinks from "@/components/pocetna/SidebarLinks";
import TeatarTDCard from "@/components/pocetna/TeatarTDCard";
import SectionTitle from "@/components/shared/SectionTitle";
import FAQCards from "@/components/shared/FAQCards";
import HelpSection from "@/components/pocetna/HelpSection";
import ButtonLink from "@/components/elements/ButtonLink";
import { useCalendarEvents } from "@/features/calendar";
import dayjs from "dayjs";
import {
  faqPocetnaCategory,
  pocetnaOglasZaPopunuRadnihMjestaPost,
  pocetnaOpceInformacijePost,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import obavijestiKeys from "@/features/obavijesti/queries";
import calendarKeys from "@/features/calendar/queries";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import DisplayHTML from "@/components/elements/DisplayHTML";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    obavijestiKeys.sliderObavijesti,
    getSliderObavijesti
  );
  await queryClient.prefetchQuery(
    obavijestiKeys.homeObavijesti,
    getObavijestiHome
  );
  await queryClient.prefetchQuery(calendarKeys.calendar, getCalendarEvents);

  const faqPostsFilters = {
    categories: [faqPocetnaCategory],
  };

  await queryClient.prefetchQuery(
    postsKeys.postsFiltered(faqPostsFilters),
    () => getPosts(faqPostsFilters)
  );

  const infoFilters = {
    include: [pocetnaOpceInformacijePost, pocetnaOglasZaPopunuRadnihMjestaPost],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(infoFilters), () =>
    getPosts(infoFilters)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const Home: NextPage = () => {
  const { data: sliderPosts } = useSliderObavijesti();
  const { data: obavijesti } = useObavijestiHome();
  const { data: calendarEvents } = useCalendarEvents();
  const { data: info } = usePosts({
    include: [pocetnaOpceInformacijePost, pocetnaOglasZaPopunuRadnihMjestaPost],
  });
  const { data: faqs, isLoading: isLoadingFaqs } = usePosts({
    categories: [faqPocetnaCategory],
  });

  const opceInformacijePost = info?.find(
    (post) => post.id === pocetnaOpceInformacijePost
  );

  const oglasZaPopunuRadnihMjestaPost = info?.find(
    (post) => post.id === pocetnaOglasZaPopunuRadnihMjestaPost
  );

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
            loading={isLoadingFaqs}
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
