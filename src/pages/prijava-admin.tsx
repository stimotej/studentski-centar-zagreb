import LogInForm from "@/components/login/LogInForm";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { type NextPage } from "next";
import React from "react";

const CompanyLoginPage: NextPage = () => {
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
