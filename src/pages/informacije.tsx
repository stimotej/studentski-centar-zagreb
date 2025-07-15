import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import { faqPocetnaCategory, revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type FAQProps = {
  posts: Post<PostsMeta>[];
};

export const getStaticProps: GetStaticProps<FAQProps> = async () => {
  const posts = await getPosts({
    categories: [faqPocetnaCategory],
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
    <Layout title="Informacije">
      <PageTitle title="Informacije" />
      {posts.length <= 0 ? (
        <p className="text-center text-light my-24">
          Nema informacija za prikaz
        </p>
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
