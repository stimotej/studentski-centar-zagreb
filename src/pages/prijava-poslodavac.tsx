import Spinner from "@/components/elements/Spinner";
import LoginInfoCard from "@/components/login-poslodavac/LoginInfoCard";
import LogInForm from "@/components/login/LogInForm";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { usePosts } from "@/features/posts";
import {
  infoPostsCategoryId,
  infoPostsSS,
  infoSSDocumentPost,
  infoSSPredajaOglasaPost,
  infoSSRegisterPost,
} from "@/utils/constants";
import { type NextPage } from "next";
import React from "react";

const CompanyLoginPage: NextPage = () => {
  const { data: posts, isLoading } = usePosts({
    include: [infoSSRegisterPost, infoSSDocumentPost, infoSSPredajaOglasaPost],
    categories: [infoPostsCategoryId, infoPostsSS],
  });

  return (
    <Layout
      title="Prijava poslodavac"
      description="Prijava poslodavac - Studentski centar u Zagrebu"
    >
      <PageTitle title="Prijava poslodavac" />
      <div className="flex flex-col my-12 gap-6 items-start lg:flex-row">
        {(() => {
          const registerPost = posts?.find(
            (post) => post.id === infoSSRegisterPost
          );
          if (isLoading)
            return (
              <div className="flex-1">
                <Spinner className="mx-auto" />
              </div>
            );
          return (
            <LoginInfoCard
              title={registerPost?.title.rendered || ""}
              content={registerPost?.content.rendered || ""}
              documents={registerPost?.meta.documents || []}
              className="flex-1"
            />
          );
        })()}
        {(() => {
          const documentPost = posts?.find(
            (post) => post.id === infoSSDocumentPost
          );
          if (isLoading)
            return (
              <div className="flex-1">
                <Spinner className="mx-auto" />
              </div>
            );
          return (
            <LoginInfoCard
              title={documentPost?.title.rendered || ""}
              content={documentPost?.content.rendered || ""}
              documents={documentPost?.meta.documents || []}
              className="flex-1"
            />
          );
        })()}
        <div className="flex-1">
          {(() => {
            const predajaOglasaPost = posts?.find(
              (post) => post.id === infoSSPredajaOglasaPost
            );
            if (isLoading) return <Spinner className="mx-auto mt-12" />;
            return (
              <LoginInfoCard
                title={predajaOglasaPost?.title.rendered || ""}
                content={predajaOglasaPost?.content.rendered || ""}
                documents={predajaOglasaPost?.meta.documents || []}
              />
            );
          })()}
          {/* <LogInForm className="mt-4" /> */}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyLoginPage;
