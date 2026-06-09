import type { Metadata } from 'next';

import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Professional counselor and therapist in Denver, Colorado. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY.',
  images: [
    {
      url: `${getServerSideURL()}/images/opengraph-image.png`,
      alt: 'Redbird Counseling - Denver Therapist & Counselor'
    }
  ],
  siteName: 'Redbird Counseling - Denver Therapist',
  title: 'Redbird Counseling | Denver Therapist & Counselor in Colorado',
  locale: 'en_US'
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
