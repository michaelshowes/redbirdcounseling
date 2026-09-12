/**
 * One-off: apply the September 2026 SEO/rebrand changes to CMS content.
 *
 * Code-side changes (geo tags, og:site_name, schema.org markup, hardcoded phone
 * numbers, redirects) ship in the repo. This script covers the values that live
 * in the database instead, which the code defaults cannot reach because a stored
 * CMS value always wins over them:
 *
 *   Settings → Metadata   site name, description, keyword list
 *   Settings → Footer     phone number, CTA headline
 *   Specialties           keyword-rich slugs (paired with the 301s in next.config.ts)
 *
 * The slug renames MUST land in the same window as the redirects in
 * next.config.ts. Renaming first leaves the old URLs 404ing until the deploy.
 *
 * Run against whichever database DATABASE_URL points at:
 *   pnpm payload run scripts/apply-2026-09-seo-update.ts
 *
 * Idempotent: values already correct are skipped, and a slug with no match is
 * reported and passed over rather than failing the run.
 */
import config from '@payload-config';
import { getPayload } from 'payload';

import { BUSINESS_PHONE_DISPLAY } from '../src/app/constants/business';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_SITE_NAME
} from '../src/app/constants/metadataDefaults';
import type { Page } from '../src/payload-types';

const payload = await getPayload({ config });

/** Old slug → new slug. Must match the 301s in next.config.ts exactly. */
const SLUG_RENAMES: Record<string, string> = {
  '-i-feel-so-overwhelmed': 'overwhelm-therapy',
  'hyper-independence': 'hyper-independence-therapy',
  'am-i-drinking-too-much': 'alcohol-stress-therapy',
  emdr: 'emdr-therapy'
};

const CTA_HEADLINE = 'Ready to stop carrying it all alone?';

/**
 * Home page "About Me" section. SectionHeader renders `headline` as the <h2>
 * and `title` as the small uppercase eyebrow above it, so the keyword-bearing
 * line belongs in `headline` - the eyebrow keeps reading "Hi there".
 */
const ABOUT_EYEBROW = 'Hi there';
const ABOUT_HEADLINE =
  'Meet Nicole Michels, LPC \u2014 Therapist for Hyper-Independent Moms in CO, OH & KY';

// ---------------------------------------------------------------- Settings --

const settings = await payload.findGlobal({ slug: 'settings', depth: 0 });

const nextMetadata = {
  ...settings.metadata,
  general: {
    ...settings.metadata?.general,
    siteName: DEFAULT_SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    keywords: [...DEFAULT_KEYWORDS]
  }
};

const nextFooter = {
  ...settings.footer,
  contact: {
    ...settings.footer?.contact,
    phone: BUSINESS_PHONE_DISPLAY
  },
  cta: {
    ...settings.footer?.cta,
    headline: CTA_HEADLINE
  }
};

await payload.updateGlobal({
  slug: 'settings',
  depth: 0,
  context: { disableRevalidate: true },
  data: { metadata: nextMetadata, footer: nextFooter }
});

console.log('Settings updated:');
console.log(`  site name   → ${DEFAULT_SITE_NAME}`);
console.log(`  description → ${DEFAULT_DESCRIPTION.slice(0, 60)}…`);
console.log(`  keywords    → ${DEFAULT_KEYWORDS.length} entries`);
console.log(`  phone       → ${BUSINESS_PHONE_DISPLAY}`);
console.log(`  CTA heading → ${CTA_HEADLINE}`);

// ------------------------------------------------------------- Specialties --

// Published state of every specialty (for never-published ones this is the draft).
const published = await payload.find({
  collection: 'services',
  limit: 200,
  draft: false,
  depth: 0
});

// Latest state including drafts; _status === 'draft' here means an unpublished
// draft is newer than the published version (or it was never published).
const drafts = await payload.find({
  collection: 'services',
  limit: 200,
  draft: true,
  depth: 0
});
const draftById = new Map(drafts.docs.map((d) => [d.id, d]));

const seen = new Set<string>();

for (const service of published.docs) {
  const target = service.slug ? SLUG_RENAMES[service.slug] : undefined;
  if (!target) continue;

  seen.add(service.slug as string);
  const draft = draftById.get(service.id);

  // Update the published record and re-publish, so the live site actually moves.
  if (service._status === 'published') {
    await payload.update({
      collection: 'services',
      id: service.id,
      context: { disableRevalidate: true },
      data: { slug: target, _status: 'published' }
    });
    console.log(`Published: "${service.slug}" → "${target}"`);
  }

  // Carry a newer unpublished draft along so an editor's WIP is not stranded on
  // the old slug (and never demote the published version to draft).
  if (draft && draft._status === 'draft') {
    await payload.update({
      collection: 'services',
      id: draft.id,
      draft: true,
      context: { disableRevalidate: true },
      data: { slug: target, _status: 'draft' }
    });
    console.log(`Draft:     "${draft.slug}" → "${target}"`);
  }
}

// ------------------------------------------------------------- Home page ---

type HomeBlocks = NonNullable<NonNullable<Page['content']>['content']>;

/** Rewrites the About Me CTA block's headline, leaving every other block alone. */
const withNewHeadline = (blocks: HomeBlocks): HomeBlocks | null => {
  let changed = false;

  const next = blocks.map((block) => {
    if (
      block.blockType === 'cta' &&
      block.title === ABOUT_EYEBROW &&
      block.headline !== ABOUT_HEADLINE
    ) {
      changed = true;
      return { ...block, headline: ABOUT_HEADLINE };
    }

    return block;
  });

  return changed ? next : null;
};

const homeResults = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  draft: true,
  depth: 0,
  limit: 1
});

const home = homeResults.docs[0];
const homeBlocks = home?.content?.content;

if (home && Array.isArray(homeBlocks)) {
  const nextBlocks = withNewHeadline(homeBlocks);

  if (nextBlocks) {
    await payload.update({
      collection: 'pages',
      id: home.id,
      context: { disableRevalidate: true },
      data: {
        content: { ...home.content, content: nextBlocks },
        // Explicit: never let this demote the live page to draft.
        _status: 'published'
      }
    });
    console.log(`\nHome "About Me" headline → ${ABOUT_HEADLINE}`);
  } else {
    console.log(
      `\nHome "About Me" headline already set, or no cta block titled "${ABOUT_EYEBROW}" in this database.`
    );
  }
}

const missing = Object.keys(SLUG_RENAMES).filter((slug) => !seen.has(slug));
if (missing.length) {
  console.log(
    `\nNo specialty found for: ${missing.join(', ')} (already renamed, or not in this database)`
  );
}

console.log('\nDone.');
process.exit(0);
