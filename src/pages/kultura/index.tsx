import ButtonLink from "@/components/elements/ButtonLink";
import EventCards from "@/components/kultura/EventCards";
import KlubSC from "@/components/kultura/KlubSC";
import BlueCard from "@/components/shared/BlueCard";
import ContentCard from "@/components/shared/ContentCard";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PagePosts from "@/components/shared/PagePosts";
import PageTitle from "@/components/shared/PageTitle";
import SectionTitle from "@/components/shared/SectionTitle";
import { getNewEvents, useNewEvents } from "@/features/events";
import eventKeys from "@/features/events/queries";
import { getObavijestiPage } from "@/features/obavijesti";
import obavijestiKeys from "@/features/obavijesti/queries";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import {
  faqKulturaCategory,
  obavijestiKulturaCategory,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventKeys.newEvents, getNewEvents);

  const postsFilters = {
    categories: [faqKulturaCategory],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
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

  const { data: posts, isLoading: isLoadingPosts } = usePosts({
    categories: [faqKulturaCategory],
  });

  return (
    <Layout
      title="Kultura"
      description="Kultura; Studentski centar u Zagrebu; Sveučilište u Zagrebu"
    >
      <PageTitle
        title="Kultura"
        action={{
          title: "Kalendar Evenata",
          href: "#kalendar-evenata",
          isRegularLink: true,
        }}
      />

      <PagePosts category={obavijestiKulturaCategory} className="mt-12" />

      <BlueCard
        title="Ulaznice za &TD dostupne i u online prodaji!"
        description="Ulaznice za predstave Teatra &TD, koncerte i određene filmske projekcije u SC-u, osim na našim blagajnama možete kupiti i putem online platforme za prodaju ulaznica Ulaznice.hr te na njihovim prodajnim mjestima."
        action={{ title: "ULAZNICE.HR", href: "https://www.ulaznice.hr/web/" }}
        className="mt-20"
      />
      <div className="flex flex-col lg:flex-row gap-6 mt-12">
        <ContentCard
          image="/slike/teatar-td-logo.jpg"
          title="TEATAR &TD"
          content="Teatar &TD hrvatska je kazališna kuća iz Zagreba. Ima multifunkcionalan programski prostor otvoren za kazališna, koncertna, festivalska, izložbena te različita interdisciplinarna događanja i eksperimentiranja."
          action={{ title: "SAZNAJ VIŠE", href: "http://itd.sczg.hr/" }}
          className="flex-1"
        />
        <ContentCard
          image="/slike/galerija-sc-logo.jpg"
          title="GALERIJA SC"
          content="Izložbeni prostor u Savskoj 25. Podržava mlade autore/ice koji žele unutar svojih prijedloga iskoristiti interdisciplinarne mogućnosti prostora."
          action={{
            title: "SAZNAJ VIŠE",
            href: "https://www.facebook.com/galerijasczg",
          }}
          className="flex-1"
        />
        <ContentCard
          image="/slike/kino-forum-logo.jpg"
          title="SKUC - PAUK / KINO FORUM"
          content="U studentskom domu Stjepan Radić pronaći ćete Kino Forum!"
          action={{
            title: "SAZNAJ VIŠE",
            href: "https://www.facebook.com/skucpauk.kinoforum",
          }}
          className="flex-1"
        />
      </div>
      <ContentCard
        title="UPIŠITE ŠKOLU PLESA STUDENTSKOGA CENTRA!"
        content="Nakon duge stanke, Studentski Centar u Zagrebu ponovno postaje rasplesan; Plesna škola SC-a otvorit će vrata za sve zaljubljenike u ples i one koji će to tek postati, za one koji misle da imaju „dvije lijeve“ kao i za one s nešto više iskustva. Od polaznika se očekuje samo dobra volja, a od iskusnog instruktora da ih poduči vještinama standardnih i latinsko-američkih plesova te egzotične salse."
        action={{
          title: "SAZNAJ VIŠE",
          href: "/obavijesti/upisite-skolu-plesa-studentskoga-centra/",
        }}
        className="flex-1 mt-12"
      />
      <div id="kalendar-evenata" className="py-12">
        <SectionTitle title="Kalendar evenata" className="mt-12 mb-8" />
        <EventCards
          events={events}
          loading={isLoading}
          emptyMessage="Nema novih evenata za prikaz"
        />
        <ButtonLink
          href="/kultura/eventi"
          className="mx-auto mt-8 !rounded-full"
        >
          Vidi sve
        </ButtonLink>
      </div>
      <KlubSC />
      <div className="flex flex-col lg:flex-row gap-6 my-12">
        <ContentCard
          title="MM CENTAR"
          content="MM centar, osnovan sredinom 1970-ih, od svojih se začetaka bavio intermedijalnim i multimedijalnim strujanjima i umjetničkim praksama kao i prezentacijom nekomercijalne filmske umjetnosti, naginjući eksperimentalnom i umjetničkom filmu."
          action={{ title: "SAZNAJ VIŠE", href: "http://itd.sczg.hr/" }}
          className="flex-1"
        />
        <ContentCard
          title="KINO SC"
          content={`<strong>29., 30. i 31.1.&nbsp;</strong>/ F. Šovagović: <br></span><a href="http://itd.sczg.hr/events/f-sovagovic-zena-popularnog-pokojnika/" mce_href="/events/f-sovagovic-zena-popularnog-pokojnika/"><em>ŽENA POPULARNOG POKOJNIKA<br></em>&nbsp;</a><span>19:30,&nbsp;Kino SC, Velika &amp;TD, Francuski paviljon</span>`}
          action={{
            title: "SAZNAJ VIŠE",
            href: "http://itd.sczg.hr/events/f-sovagovic-zena-popularnog-pokojnika/",
          }}
          className="flex-1"
        />
        <ContentCard
          title="FRANCUSKI PAVILJON"
          content="Francuski paviljon, zaštićeno kulturno dobro, nalazi se u Studentskom centru Sveučilišta u Zagrebu, Savska cesta 25. Izgrađen je 1937.godine u sklopu tadašnjeg Zagrebačkog zbora kao izložbeni paviljon Republike Francuske."
          className="flex-1"
        />
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
