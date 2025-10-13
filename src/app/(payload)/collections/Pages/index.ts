import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from '@payloadcms/plugin-seo/fields';
import { CollectionConfig } from 'payload';

import { generatePreviewPath } from '@/utils/generatePreviewPath';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { aboutHeroFields } from '../../fields/heroes/aboutHeroFields';
import { basicHeroFields } from '../../fields/heroes/basicHeroFields';
import { contactHeroFields } from '../../fields/heroes/contactHeroFields';
import { faqHeroFields } from '../../fields/heroes/faqHeroFields';
import { homeHeroFields } from '../../fields/heroes/homeHeroFields';
import { servicesHeroFields } from '../../fields/heroes/servicesHeroFields';
import { slugField } from '../../fields/slug';
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  trash: true,
  // defaultPopulate: {
  //   title: true,
  //   slug: true
  // },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'status'],
    livePreview: {
      url: ({ data, req }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : '';

        // Return root path for home page
        if (slug === 'home') {
          return '/';
        }

        const path = generatePreviewPath({
          slug,
          collection: 'pages',
          req
        });

        return path;
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req
      })
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete]
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      autosave: {
        interval: 100
      }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'basic',
      admin: {
        disableListColumn: true
      },
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Services', value: 'services' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Contact', value: 'contact' }
      ]
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          fields: [
            ...basicHeroFields,
            ...homeHeroFields,
            ...aboutHeroFields,
            ...faqHeroFields,
            ...contactHeroFields,
            ...servicesHeroFields
          ]
        },
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              admin: {
                initCollapsed: true,
                disableListColumn: true
              },
              blockReferences: [
                'cta',
                'selection',
                'card-grid',
                'rich-text',
                'credentials-grid',
                'accordion',
                'info-grid',
                'service-grid',
                'fifty-fifty'
              ],
              blocks: []
            }
          ]
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
              overrides: {
                admin: {
                  disableListColumn: true
                }
              }
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                admin: {
                  disableListColumn: true
                }
              }
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                admin: {
                  disableListColumn: true
                }
              }
            }),

            MetaDescriptionField({
              overrides: {
                admin: {
                  disableListColumn: true
                }
              }
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              overrides: {
                admin: {
                  disableListColumn: true
                }
              }
            })
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    ...slugField()
  ]
};
