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
  return (
    <Layout
      title="Prijava"
      description="Prijava studenata - Studentski centar u Zagrebu"
    >
      <PageTitle title="Prijava studenata članova Student servisa za korištenje usluga" />

      <div className="flex flex-col gap-8 items-start md:flex-row my-12">
        <div className="md:w-[65%]">
          {studentLoginPost ? (
            <LoginInfoCard
              title={studentLoginPost.title.rendered || ""}
              content={studentLoginPost.content.rendered || ""}
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
