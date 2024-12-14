import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getObavijest, useObavijest } from "@/features/obavijesti";
import obavijestiKeys from "@/features/obavijesti/queries";
import type { ObavijestiMeta, Post } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import React from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: obavijesti } = await axios.get<Post<ObavijestiMeta>[]>(
    "/obavijesti",
    {
      params: {
        per_page: 100,
        orderby: "featured",
        order: "desc",
      },
    }
  );

  const paths = obavijesti.map((obavijest) => ({
    params: { slug: obavijest.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as StaticPathParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(obavijestiKeys.obavijest(slug), () =>
    getObavijest(slug)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
    },
    revalidate: 60 * 10,
  };
};

const ObavijestPage: NextPage<{
  slug: string;
}> = ({ slug }) => {
  const router = useRouter();

  const { data: obavijest, isLoading } = useObavijest(slug);

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
