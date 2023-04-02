import HelpSection from "@/components/prehrana/HelpSection";
import KvalitetaPrehraneSection from "@/components/prehrana/KvalitetaPrehraneSection";
import WeapayBanner from "@/components/prehrana/WeapayBanner";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import PostSlider from "@/components/shared/PostSlider";
import { usePosts } from "@/features/posts";
import { restaurantsCategoryId } from "@/utils/constants";
import React from "react";

const PrehranaPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [restaurantsCategoryId],
  });

  return (
    <Layout
      title="Prehrana"
      description="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
      bottomComponent={<HelpSection />}
    >
      <PageTitle
        title="Prehrana"
        subtitle="Studentski centar Zagreb broji čak 16 restorana smještenih na vrlo atraktivnim lokacijama po Zagrebu. Na stranicama svakog restorana možete pratiti dnevnu ponudu jela koja se taj dan poslužuju."
        action={{
          title: "Pitanja i pomoc",
          href: "#pitanja-i-pomoc",
          isRegularLink: true,
        }}
      />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Card>
          <p className="text-light mb-2">Klikni na poveznicu:</p>
          <a
            href="https://issp.srce.hr/"
            className="text-xl font-medium text-primary underline uppercase"
          >
            STUDENTI
          </a>
          <p className="text-light mt-2">
            prijava pomoću AAI@EduHr korisničkog računa
          </p>
        </Card>
        <Card className="flex flex-col gap-3 text-primary">
          <a href="https://gov.hr/hr/subvencionirana-prehrana/1066">
            e-Građani - Subvencionirana prehrana
          </a>
          <a href="https://www.srce.unizg.hr/studentski-standard/">
            Studentski standard
          </a>
          <a href="https://issp.srce.hr/home/popisjela">
            Popis jela ISSP i cjenik
          </a>
        </Card>
      </div>

      <PostSlider
        title="Restorani"
        subtitle="Restorani Studentskog Centra u Zagrebu"
        className="mt-24"
        posts={posts}
        loading={isLoading}
      />

      <KvalitetaPrehraneSection className="my-12" />

      <WeapayBanner className="mt-32" />
    </Layout>
  );
};

export default PrehranaPage;
