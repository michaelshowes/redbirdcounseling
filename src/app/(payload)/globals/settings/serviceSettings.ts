import { GlobalConfig } from 'payload';

export const serviceSettings: GlobalConfig['fields'] = [
  {
    type: 'group',
    name: 'servicesOrder',
    label: 'Services Order',
    admin: {
      description: 'Set the order of the services as shown across the site.'
    },
    fields: [
      {
        name: 'services',
        label: 'Services',
        type: 'array',
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
  }
];
