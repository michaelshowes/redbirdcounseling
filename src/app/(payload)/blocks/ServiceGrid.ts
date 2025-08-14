import { Block } from 'payload';

import { link } from '../fields/link';

export const ServiceGrid: Block = {
  slug: 'service-grid',
  interfaceName: 'ServiceGrid',
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
