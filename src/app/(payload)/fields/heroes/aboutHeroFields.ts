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
        required: true,
        admin: {
          disableListColumn: true
        }
      },
      {
        name: 'richTextSubtext',
        label: 'Subtext',
        type: 'richText',
        admin: {
          disableListColumn: true
        }
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: {
          disableListColumn: true
        }
      },
      {
        name: 'secondaryImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: {
          disableListColumn: true
        }
      }
    ]
  }
];
