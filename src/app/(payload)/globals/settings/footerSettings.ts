import { GlobalConfig } from 'payload';

import { stateList } from '@/app/constants/stateList';

import { link } from '../../fields/link';

export const footerSettings: GlobalConfig['fields'] = [
  {
    type: 'group',
    name: 'serviceLinks',
    label: '',
    fields: [
      {
        name: 'services',
        label: 'Service Links',
        type: 'array',
        admin: {
          components: {
            RowLabel: {
              path: '@/app/(payload)/components/ArrayRowLabel'
            }
          }
        },
        fields: [
          {
            type: 'relationship',
            name: 'service',
            label: 'Service',
            relationTo: 'services'
          }
        ]
      }
    ]
  },
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
            type: 'text'
          },
          {
            name: 'email',
            type: 'text',
            required: true
          }
        ]
      },
      {
        name: 'address',
        type: 'group',
        fields: [
          {
            name: 'street',
            type: 'text'
          },
          {
            type: 'row',
            fields: [
              {
                name: 'city',
                type: 'text'
              },
              {
                name: 'state',
                type: 'select',
                options: stateList
              },
              {
                name: 'zip',
                type: 'text'
              }
            ]
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
