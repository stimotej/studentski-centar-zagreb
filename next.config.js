/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "161.53.174.14", "www.sczg.unizg.hr"],
  },
  i18n: {
    locales: ["hr", "en"],
    defaultLocale: "hr",
    // Croatian is the default locale, so existing URLs keep their exact shape
    // — only English gets an /en prefix. Detection is off on purpose: without
    // it, a visitor whose browser prefers English would be redirected away
    // from the Croatian site they asked for.
    localeDetection: false,
  },
};

module.exports = nextConfig;
