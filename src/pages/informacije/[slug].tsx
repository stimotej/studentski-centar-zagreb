import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { usePost } from "@/features/posts";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { useRouter } from "next/router";
import React from "react";

const InfoPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: obavijest, isLoading } = usePost(
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
    <Layout>
      <PageTitle
        title={clearHtmlFromString(obavijest?.title.rendered || "")}
        subtitle={<DisplayHTML html={obavijest?.excerpt.rendered || ""} />}
      />
      <div className="my-16">
        <DisplayHTML html={obavijest?.content.rendered || ""} />
      </div>
    </Layout>
  );
};

export default InfoPostPage;
