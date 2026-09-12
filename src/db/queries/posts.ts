import { draftMode } from 'next/headers';

import { payload } from '..';

/** Posts shown in the listing grid, per page. The newest post sits above the
 * grid as the featured article and is excluded from it. */
export const POSTS_PER_PAGE = 6;

export const getPostBySlug = async (slug: string) => {
  const { isEnabled: draft } = await draftMode();

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug
      }
    },
    overrideAccess: draft,
    draft,
    depth: 2
  });

  return result.docs?.[0] || null;
};

/** Every published post, newest first. Used by the sitemap. */
export async function getPublishedPosts() {
  const result = await payload.find({
    collection: 'posts',
    pagination: false,
    depth: 0,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published'
      }
    }
  });

  return result.docs || [];
}

/** The newest published post, rendered as the featured article on /blog. */
export async function getFeaturedPost() {
  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    depth: 1,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published'
      }
    }
  });

  return result.docs?.[0] || null;
}

/**
 * One page of the listing grid.
 *
 * The featured post is excluded by id rather than by offsetting the whole list,
 * so page boundaries stay stable and page 2 does not repeat the last card of
 * page 1.
 */
export async function getPagedPosts({
  page,
  excludeId
}: {
  page: number;
  excludeId?: number;
}) {
  return payload.find({
    collection: 'posts',
    limit: POSTS_PER_PAGE,
    page,
    depth: 1,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
      ...(excludeId ? { id: { not_equals: excludeId } } : {})
    }
  });
}
