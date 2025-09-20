import { draftMode } from 'next/headers';

import { payload } from '..';

export const getPageBySlug = async (slug: string) => {
  const { isEnabled: draft } = await draftMode();

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: slug
      }
    },
    overrideAccess: draft,
    draft,
    depth: 1
  });

  return result.docs?.[0] || null;
};
