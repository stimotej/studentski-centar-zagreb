import FAQCards from "@/components/shared/FAQCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPosts } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import { faqSmjestajCategory, revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

type SmjestajFaqProps = {
  posts: Post<PostsMeta>[];
};

export const getStaticProps: GetStaticProps<SmjestajFaqProps> = async () => {
  const posts = await getPosts({
    categories: [faqSmjestajCategory],
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

  return (
    <Layout title={ui("common.faq")}>
      <PageTitle title={ui("common.faq")} />
      {posts.length <= 0 ? (
        <p className="text-center text-light my-24">{ui("empty.faq")}</p>
      ) : (
        <FAQCards
          items={
            posts?.map((item) => ({
              title: localized(locale, item.title.rendered, item.meta.title_en),
              content: localized(
                locale,
                item.content.rendered,
                item.meta.content_en,
              ),
            })) || []
          }
          className="my-12"
        />
      )}
    </Layout>
  );
};

export default FAQPage;
