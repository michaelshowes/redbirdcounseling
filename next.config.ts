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
      // Specialty slugs were rewritten to be keyword-rich (2026-09). These must
      // stay in place permanently - they are the only thing preserving the
      // search ranking the old URLs earned.
      //
      // NOTE: these run before the generic /services/:slug rule below, so an old
      // /services/emdr link resolves in two hops (→ /specialties/emdr →
      // /specialties/emdr-therapy). Acceptable for links that were already
      // legacy; not worth eight rules to save one hop.
      {
        // Leading hyphen was a slug-generation bug, not an intentional URL.
        source: '/specialties/-i-feel-so-overwhelmed',
        destination: '/specialties/overwhelm-therapy',
        permanent: true
      },
      {
        source: '/specialties/hyper-independence',
        destination: '/specialties/hyper-independence-therapy',
        permanent: true
      },
      {
        source: '/specialties/am-i-drinking-too-much',
        destination: '/specialties/alcohol-stress-therapy',
        permanent: true
      },
      {
        source: '/specialties/emdr',
        destination: '/specialties/emdr-therapy',
        permanent: true
      },
      {
        // The About page title carried a trailing space, which generated the
        // slug `about-`. Title and slug are corrected; this preserves the URL
        // that was live in the meantime.
        source: '/about-',
        destination: '/about',
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
