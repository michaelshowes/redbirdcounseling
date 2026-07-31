import type { NextConfig } from 'next';

import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000 // 1 year
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // The "Services" section was renamed to "Specialties"; preserve old URLs.
    // The Specialties landing page was since removed - individual specialty
    // pages remain, so only the index URLs fall back to the home page.
    return [
      {
        source: '/services',
        destination: '/',
        permanent: true
      },
      {
        source: '/specialties',
        destination: '/',
        permanent: true
      },
      {
        source: '/services/:slug',
        destination: '/specialties/:slug',
        permanent: true
      }
    ];
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'lucide-react',
      'react-icons'
    ]
  }
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false
});
