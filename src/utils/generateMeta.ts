import type { Metadata } from 'next';

import {
  BUSINESS_ALTERNATE_NAME,
  BUSINESS_NAME,
  BUSINESS_URL
} from '@/app/constants/business';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITE_NAME
} from '@/app/constants/metadataDefaults';
import { getSiteMetadata } from '@/db/queries/settings';

import type { Page, Post, Service } from '../payload-types';
import { getOGImageURL } from './getOGImageURL';
import { mergeOpenGraph } from './mergeOpenGraph';

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Service> | null;
  /**
   * Site-relative path this document is served at (`/`, `/about`,
   * `/specialties/emdr-therapy`, `/blog/my-post`).
   *
   * Passed in rather than derived: the same `slug` lives at a different URL
   * depending on its collection, and a canonical that guesses wrong is worse
   * than none. This previously tested `Array.isArray(doc.slug)` - always false
   * for a string slug - so every page on the site canonicalised to the home
   * page, telling search engines each one was a duplicate of `/`.
   */
  path: string;
}): Promise<Metadata> => {
  const { doc, path } = args;

  const docImage = doc?.meta?.image;
  const hasDocImage =
    docImage && typeof docImage === 'object' && 'url' in docImage;

  // Per-page image wins; otherwise fall back to the site-wide Open Graph image
  // set in Settings → Metadata (which itself falls back to the static default).
  const siteMetadata = hasDocImage ? null : await getSiteMetadata();
  const ogImage = hasDocImage
    ? getOGImageURL(docImage)
    : getOGImageURL(siteMetadata?.openGraph?.image);

  // The SEO title written in the CMS is used verbatim - it already carries the
  // brand - so it is marked `absolute` to opt out of the root layout's
  // `%s | Redbird Counseling` template. Without a CMS title, fall back to the
  // document's own title plus the brand; only a doc with no title at all falls
  // all the way back to the site default.
  const title =
    doc?.meta?.title ||
    (doc?.title
      ? `${doc.title} | ${BUSINESS_ALTERNATE_NAME}`
      : DEFAULT_SITE_NAME);

  const description = doc?.meta?.description || DEFAULT_DESCRIPTION;

  const canonical = `${BUSINESS_URL}${path === '/' ? '' : path}`;

  return {
    title: { absolute: title },
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
      url: canonical,
      type: 'website',
      siteName: BUSINESS_NAME,
      locale: 'en_US'
    }),
    alternates: {
      canonical
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined
    }
  };
};
