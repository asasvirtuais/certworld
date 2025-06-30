import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  transpilePackages: [
    '@asasvirtuais/crud',
    '@asasvirtuais/airtable',
    '@asasvirtuais/feathers',
    '@asasvirtuais/react',
    '@asasvirtuais/next',
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
