import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import {
  infoPostsCategoryId,
  infoPostsSS,
  infoSSDocumentPost,
  infoSSPredajaOglasaPost,
  infoSSRegisterPost,
  revalidateTime,
} from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useUI } from "@/utils/ui";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";

type PrijavaProps = {
  registerPost: Post<PostsMeta> | undefined;
  documentPost: Post<PostsMeta> | undefined;
  predajaOglasaPost: Post<PostsMeta> | undefined;
};

export const getStaticProps: GetStaticProps<PrijavaProps> = async () => {
  const posts = await getPosts({
    include: [infoSSRegisterPost, infoSSDocumentPost, infoSSPredajaOglasaPost],
    categories: [infoPostsCategoryId, infoPostsSS],
  });

  const registerPost = posts?.find((post) => post.id === infoSSRegisterPost);
  const documentPost = posts?.find((post) => post.id === infoSSDocumentPost);
  const predajaOglasaPost = posts?.find(
    (post) => post.id === infoSSPredajaOglasaPost,
  );

  return {
    props: {
      registerPost,
      documentPost,
      predajaOglasaPost,
    },
    revalidate: revalidateTime,
  };
};

const CompanyLoginPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ registerPost, documentPost, predajaOglasaPost }) => {
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);
  return (
    <Layout
      title={ui("login.employerPage")}
      description={ui("login.employerPageTitle")}
    >
      <PageTitle title={ui("login.employerPage")} />
      <div className="flex flex-col my-12 gap-6 items-start lg:flex-row">
        <LoginInfoCard
          title={t(registerPost?.title.rendered, registerPost?.meta.title_en)}
          content={t(
            registerPost?.content.rendered,
            registerPost?.meta.content_en,
          )}
          documents={registerPost?.meta.documents || []}
          className="flex-1"
        />
        <LoginInfoCard
          title={t(documentPost?.title.rendered, documentPost?.meta.title_en)}
          content={t(
            documentPost?.content.rendered,
            documentPost?.meta.content_en,
          )}
          documents={documentPost?.meta.documents || []}
          className="flex-1"
        />
        <div className="flex-1">
          <LoginInfoCard
            title={t(
              predajaOglasaPost?.title.rendered,
              predajaOglasaPost?.meta.title_en,
            )}
            content={t(
              predajaOglasaPost?.content.rendered,
              predajaOglasaPost?.meta.content_en,
            )}
            documents={predajaOglasaPost?.meta.documents || []}
          />
          {/* <LogInForm className="mt-4" /> */}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyLoginPage;
