import { Field } from 'payload';

export const aboutHeroFields: Field[] = [
  {
    name: 'aboutHero',
    type: 'group',
    interfaceName: 'AboutHero',
    admin: {
      condition: (data) => {
        if (data.template === 'about') {
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
      {
        name: 'secondaryImage',
        type: 'upload',
        relationTo: 'media',
        required: true
      }
    ]
  }
];
