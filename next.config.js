/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
};

module.exports = nextConfig;
