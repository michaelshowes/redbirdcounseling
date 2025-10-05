import { Field } from 'payload';

export const contactHeroFields: Field[] = [
  {
    name: 'contactHero',
    type: 'group',
    interfaceName: 'ContactHero',
    admin: {
      condition: (data) => {
        if (data.template === 'contact') {
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
      }
    ]
  }
];
