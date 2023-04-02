import React from "react";
import { Roboto } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "./Footer";

const poppins = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

interface LayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  description?: string;
  bottomComponent?: React.ReactNode;
}

const Layout = ({
  children,
  header,
  title,
  description,
  bottomComponent,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${
          title ? `${title} | ` : ""
        }Studentski Centar u Zagrebu`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sc-logo.svg" />
      </Head>
      <Navbar />
      <main className={poppins.className}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="!min-h-[calc(100vh-56px)]">
            {header}
            {children ? (
              <div
                className={`container md:max-w-[80%] mx-auto p-6 md:px-0 ${
                  !header ? "pt-[72px]" : ""
                }`}
              >
                {children}
              </div>
            ) : null}
            {bottomComponent}
          </div>
          <Footer />
        </motion.div>
      </main>
    </>
  );
};

export default Layout;
