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
        type: 'array',
        label: 'Menu Items',
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
