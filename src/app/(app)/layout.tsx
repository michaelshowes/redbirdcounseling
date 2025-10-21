import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { Analytics } from '@vercel/analytics/next';

import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { sentient, sora } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '../../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.meetredbirdcounseling.com'),
  title: {
    default:
      'Redbird Counseling and Consulting | Trauma & Substance Use Therapy in Cincinnati',
    template: '%s | Redbird Counseling'
  },
  description:
    'Trauma-informed therapy and substance use counseling for women, veterans, and first responders in Cincinnati. Specializing in PTSD, addiction recovery, and mental health support.',
  keywords: [
    'trauma therapy Cincinnati',
    'substance use counseling',
    'PTSD therapy',
    'addiction recovery',
    'veteran counseling',
    'first responder therapy',
    "women's mental health",
    'LPCC-S Cincinnati'
  ],
  authors: [{ name: 'Nicole Michels, LPCC-S' }],
  creator: 'Redbird Counseling and Consulting',
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
  verification: {
    google: 'your-google-verification-code' // Replace with actual code
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: draft } = await draftMode();

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
