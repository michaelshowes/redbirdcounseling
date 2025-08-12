import { Block } from 'payload';

import { linkGroup } from '../fields/linkGroup';

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTA',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'headline',
      type: 'text',
      required: true
    },
    {
      name: 'text',
      type: 'textarea'
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1
      }
    })
  ]
};
