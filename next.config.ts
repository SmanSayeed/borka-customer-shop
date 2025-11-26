import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'borka.metroboys.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
