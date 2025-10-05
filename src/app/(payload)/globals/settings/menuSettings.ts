import { GlobalConfig } from 'payload';

export const menuSettings: GlobalConfig['fields'] = [
  {
    type: 'array',
    name: 'menus',
    label: 'Menus',
    fields: [
      {
        type: 'text',
        name: 'menuName',
        label: 'Menu Name'
      },
      {
        name: 'menuItems',
        label: 'Menu Items',
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
            name: 'page',
            label: 'Page',
            relationTo: 'pages'
          }
        ]
      }
    ]
  }
];
