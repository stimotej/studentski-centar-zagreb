import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPost, usePost } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import postsKeys from "@/features/posts/queries";
import { infoPostsCategoryId } from "@/utils/constants";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      categories: [infoPostsCategoryId],
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
  });

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
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

  await queryClient.prefetchQuery(postsKeys.post(slug), () => getPost(slug));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
    },
    revalidate: 60 * 10,
  };
};

const InfoPostPage: NextPage<{
  slug: string;
}> = ({ slug }) => {
  const router = useRouter();

  const { data: obavijest, isLoading } = usePost(slug);

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
    >
      <PageTitle
        title={clearHtmlFromString(obavijest?.title.rendered || "")}
        subtitle={
          clearHtmlFromString(obavijest?.excerpt.rendered || "") ? (
            <DisplayHTML html={obavijest?.excerpt.rendered || ""} />
          ) : null
        }
      />
      <div className="my-16">
        <DisplayHTML
          html={obavijest?.content.rendered || ""}
          documents={obavijest?.meta.documents}
        />
      </div>
    </Layout>
  );
};

export default InfoPostPage;
