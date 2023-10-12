import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { NextPage } from "next";
import React from "react";

export const MeidjiPage: NextPage = () => {
  return (
    <Layout title="Mediji">
      <PageTitle title="Mediji" />
      <iframe
        width="100%"
        height="600"
        src="https://www.youtube.com/embed/R1wy5PrcJK8?si=pyajj7eMtG4FH7TU&autoplay=1&muted=1&playsinline=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full rounded-md mt-8 h-[400px] md:h-[600px] border-0"
      ></iframe>
    </Layout>
  );
};

export default MeidjiPage;
