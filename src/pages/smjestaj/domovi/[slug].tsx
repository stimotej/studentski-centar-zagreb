import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import BlueCard from "@/components/shared/BlueCard";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import ImageGallery from "@/components/smjestaj/ImageGallery";
import { getDomoviPaths } from "@/features/paths";
import { getPost } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { localized } from "@/utils/i18n";
import {
  revalidateTime,
  smjestajNatjecajDokumentSlug,
} from "@/utils/constants";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useUI } from "@/utils/ui";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getDomoviPaths();

  // Pre-render every locale. Without an explicit locale the English pages are
  // only ever produced on demand, and with `fallback: true` a crawler or a
  // JS-less request sees the loading shell instead of the page.
  const paths = posts.flatMap((post) =>
    (locales ?? ["hr"]).map((locale) => ({
      params: { slug: post.slug },
      locale,
    })),
  );

  return {
    paths,
    fallback: true,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

type DomProps = {
  obavijest: Post<PostsMeta>;
  natjecajDokument: Post<PostsMeta> | null;
};

export const getStaticProps: GetStaticProps<DomProps> = async ({ params }) => {
  const { slug } = params as StaticPathParams;

  const obavijest = await getPost(slug);
  const natjecajDokument =
    (await getPost(smjestajNatjecajDokumentSlug)) ?? null;

  return {
    props: {
      obavijest,
      natjecajDokument,
    },
    revalidate: revalidateTime,
  };
};

const DormitoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ obavijest, natjecajDokument }) => {
  const ui = useUI();
  const router = useRouter();

  // Croatian unless an English translation actually exists for this field.
  // Pages render mixed while a section is only part-translated — that is the
  // documented behaviour, not a bug.
  const t = (hr: string | undefined, en: string | undefined) =>
    localized(router.locale, hr, en);

  const sadrzaj = t(obavijest?.meta.sadrzaj, obavijest?.meta.sadrzaj_en);
  const kontakt = t(obavijest?.meta.kontakt, obavijest?.meta.kontakt_en);
  const radnoVrijemeBlagajni = t(
    obavijest?.meta.radno_vrijeme_blagajni,
    obavijest?.meta.radno_vrijeme_blagajni_en,
  );
  const dormTitle = t(obavijest?.title.rendered, obavijest?.meta.title_en);
  const dormExcerpt = t(
    obavijest?.excerpt.rendered,
    obavijest?.meta.excerpt_en,
  );

  const natjecajTitle = natjecajDokument?.title.rendered
    ? clearHtmlFromString(natjecajDokument.title.rendered)
    : undefined;
  const natjecajDescription = natjecajDokument?.excerpt.rendered
    ? clearHtmlFromString(natjecajDokument.excerpt.rendered)
    : undefined;
  const natjecajPdfUrl = natjecajDokument?.meta.documents?.[0]?.source_url;

  // const postCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // const postsContainerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // const handleScrollPosts = (scrollBy: number, index: number) => {
  //   postsContainerRefs.current[index]?.scrollBy({
  //     left: scrollBy,
  //     behavior: "smooth",
  //   });
  // };

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
          <p className="text-lg text-light">{ui("dorm.notFound")}</p>
          <Button onClick={() => router.back()} className="mx-auto">
            {ui("job.back")}
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(dormTitle)}
      description={clearHtmlFromString(dormExcerpt)}
      bottomComponent={
        <>
          <SectionTitle title={ui("dorm.photos")} className="mt-24" />
          {!obavijest?.meta.image_groups ? (
            <p className="text-center text-light">{ui("empty.photos")}</p>
          ) : (
            <ImageGallery
              imageGroups={obavijest.meta.image_groups}
              imageGroupsEn={obavijest.meta.image_groups_en}
            />
          )}

          <Section>
            <SectionTitle title={ui("common.location")} className="mt-12" />
            <div className="mb-12">
              <DisplayHTML html={obavijest?.meta.lokacija || ""} />
            </div>

            {(natjecajTitle || natjecajDescription || natjecajPdfUrl) && (
              <BlueCard
                title={natjecajTitle}
                description={natjecajDescription}
                className="my-12"
                action={
                  natjecajPdfUrl
                    ? {
                        title: ui("smjestaj.applyTender"),
                        href: natjecajPdfUrl,
                        isRegularLink: true,
                      }
                    : undefined
                }
              />
            )}
          </Section>
        </>
      }
    >
      <PageTitle
        title={clearHtmlFromString(dormTitle)}
        subtitle={
          clearHtmlFromString(dormExcerpt) ? (
            <DisplayHTML html={dormExcerpt} />
          ) : null
        }
      />
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {!!sadrzaj && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              {ui("common.relatedContent")}
            </h5>
            <DisplayHTML html={sadrzaj} className="text-light" />
          </Card>
        )}
        {!!kontakt && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              {ui("cards.contact")}
            </h5>
            <DisplayHTML html={kontakt} className="text-light" />
          </Card>
        )}
        {!!radnoVrijemeBlagajni && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              {ui("common.workingHours")}
            </h5>
            <DisplayHTML html={radnoVrijemeBlagajni} className="text-light" />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DormitoryPage;
