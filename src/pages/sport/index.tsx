import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

const SportPage = () => {
  return (
    <Layout>
      <PageTitle
        title="Sport"
        subtitle="U ponudi rekreativnih aktivnosti koje su dostupne svim studentima Sveučilišta u Zagrebu, najviše je zanimanja za programe: fitness, aerobik, zumba fitness, funkcionalno-kondicijski trening."
        action={{
          title: "Natjecanja",
          href: "#natjecanja",
          isRegularLink: true,
        }}
      />
    </Layout>
  );
};

export default SportPage;
