import { Block } from 'payload';

import { linkGroup } from '../fields/linkGroup';

export const CardGrid: Block = {
  slug: 'card-grid',
  interfaceName: 'CardGrid',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'headline',
      type: 'text'
    },
    linkGroup({
      overrides: {
        maxRows: 1
      }
    }),
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        },
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'description',
          type: 'textarea'
        },
        linkGroup({
          overrides: {
            maxRows: 1
          }
        })
      ]
    }
  ]
};
