import { MenuItems, Page } from '@/payload-types';

type MenuItem = NonNullable<MenuItems>[number];

/**
 * Resolves a menu item to its label and href.
 *
 * Menu items normally point at a Page, but some destinations are real routes
 * rather than CMS documents (`/blog`), so a custom URL wins over the Page
 * relationship when one is set.
 */
export const resolveMenuItem = (item: MenuItem) => {
  const page = item.page as Page | null | undefined;

  const label = item.customUrl
    ? item.customLabel || item.customUrl
    : item.customLabel || page?.title || '';

  const href = item.customUrl ?? (page?.slug ? `/${page.slug}` : '/');

  return { label, href };
};
