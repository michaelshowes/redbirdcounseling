import { Block } from 'payload';

import { link } from '../fields/link';

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
    link()
  ]
};
