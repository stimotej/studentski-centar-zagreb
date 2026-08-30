import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import IzdavanjeUgovoraCard from "@/components/login-student/IzdavanjeUgovoraCard";
import UclanjivanjeCard from "@/components/login-student/UclanjivanjeCard";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import {
  infoPostsCategoryId,
  infoPostsSS,
  infoSSStudentLoginPost,
  revalidateTime,
} from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { Post, PostsMeta } from "@/features/types";
import { useUI } from "@/utils/ui";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";

type PrijavaProps = {
  studentLoginPost: Post<PostsMeta> | undefined;
};

export const getStaticProps: GetStaticProps<PrijavaProps> = async () => {
  const posts = await getPosts({
    include: [infoSSStudentLoginPost],
    categories: [infoPostsCategoryId, infoPostsSS],
  });

  return {
    props: {
      studentLoginPost: posts[0],
    },
    revalidate: revalidateTime,
  };
};

const StudentLoginPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ studentLoginPost }) => {
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);
  return (
    <Layout title={ui("login.pageTitle")} description={ui("login.studentPage")}>
      <PageTitle title={ui("login.studentIntro")} />

      <div className="flex flex-col gap-8 items-start md:flex-row my-12">
        <div className="md:w-[65%]">
          {studentLoginPost ? (
            <LoginInfoCard
              title={t(
                studentLoginPost.title.rendered,
                studentLoginPost.meta.title_en,
              )}
              content={t(
                studentLoginPost.content.rendered,
                studentLoginPost.meta.content_en,
              )}
              documents={studentLoginPost.meta.documents || []}
            />
          ) : null}
          <UclanjivanjeCard className="mt-8" />
        </div>

        <IzdavanjeUgovoraCard className="md:w-[35%]" />
      </div>
    </Layout>
  );
};

export default StudentLoginPage;
