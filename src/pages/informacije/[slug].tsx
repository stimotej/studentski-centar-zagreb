import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPost } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { revalidateTime } from "@/utils/constants";
import Spinner from "@/components/elements/Spinner";
import { getInformacijePaths } from "@/features/paths";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getInformacijePaths();

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

type InformacijeProps = {
  obavijest: Post<PostsMeta>;
};

export const getStaticProps: GetStaticProps<InformacijeProps> = async ({
  params,
}) => {
  const { slug } = params as StaticPathParams;

  const obavijest = await getPost(slug);

  return {
    props: {
      obavijest,
    },
    revalidate: revalidateTime,
  };
};

const InfoPostPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ obavijest }) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Layout>
        <Spinner className="mx-auto mt-20" />
      </Layout>
    );
  if (!obavijest)
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
