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
import Embeds from "@/scripts/embeds";
import { localized } from "@/utils/i18n";
import { useUI } from "@/utils/ui";

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
  const ui = useUI();
  const { locale } = useRouter();
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(locale, hr, en);

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
          <p className="text-lg text-light">{ui("empty.notFound")}</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(
        t(obavijest?.title.rendered, obavijest?.meta.title_en) || "",
      )}
      description={clearHtmlFromString(
        t(obavijest?.excerpt.rendered, obavijest?.meta.excerpt_en) || "",
      )}
    >
      <PageTitle
        title={clearHtmlFromString(
          t(obavijest?.title.rendered, obavijest?.meta.title_en) || "",
        )}
        subtitle={
          clearHtmlFromString(
            t(obavijest?.excerpt.rendered, obavijest?.meta.excerpt_en) || "",
          ) ? (
            <DisplayHTML
              html={
                t(obavijest?.excerpt.rendered, obavijest?.meta.excerpt_en) || ""
              }
            />
          ) : null
        }
      />
      <div className="my-16">
        <DisplayHTML
          html={
            t(obavijest?.content.rendered, obavijest?.meta.content_en) || ""
          }
          documents={obavijest?.meta.documents}
        />
      </div>
      <Embeds />
    </Layout>
  );
};

export default InfoPostPage;
