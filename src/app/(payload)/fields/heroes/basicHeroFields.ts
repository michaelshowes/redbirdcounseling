import { Field } from 'payload';

export const basicHeroFields: Field[] = [
  {
    name: 'basicHero',
    label: 'Basic Hero',
    type: 'group',
    interfaceName: 'BasicHero',
    admin: {
      condition: (data) => {
        if (data.template === 'basic') {
          return true;
        } else {
          return false;
        }
      }
    },
    fields: [
      {
        name: 'title',
        type: 'text'
      },
      {
        name: 'subtext',
        type: 'richText'
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media'
      }
    ]
  }
];
