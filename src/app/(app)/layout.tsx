import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { sentient, sora } from '@/lib/fonts';

import '../../globals.css';

export const metadata: Metadata = {
  title: 'Redbird Counseling and Consulting',
  description: 'Redbird Counseling and Consulting'
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
      <body className={'h-full'}>
        {draft && (
          <div
            className={
              'fixed top-0 left-0 z-50 w-full bg-neutral-800/90 p-2 text-center text-neutral-100 backdrop-blur-xs'
            }
          >
            Draft Mode
          </div>
        )}
        <SiteHeader />
        {children}
        <FooterCTA />
        <SiteFooter />
      </body>
    </html>
  );
}
