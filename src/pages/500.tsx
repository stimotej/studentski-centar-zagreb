import ButtonLink from "@/components/elements/ButtonLink";
import Layout from "@/components/shared/Layout";
import React from "react";
import { useUI } from "@/utils/ui";

const Page500 = () => {
  const ui = useUI();
  return (
    <Layout title="500" description={ui("error.serverMeta")}>
      <div className="flex flex-col items-center justify-center mt-[56px]">
        <h1 className="text-[100px] font-bold">500</h1>
        <p className="text-lg text-light">{ui("error.server")}</p>
        <ButtonLink href="/" className="mx-auto mt-12 !rounded-full">
          Idi na početnu
        </ButtonLink>
      </div>
    </Layout>
  );
};

export default Page500;
