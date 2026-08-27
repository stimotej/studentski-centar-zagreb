import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import { faqPocetnaCategory, revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

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
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);

  return (
    <Layout title={ui("home.information")}>
      <PageTitle title={ui("home.information")} />
      {posts.length <= 0 ? (
        <p className="text-center text-light my-24">
          {ui("empty.information")}
        </p>
      ) : (
        <FAQCards
          items={
            posts?.map((item) => ({
              title: t(item.title.rendered, item.meta.title_en),
              content: t(item.content.rendered, item.meta.content_en),
            })) || []
          }
          className="my-12"
        />
      )}
    </Layout>
  );
};

export default FAQPage;
