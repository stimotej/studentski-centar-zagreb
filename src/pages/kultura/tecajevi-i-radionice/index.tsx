import EventCards from "@/components/kultura/EventCards";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getCourses } from "@/features/events";
import type { Event } from "@/features/types";
import { revalidateTime } from "@/utils/constants";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

type TecajeviProps = {
  courses: Event[];
};

export const getStaticProps: GetStaticProps<TecajeviProps> = async () => {
  const courses = await getCourses();

  return {
    props: {
      courses,
    },
    revalidate: revalidateTime,
  };
};

const FAQPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  courses,
}) => {
  return (
    <Layout title="Tečajevi i radionice">
      <PageTitle title="Tečajevi i radionice" />

      {/* <div className="flex flex-col lg:flex-row gap-6 my-12"> */}
      <EventCards
        events={courses}
        loading={false}
        emptyMessage="Nema tečajeva/radionica za prikaz."
        className="w-full my-12"
        classNameLoading="mt-12 w-2/3"
        classNameEmpty="mt-12 w-2/3"
      />
      {/* <div className="w-full lg:w-1/3"></div>
      </div> */}
    </Layout>
  );
};

export default FAQPage;
