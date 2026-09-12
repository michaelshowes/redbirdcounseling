import type { Metadata } from 'next';

import { BUSINESS_NAME } from '@/app/constants/business';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITE_NAME
} from '@/app/constants/metadataDefaults';

import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: DEFAULT_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}/images/opengraph-image.png`,
      alt: DEFAULT_SITE_NAME
    }
  ],
  siteName: BUSINESS_NAME,
  title: DEFAULT_SITE_NAME,
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
