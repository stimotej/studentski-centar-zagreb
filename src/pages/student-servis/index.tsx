import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import {
  infoPostsSS,
  infoSSAboutPost,
  infoPostsCategoryId,
  faqStudentServisCategory,
  obavijestiStudentServisCategory,
  revalidateTime,
  infoSSInfoCategory,
  infoSSPoslovniceCategory,
} from "@/utils/constants";
import AboutSection from "@/components/student-servis/AboutSection";
import InfoPostCard from "@/components/shared/InfoPostCard";
import LoginLinksSection from "@/components/student-servis/LoginLinksSection";
import IconCardsSection from "@/components/student-servis/IconCardsSection";
import UgovaranjePoslaSection from "@/components/student-servis/UgovaranjePoslaSection";
import BlueCard from "@/components/shared/BlueCard";
import DavanjaPoslodavcaSection from "@/components/student-servis/DavanjaPoslodavcaSection";
import ClanstvoSection from "@/components/student-servis/ClanstvoSection";
import SectionTitle from "@/components/shared/SectionTitle";
import FAQCards from "@/components/shared/FAQCards";
import ButtonLink from "@/components/elements/ButtonLink";
import PagePosts from "@/components/shared/PagePosts";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getObavijestiPage } from "@/features/obavijesti";
import type { ObavijestiMeta, Post, PostsMeta } from "@/features/types";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

type StudentServisProps = {
  aboutPost: Post<PostsMeta> | undefined;
  infoSSPoslovnicePosts: Post<PostsMeta>[];
  infoSSInfoPosts: Post<PostsMeta>[];
  faqStudentServisPosts: Post<PostsMeta>[];
  obavijesti: Post<ObavijestiMeta>[];
};

export const getStaticProps: GetStaticProps<StudentServisProps> = async () => {
  const posts = await getPosts({
    categories: [infoPostsCategoryId, infoPostsSS, faqStudentServisCategory],
  });

  const aboutPost = posts.find((post) => post.id === infoSSAboutPost);
  const infoSSPoslovnicePosts = posts.filter((post) =>
    post.categories.includes(infoSSPoslovniceCategory),
  );
  const infoSSInfoPosts = posts.filter((post) =>
    post.categories.includes(infoSSInfoCategory),
  );
  const faqStudentServisPosts = posts.filter((item) =>
    item.categories.includes(faqStudentServisCategory),
  );

  const obavijesti = await getObavijestiPage(obavijestiStudentServisCategory);

  return {
    props: {
      aboutPost,
      infoSSPoslovnicePosts,
      infoSSInfoPosts,
      faqStudentServisPosts,
      obavijesti,
    },
    revalidate: revalidateTime,
  };
};

const StudentServisPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  aboutPost,
  infoSSPoslovnicePosts,
  infoSSInfoPosts,
  faqStudentServisPosts,
  obavijesti,
}) => {
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);

  return (
    <Layout title={ui("ss.pageTitle")} description={ui("ss.introFull")}>
      {!!aboutPost && (
        <AboutSection
          image={aboutPost.image_url}
          title={t(aboutPost.title.rendered, aboutPost.meta.title_en)}
          content={t(aboutPost.content.rendered, aboutPost.meta.content_en)}
          className="mt-12"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {infoSSPoslovnicePosts.map((post) => (
          <InfoPostCard
            key={post.id}
            title={t(post.title.rendered, post.meta.title_en)}
            content={t(post.content.rendered, post.meta.content_en)}
          />
        ))}
      </div>

      <PagePosts posts={obavijesti} className="mt-16" />

      <div id="prijava"></div>
      <LoginLinksSection className="mt-24 mb-24" />

      <PageTitle
        title={ui("ss.pageTitle")}
        subtitle={ui("ss.introFull")}
        action={{
          title: ui("jobs.searchUpper"),
          href: "/poslovi",
        }}
      />

      <IconCardsSection className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {infoSSInfoPosts.map((post) => (
          <InfoPostCard
            key={post.id}
            title={t(post.title.rendered, post.meta.title_en)}
            excerpt={t(post.excerpt.rendered, post.meta.excerpt_en)}
            link={`/informacije/${post.slug}`}
          />
        ))}
      </div>

      <UgovaranjePoslaSection className="mb-12 mt-24" />

      {faqStudentServisPosts.length > 0 && (
        <div className="mb-24">
          <SectionTitle title={ui("common.faq")} />
          <FAQCards
            items={
              faqStudentServisPosts.slice(0, 8).map((item) => ({
                title: t(item.title.rendered, item.meta.title_en),
                content: t(item.content.rendered, item.meta.content_en),
              })) || []
            }
          />
          {faqStudentServisPosts.length > 8 && (
            <ButtonLink href="/student-servis/faq" className="mx-auto mt-6">
              {ui("common.seeAll")}
            </ButtonLink>
          )}
        </div>
      )}

      <DavanjaPoslodavcaSection className="mb-24" />

      <div id="clanstvo"></div>
      <ClanstvoSection className="mb-24" />

      <BlueCard
        title={ui("membership.employers")}
        description={ui("membership.employersIntro")}
        action={{
          title: ui("ss.signupMembershipEmployers"),
          href: "/prijava-poslodavac",
        }}
        className="mb-12"
      ></BlueCard>
    </Layout>
  );
};

export default StudentServisPage;
