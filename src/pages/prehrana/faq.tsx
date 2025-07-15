import Spinner from "@/components/elements/Spinner";
import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts, usePosts } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import { faqPrehranaCategory, revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type PrehranaFaqProps = {
  posts: Post<PostsMeta>[];
};

export const getStaticProps: GetStaticProps<PrehranaFaqProps> = async () => {
  const posts = await getPosts({
    categories: [faqPrehranaCategory],
  });

  return {
    props: {
      posts,
    },
    revalidate: revalidateTime,
  };
};

const FAQPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <Layout title="Često postavljana pitanja">
      <PageTitle title="Često postavljana pitanja" />
      {posts.length <= 0 ? (
        <p className="text-center text-light my-24">Nema pitanja za prikaz</p>
      ) : (
        <FAQCards
          items={
            posts?.map((item) => ({
              title: item.title.rendered,
              content: item.content.rendered,
            })) || []
          }
          className="my-12"
        />
      )}
    </Layout>
  );
};

export default FAQPage;
