import ButtonLink from "@/components/elements/ButtonLink";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import HelpSection from "@/components/prehrana/HelpSection";
import KvalitetaPrehraneSection from "@/components/prehrana/KvalitetaPrehraneSection";
import Card from "@/components/shared/Card";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PagePosts from "@/components/shared/PagePosts";
import PageTitle from "@/components/shared/PageTitle";
import PostSlider from "@/components/shared/PostSlider";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import { getObavijestiPage } from "@/features/obavijesti";
import obavijestiKeys from "@/features/obavijesti/queries";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import {
  faqPrehranaCategory,
  obavijestiPrehranaCategory,
  prehranaLinksPostId,
  restaurantsCategoryId,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const postsFilters = {
    categories: [restaurantsCategoryId],
    orderby: "order",
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  const faqPostsFilters = {
    categories: [faqPrehranaCategory],
  };

  await queryClient.prefetchQuery(
    postsKeys.postsFiltered(faqPostsFilters),
    () => getPosts(faqPostsFilters)
  );

  const linksPostsFilters = {
    include: [prehranaLinksPostId],
  };

  await queryClient.prefetchQuery(
    postsKeys.postsFiltered(linksPostsFilters),
    () => getPosts(linksPostsFilters)
  );

  await queryClient.prefetchQuery(
    obavijestiKeys.obavijestiFiltered({
      categories: [obavijestiPrehranaCategory],
    }),
    () => getObavijestiPage(obavijestiPrehranaCategory)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const PrehranaPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [restaurantsCategoryId],
    orderby: "order",
  });

  const { data: faqs, isLoading: isLoadingFaqs } = usePosts({
    categories: [faqPrehranaCategory],
  });

  const { data: linksPost, isLoading: isLoadingLinksPost } = usePosts({
    include: [prehranaLinksPostId],
  });

  return (
    <Layout
      title="Prehrana"
      description="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
      bottomComponent={
        <>
          <div id="restorani"></div>
          <PostSlider
            // title="Restorani"
            // subtitle="Restorani Studentskog Centra u Zagrebu"
            className="my-14"
            posts={posts}
            loading={isLoading}
          />

          <Section>
            <ButtonLink
              href="#pitanja-i-pomoc"
              className="!rounded-full w-fit"
              isRegularLink={true}
            >
              Pitanja i pomoć
            </ButtonLink>

            <div className="flex flex-col items-start md:flex-row gap-6 mt-8">
              <div className="flex flex-col gap-2 flex-1 items-start">
                <p className="text-light font-medium">
                  Podaci o studentskim pravima i akademskim karticama
                </p>
                <div className="bg-[#bfc946] p-3 include-filters relative overflow-hidden rounded-sm">
                  <Image
                    width={128}
                    height={128}
                    src="/slike/prehrana/student.png"
                    alt="Student - prijava u issp.srce.hr"
                    className="mx-auto"
                  />
                  <h4 className="uppercase text-[22px] text-center my-2">
                    STUDENTI
                  </h4>
                  <a
                    href="https://issp.srce.hr/account/loginaai"
                    className="flex rounded-sm transition-[shadow,colors] hover:text-[#212529] hover:animate-pulse hover:shadow-[0_5px_11px_0_rgba(0,0,0,.18),0_4px_15px_0_rgba(0,0,0,.15)] shadow-[0_2px_5px_0_rgba(0,0,0,.16),0_2px_10px_0_rgba(0,0,0,.12)] w-full p-3 px-6 font-semibold text-white bg-[#63681e]"
                  >
                    Prijava u sustav
                  </a>
                  <div className="p-10 pb-1 absolute -top-[10px] text-sm -left-14 transform -rotate-45 bg-[#444444] text-center text-white">
                    AAI@EduHr
                  </div>
                </div>
              </div>
              <Card className="flex flex-col gap-3 text-primary flex-1">
                {isLoadingLinksPost ? (
                  <Spinner className="mx-auto my-6" />
                ) : (
                  <DisplayHTML
                    html={linksPost?.[0].excerpt.rendered || ""}
                    className="leading-7"
                  />
                )}
              </Card>
            </div>

            <PagePosts
              category={obavijestiPrehranaCategory}
              className="mt-12"
            />

            {!!faqs?.filter((item) =>
              item.categories.includes(faqPrehranaCategory)
            ).length && (
              <div className="mt-32">
                <SectionTitle title="Često postavljana pitanja" />
                <FAQCards
                  items={
                    faqs
                      .filter((item) =>
                        item.categories.includes(faqPrehranaCategory)
                      )
                      .slice(0, 8)
                      .map((item) => ({
                        title: item.title.rendered,
                        content: item.content.rendered,
                      })) || []
                  }
                  loading={isLoadingFaqs}
                />
                {faqs?.filter((item) =>
                  item.categories.includes(faqPrehranaCategory)
                ).length > 8 && (
                  <ButtonLink href="/prehrana/faq" className="mx-auto mt-6">
                    Vidi sve
                  </ButtonLink>
                )}
              </div>
            )}
          </Section>

          <KvalitetaPrehraneSection className="mb-12" />

          {/* <Section className="mt-24">
            <WeapayBanner />
          </Section> */}

          <div id="pitanja-i-pomoc"></div>
          <HelpSection />
        </>
      }
    >
      <PageTitle
        title="Prehrana"
        // subtitle="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
        // action={{
        //   title: "Pitanja i pomoć",
        //   href: "#pitanja-i-pomoc",
        //   isRegularLink: true,
        // }}
      />
    </Layout>
  );
};

export default PrehranaPage;
