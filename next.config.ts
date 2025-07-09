import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  transpilePackages: [
    '@asasvirtuais/crud',
    '@asasvirtuais/crud/react',
    '@asasvirtuais/crud/next',
    '@asasvirtuais/crud/airtable'
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
