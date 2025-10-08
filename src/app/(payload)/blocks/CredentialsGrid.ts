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
      name: 'richTextDescription',
      label: 'Description',
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
          name: 'richTextDescription',
          type: 'richText'
        }
      ]
    }
  ]
};
