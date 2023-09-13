import ButtonLink from "@/components/elements/ButtonLink";
import Spinner from "@/components/elements/Spinner";
import BlueCard from "@/components/shared/BlueCard";
import ContentCard from "@/components/shared/ContentCard";
import FAQCards from "@/components/shared/FAQCards";
import InfoPostCard from "@/components/shared/InfoPostCard";
import Layout from "@/components/shared/Layout";
import PagePosts from "@/components/shared/PagePosts";
import PageTitle from "@/components/shared/PageTitle";
import PostSlider from "@/components/shared/PostSlider";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import InfoToggles from "@/components/smjestaj/InfoToggles";
import NatjecajCard from "@/components/smjestaj/NatjecajCard";
import { getObavijestiPage } from "@/features/obavijesti";
import obavijestiKeys from "@/features/obavijesti/queries";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import {
  faqSmjestajCategory,
  infoPostsCategoryId,
  infoPostsSmjestaj,
  infoSmjestajDormitoriesCategory,
  infoSmjestajForeignStudentsCategory,
  infoSmjestajInfoCategory,
  infoSmjestajNatjecajCategory,
  obavijestiSmjestajCategory,
} from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const postsFilters = {
    categories: [infoPostsCategoryId, infoPostsSmjestaj, faqSmjestajCategory],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  await queryClient.prefetchQuery(
    obavijestiKeys.obavijestiFiltered({
      categories: [obavijestiSmjestajCategory],
    }),
    () => getObavijestiPage(obavijestiSmjestajCategory)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const SmjestajPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [infoPostsCategoryId, infoPostsSmjestaj, faqSmjestajCategory],
  });

  return (
    <Layout
      title="Smještaj"
      description="Pravo na smještaj u studentskom domu je osobno pravo studenta i nije prenosivo na drugu osobu. Studentski centar u Zagrebu će odmah po useljenju studenata u studentske domove obavljati intenzivne kontrole ostvarenog prava i sukladno Pravilniku o domskom redu i uvjetima boravka studenata u studentskim domovima sankcionirati prekršitelje."
      bottomComponent={
        <>
          <div id="studentski-domovi"></div>
          <PostSlider
            title="Studentski domovi"
            subtitle="SC Zagreb nudi smještaj u 4 studentska doma na atraktivnim lokacijama u gradu Zagrebu."
            className="my-24"
            posts={posts?.filter((post) =>
              post.categories.includes(infoSmjestajDormitoriesCategory)
            )}
            loading={isLoading}
          />

          <Section>
            <SectionTitle title="Foreign Students" />

            {isLoading ? (
              <Spinner className="mx-auto" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {posts
                  ?.filter((post) =>
                    post.categories.includes(
                      infoSmjestajForeignStudentsCategory
                    )
                  )
                  .map((post) => (
                    <InfoPostCard
                      key={post.id}
                      title={post.title.rendered}
                      excerpt={post.excerpt.rendered}
                      link={`/informacije/${post.slug}`}
                    />
                  ))}
              </div>
            )}

            {!!posts?.filter((item) =>
              item.categories.includes(faqSmjestajCategory)
            ).length && (
              <div className="my-24">
                <SectionTitle title="Često postavljana pitanja" />
                <FAQCards
                  items={
                    posts
                      .filter((item) =>
                        item.categories.includes(faqSmjestajCategory)
                      )
                      .slice(0, 8)
                      .map((item) => ({
                        title: item.title.rendered,
                        content: item.content.rendered,
                      })) || []
                  }
                  loading={isLoading}
                />
                {posts?.filter((item) =>
                  item.categories.includes(faqSmjestajCategory)
                ).length > 8 && (
                  <ButtonLink href="/smjestaj/faq" className="mx-auto mt-6">
                    Vidi sve
                  </ButtonLink>
                )}
              </div>
            )}

            {/* <BlueCard
              title="Natječaj za smještaj 2022/2023"
              description="Za prijavu na natječaj za studentski smještaj prijavite se putem linka  nastavku."
              className="mt-12"
              action={{
                title: "Prijava za natječaj",
                href: "https://natjecaj.sczg.hr/student",
                isRegularLink: true,
              }}
            /> */}

            <div className="flex flex-col md:flex-row gap-6 my-12">
              <ContentCard
                image="/slike/smjestaj/ikone/savjetovaliste.png"
                title="SAVJETOVALIŠTE"
                content="U sklopu studentskog doma „Cvjetno naselje“ možete koristiti usluge BESPLATNOG savjetovanja. Savjetovanje će se održavati prema unaprijed dogovorenim terminima i dostupno je svim studentima korisnicima usluga Studentskog centra u Zagrebu, kao i radnicima Studentskog centra u Zagrebu."
                imageClassName="w-[90px] h-[90px] object-contain"
                contentClassName="text-light leading-relaxed"
              />

              <ContentCard
                image="/slike/smjestaj/ikone/kontakt_i_podrska.png"
                title="Sukladan preventivnim mjerama"
                content={`Studenti dolaze uz prethodnu najavu i dogovor termina na kontakt brojeve telefona: 01 4593 660 i 091 4593 579. Termin možete dogovori pozivom ili na WhatsApp.</p><br>
<p><strong>Radno vrijeme sa strankama: <br></strong>ponedjeljak - petak, 08:00 - 15:00 h;<strong><br></strong><strong>e-mail: <a href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></strong></p>`}
                imageClassName="w-[90px] h-[90px] object-contain"
                contentClassName="text-light leading-relaxed"
              />
            </div>
          </Section>
        </>
      }
    >
      <PageTitle
        title="Obavijesti - studentski smještaj"
        subtitle="Pravo na smještaj u studentskom domu je osobno pravo studenta i nije prenosivo na drugu osobu. Studentski centar u Zagrebu će odmah po useljenju studenata u studentske domove obavljati intenzivne kontrole ostvarenog prava i sukladno Pravilniku o domskom redu i uvjetima boravka studenata u studentskim domovima sankcionirati prekršitelje."
        action={{
          title: "STUDENTSKI DOMOVI",
          href: "#studentski-domovi",
          isRegularLink: true,
        }}
      />

      <PagePosts category={obavijestiSmjestajCategory} className="my-12" />

      <div id="natjecaj"></div>
      {isLoading ? (
        <Spinner className="mt-12 mx-auto" />
      ) : (
        posts
          ?.filter((post) =>
            post.categories.includes(infoSmjestajNatjecajCategory)
          )
          .map((post) => (
            <NatjecajCard
              key={post.id}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered}
              link={`/informacije/${post.slug}`}
              // className="mt-24"
            />
          ))
      )}

      <InfoToggles className="mt-12" />

      <SectionTitle
        title="Boravak u studentskome domu"
        subtitle="Poštovani budući stanari studentskih domova, za boravak u studentskome domu potrebno je ispuniti slijedeća 3 kriterija:"
        className="mt-24"
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <ContentCard
          image="/slike/smjestaj/ikone/lijecnicki_pregled.png"
          title="Liječnički pregled za smještaj"
          content={`<div class="et_pb_blurb_description">Isti se provodi se u svrhu utvrđivanja zdravstvenih rizika za boravak u kolektivu. <b></b>Molimo studente da se na pregled u ambulantu naruče telefonski.
<br><a href="/dokumenti/smjestaj/Nadlezni-lijecnici-2023.pdf">Raspored ambulanti</a></div>`}
          imageClassName="w-[90px] h-[90px] object-contain"
          contentClassName="text-light leading-relaxed"
        />
        <ContentCard
          image="/slike/smjestaj/ikone/samoizolacija.png"
          title="NE ZA SAMOIZOLACIJU"
          content={`<div class="et_pb_blurb_description"><p>Sukladno odluci Uprave za visoko obrazovanje MZO-a,&nbsp;<b>nije dozvoljeno korištenje studentskog doma za samoizolaciju.</b></p></div>`}
          imageClassName="w-[90px] h-[90px] object-contain"
          contentClassName="text-light leading-relaxed"
        />
        <ContentCard
          image="/slike/smjestaj/ikone/mjere.png"
          title="Sukladan preventivnim mjerama"
          content={`<div class="et_pb_blurb_description"><p>Boravak u studentskom domu mora biti sukladan propisanim preventivnim mjerama zaštite od COVIDa-19. <br><a href="/dokumenti/smjestaj/Preporuke-za-sve-odgojno-obrazovne-ustanove.pdf" target="_blank" rel="noopener">Preporuke Hrvatskog zavoda za javno zdravstvo</a></p></div>`}
          imageClassName="w-[90px] h-[90px] object-contain"
          contentClassName="text-light leading-relaxed"
        />
      </div>
      <ContentCard
        title="Plaćanje stanarine on-line putem"
        content="Omogućeno je plaćanje smještaja u studentskim domovima on-line putem tokom cijele akademke godine. Student na ovaj način može platiti sva dosadašnja dugovanja, kao i stanarinu za mjesec unaprijed."
        action={{
          title: "Saznaj više",
          href: "/smjestaj/placanje-stanarine-on-line-putem",
        }}
        className="mt-8"
        contentClassName="text-light leading-relaxed"
      />
      <ContentCard
        title="Domski red"
        content="Na snagu su stupile izmjene Pravilnika o domskom redu i uvjetima boravka studenata u studentskim domovima Studentskog centra u Zagrebu kojima se reguliraju obveze stanara studentskih domova, a tiču se postupanja stanara u izvanrednim okolnostima te je opisan način naplate stanarine koji stupa na snagu sa početkom nove akademske godine (1. rujan 2020.). Navedene izmjene donesene su kao zaključak dogovora Zajednice studentskih centara RH kako bi se ujednačio način naplate stanarine u svim studentskim domovima u Republici Hrvatskoj."
        action={{
          title: "Otvori domski red",
          href: "/dokumenti/smjestaj/domski_red_2020.pdf",
        }}
        className="mt-8"
        contentClassName="text-light leading-relaxed"
      />

      {isLoading ? (
        <Spinner className="mt-12 mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {posts
            ?.filter((post) =>
              post.categories.includes(infoSmjestajInfoCategory)
            )
            .map((post) => (
              <InfoPostCard
                key={post.id}
                title={post.title.rendered}
                excerpt={post.excerpt.rendered}
                link={`/informacije/${post.slug}`}
              />
            ))}
        </div>
      )}
    </Layout>
  );
};

export default SmjestajPage;
