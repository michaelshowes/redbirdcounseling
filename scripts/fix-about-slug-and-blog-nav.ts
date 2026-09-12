/**
 * One-off follow-up to the September 2026 SEO pass.
 *
 *  1. The About page title carried a trailing space ("About "), which generated
 *     the slug `about-`. Corrects both. Pair with the `/about-` → `/about`
 *     redirect in next.config.ts, and run this BEFORE deploying it - otherwise
 *     the redirect points at a slug that does not exist yet.
 *  2. Adds the Blog entry to the main menu. /blog is a route rather than a Page,
 *     so it uses the menu item's Custom Label / Custom URL fields.
 *
 * Run against whichever database DATABASE_URL points at - check the host first:
 *   pnpm payload run scripts/fix-about-slug-and-blog-nav.ts
 *
 * Idempotent: values already correct are skipped.
 */
import config from '@payload-config';
import { getPayload } from 'payload';

const payload = await getPayload({ config });

// ------------------------------------------------------------- About page ---

const about = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'about-' } },
  draft: true,
  depth: 0,
  limit: 1
});

const aboutPage = about.docs[0];

if (!aboutPage) {
  console.log('About: no page with slug "about-" (already corrected?)');
} else {
  await payload.update({
    collection: 'pages',
    id: aboutPage.id,
    context: { disableRevalidate: true },
    data: {
      title: 'About',
      slug: 'about',
      // The slug is set explicitly, so keep it locked against regeneration.
      slugLock: true,
      // Explicit: never let this demote the live page to draft.
      _status: 'published'
    }
  });
  console.log(
    `About: ${JSON.stringify(aboutPage.title)} / "${aboutPage.slug}" → "About" / "about"`
  );
}

// --------------------------------------------------------------- Blog nav ---

const settings = await payload.findGlobal({ slug: 'settings', depth: 0 });
const menus = settings.menus?.menus ?? [];

let navChanged = false;

const nextMenus = menus.map((menu) => {
  const items = menu.menuItems ?? [];

  if (items.some((item) => item.customUrl === '/blog')) return menu;

  navChanged = true;

  return {
    ...menu,
    menuItems: [...items, { customLabel: 'Blog', customUrl: '/blog' }]
  };
});

if (navChanged) {
  await payload.updateGlobal({
    slug: 'settings',
    depth: 0,
    context: { disableRevalidate: true },
    data: { menus: { ...settings.menus, menus: nextMenus } }
  });
  console.log('Nav: added Blog → /blog');
} else {
  console.log('Nav: Blog entry already present');
}

console.log('\nDone.');
process.exit(0);
