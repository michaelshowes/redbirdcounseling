import type { Metadata } from 'next';

import type { Config, Media, Page, Service } from '../payload-types';
import { getServerSideURL } from './getURL';
import { mergeOpenGraph } from './mergeOpenGraph';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + '/images/opengraph-image.png';

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Service> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);

  // Enhanced title with local SEO focus
  const title = doc?.meta?.title
    ? `${doc?.meta?.title} | Cincinnati Counseling`
    : 'Redbird Counseling | Cincinnati Therapist & Counselor in Ohio';

  // Enhanced description with location keywords
  const description =
    doc?.meta?.description ||
    'Professional counselor and therapist in Cincinnati, Ohio. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY.';

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
              alt: `${doc?.meta?.title || 'Redbird Counseling'} - Cincinnati Therapist`
            }
          ]
        : undefined,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      type: 'website',
      siteName: 'Redbird Counseling - Cincinnati Therapist',
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
