import { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  services: '/services'
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // The home page is served at the site root, not at `/home`. Route its preview
  // through the same `/next/preview` endpoint (so draft mode is enabled) but
  // redirect to `/`.
  const resolvedPath =
    collection === 'pages' && slug === 'home'
      ? '/'
      : `${collectionPrefixMap[collection]}/${slug}`;

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: resolvedPath,
    previewSecret: process.env.PREVIEW_SECRET || ''
  });

  const url = `/next/preview?${encodedParams.toString()}`;

  return url;
};
