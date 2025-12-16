import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Set the base path to your repository name
  // Note: Do NOT add a trailing slash (e.g., "/my-repo", not "/my-repo/")
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
  images: {
    // GitHub Pages cannot optimize images on the fly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
