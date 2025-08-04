import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  transpilePackages: [
    '@asasvirtuais/crud',
    '@asasvirtuais/crud/src/react',
    '@asasvirtuais/crud/src/next',
    '@asasvirtuais/crud/src/airtable',
    '@asasvirtuais/react',
    '@asasvirtuais/airtable'
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
