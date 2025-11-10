import { GlobalConfig } from 'payload';

import { contactFormSettings } from '../mail/contactFormSettings';
import { footerSettings } from './footerSettings';
import { menuSettings } from './menuSettings';
import { serviceSettings } from './serviceSettings';

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Global'
  },
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
        },
        {
          name: 'contactForm',
          label: 'Contact Form',
          fields: contactFormSettings
        },
        {
          name: 'services',
          label: 'Services',
          fields: serviceSettings
        }
      ]
    }
  ]
};
