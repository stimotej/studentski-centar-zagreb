import ButtonLink from "@/components/elements/ButtonLink";
import Layout from "@/components/shared/Layout";
import React from "react";

const Page500 = () => {
  return (
    <Layout
      title="500"
      description="Došlo je do greške; Studentski centar u Zagrebu;"
    >
      <div className="flex flex-col items-center justify-center mt-[56px]">
        <h1 className="text-[100px] font-bold">500</h1>
        <p className="text-lg text-light">Došlo je do greške</p>
        <ButtonLink href="/" className="mx-auto mt-12 !rounded-full">
          Idi na početnu
        </ButtonLink>
      </div>
    </Layout>
  );
};

export default Page500;
