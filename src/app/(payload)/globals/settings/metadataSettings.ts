import { GlobalConfig } from 'payload';

import {
  DEFAULT_AUTHOR,
  DEFAULT_CREATOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_PUBLISHER,
  DEFAULT_SITE_NAME,
  DEFAULT_TITLE_TEMPLATE
} from '@/app/constants/metadataDefaults';

export const metadataSettings: GlobalConfig['fields'] = [
  {
    type: 'group',
    name: 'general',
    label: 'General',
    fields: [
      {
        name: 'siteName',
        type: 'text',
        admin: {
          placeholder: DEFAULT_SITE_NAME,
          description:
            'The default page title, used when a page has no title of its own. Leave empty to use the default shown in the field.'
        }
      },
      {
        name: 'titleTemplate',
        type: 'text',
        admin: {
          placeholder: DEFAULT_TITLE_TEMPLATE,
          description:
            'Template for individual page titles. Use %s where the page title should appear (e.g. "%s | Redbird Counseling" = "Page Title | Redbird Counseling"). Leave empty to use the default shown in the field.'
        }
      },
      {
        name: 'description',
        type: 'textarea',
        admin: {
          placeholder: DEFAULT_DESCRIPTION,
          description:
            'The default site description shown in search results and social shares. Leave empty to use the default shown in the field.'
        }
      },
      {
        name: 'keywords',
        type: 'text',
        hasMany: true,
        admin: {
          description: `SEO keywords. Press enter after each keyword.`
        }
      }
    ]
  },
  {
    type: 'group',
    name: 'openGraph',
    label: 'Open Graph / Social Sharing',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description:
            'Default image shown when the site is shared on social media (Facebook, X, LinkedIn, etc.). Recommended size: 1200×630px. Leave empty to use the built-in default image.'
        }
      }
    ]
  },
  {
    type: 'group',
    name: 'attribution',
    label: 'Attribution',
    fields: [
      {
        name: 'author',
        type: 'text',
        admin: {
          placeholder: DEFAULT_AUTHOR,
          description: 'Leave empty to use the default shown in the field.'
        }
      },
      {
        type: 'row',
        fields: [
          {
            name: 'creator',
            type: 'text',
            admin: {
              placeholder: DEFAULT_CREATOR,
              description: 'Leave empty to use the default shown in the field.'
            }
          },
          {
            name: 'publisher',
            type: 'text',
            admin: {
              placeholder: DEFAULT_PUBLISHER,
              description: 'Leave empty to use the default shown in the field.'
            }
          }
        ]
      }
    ]
  }
];
