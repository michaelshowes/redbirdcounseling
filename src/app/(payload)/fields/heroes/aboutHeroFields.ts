import { Field } from 'payload';

export const aboutHeroFields: Field[] = [
  {
    name: 'aboutHero',
    type: 'group',
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
      {
        name: 'secondaryImage',
        type: 'upload',
        relationTo: 'media',
        required: true
      }
    ]
  }
];
