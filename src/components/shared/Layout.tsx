import React from "react";
import { Roboto } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/shared/Navbar";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useUI } from "@/utils/ui";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE, LOCALES, isEnglish } from "@/utils/i18n";

const poppins = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

/**
 * Absolute origin for hreflang and canonical, which must not be relative.
 *
 * The Croatian site is the default locale and keeps the bare path; English
 * lives under /en. Without these tags a search engine has no way to know the
 * two are the same page in different languages, and treats them as duplicates.
 */
const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sczg.unizg.hr"
).replace(/\/$/, "");

/** `asPath` carries the query string and never the locale prefix. */
const localeHref = (locale: string, asPath: string) => {
  const path = asPath.split(/[?#]/)[0];
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${SITE_ORIGIN}${prefix}${clean}` || `${SITE_ORIGIN}/`;
};

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
  const ui = useUI();
  const { asPath, locale } = useRouter();
  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ""}${ui("org.name")}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sc-logo.svg" />
        <link
          rel="canonical"
          href={localeHref(locale ?? DEFAULT_LOCALE, asPath)}
        />
        {LOCALES.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={localeHref(code, asPath)}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={localeHref(DEFAULT_LOCALE, asPath)}
        />
        {/*
          TEMPORARY — remove when the language selector ships.

          The English pages are complete but nobody has reviewed the
          translations yet, and the site has no way to switch language, so the
          only visitors who should reach /en are staff typing the URL. The
          hreflang tags above would otherwise invite Google to index and
          surface unreviewed English in search results.

          Deleting these three lines is all that is needed. See CLAUDE.md.
        */}
        {isEnglish(locale) && <meta name="robots" content="noindex, follow" />}
      </Head>
      <Navbar />
      <main className={poppins.className}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="!min-h-[calc(100vh-56px)] max-w-screen-2xl mx-auto">
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
