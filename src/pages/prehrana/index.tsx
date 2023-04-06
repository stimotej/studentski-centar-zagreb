import ButtonLink from "@/components/elements/ButtonLink";
import HelpSection from "@/components/prehrana/HelpSection";
import KvalitetaPrehraneSection from "@/components/prehrana/KvalitetaPrehraneSection";
import WeapayBanner from "@/components/prehrana/WeapayBanner";
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
  restaurantsCategoryId,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

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

  return (
    <Layout
      title="Prehrana"
      description="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
      bottomComponent={
        <>
          <div id="restorani"></div>
          <PostSlider
            title="Restorani"
            subtitle="Restorani Studentskog Centra u Zagrebu"
            className="mt-24"
            posts={posts}
            loading={isLoading}
          />

          <KvalitetaPrehraneSection className="mb-12" />

          <Section className="mt-24">
            <WeapayBanner />

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

          <div id="pitanja-i-pomoc"></div>
          <HelpSection />
        </>
      }
    >
      <PageTitle
        title="Prehrana"
        subtitle="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
        action={{
          title: "Pitanja i pomoc",
          href: "#pitanja-i-pomoc",
          isRegularLink: true,
        }}
      />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Card>
          <p className="text-light mb-2">Klikni na poveznicu:</p>
          <a
            href="https://issp.srce.hr/"
            className="text-xl font-medium text-primary underline uppercase"
          >
            STUDENTI
          </a>
          <p className="text-light mt-2">
            prijava pomoću AAI@EduHr korisničkog računa
          </p>
        </Card>
        <Card className="flex flex-col gap-3 text-primary">
          <a href="https://gov.hr/hr/subvencionirana-prehrana/1066">
            e-Građani - Subvencionirana prehrana
          </a>
          <a href="https://www.srce.unizg.hr/studentski-standard/">
            Studentski standard
          </a>
          <a href="https://issp.srce.hr/home/popisjela">
            Popis jela ISSP i cjenik
          </a>
        </Card>
      </div>

      <PagePosts category={obavijestiPrehranaCategory} className="mt-12" />
    </Layout>
  );
};

export default PrehranaPage;
