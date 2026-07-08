import { GlobalConfig } from 'payload';

export const serviceSettings: GlobalConfig['fields'] = [
  {
    type: 'group',
    name: 'servicesOrder',
    label: 'Specialties Order',
    admin: {
      description: 'Set the order of the specialties as shown across the site.'
    },
    fields: [
      {
        name: 'services',
        label: 'Specialties',
        type: 'array',
        fields: [
          {
            type: 'relationship',
            name: 'service',
            label: 'Specialty',
            relationTo: 'services'
          }
        ]
      }
    ]
  }
];
