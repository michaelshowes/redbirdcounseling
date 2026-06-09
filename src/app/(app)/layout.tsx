import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { Analytics } from '@vercel/analytics/next';

import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { sentient, sora } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import {
  StructuredData,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateProfessionalServiceSchema
} from '@/utils/structuredData';

import '../../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.meetredbirdcounseling.com'),
  title: {
    default: 'Redbird Counseling | Denver Therapist & Counselor in Colorado',
    template: '%s | Redbird Counseling Denver'
  },
  description:
    'Professional counselor and therapist in Denver, Colorado. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY. Call (513) 279-8949.',
  keywords: [
    // Primary local keywords
    'counselor Denver',
    'therapist Denver',
    'Denver counselor',
    'Denver therapist',
    'Denver counseling',
    'therapist in Denver Colorado',
    'counselor in Denver OH',
    'mental health counselor Denver',
    // Service-specific local keywords
    'trauma therapist Denver',
    'trauma therapy Denver',
    'PTSD therapist Denver',
    'PTSD therapy Denver',
    'substance use counselor Denver',
    'addiction counselor Denver',
    'addiction therapy Denver',
    'substance abuse counselor Denver',
    // Specialty local keywords
    'veteran counselor Denver',
    'veteran therapist Denver',
    'first responder therapist Denver',
    'women therapist Denver',
    'female therapist Denver',
    // Professional credentials
    'LPCC-S Denver',
    'licensed counselor Denver',
    'licensed therapist Denver Colorado',
    // Regional
    'therapist Colorado',
    'counselor Colorado',
    'therapist Kentucky',
    // Additional
    'mental health therapy Denver',
    'anxiety therapist Denver',
    'depression counselor Denver'
  ],
  authors: [{ name: 'Nicole Michels, LPCC-S' }],
  creator: 'Redbird Counseling and Consulting',
  publisher: 'Redbird Counseling and Consulting',
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
