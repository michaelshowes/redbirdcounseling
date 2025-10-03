import { Block } from 'payload';

import { linkGroup } from '../fields/linkGroup';

export const CredentialsGrid: Block = {
  slug: 'credentials-grid',
  interfaceName: 'CredentialsGrid',
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
      name: 'description_old',
      type: 'textarea',
      admin: {
        rows: 3
      }
    },
    {
      name: 'description',
      type: 'richText'
    },
    linkGroup({
      overrides: {
        maxRows: 1
      }
    }),
    {
      name: 'credentials',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            rows: 3
          }
        },
        {
          name: 'source',
          type: 'text'
        },
        {
          name: 'year',
          type: 'text'
        }
      ]
    }
  ]
};
