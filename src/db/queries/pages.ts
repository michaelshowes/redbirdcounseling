import { draftMode } from 'next/headers';

import { payload } from '..';

// export const getHomePage = async () => {
//   const { isEnabled: draft } = await draftMode();

//   const result = await payload.findGlobal({
//     slug: 'homepage',
//     draft,
//     overrideAccess: draft
//   });

//   return result || null;
// };

export const getPageBySlug = async (slug: string) => {
  const { isEnabled: draft } = await draftMode();

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug
      }
    }
  });

  return result.docs?.[0] || null;
};
