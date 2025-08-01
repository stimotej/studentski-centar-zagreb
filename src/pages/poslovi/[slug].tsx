import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { getJob } from "@/features/jobs";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import dayjs from "dayjs";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Image from "next/image";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import type { JobsMeta, Post } from "@/features/types";
import DocumentCard from "@/components/shared/DocumentCard";
import { revalidateTime } from "@/utils/constants";
import { getJobsPaths } from "@/features/paths";
import Embeds from "@/scripts/embeds";

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await getJobsPaths();

  const paths = jobs.map((job) => ({
    params: { slug: job.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

type JobProps = {
  job: Post<JobsMeta>;
};

export const getStaticProps: GetStaticProps<JobProps> = async ({ params }) => {
  const { slug } = params as StaticPathParams;

  const job = await getJob(slug);

  return {
    props: {
      job,
    },
    revalidate: revalidateTime,
  };
};

const JobPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  job,
}) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Layout>
        <Spinner className="mx-auto mt-20" />
      </Layout>
    );

  if (!job)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen posao</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-12 pb-12">
        <div className="w-full lg:w-[70%]">
          <PageTitle title={clearHtmlFromString(job?.title.rendered || "")} />
          <p className="mt-8 text-lg font-medium text-text">{`Prijave traju do ${dayjs(
            job?.meta.active_until
          ).format("DD.MM.YYYY")}`}</p>

          {job?.meta.image ? (
            <Image
              src={job.meta.image}
              alt={job.meta.title || ""}
              className="lg:hidden rounded-lg w-full h-auto object-cover mb-6 mt-8 min-h-[200px]"
              width={900}
              height={600}
            />
          ) : null}

          {!!job?.meta.description && (
            <>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Opis posla
              </h4>
              <DisplayHTML
                html={job?.meta.description || ""}
                className="text-light"
              />
            </>
          )}

          {!!job?.meta.whyme && (
            <>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Zašto tražimo tebe?
              </h4>
              <DisplayHTML
                html={job?.meta.whyme || ""}
                className="text-light"
              />
            </>
          )}

          {!!job?.meta.other_description && (
            <>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Ostale napomene i uvjeti
              </h4>
              <DisplayHTML
                html={job?.meta.other_description || ""}
                className="text-light"
              />
            </>
          )}

          {(!!job?.meta.work_start || !!job?.meta.work_end) && (
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {!!job?.meta.work_start && (
                <div>
                  <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Početak rada
                  </h4>
                  <p className="text-light">{job?.meta.work_start}</p>
                </div>
              )}
              {!!job?.meta.work_end && (
                <div>
                  <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Očekivano trajanje posla
                  </h4>
                  <p className="text-light">{job?.meta.work_end}</p>
                </div>
              )}
            </div>
          )}
          {(!!job?.meta.payment_rate ||
            !!job?.meta.city ||
            !!job?.meta.payment_other) && (
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
              {!!job?.meta.payment_rate && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Satnica
                  </h4>
                  <p className="text-light">{job?.meta.payment_rate}</p>
                </div>
              )}
              {!!job?.meta.city && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Lokacija
                  </h4>
                  <p className="text-light">
                    {job?.meta.city === "FROM_HOME"
                      ? "Rad od doma"
                      : job.meta.city}
                  </p>
                </div>
              )}
              {!!job?.meta.payment_other && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Druge naknade
                  </h4>
                  <p className="text-light">{job?.meta.payment_other}</p>
                </div>
              )}
            </div>
          )}
          {(!!job?.meta.work_hours || !!job?.meta.positions) && (
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
              {!!job?.meta.work_hours && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Radno vrijeme
                  </h4>
                  <p className="text-light">{job?.meta.work_hours}</p>
                </div>
              )}
              {!!job?.meta.positions && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Potreban broj izvođača
                  </h4>
                  <p className="text-light">{job?.meta.positions}</p>
                </div>
              )}
            </div>
          )}
          {!!job?.meta.skills && (
            <div>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Potrebna znanja
              </h4>
              <p className="text-light">{job?.meta.skills}</p>
            </div>
          )}

          {!!job?.meta.labels &&
            job.meta.labels.length > 0 &&
            job.meta.labels[0] && (
              <div>
                <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                  Poželjne vještine
                </h4>
                <p className="text-light">{job?.meta.labels}</p>
              </div>
            )}
        </div>
        <div className="w-full lg:w-[30%]">
          {job?.meta.image ? (
            <Image
              src={job.meta.image}
              alt={job.meta.title || ""}
              className="hidden lg:block rounded-lg w-full h-auto object-cover mb-6 mt-8 min-h-[200px]"
              width={900}
              height={600}
            />
          ) : null}
          {!!job?.meta.documents.length ? (
            <div className="mb-6">
              <h4 className="uppercase text-text text-sm tracking-wide font-medium">
                Dokumenti
              </h4>
              <div className="flex flex-col gap-2 mt-2">
                {job.meta.documents.map((document, index) => (
                  <DocumentCard key={index} document={document} />
                ))}
              </div>
            </div>
          ) : null}
          <Card className="w-full sticky top-20">
            <div className="flex flex-wrap gap-3 items-center">
              <Image
                src={job?.company.image_url || "/slike/company-placeholder.png"}
                alt={job?.meta.company_name || ""}
                className="rounded-full"
                width={48}
                height={48}
              />
              <h4 className="text-text font-medium">
                {job?.meta.company_name}
              </h4>
            </div>

            <h4 className="mt-10 mb-2 uppercase text-text text-sm tracking-wide font-medium">
              Način za prijavu
            </h4>
            <DisplayHTML
              html={job?.meta.contact_student || ""}
              className="text-light break-words"
            />
          </Card>
        </div>
      </div>
      <Embeds />
    </Layout>
  );
};

export default JobPage;
