import { draftMode } from 'next/headers';

import { payload } from '..';

export async function getServices() {
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    depth: 1
  });

  return result.docs || [];
}

export const getServiceBySlug = async (slug: string) => {
  const { isEnabled: draft } = await draftMode();

  const result = await payload.find({
    collection: 'services',
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
