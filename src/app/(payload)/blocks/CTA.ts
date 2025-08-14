import { Block } from 'payload';

import { link } from '../fields/link';

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTA',
  labels: {
    singular: 'CTA',
    plural: 'CTAs'
  },
  imageURL: '/images/block-thumbnails/cta.png',
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
