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

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Redbird Counseling and Consulting | Trauma & Substance Use Therapy in Cincinnati';

  return {
    description:
      doc?.meta?.description ||
      'Trauma-informed therapy and substance use counseling for women, veterans, and first responders in Cincinnati. Specializing in PTSD, addiction recovery, and mental health support.',
    openGraph: mergeOpenGraph({
      description:
        doc?.meta?.description ||
        'Trauma-informed therapy and substance use counseling for women, veterans, and first responders in Cincinnati. Specializing in PTSD, addiction recovery, and mental health support.',
      images: ogImage
        ? [
            {
              url: ogImage
            }
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/'
    }),
    title
  };
};
