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
    (post) => post.id === infoSSPredajaOglasaPost
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
  return (
    <Layout
      title="Prijava poslodavac"
      description="Prijava poslodavac - Studentski centar u Zagrebu"
    >
      <PageTitle title="Prijava poslodavac" />
      <div className="flex flex-col my-12 gap-6 items-start lg:flex-row">
        <LoginInfoCard
          title={registerPost?.title.rendered || ""}
          content={registerPost?.content.rendered || ""}
          documents={registerPost?.meta.documents || []}
          className="flex-1"
        />
        <LoginInfoCard
          title={documentPost?.title.rendered || ""}
          content={documentPost?.content.rendered || ""}
          documents={documentPost?.meta.documents || []}
          className="flex-1"
        />
        <div className="flex-1">
          <LoginInfoCard
            title={predajaOglasaPost?.title.rendered || ""}
            content={predajaOglasaPost?.content.rendered || ""}
            documents={predajaOglasaPost?.meta.documents || []}
          />
          {/* <LogInForm className="mt-4" /> */}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyLoginPage;
