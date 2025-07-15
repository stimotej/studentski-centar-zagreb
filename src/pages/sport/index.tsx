import ButtonLink from "@/components/elements/ButtonLink";
import Card from "@/components/shared/Card";
import FAQCards from "@/components/shared/FAQCards";
import InfoPostCard from "@/components/shared/InfoPostCard";
import Layout from "@/components/shared/Layout";
import PagePosts from "@/components/shared/PagePosts";
import PageTitle from "@/components/shared/PageTitle";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import ImageGallery from "@/components/smjestaj/ImageGallery";
import LinkCards from "@/components/sport/LinkCards";
import { getCategories } from "@/features/categories";
import { getObavijestiPage } from "@/features/obavijesti";
import { getPosts } from "@/features/posts";
import type {
  Category,
  ObavijestiMeta,
  Post,
  PostsMeta,
} from "@/features/types";
import {
  infoPostsSport,
  infoSportRekreacijskeCategory,
  infoSportEdukacijskeCategory,
  infoSportNatjecateljskeCategory,
  infoSportZabavaCategory,
  infoSportRekreacijskeCjelogodisnjeCategory,
  infoSportRekreacijskePovremeneCategory,
  infoSportEdukacijskeSportskeCategory,
  infoSportEdukacijskeStrucneCategory,
  faqSportCategory,
  obavijestiSportCategory,
  revalidateTime,
} from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type SportProps = {
  posts: Post<PostsMeta>[];
  categories: Category[];
  obavijesti: Post<ObavijestiMeta>[];
};

export const getStaticProps: GetStaticProps<SportProps> = async () => {
  const postsFilters = {
    order: "desc",
    categories: [
      infoSportRekreacijskeCategory,
      infoSportEdukacijskeCategory,
      infoSportNatjecateljskeCategory,
      infoSportZabavaCategory,
      faqSportCategory,
    ],
  };

  const posts = await getPosts(postsFilters);

  const categories = await getCategories(infoPostsSport);

  const obavijesti = await getObavijestiPage(obavijestiSportCategory);

  return {
    props: {
      posts,
      categories,
      obavijesti,
    },
    revalidate: revalidateTime,
  };
};

const SportPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  categories,
  obavijesti,
}) => {
  return (
    <Layout
      title="Sport"
      description="U ponudi rekreativnih aktivnosti koje su dostupne svim studentima Sveučilišta u Zagrebu, najviše je zanimanja za programe: fitness, aerobik, zumba fitness, funkcionalno-kondicijski trening."
      bottomComponent={
        <div className="mb-12">
          {/* REKREACIJSKE AKTIVNOSTI */}
          {(() => {
            const postsExistCjelogodisnje = !!posts?.filter((post) =>
              post.categories.includes(
                infoSportRekreacijskeCjelogodisnjeCategory
              )
            ).length;
            const postsExistPovremene = !!posts?.filter((post) =>
              post.categories.includes(infoSportRekreacijskePovremeneCategory)
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportRekreacijskeCategory
            )?.meta.image_groups.length;

            if (
              !postsExistCjelogodisnje &&
              !postsExistPovremene &&
              !imagesExist
            )
              return null;
            return (
              <>
                <Section>
                  <SectionTitle
                    title="Rekreacijske aktivnosti"
                    className="mt-12"
                  />
                  {postsExistCjelogodisnje && (
                    <>
                      <div id="rekreacijske-aktivnosti-informacije-cjelogodisnje"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        Cjelogodišnje
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportRekreacijskeCjelogodisnjeCategory
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
                    </>
                  )}
                  {postsExistPovremene && (
                    <>
                      <div id="rekreacijske-aktivnosti-informacije-povremene"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        Povremene
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportRekreacijskePovremeneCategory
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
                    </>
                  )}
                </Section>
                {imagesExist && (
                  <>
                    <div id="rekreacijske-aktivnosti-slike"></div>
                    <ImageGallery
                      imageGroups={
                        categories?.find(
                          (item) => item.id === infoSportRekreacijskeCategory
                        )?.meta.image_groups || []
                      }
                    />
                  </>
                )}
              </>
            );
          })()}

          {/* EDUKACIJSKE AKTIVNOSTI */}
          {(() => {
            const postsExistSportske = !!posts?.filter((post) =>
              post.categories.includes(infoSportEdukacijskeSportskeCategory)
            ).length;
            const postsExistStrucne = !!posts?.filter((post) =>
              post.categories.includes(infoSportEdukacijskeStrucneCategory)
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportEdukacijskeCategory
            )?.meta.image_groups.length;

            if (!postsExistSportske && !postsExistStrucne && !imagesExist)
              return null;
            return (
              <>
                <Section>
                  <SectionTitle
                    title="Edukacijske aktivnosti"
                    className="mt-12"
                  />
                  {postsExistSportske && (
                    <>
                      <div id="edukacijske-aktivnosti-informacije-sportske"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        Sportske
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportEdukacijskeSportskeCategory
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
                    </>
                  )}
                  {postsExistStrucne && (
                    <>
                      <div id="edukacijske-aktivnosti-informacije-strucne"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        Stručne
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportEdukacijskeStrucneCategory
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
                    </>
                  )}
                </Section>
                {imagesExist && (
                  <>
                    <div id="edukacijske-aktivnosti-slike"></div>
                    <ImageGallery
                      imageGroups={
                        categories?.find(
                          (item) => item.id === infoSportEdukacijskeCategory
                        )?.meta.image_groups || []
                      }
                    />
                  </>
                )}
              </>
            );
          })()}

          {/* NATJECATELJSKE AKTIVNOSTI */}
          {(() => {
            const postsExist = !!posts?.filter((post) =>
              post.categories.includes(infoSportNatjecateljskeCategory)
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportNatjecateljskeCategory
            )?.meta.image_groups.length;

            if (!postsExist && !imagesExist) return null;
            return (
              <>
                <Section>
                  <div id="natjecateljske-aktivnosti-informacije"></div>
                  <SectionTitle
                    title="Natjecateljske aktivnosti"
                    className="mt-12"
                  />
                  {postsExist && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {posts
                        ?.filter((post) =>
                          post.categories.includes(
                            infoSportNatjecateljskeCategory
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
                </Section>
                {imagesExist && (
                  <>
                    <div id="natjecateljske-aktivnosti-slike"></div>
                    <ImageGallery
                      imageGroups={
                        categories?.find(
                          (item) => item.id === infoSportNatjecateljskeCategory
                        )?.meta.image_groups || []
                      }
                    />
                  </>
                )}
              </>
            );
          })()}

          {/* ZABAVA */}
          {(() => {
            const postsExist = !!posts?.filter((post) =>
              post.categories.includes(infoSportZabavaCategory)
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportZabavaCategory
            )?.meta.image_groups.length;

            if (!postsExist && !imagesExist) return null;
            return (
              <>
                <Section>
                  <div id="zabavne-aktivnosti-informacije"></div>
                  <SectionTitle title="Zabava" className="mt-12" />
                  {postsExist && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {posts
                        ?.filter((post) =>
                          post.categories.includes(infoSportZabavaCategory)
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
                </Section>
                {imagesExist && (
                  <>
                    <div id="zabavne-aktivnosti-slike"></div>
                    <ImageGallery
                      imageGroups={
                        categories?.find(
                          (item) => item.id === infoSportZabavaCategory
                        )?.meta.image_groups || []
                      }
                    />
                  </>
                )}
              </>
            );
          })()}

          {!!posts?.filter((item) => item.categories.includes(faqSportCategory))
            .length && (
            <div className="mt-12">
              <SectionTitle title="Često postavljana pitanja" />
              <FAQCards
                items={
                  posts
                    .filter((item) =>
                      item.categories.includes(faqSportCategory)
                    )
                    .slice(0, 8)
                    .map((item) => ({
                      title: item.title.rendered,
                      content: item.content.rendered,
                    })) || []
                }
              />
              {posts?.filter((item) =>
                item.categories.includes(faqSportCategory)
              ).length > 8 && (
                <ButtonLink href="/sport/faq" className="mx-auto mt-6">
                  Vidi sve
                </ButtonLink>
              )}
            </div>
          )}

          <Section>
            <Card>
              <ButtonLink
                href="http://161.53.174.9/sport/"
                className="mx-auto"
                isRegularLink
              >
                Arhiva
              </ButtonLink>
            </Card>
          </Section>
        </div>
      }
    >
      <PageTitle
        title="SPORT"
        // subtitle="U ponudi rekreativnih aktivnosti koje su dostupne svim studentima Sveučilišta u Zagrebu, najviše je zanimanja za programe: fitness, aerobik, zumba fitness, funkcionalno-kondicijski trening."
      />

      <PagePosts posts={obavijesti} className="mt-12" />

      <LinkCards className="mt-12" />
    </Layout>
  );
};

export default SportPage;
