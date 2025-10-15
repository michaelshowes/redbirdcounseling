import { GlobalConfig } from 'payload';

import { link } from '../../fields/link';

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
        interfaceName: 'MenuItems',
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
          },
          {
            type: 'checkbox',
            name: 'subpageOption',
            label: 'Subpages?',
            defaultValue: false,
            admin: {
              description:
                'Subpage links will be displayed in a dropdown under the parent menu link'
            }
          },
          {
            type: 'array',
            name: 'subpages',
            label: 'Subpages',
            interfaceName: 'Subpages',
            admin: {
              condition: (_, siblingData) => siblingData?.subpageOption
            },
            fields: [
              {
                type: 'relationship',
                name: 'subpage',
                label: 'Subpage',
                relationTo: ['pages', 'services']
              }
            ]
          }
        ]
      }
    ]
  },
  link({
    overrides: {
      interfaceName: 'MainMenuCTA',
      label: 'Main Menu CTA Link'
    }
  })
];
