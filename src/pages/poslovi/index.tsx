import React, { useState } from "react";
import { type NextPage } from "next";
import PageTitle from "@/components/shared/PageTitle";
import Layout from "@/components/shared/Layout";
import Spinner from "@/components/elements/Spinner";
import PostCard from "@/components/obavijesti/PostCard";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import useDebounce from "@/hooks/useDebounce";
import FilterSelect from "@/components/elements/FilterSelect";
import { useJobs } from "@/features/jobs";
import JobCard from "@/components/jobs/JobCard";
import { useCategories } from "@/features/categories";
import { jobsCategoryId } from "@/utils/constants";

const PosloviPage: NextPage = () => {
  const [category, setCategory] = useState<number>(jobsCategoryId);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const {
    data: jobs,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useJobs({
    search: debouncedSearch,
    categories: category === jobsCategoryId ? undefined : [category],
    orderby: "featured",
  });

  const { data: categories } = useCategories(jobsCategoryId);

  return (
    <Layout
      title="Poslovi"
      description="Ponuda poslova; Studentski centar u Zagrebu; Sveučilište u Zagrebu"
    >
      <PageTitle
        title="Poslovi"
        subtitle="Za pregled poslova objavljenih na staroj stranici pritisni na link pretraži poslove"
        action={{
          title: "Pretraži poslove",
          href: "http://www.sczg.unizg.hr/student-servis/ponuda-poslova/",
        }}
      />
      <div className="mt-12 flex flex-col-reverse gap-12 md:flex-row pb-12">
        <div className="w-full md:w-[75%]">
          {isLoading ? (
            <Spinner className="mx-auto" />
          ) : jobs?.pages && jobs?.pages[0].length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {jobs?.pages?.map((jobsGroup, index) => (
                  <React.Fragment key={index}>
                    {jobsGroup.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.meta.title}
                        slug={job.slug}
                        companyName={job.meta.company_name}
                        description={job.meta.description}
                        paymentRate={job.meta.payment_rate}
                        companyPicture={job.company.image_url}
                        featured={job.meta.featured}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
              {hasNextPage ? (
                <div className="flex items-center justify-center w-full py-4">
                  <Button
                    loading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="mt-6"
                  >
                    Učitaj više
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="my-4 text-light">Nema poslova za prikaz</div>
          )}
        </div>
        <div className="w-full md:w-[25%]">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži poslove..."
            isSearch
          />
          <FilterSelect
            value={category || 0}
            onChange={setCategory}
            title="Vrsta posla"
            className="mt-8"
            items={
              categories
                ? [
                    { title: "Svi poslovi", value: jobsCategoryId },
                    ...categories?.map((category) => ({
                      title: category.name,
                      value: category.id,
                    })),
                  ]
                : [{ title: "Svi poslovi", value: jobsCategoryId }]
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default PosloviPage;
