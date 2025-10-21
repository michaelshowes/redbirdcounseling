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
    default: 'Redbird Counseling | Cincinnati Therapist & Counselor in Ohio',
    template: '%s | Redbird Counseling Cincinnati'
  },
  description:
    'Professional counselor and therapist in Cincinnati, Ohio. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY. Call (513) 279-8949.',
  keywords: [
    // Primary local keywords
    'counselor Cincinnati',
    'therapist Cincinnati',
    'Cincinnati counselor',
    'Cincinnati therapist',
    'Cincinnati counseling',
    'therapist in Cincinnati Ohio',
    'counselor in Cincinnati OH',
    'mental health counselor Cincinnati',
    // Service-specific local keywords
    'trauma therapist Cincinnati',
    'trauma therapy Cincinnati',
    'PTSD therapist Cincinnati',
    'PTSD therapy Cincinnati',
    'substance use counselor Cincinnati',
    'addiction counselor Cincinnati',
    'addiction therapy Cincinnati',
    'substance abuse counselor Cincinnati',
    // Specialty local keywords
    'veteran counselor Cincinnati',
    'veteran therapist Cincinnati',
    'first responder therapist Cincinnati',
    'women therapist Cincinnati',
    'female therapist Cincinnati',
    // Professional credentials
    'LPCC-S Cincinnati',
    'licensed counselor Cincinnati',
    'licensed therapist Cincinnati Ohio',
    // Regional
    'therapist Ohio',
    'counselor Ohio',
    'therapist Kentucky',
    // Additional
    'mental health therapy Cincinnati',
    'anxiety therapist Cincinnati',
    'depression counselor Cincinnati'
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
    'geo.placename': 'Cincinnati',
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
