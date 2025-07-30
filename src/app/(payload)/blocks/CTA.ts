import { Block } from 'payload';

import { linkGroup } from '../fields/linkGroup';

export const CTA: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'headline',
      type: 'text'
    },
    {
      name: 'text',
      type: 'text'
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1
      }
    })
  ]
};
