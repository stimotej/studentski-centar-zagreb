import Button from "@/components/elements/Button";
import ButtonLink from "@/components/elements/ButtonLink";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import DnevniMenuSection from "@/components/prehrana/DnevniMenuSection";
import RestoranJelaSection from "@/components/prehrana/RestoranJelaSection";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import SectionTitle from "@/components/shared/SectionTitle";
import { useMenus } from "@/features/menus";
import { getRestaurantsPaths } from "@/features/paths";
import { getPost } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { restaurantsCategoryId, revalidateTime } from "@/utils/constants";
import axios from "axios";
import dayjs from "dayjs";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getRestaurantsPaths();

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

type RestoranProps = {
  restaurant: Post<PostsMeta>;
};

export const getStaticProps: GetStaticProps<RestoranProps> = async ({
  params,
}) => {
  const { slug } = params as StaticPathParams;

  const restaurant = await getPost(slug);

  return {
    props: {
      restaurant,
    },
    revalidate: revalidateTime,
  };
};

const RestaurantPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ restaurant }) => {
  const router = useRouter();

  const { data: menus, isInitialLoading: isLoadingMenus } = useMenus(
    {
      menu_date: dayjs().format("YYYY-MM-DD"),
      restaurant: restaurant?.id || 0,
    },
    {
      enabled: !!restaurant,
    }
  );

  if (router.isFallback)
    return (
      <Layout>
        <Spinner className="mx-auto mt-20" />
      </Layout>
    );
  if (!restaurant)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen restoran</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(restaurant?.title.rendered || "")}
      description={clearHtmlFromString(restaurant?.excerpt.rendered || "")}
    >
      <div className="flex flex-col md:flex-row gap-12">
        <PageTitle
          title={clearHtmlFromString(restaurant?.title.rendered || "")}
          subtitle={
            <div>
              <p className="font-semibold text-light underline">
                Ponuda uključuje:
              </p>
              <DisplayHTML html={restaurant?.meta.ponuda || ""} />
              <ButtonLink href="#dnevni-meni" className="mt-6" isRegularLink>
                Dnevna ponuda
              </ButtonLink>
            </div>
          }
          className="flex-1"
        />
        <Card className="flex-1 mt-0 md:mt-24 text-center text-sm text-light">
          <h5 className="uppercase text-primary underline font-semibold mb-6">
            RADNO VRIJEME
          </h5>
          <DisplayHTML html={restaurant?.meta.radno_vrijeme || ""} />
        </Card>
      </div>

      <div id="dnevni-meni"></div>
      <DnevniMenuSection menus={menus} loading={isLoadingMenus} />

      <RestoranJelaSection className="mb-12 mt-28" />

      <SectionTitle title="Lokacija" className="mt-24" />
      <div className="mb-12">
        <DisplayHTML html={restaurant?.meta.lokacija || ""} />
      </div>
    </Layout>
  );
};

export default RestaurantPage;
