import IzdavanjeUgovoraCard from "@/components/login-student/IzdavanjeUgovoraCard";
import UclanjivanjeCard from "@/components/login-student/UclanjivanjeCard";
import LogInForm from "@/components/login/LogInForm";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { type NextPage } from "next";
import React from "react";

const StudentLoginPage: NextPage = () => {
  return (
    <Layout
      title="Prijava"
      description="Prijava studenata - Studentski centar u Zagrebu"
    >
      <PageTitle title="Prijava studenata članova Student servisa za korištenje usluga" />
      <div className="flex flex-col gap-8 items-start md:flex-row my-12">
        <div className="md:w-[65%]">
          <LogInForm className="mb-4" />
          <UclanjivanjeCard />
        </div>
        <IzdavanjeUgovoraCard className="md:w-[35%]" />
      </div>
    </Layout>
  );
};

export default StudentLoginPage;
