/**
 * DEV ONLY: creates eight published posts with placeholder copy so the /blog
 * listing, the featured card and pagination can be exercised with real data.
 *
 * Never run this against production - it publishes fabricated articles to the
 * live site. `pnpm payload run` reads whatever `.env` currently points at, which
 * is NOT guaranteed to be the dev database - check the host before running.
 *
 * Idempotent: a post whose slug already exists is skipped.
 */
import config from '@payload-config';
import { getPayload } from 'payload';

const payload = await getPayload({ config });

const body = (text: string) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text,
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
            version: 1
          }
        ]
      }
    ]
  }
});

const TITLES = [
  'When rest feels like failing',
  'The mental load nobody sees',
  'Why asking for help feels unsafe',
  'The 5pm glass of wine, examined',
  'You are not actually behind',
  'What overfunctioning costs you',
  'Small boundaries that hold',
  'Being the strong one is lonely'
];

const media = await payload.find({ collection: 'media', limit: 1, depth: 0 });
const imageId = media.docs[0].id;

for (const [i, title] of TITLES.entries()) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true
  });

  if (existing.docs.length) {
    console.log(`skip (exists): ${slug}`);
    continue;
  }

  await payload.create({
    collection: 'posts',
    context: { disableRevalidate: true },
    data: {
      title,
      slug,
      excerpt: `A short seed excerpt for "${title}" used to check the listing, the featured card and pagination.`,
      image: imageId,
      // Descending dates so ordering is unambiguous.
      publishedAt: new Date(Date.UTC(2026, 8, 20 - i)).toISOString(),
      content: { body: body(`Seed body copy for "${title}".`) },
      _status: 'published'
    }
  });

  console.log(`created: ${slug}`);
}

console.log('Done.');
process.exit(0);
