import DisplayHTML from "@/components/elements/DisplayHTML";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getPostById } from "@/features/posts";
import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { medijiPost, revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type MedijiProps = {
  data: Post<PostsMeta>;
};

export const getStaticProps: GetStaticProps<MedijiProps> = async () => {
  const data = await getPostById(medijiPost);

  return {
    props: {
      data,
    },
    revalidate: revalidateTime,
  };
};

export const MeidjiPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => {
  return (
    <Layout title={clearHtmlFromString(data?.title.rendered ?? "")}>
      <PageTitle title={clearHtmlFromString(data?.title.rendered ?? "")} />
      <DisplayHTML
        html={data?.content.rendered ?? ""}
        className="mediji-content mt-12"
      />
      {/* <iframe
        width="100%"
        height="600"
        // src="https://www.youtube.com/embed/R1wy5PrcJK8?si=pyajj7eMtG4FH7TU&autoplay=1&muted=1&playsinline=1"
        src="https://www.youtube.com/embed/WKPIH2dq340?si=g6Gq7Lsre6ay2Aqs&autoplay=1&muted=1&playsinline=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full rounded-md mt-8 h-[400px] md:h-[600px] border-0"
      ></iframe>

      <h5 className="text-primary text-sm font-medium tracking-wider uppercase mt-14">
        2024
      </h5>
      <h3 className="text-[38px] text-text font-semibold leading-normal">
        Radićevi Dani
      </h3>

      <iframe
        width="100%"
        height="600"
        src="https://www.youtube.com/embed/uHmr7C2H1ZA?si=kmltlU2UMh59zMgR"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full rounded-md mt-8 h-[400px] md:h-[600px] border-0"
      ></iframe>

      <iframe
        width="100%"
        height="600"
        src="https://www.youtube.com/embed/9e8D2TZHwdg?si=SC1GGOw5IUh0eqyR"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full rounded-md mt-8 h-[400px] md:h-[600px] border-0"
      ></iframe> */}
    </Layout>
  );
};

export default MeidjiPage;
