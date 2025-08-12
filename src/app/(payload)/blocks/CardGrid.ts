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
      appearances: ['default', 'outline'],
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
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1
          }
        })
      ]
    }
  ]
};
