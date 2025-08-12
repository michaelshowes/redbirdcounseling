// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Accordion } from './app/(payload)/blocks/Accordion';
import { CTA } from './app/(payload)/blocks/CTA';
import { CardGrid } from './app/(payload)/blocks/CardGrid';
import { CredentialsGrid } from './app/(payload)/blocks/CredentialsGrid';
import { MediaBlock } from './app/(payload)/blocks/MediaBlock';
import { RichText } from './app/(payload)/blocks/RichText';
import { Selection } from './app/(payload)/blocks/Selection';
import { Media } from './app/(payload)/collections/Media';
import { Pages } from './app/(payload)/collections/Pages';
import { Services } from './app/(payload)/collections/Services';
import { Users } from './app/(payload)/collections/Users';
import { plugins } from './app/(payload)/plugins';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900
        }
      ]
    }
  },
  collections: [Pages, Services, Media, Users],
  blocks: [
    CTA,
    Selection,
    CardGrid,
    RichText,
    MediaBlock,
    CredentialsGrid,
    Accordion
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || ''
    }
  }),
  sharp,
  plugins: [...plugins]
  // onInit: async (payload) => {
  //   await payload.update({
  //     collection: 'pages',
  //     where: {},
  //     data: { _status: 'published' }
  //   });
  // }
});
