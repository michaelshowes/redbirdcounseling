import { seoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Plugin } from 'payload';

import { Page } from '@/payload-types';
import { getServerSideURL } from '@/utils/getURL';

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Redbird Counseling`
    : 'Redbird Counseling';
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

// Local development writes to its own Blob store. Dev and production run against
// separate databases but previously shared one store, so deleting a media item in
// the dev admin removed a file production was still serving. Gated on NODE_ENV so
// a stray DEV_READ_WRITE_TOKEN can never redirect a production build; builds and
// deployments (including staging) always use BLOB_READ_WRITE_TOKEN.
const blobToken =
  process.env.NODE_ENV === 'production'
    ? process.env.BLOB_READ_WRITE_TOKEN
    : (process.env.DEV_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN);

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL
  }),
  vercelBlobStorage({
    enabled: true,
    collections: { media: true },
    clientUploads: true,
    token: blobToken
  })
];
