import DisplayHTML from "@/components/elements/DisplayHTML";
import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import IzdavanjeUgovoraCard from "@/components/login-student/IzdavanjeUgovoraCard";
import UclanjivanjeCard from "@/components/login-student/UclanjivanjeCard";
import LogInForm from "@/components/login/LogInForm";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts, usePosts } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import {
  infoPostsCategoryId,
  infoPostsSS,
  infoSSStudentLoginPost,
} from "@/utils/constants";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps, type NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const postsFilters = {
    include: [infoSSStudentLoginPost],
    categories: [infoPostsCategoryId, infoPostsSS],
  };

  await queryClient.prefetchQuery(postsKeys.postsFiltered(postsFilters), () =>
    getPosts(postsFilters)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 10,
  };
};

const StudentLoginPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    include: [infoSSStudentLoginPost],
    categories: [infoPostsCategoryId, infoPostsSS],
  });

  console.log(posts);

  return (
    <Layout
      title="Prijava"
      description="Prijava studenata - Studentski centar u Zagrebu"
    >
      <PageTitle title="Prijava studenata članova Student servisa za korištenje usluga" />

      <div className="flex flex-col gap-8 items-start md:flex-row my-12">
        <div className="md:w-[65%]">
          {posts && posts[0] ? (
            <LoginInfoCard
              title={posts[0]?.title.rendered || ""}
              content={posts[0]?.content.rendered || ""}
              documents={posts[0]?.meta.documents || []}
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
