import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { useObavijest } from "@/features/obavijesti";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { useRouter } from "next/router";
import React from "react";

const ObavijestPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: obavijest, isLoading } = useObavijest(
    (Array.isArray(slug) ? slug[0] : slug) || ""
  );

  if (!isLoading && !obavijest)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađena obavijest</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(obavijest?.title.rendered || "")}
      description={clearHtmlFromString(obavijest?.excerpt.rendered || "")}
      // header={
      //   !isLoading && (
      //     <ImageTitle
      //       image={obavijest?.image_url || ""}
      //       title={obavijest?.title.rendered || ""}
      //     />
      //   )
      // }
    >
      <PageTitle title={clearHtmlFromString(obavijest?.title.rendered || "")} />
      <div className="py-12">
        {isLoading ? (
          <Spinner className="mx-auto mt-20" />
        ) : (
          <DisplayHTML
            html={obavijest.content.rendered || ""}
            documents={obavijest.meta.documents}
          />
        )}
      </div>
    </Layout>
  );
};

export default ObavijestPage;
