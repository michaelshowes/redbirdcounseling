import { Field } from 'payload';

export const servicesHeroFields: Field[] = [
  {
    name: 'servicesHero',
    type: 'group',
    admin: {
      condition: (data) => {
        if (data.template === 'services') {
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
      }
    ]
  }
];
