import type { Metadata } from 'next';

import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Professional counselor and therapist in Cincinnati, Ohio. Trauma-informed therapy, substance use counseling, PTSD treatment, and addiction recovery for women, veterans, and first responders. Licensed in OH & KY.',
  images: [
    {
      url: `${getServerSideURL()}/images/opengraph-image.png`,
      alt: 'Redbird Counseling - Cincinnati Therapist & Counselor'
    }
  ],
  siteName: 'Redbird Counseling - Cincinnati Therapist',
  title: 'Redbird Counseling | Cincinnati Therapist & Counselor in Ohio',
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
