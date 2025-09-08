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
import { getObavijestiPage } from "@/features/obavijesti";
import { getPosts } from "@/features/posts";
import type { ObavijestiMeta, Post, PostsMeta } from "@/features/types";
import {
  faqSmjestajCategory,
  infoPostsCategoryId,
  infoPostsSmjestaj,
  infoSmjestajDormitoriesCategory,
  infoSmjestajForeignStudentsCategory,
  infoSmjestajInfoCategory,
  obavijestiSmjestajCategory,
  revalidateTime,
} from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type SmjestajProps = {
  posts: Post<PostsMeta>[];
  obavijesti: Post<ObavijestiMeta>[];
};

export const getStaticProps: GetStaticProps<SmjestajProps> = async () => {
  const posts = await getPosts({
    categories: [infoPostsCategoryId, infoPostsSmjestaj, faqSmjestajCategory],
  });

  const obavijesti = await getObavijestiPage(obavijestiSmjestajCategory);

  return {
    props: {
      posts,
      obavijesti,
    },
    revalidate: revalidateTime,
  };
};

const SmjestajPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts, obavijesti }) => {
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

      {/* <div id="natjecaj"></div>
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
      )} */}

      <InfoToggles className="mt-12" />

      <SectionTitle
        title="Boravak u studentskome domu"
        subtitle="Poštovani budući stanari studentskih domova, za boravak u studentskome domu potrebno je ispuniti slijedeći kriteriji:"
        className="mt-24"
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <ContentCard
          image="/slike/smjestaj/ikone/lijecnicki_pregled.png"
          title="Liječnički pregled za smještaj"
          content={`<div class="et_pb_blurb_description">Isti se provodi se u svrhu utvrđivanja zdravstvenih rizika za boravak u kolektivu. <b></b>Molimo studente da se na pregled u ambulantu naruče telefonski.
<br><a href="https://www.sczg.unizg.hr/wp-content/uploads/2025/06/raspored-timova-novi.pdf">Raspored ambulanti</a></div>`}
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
        content="Na snagu su stupile izmjene Pravilnika o domskom redu i uvjetima boravka studenata u studentskim domovima Studentskog centra u Zagrebu kojima se reguliraju obveze stanara studentskih domova, a tiču se postupanja stanara u izvanrednim okolnostima te je opisan način naplate stanarine koji stupa na snagu sa početkom nove akademske godine (22. rujna 2023.). Navedene izmjene donesene su kao zaključak dogovora Zajednice studentskih centara RH kako bi se ujednačio način naplate stanarine u svim studentskim domovima u Republici Hrvatskoj."
        action={{
          title: "Otvori domski red",
          href: "/dokumenti/smjestaj/Pravilnik-o-domskom-redu-i-uvjetima-boravka-studenata-2023.pdf",
        }}
        className="mt-8"
        contentClassName="text-light leading-relaxed"
      />

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
