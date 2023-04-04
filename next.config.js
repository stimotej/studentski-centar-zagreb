/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/sczg",
  images: {
    domains: ["localhost", "161.53.174.14"],
  },
};

module.exports = nextConfig;
