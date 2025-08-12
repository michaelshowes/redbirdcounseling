import type { Metadata } from 'next';

import FooterCTA from '@/components/global/FooterCTA';
import SiteFooter from '@/components/global/SiteFooter';
import SiteHeader from '@/components/global/SiteHeader';
import { sentient, sora } from '@/lib/fonts';

import '../../globals.css';

export const metadata: Metadata = {
  title: 'Redbird Counseling and Consulting',
  description: 'Redbird Counseling and Consulting'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${sentient.variable} ${sora.variable} h-full`}
    >
      <body className={'h-full'}>
        <SiteHeader />
        {children}
        <FooterCTA />
        <SiteFooter />
      </body>
    </html>
  );
}
