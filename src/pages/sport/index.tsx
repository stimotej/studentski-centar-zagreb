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
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

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
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);

  return (
    <Layout
      title={ui("sport.pageTitle")}
      description={ui("sport.recreationIntro")}
      bottomComponent={
        <div className="mb-12">
          {/* REKREACIJSKE AKTIVNOSTI */}
          {(() => {
            const postsExistCjelogodisnje = !!posts?.filter((post) =>
              post.categories.includes(
                infoSportRekreacijskeCjelogodisnjeCategory,
              ),
            ).length;
            const postsExistPovremene = !!posts?.filter((post) =>
              post.categories.includes(infoSportRekreacijskePovremeneCategory),
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportRekreacijskeCategory,
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
                    title={ui("sport.recreationalTc")}
                    className="mt-12"
                  />
                  {postsExistCjelogodisnje && (
                    <>
                      <div id="rekreacijske-aktivnosti-informacije-cjelogodisnje"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        {ui("sport.yearRoundTc")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportRekreacijskeCjelogodisnjeCategory,
                            ),
                          )
                          .map((post) => (
                            <InfoPostCard
                              key={post.id}
                              title={t(post.title.rendered, post.meta.title_en)}
                              excerpt={t(
                                post.excerpt.rendered,
                                post.meta.excerpt_en,
                              )}
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
                        {ui("sport.occasionalTc")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportRekreacijskePovremeneCategory,
                            ),
                          )
                          .map((post) => (
                            <InfoPostCard
                              key={post.id}
                              title={t(post.title.rendered, post.meta.title_en)}
                              excerpt={t(
                                post.excerpt.rendered,
                                post.meta.excerpt_en,
                              )}
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
                          (item) => item.id === infoSportRekreacijskeCategory,
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
              post.categories.includes(infoSportEdukacijskeSportskeCategory),
            ).length;
            const postsExistStrucne = !!posts?.filter((post) =>
              post.categories.includes(infoSportEdukacijskeStrucneCategory),
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportEdukacijskeCategory,
            )?.meta.image_groups.length;

            if (!postsExistSportske && !postsExistStrucne && !imagesExist)
              return null;
            return (
              <>
                <Section>
                  <SectionTitle
                    title={ui("sport.educationalTc")}
                    className="mt-12"
                  />
                  {postsExistSportske && (
                    <>
                      <div id="edukacijske-aktivnosti-informacije-sportske"></div>
                      <h4 className="text-text text-center text-lg font-semibold mt-12">
                        {ui("sport.sportingTc")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportEdukacijskeSportskeCategory,
                            ),
                          )
                          .map((post) => (
                            <InfoPostCard
                              key={post.id}
                              title={t(post.title.rendered, post.meta.title_en)}
                              excerpt={t(
                                post.excerpt.rendered,
                                post.meta.excerpt_en,
                              )}
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
                        {ui("sport.professionalTc")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {posts
                          ?.filter((post) =>
                            post.categories.includes(
                              infoSportEdukacijskeStrucneCategory,
                            ),
                          )
                          .map((post) => (
                            <InfoPostCard
                              key={post.id}
                              title={t(post.title.rendered, post.meta.title_en)}
                              excerpt={t(
                                post.excerpt.rendered,
                                post.meta.excerpt_en,
                              )}
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
                          (item) => item.id === infoSportEdukacijskeCategory,
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
              post.categories.includes(infoSportNatjecateljskeCategory),
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportNatjecateljskeCategory,
            )?.meta.image_groups.length;

            if (!postsExist && !imagesExist) return null;
            return (
              <>
                <Section>
                  <div id="natjecateljske-aktivnosti-informacije"></div>
                  <SectionTitle
                    title={ui("sport.competitiveTc")}
                    className="mt-12"
                  />
                  {postsExist && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {posts
                        ?.filter((post) =>
                          post.categories.includes(
                            infoSportNatjecateljskeCategory,
                          ),
                        )
                        .map((post) => (
                          <InfoPostCard
                            key={post.id}
                            title={t(post.title.rendered, post.meta.title_en)}
                            excerpt={t(
                              post.excerpt.rendered,
                              post.meta.excerpt_en,
                            )}
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
                          (item) => item.id === infoSportNatjecateljskeCategory,
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
              post.categories.includes(infoSportZabavaCategory),
            ).length;
            const imagesExist = !!categories?.find(
              (item) => item.id === infoSportZabavaCategory,
            )?.meta.image_groups.length;

            if (!postsExist && !imagesExist) return null;
            return (
              <>
                <Section>
                  <div id="zabavne-aktivnosti-informacije"></div>
                  <SectionTitle title={ui("sport.fun")} className="mt-12" />
                  {postsExist && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {posts
                        ?.filter((post) =>
                          post.categories.includes(infoSportZabavaCategory),
                        )
                        .map((post) => (
                          <InfoPostCard
                            key={post.id}
                            title={t(post.title.rendered, post.meta.title_en)}
                            excerpt={t(
                              post.excerpt.rendered,
                              post.meta.excerpt_en,
                            )}
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
                          (item) => item.id === infoSportZabavaCategory,
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
              <SectionTitle title={ui("common.faq")} />
              <FAQCards
                items={
                  posts
                    .filter((item) =>
                      item.categories.includes(faqSportCategory),
                    )
                    .slice(0, 8)
                    .map((item) => ({
                      title: t(item.title.rendered, item.meta.title_en),
                      content: t(item.content.rendered, item.meta.content_en),
                    })) || []
                }
              />
              {posts?.filter((item) =>
                item.categories.includes(faqSportCategory),
              ).length > 8 && (
                <ButtonLink href="/sport/faq" className="mx-auto mt-6">
                  {ui("common.seeAll")}
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
                {ui("sport.archive")}
              </ButtonLink>
            </Card>
          </Section>
        </div>
      }
    >
      <PageTitle
        title={ui("sport.pageTitleUpper")}
        // subtitle={ui("sport.recreationIntro")}
      />

      <PagePosts posts={obavijesti} className="mt-12" />

      <LinkCards className="mt-12" />
    </Layout>
  );
};

export default SportPage;
