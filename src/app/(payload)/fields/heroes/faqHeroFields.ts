import { Field } from 'payload';

export const faqHeroFields: Field[] = [
  {
    name: 'faqHero',
    label: 'FAQ Hero',
    type: 'group',
    interfaceName: 'FaqHero',
    admin: {
      condition: (data) => {
        if (data.template === 'faq') {
          return true;
        } else {
          return false;
        }
      }
    },
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true
      }
    ]
  }
];
