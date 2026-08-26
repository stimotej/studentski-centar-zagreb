import ButtonLink from "@/components/elements/ButtonLink";
import Layout from "@/components/shared/Layout";
import React from "react";
import { useUI } from "@/utils/ui";

const NotFoundPage = () => {
  const ui = useUI();
  return (
    <Layout title="404" description={ui("error.notFoundMeta")}>
      <div className="flex flex-col items-center justify-center mt-[56px]">
        <h1 className="text-[100px] font-bold">404</h1>
        <p className="text-lg text-light">{ui("error.notFound")}</p>
        <ButtonLink href="/" className="mx-auto mt-12 !rounded-full">
          Idi na početnu
        </ButtonLink>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
