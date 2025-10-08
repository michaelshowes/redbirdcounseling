import { Block } from 'payload';

import { link } from '../fields/link';

export const ServiceGrid: Block = {
  slug: 'service-grid',
  interfaceName: 'ServiceGrid',
  imageURL: '/images/block-thumbnails/service-grid.png',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'headline',
      type: 'text'
    },
    link()
  ]
};
