import { Field } from 'payload';

import { linkGroup } from '../linkGroup';

export const homeHeroFields: Field[] = [
  {
    name: 'homeHero',
    type: 'group',
    admin: {
      condition: (data) => {
        if (data.template === 'home') {
          return true;
        } else {
          return false;
        }
      }
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true
      },
      {
        name: 'subtext',
        type: 'textarea'
      },
      {
        name: 'richTextSubtext',
        type: 'richText'
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true
      },
      linkGroup({
        overrides: { maxRows: 2 }
      })
    ]
  }
];
