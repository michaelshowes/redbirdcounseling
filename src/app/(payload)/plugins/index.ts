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

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL
  }),
  vercelBlobStorage({
    enabled: true,
    collections: { media: true },
    clientUploads: true,
    token: process.env.BLOB_READ_WRITE_TOKEN
  })
];
