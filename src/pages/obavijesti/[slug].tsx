import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getObavijest } from "@/features/obavijesti";
import type { ObavijestiMeta, Post } from "@/features/types";
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
import { getObavijestiPaths } from "@/features/paths";
import Embeds from "@/scripts/embeds";

export const getStaticPaths: GetStaticPaths = async () => {
  const obavijesti = await getObavijestiPaths();

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

type ObavijestProps = {
  obavijest: Post<ObavijestiMeta>;
};

export const getStaticProps: GetStaticProps<ObavijestProps> = async ({
  params,
}) => {
  const { slug } = params as StaticPathParams;

  const obavijest = await getObavijest(slug);

  return {
    props: {
      obavijest,
    },
    revalidate: revalidateTime,
  };
};

const ObavijestPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ obavijest }) => {
  const router = useRouter();

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
        {router.isFallback ? (
          <Spinner className="mx-auto mt-20" />
        ) : (
          <DisplayHTML
            html={obavijest.content.rendered || ""}
            documents={obavijest.meta.documents}
          />
        )}
      </div>
      <Embeds />
    </Layout>
  );
};

export default ObavijestPage;
