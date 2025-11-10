import { GlobalConfig } from 'payload';

import { contactFormSettings } from './contactFormSettings';
import { inbox } from './inbox';

export const Mail: GlobalConfig = {
  slug: 'mail',
  admin: {
    group: 'Global',
    components: {
      views: {
        edit: {
          default: {
            Component: '@/app/(payload)/globals/mail/components/InboxComponent'
          }
        }
      }
    }
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'inbox',
          label: 'Inbox',
          fields: inbox
        },
        {
          name: 'contactForm',
          label: 'Contact Form',
          fields: contactFormSettings
        }
      ]
    }
  ]
};
