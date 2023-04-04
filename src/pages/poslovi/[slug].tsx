import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import Spinner from "@/components/elements/Spinner";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { useJob } from "@/features/jobs";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ObavijestPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: job, isLoading } = useJob(
    (Array.isArray(slug) ? slug[0] : slug) || ""
  );

  if (!isLoading && !job)
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

  if (isLoading)
    return (
      <Layout>
        <Spinner className="mx-auto mt-20" />
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

          {!!job?.meta.description && (
            <>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Opis posla
              </h4>
              <DisplayHTML
                html={job?.meta.description || ""}
                className="text-light"
                documents={job?.meta.documents}
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

          <div className="flex gap-12">
            <div>
              <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Početak rada
              </h4>
              <p className="text-light">
                {dayjs(job?.meta.work_start).format("DD/MM/YYYY")}
              </p>
            </div>
            {!!job?.meta.work_end && (
              <div>
                <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                  Očekivano trajanje posla
                </h4>
                <p className="text-light">
                  {dayjs(job?.meta.work_end).format("DD/MM/YYYY")}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
            <div>
              <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                Satnica
              </h4>
              <p className="text-light">{job?.meta.payment_rate} €</p>
            </div>
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
                <p className="text-light">{job?.meta.payment_other} €</p>
              </div>
            )}
          </div>
          {(!!job?.meta.work_hours || !!job?.meta.positions) && (
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
              {!!job?.meta.work_hours && (
                <div>
                  <h4 className="mb-2 uppercase text-text text-sm tracking-wide font-medium">
                    Satnica
                  </h4>
                  <p className="text-light">{job?.meta.work_hours} €</p>
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
          {!!job?.meta.skills &&
            job.meta.skills.length > 0 &&
            job.meta.skills[0] && (
              <>
                <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                  Potrebna znanja
                </h4>
                <div className="flex flwx-wrap gap-2">
                  {job?.meta.skills.map((skill, index) =>
                    skill ? (
                      <div
                        key={index}
                        className="text-text bg-gray-100 py-2 px-4 rounded-full w-fit"
                      >
                        {skill}
                      </div>
                    ) : null
                  )}
                </div>
              </>
            )}

          {!!job?.meta.labels &&
            job.meta.labels.length > 0 &&
            job.meta.labels[0] && (
              <>
                <h4 className="mt-12 mb-2 uppercase text-text text-sm tracking-wide font-medium">
                  Poželjne vještine
                </h4>
                <div className="flex flwx-wrap gap-2">
                  {job?.meta.labels.map((label, index) =>
                    label ? (
                      <div
                        key={index}
                        className="text-text bg-gray-100 py-2 px-4 rounded-full w-fit"
                      >
                        {label}
                      </div>
                    ) : null
                  )}
                </div>
              </>
            )}
        </div>
        <div className="w-full lg:w-[30%]">
          <Card className="w-full sticky top-20">
            <div className="flex flex-wrap gap-3 items-center">
              <Image
                src={
                  job?.company.image_url ||
                  "/sczg/slike/company-placeholder.png"
                }
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
    </Layout>
  );
};

export default ObavijestPage;
