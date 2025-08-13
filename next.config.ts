import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  transpilePackages: [
    '@asasvirtuais/crud',
    '@asasvirtuais/crud/react',
    '@asasvirtuais/crud/next',
    '@asasvirtuais/crud/airtable',
    '@asasvirtuais/react',
    '@asasvirtuais/airtable'
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'ominous-space-lamp-7rj6xr64gpj3p679.github.dev',
        'ominous-space-lamp-7rj6xr64gpj3p679-3000.app.github.dev',
        '*.app.github.dev'
      ],
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
};

export default nextConfig;
