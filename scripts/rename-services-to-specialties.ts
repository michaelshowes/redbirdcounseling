/**
 * One-off: rename the "Services" section to "Specialties" in CMS content.
 *
 * For every page this script:
 *  - renames the listing page: slug `services` → `specialties`, title → "Specialties",
 *    and swaps the word Services/services in its hero title and SEO meta title
 *  - swaps the standalone word "Services" in `service-grid` block titles and
 *    `service-grid`/`cta` block link labels (e.g. "See All Services" →
 *    "See All Specialties"); rich-text prose is deliberately left untouched
 *
 * Draft-aware: published content is updated and re-published, and if a page has a
 * newer unpublished draft, the draft is transformed and re-saved as a draft — the
 * published site never regresses to draft content and editors keep their WIP.
 *
 * Run against whichever database DATABASE_URL points at:
 *   pnpm payload run scripts/rename-services-to-specialties.ts
 *
 * Idempotent: pages that need no change are skipped.
 */
import config from '@payload-config';
import type { Page } from '@/payload-types';
import { getPayload } from 'payload';

const payload = await getPayload({ config });

const swapWord = (value: unknown) =>
  typeof value === 'string'
    ? value.replace(/\bServices\b/g, 'Specialties').replace(/\bservices\b/g, 'specialties')
    : value;

/** Returns transformed page data, or null if nothing changed. */
const transformPage = (page: Page): Partial<Page> | null => {
  let changed = false;
  const data: Record<string, unknown> = {};

  if (page.slug === 'services') {
    changed = true;
    data.slug = 'specialties';
    data.title = 'Specialties';

    const heroTitle = swapWord(page.hero?.servicesHero?.title);
    if (typeof heroTitle === 'string' && heroTitle !== page.hero?.servicesHero?.title) {
      data.hero = {
        ...page.hero,
        servicesHero: { ...page.hero?.servicesHero, title: heroTitle }
      };
    }

    const metaTitle = swapWord(page.meta?.title);
    if (typeof metaTitle === 'string' && metaTitle !== page.meta?.title) {
      data.meta = { ...page.meta, title: metaTitle };
    }
  }

  const blocks = page.content?.content;
  if (Array.isArray(blocks)) {
    let blocksChanged = false;
    const nextBlocks = blocks.map((block) => {
      if (block.blockType === 'service-grid') {
        const title = swapWord(block.title);
        const label = swapWord(block.link?.label);
        if (title !== block.title || label !== block.link?.label) {
          blocksChanged = true;
          return {
            ...block,
            title,
            link: block.link ? { ...block.link, label } : block.link
          };
        }
      }
      if (block.blockType === 'cta') {
        const label = swapWord(block.link?.label);
        if (label !== block.link?.label) {
          blocksChanged = true;
          return { ...block, link: { ...block.link, label } };
        }
      }
      return block;
    });

    if (blocksChanged) {
      changed = true;
      data.content = { ...page.content, content: nextBlocks };
    }
  }

  return changed ? data : null;
};

// Published state of every page (for never-published pages this is the draft).
const publishedPages = await payload.find({
  collection: 'pages',
  limit: 200,
  draft: false,
  depth: 0
});

// Latest state including drafts; _status === 'draft' here means an unpublished
// draft is newer than the published version (or the page was never published).
const draftPages = await payload.find({
  collection: 'pages',
  limit: 200,
  draft: true,
  depth: 0
});
const draftById = new Map(draftPages.docs.map((d) => [d.id, d]));

for (const page of publishedPages.docs) {
  const draft = draftById.get(page.id);
  const hasNewerDraft = draft?._status === 'draft';

  // 1. Update the published content (publish it again so the live site changes).
  if (page._status === 'published') {
    const data = transformPage(page);
    if (data) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        context: { disableRevalidate: true },
        data: { ...data, _status: 'published' }
      });
      console.log(`Published update: page ${page.id} ("${page.slug}") → ${Object.keys(data).join(', ')}`);
    }
  }

  // 2. If a newer draft exists, transform it too and re-save it as the latest
  //    draft (after the publish above, so editors keep their WIP on top).
  if (draft && hasNewerDraft) {
    const data = transformPage(draft);
    if (data) {
      await payload.update({
        collection: 'pages',
        id: draft.id,
        draft: true,
        context: { disableRevalidate: true },
        data: { ...data, _status: 'draft' }
      });
      console.log(`Draft update: page ${draft.id} ("${draft.slug}") → ${Object.keys(data).join(', ')}`);
    }
  }
}

console.log('Done.');
process.exit(0);
