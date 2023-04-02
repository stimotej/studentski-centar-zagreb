import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

const SmjestajPage = () => {
  return (
    <Layout>
      <PageTitle
        title="Obavijesti – studentski smještaj"
        subtitle="Pravo na smještaj u studentskom domu je osobno pravo studenta i nije prenosivo na drugu osobu. Studentski centar u Zagrebu će odmah po useljenju studenata u studentske domove obavljati intenzivne kontrole ostvarenog prava i sukladno Pravilniku o domskom redu i uvjetima boravka studenata u studentskim domovima sankcionirati prekršitelje."
        action={{
          title: "STUDENTSKI DOMOVI",
          href: "#studentski-domovi",
          isRegularLink: true,
        }}
      />
    </Layout>
  );
};

export default SmjestajPage;
