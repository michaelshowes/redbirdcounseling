import { Field } from 'payload';

export const servicesHeroFields: Field[] = [
  {
    name: 'servicesHero',
    type: 'group',
    interfaceName: 'ServicesHero',
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
        name: 'richTextSubtext',
        label: 'Subtext',
        type: 'richText'
      }
    ]
  }
];
