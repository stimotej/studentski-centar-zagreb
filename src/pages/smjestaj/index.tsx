import ButtonLink from "@/components/elements/ButtonLink";
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
import type { InfoToggleItem } from "@/components/smjestaj/InfoToggles";
import NatjecajCard from "@/components/smjestaj/NatjecajCard";
import { getObavijestiPage } from "@/features/obavijesti";
import { getPosts } from "@/features/posts";
import type { ObavijestiMeta, Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import {
  faqSmjestajCategory,
  infoPostsCategoryId,
  infoPostsSmjestaj,
  infoSmjestajDormitoriesCategory,
  infoSmjestajForeignStudentsCategory,
  infoSmjestajInfoCategory,
  infoSmjestajCardsCategory,
  infoSmjestajNatjecajCategory,
  infoSmjestajTogglesCategory,
  obavijestiSmjestajCategory,
  revalidateTime,
} from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type CardItem = {
  id: number;
  image: string;
  title: string;
  content: string;
  action: { title: string; href: string; isRegularLink?: boolean } | null;
};

type SmjestajProps = {
  posts: Post<PostsMeta>[];
  infoToggleItems: InfoToggleItem[];
  cardItems: CardItem[];
  obavijesti: Post<ObavijestiMeta>[];
};

export const getStaticProps: GetStaticProps<SmjestajProps> = async () => {
  const posts = await getPosts({
    categories: [
      infoPostsCategoryId,
      infoPostsSmjestaj,
      faqSmjestajCategory,
      infoSmjestajNatjecajCategory,
    ],
  });

  const infoTogglePosts = await getPosts({
    categories: [infoSmjestajTogglesCategory],
  });

  const cardPosts = await getPosts({
    categories: [infoSmjestajCardsCategory],
  });

  const obavijesti = await getObavijestiPage(obavijestiSmjestajCategory);

  return {
    props: {
      posts,
      infoToggleItems: infoTogglePosts.map((post) => ({
        id: post.id,
        image: post.image_url,
        title: clearHtmlFromString(post.title.rendered),
        content: post.content.rendered,
      })),
      cardItems: cardPosts.map((post) => {
        const documentUrl = post.meta.documents?.[0]?.source_url;
        const action = documentUrl
          ? {
              title: post.meta.footnotes,
              href: documentUrl,
              isRegularLink: true,
            }
          : post.meta.link
          ? { title: post.meta.footnotes, href: post.meta.link }
          : null;

        return {
          id: post.id,
          image: post.image_url,
          title: post.title.rendered,
          content: post.content.rendered,
          action,
        };
      }),
      obavijesti,
    },
    revalidate: revalidateTime,
  };
};

const SmjestajPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts, infoToggleItems, cardItems, obavijesti }) => {
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
          />

          <Section>
            <SectionTitle title="Foreign Students" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {posts
                ?.filter((post) =>
                  post.categories.includes(infoSmjestajForeignStudentsCategory)
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

      <PagePosts posts={obavijesti} className="my-12" />

      <div id="natjecaj"></div>
      {posts
        ?.filter((post) =>
          post.categories.includes(infoSmjestajNatjecajCategory)
        )
        .map((post) => (
          <NatjecajCard
            key={post.id}
            title={post.title.rendered}
            excerpt={post.excerpt.rendered}
            link={`/informacije/${post.slug}`}
            className="mt-12"
          />
        ))}

      <InfoToggles items={infoToggleItems} className="mt-12" />

      <SectionTitle
        title="Boravak u studentskome domu"
        subtitle="Poštovani budući stanari studentskih domova, za boravak u studentskome domu potrebno je ispuniti slijedeći kriteriji:"
        className="mt-24"
      />
      <div className="flex flex-col gap-8 mt-6">
        {cardItems.map((item) => (
          <ContentCard
            key={item.id}
            image={item.image || undefined}
            title={item.title}
            content={item.content}
            action={item.action ?? undefined}
            imageClassName="w-[90px] h-[90px] object-contain"
            contentClassName="text-light leading-relaxed"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {posts
          ?.filter((post) => post.categories.includes(infoSmjestajInfoCategory))
          .map((post) => (
            <InfoPostCard
              key={post.id}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered}
              link={`/informacije/${post.slug}`}
            />
          ))}
      </div>
    </Layout>
  );
};

export default SmjestajPage;
