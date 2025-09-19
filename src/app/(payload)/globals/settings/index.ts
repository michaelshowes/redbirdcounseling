import { GlobalConfig } from 'payload';

import { footerSettings } from './footerSettings';
import { menuSettings } from './menuSettings';

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'menus',
          label: 'Menus',
          fields: menuSettings
        },
        {
          name: 'footer',
          label: 'Footer',
          fields: footerSettings
        }
      ]
    }
  ]
};
