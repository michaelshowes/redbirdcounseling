import type { Metadata } from 'next';

import { getSiteMetadata } from '@/db/queries/settings';

import type { Page, Service } from '../payload-types';
import { getOGImageURL } from './getOGImageURL';
import { mergeOpenGraph } from './mergeOpenGraph';

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Service> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const docImage = doc?.meta?.image;
  const hasDocImage =
    docImage && typeof docImage === 'object' && 'url' in docImage;

  // Per-page image wins; otherwise fall back to the site-wide Open Graph image
  // set in Settings → Metadata (which itself falls back to the static default).
  const siteMetadata = hasDocImage ? null : await getSiteMetadata();
  const ogImage = hasDocImage
    ? getOGImageURL(docImage)
    : getOGImageURL(siteMetadata?.openGraph?.image);

  // Enhanced title with local SEO focus
  const title = doc?.meta?.title
    ? `${doc?.meta?.title} | Denver Counseling`
    : 'Redbird Counseling | Denver Therapist & Counselor in Colorado';

  // Enhanced description with location keywords
  const description =
    doc?.meta?.description ||
    'Professional counselor and therapist in Denver, Colorado. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY.';

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: `${doc?.meta?.title || 'Redbird Counseling'} - Denver Therapist`
            }
          ]
        : undefined,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      type: 'website',
      siteName: 'Redbird Counseling - Denver Therapist',
      locale: 'en_US'
    }),
    alternates: {
      canonical: Array.isArray(doc?.slug)
        ? `https://www.meetredbirdcounseling.com/${doc?.slug.join('/')}`
        : 'https://www.meetredbirdcounseling.com'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined
    }
  };
};
