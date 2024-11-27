/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",

    domains: ["localhost", "161.53.174.14", "www.sczg.unizg.hr"],
  },
};

module.exports = nextConfig;
