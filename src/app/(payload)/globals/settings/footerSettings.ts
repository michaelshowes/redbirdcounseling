import { GlobalConfig } from 'payload';

import { link } from '../../fields/link';

export const footerSettings: GlobalConfig['fields'] = [
  {
    type: 'group',
    name: 'contact',
    label: 'Contact',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'phone',
            type: 'text',
            required: true
          },
          {
            name: 'email',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },
  {
    type: 'group',
    name: 'cta',
    label: 'CTA',
    fields: [
      {
        name: 'eyebrow',
        type: 'text'
      },
      {
        name: 'headline',
        type: 'text',
        required: true
      },
      link()
    ]
  }
];
