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

      <LogInForm className="mt-4" />
    </Layout>
  );
};

export default CompanyLoginPage;
