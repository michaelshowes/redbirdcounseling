import type { Config, Media } from '@/payload-types';

import { getServerSideURL } from './getURL';

// Static fallback shipped in /public, used when no editable image is set.
const STATIC_OG_FALLBACK = '/images/opengraph-image.png';

/**
 * Resolves an absolute Open Graph image URL from a Media upload, preferring the
 * 1200×630 `og` size when available. Falls back to the static default image.
 */
export const getOGImageURL = (
  image?: Media | Config['db']['defaultIDType'] | null
): string => {
  const serverUrl = getServerSideURL();

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url;

    return ogUrl ? serverUrl + ogUrl : serverUrl + (image.url ?? '');
  }

  return serverUrl + STATIC_OG_FALLBACK;
};
