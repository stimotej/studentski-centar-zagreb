import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import BlueCard from "@/components/shared/BlueCard";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import ImageGallery from "@/components/smjestaj/ImageGallery";
import { getPost, usePost } from "@/features/posts";
import postsKeys from "@/features/posts/queries";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { infoSmjestajDormitoriesCategory } from "@/utils/constants";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await axios.get<Post<PostsMeta>[]>("/posts", {
    params: {
      categories: [infoSmjestajDormitoriesCategory],
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

const DormitoryPage: NextPage<{
  slug: string;
}> = ({ slug }) => {
  const router = useRouter();

  const { data: obavijest, isLoading } = usePost(slug);

  // const postCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // const postsContainerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // const handleScrollPosts = (scrollBy: number, index: number) => {
  //   postsContainerRefs.current[index]?.scrollBy({
  //     left: scrollBy,
  //     behavior: "smooth",
  //   });
  // };

  if (!isLoading && !obavijest)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen studentski dom</p>
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
      bottomComponent={
        <>
          <SectionTitle title="Fotografije" className="mt-24" />
          {!obavijest?.meta.image_groups ? (
            <p className="text-center text-light">Nema fotografija za prikaz</p>
          ) : (
            <ImageGallery imageGroups={obavijest.meta.image_groups} />
          )}

          <Section>
            <SectionTitle title="Lokacija" className="mt-12" />
            <div className="mb-12">
              <DisplayHTML html={obavijest?.meta.lokacija || ""} />
            </div>

            <BlueCard
              title="Natječaj za smještaj 2025/2026"
              description="Za prijavu na natječaj za studentski smještaj prijavite se putem linka  nastavku."
              className="my-12"
              action={{
                title: "Prijava za natječaj",
                href: "https://www.sczg.unizg.hr/wp-content/uploads/2025/06/Natjecaj-S-B-2025_2026-3.pdf",
                isRegularLink: true,
              }}
            />
          </Section>
        </>
      }
    >
      <PageTitle
        title={clearHtmlFromString(obavijest?.title.rendered || "")}
        subtitle={
          clearHtmlFromString(obavijest?.excerpt.rendered || "") ? (
            <DisplayHTML html={obavijest?.excerpt.rendered || ""} />
          ) : null
        }
      />
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {!!obavijest?.meta.sadrzaj && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              Popratni sadržaj
            </h5>
            <DisplayHTML html={obavijest.meta.sadrzaj} className="text-light" />
          </Card>
        )}
        {!!obavijest?.meta.kontakt && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">Kontakt</h5>
            <DisplayHTML html={obavijest.meta.kontakt} className="text-light" />
          </Card>
        )}
        {!!obavijest?.meta.radno_vrijeme_blagajni && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              Radno vrijeme blagajni
            </h5>
            <DisplayHTML
              html={obavijest.meta.radno_vrijeme_blagajni}
              className="text-light"
            />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DormitoryPage;
