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
import { FiftyFifty } from './app/(payload)/blocks/FiftyFifty';
import { InfoGrid } from './app/(payload)/blocks/InfoGrid';
import { MediaBlock } from './app/(payload)/blocks/MediaBlock';
import { RichText } from './app/(payload)/blocks/RichText';
import { Selection } from './app/(payload)/blocks/Selection';
import { ServiceGrid } from './app/(payload)/blocks/ServiceGrid';
import { Media } from './app/(payload)/collections/Media';
import { Pages } from './app/(payload)/collections/Pages';
import { Services } from './app/(payload)/collections/Services';
import { Users } from './app/(payload)/collections/Users';
import { Mail } from './app/(payload)/globals/mail';
import { Settings } from './app/(payload)/globals/settings';
import { plugins } from './app/(payload)/plugins';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Force `sslmode=verify-full` on the Postgres connection string.
 *
 * Neon ships its connection string with `sslmode=require`. In pg / pg-connection-string,
 * `require` is currently an alias for `verify-full`, but it will adopt weaker libpq
 * semantics (encrypt-only, no cert/hostname check) in pg v9. Pinning `verify-full` keeps
 * strong verification (Neon uses publicly-trusted certs) and silences the deprecation
 * warning. Applied in code so it survives the Neon–Vercel integration re-syncing the env vars.
 */
function withVerifyFull(connectionString: string): string {
  if (!connectionString) return connectionString;
  try {
    const url = new URL(connectionString);
    url.searchParams.set('sslmode', 'verify-full');
    return url.toString();
  } catch {
    return connectionString;
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    components: {
      graphics: {
        Logo: '@/app/(payload)/components/Logo',
        Icon: '@/app/(payload)/components/Icon'
      }
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
  globals: [Settings],
  blocks: [
    CTA,
    Selection,
    CardGrid,
    RichText,
    MediaBlock,
    CredentialsGrid,
    Accordion,
    InfoGrid,
    ServiceGrid,
    FiftyFifty
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: postgresAdapter({
    pool: {
      connectionString: withVerifyFull(process.env.DATABASE_URL || '')
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
