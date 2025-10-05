import { Field } from 'payload';

import { linkGroup } from '../linkGroup';

export const homeHeroFields: Field[] = [
  {
    name: 'homeHero',
    type: 'group',
    interfaceName: 'HomeHero',
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
        name: 'richTextSubtext',
        label: 'Subtext',
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
