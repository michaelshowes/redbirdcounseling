import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { sentient, sora } from '@/lib/fonts';
import { cn } from '@/lib/utils';

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
      <body
        className={cn('h-full', {
          'pt-[66px] md:pt-[46px]': draft
        })}
      >
        <SiteHeader />
        {children}
        <FooterCTA />
        <SiteFooter />
      </body>
    </html>
  );
}
