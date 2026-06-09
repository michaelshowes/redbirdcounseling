import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { Analytics } from '@vercel/analytics/next';

import {
  DEFAULT_AUTHOR,
  DEFAULT_CREATOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_PUBLISHER,
  DEFAULT_SITE_NAME,
  DEFAULT_TITLE_TEMPLATE
} from '@/app/constants/metadataDefaults';
import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { getSiteMetadata } from '@/db/queries/settings';
import { sentient, sora } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { getOGImageURL } from '@/utils/getOGImageURL';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import {
  StructuredData,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateProfessionalServiceSchema
} from '@/utils/structuredData';

import '../../globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getSiteMetadata();
  const { general, attribution, openGraph } = metadata ?? {};

  const siteName = general?.siteName || DEFAULT_SITE_NAME;
  const description = general?.description || DEFAULT_DESCRIPTION;
  const ogImage = getOGImageURL(openGraph?.image);

  return {
    metadataBase: new URL('https://www.meetredbirdcounseling.com'),
    title: {
      default: siteName,
      template: general?.titleTemplate || DEFAULT_TITLE_TEMPLATE
    },
    description,
    keywords: general?.keywords?.length ? general.keywords : DEFAULT_KEYWORDS,
    authors: [{ name: attribution?.author || DEFAULT_AUTHOR }],
    creator: attribution?.creator || DEFAULT_CREATOR,
    publisher: attribution?.publisher || DEFAULT_PUBLISHER,
    openGraph: mergeOpenGraph({
      title: siteName,
      description,
      images: [
        {
          url: ogImage,
          alt: siteName
        }
      ]
    }),
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: 'https://www.meetredbirdcounseling.com'
    },
    other: {
      'geo.region': 'US-OH',
      'geo.placename': 'Denver',
      'geo.position': '39.1431;-84.4280',
      ICBM: '39.1431, -84.4280'
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: draft } = await draftMode();

  // Generate structured data for local business SEO
  const localBusinessSchema = generateLocalBusinessSchema();
  const professionalServiceSchema = generateProfessionalServiceSchema();
  const faqSchema = generateFAQSchema();

  return (
    <html
      lang='en'
      className={`${sentient.variable} ${sora.variable} h-full`}
    >
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://vercel.live'
        />

        {/* Optimize viewport for mobile devices */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />

        {/* Theme color for mobile browsers */}
        <meta
          name='theme-color'
          content='#f4f4ec'
        />

        {/* Structured Data for Local SEO */}
        <StructuredData data={localBusinessSchema} />
        <StructuredData data={professionalServiceSchema} />
        <StructuredData data={await faqSchema} />
      </head>
      <body
        className={cn('relative h-full', {
          'pt-[66px] md:pt-[46px]': draft
        })}
      >
        <SiteHeader />
        <main>
          {children}
          <FooterCTA />
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
