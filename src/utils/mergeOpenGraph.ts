import type { Metadata } from 'next';

import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Trauma-informed therapy and substance use counseling for women, veterans, and first responders in Cincinnati. Specializing in PTSD, addiction recovery, and mental health support.',
  images: [
    {
      url: `${getServerSideURL()}/images/opengraph-image.png`
    }
  ],
  siteName: 'Redbird Counseling and Consulting',
  title:
    'Redbird Counseling and Consulting | Trauma & Substance Use Therapy in Cincinnati'
};

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images
  };
};
