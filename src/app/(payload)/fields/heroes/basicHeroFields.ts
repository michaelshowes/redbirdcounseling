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
        type: 'text',
        admin: {
          disableListColumn: true
        }
      },
      {
        name: 'subtext',
        type: 'richText',
        admin: {
          disableListColumn: true
        }
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          disableListColumn: true
        }
      }
    ]
  }
];
