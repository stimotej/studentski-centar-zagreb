import { type GetStaticProps, type NextPage } from "next";
import Layout from "@/components/shared/Layout";
import Slider from "@/components/elements/Slider";
import LinkCards from "@/components/pocetna/LinkCards";
import PostCard from "@/components/obavijesti/PostCard";
import {
  getSliderObavijesti,
  useObavijestiHome,
  useSliderObavijesti,
} from "@/features/obavijesti";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import GeneralInfoCard from "@/components/pocetna/GeneralInfoCard";
import SidebarLinks from "@/components/pocetna/SidebarLinks";
import TeatarTDCard from "@/components/pocetna/TeatarTDCard";
import SectionTitle from "@/components/shared/SectionTitle";
import FAQCards from "@/components/shared/FAQCards";
import HelpSection from "@/components/pocetna/HelpSection";
import ButtonLink from "@/components/elements/ButtonLink";
import { useJobsHome } from "@/features/jobs";
import { useCalendarEvents } from "@/features/calendar";
import dayjs from "dayjs";
import { faqs } from "@/utils/constants";
import Spinner from "@/components/elements/Spinner";
import type { ObavijestiMeta, Post } from "@/features/types";

export const getStaticProps: GetStaticProps = async () => {
  // get slider obavijesti
  const sliderObavijesti = await getSliderObavijesti();

  return {
    props: {
      sliderObavijesti,
    },
    revalidate: 60,
  };
};

interface HomeProps {
  sliderObavijesti: Post<ObavijestiMeta>[];
}

const Home: NextPage<HomeProps> = ({ sliderObavijesti }) => {
  const { data: sliderPosts } = useSliderObavijesti(sliderObavijesti);
  const { data: obavijesti, isLoading: isLoadingObavijesti } =
    useObavijestiHome();
  const { data: jobs, isLoading: isLoadingJobs } = useJobsHome();
  const { data: calendarEvents, isLoading: isLoadingCalendarEvents } =
    useCalendarEvents();

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
          {isLoadingObavijesti ? (
            <div className="py-8">
              <Spinner className="mx-auto" />
            </div>
          ) : (
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
          )}
          <div className="flex justify-center mt-8">
            <ButtonLink href="/obavijesti" className="px-8 !rounded-full">
              Idi na obavijesti
            </ButtonLink>
          </div>
        </div>
        <div className="w-full md:w-[30%]">
          <GeneralInfoCard />
          <h3 className="mt-6 font-medium text-lg">
            Oglas za popunu radnih mjesta
          </h3>
          <SidebarLinks
            emptyText="Nema poslova za prikaz"
            className="mt-2"
            loading={isLoadingJobs}
            items={
              jobs?.map((job) => ({
                label: job.meta.company_name,
                title: clearHtmlFromString(job.title.rendered),
                link: `/poslovi/${job.slug}`,
              })) || []
            }
          />
          <h3 className="mt-6 font-medium text-lg">Teatar &TD</h3>
          <TeatarTDCard className="mt-2" />
          <h3 className="mt-6 font-medium text-lg">Kalendar</h3>
          <SidebarLinks
            emptyText="Nema evenata za prikaz"
            className="mt-2"
            loading={isLoadingCalendarEvents}
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
      <SectionTitle title="Informacije" className="mt-20" />
      <FAQCards items={faqs} loading={isLoadingObavijesti} />
    </Layout>
  );
};

export default Home;
