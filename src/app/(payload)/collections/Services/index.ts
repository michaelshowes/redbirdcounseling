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
import { slugField } from '../../fields/slug';
import { revalidateDelete, revalidateService } from './revalidateService';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  trash: true,
  orderable: true,
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true
    }
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'status'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req
        });

        return path;
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'services',
        req
      })
  },
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100 // We set this interval for optimal live preview
      }
    },
    maxPerDoc: 50
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          interfaceName: 'ServiceDetailHero',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                disableListColumn: true
              }
            },
            {
              name: 'richTextSubtext',
              label: 'Subtext',
              type: 'richText',
              admin: {
                disableListColumn: true
              }
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true
            }
          ]
        },
        {
          name: 'details',
          fields: [
            {
              name: 'showDetails',
              type: 'checkbox'
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.showDetails
              }
            },
            {
              name: 'subtext',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.showDetails
              }
            },
            {
              name: 'price',
              type: 'number',
              admin: {
                condition: (_, siblingData) => siblingData.showDetails
              }
            },
            {
              name: 'details',
              label: 'Details',
              type: 'richText',
              admin: {
                condition: (_, siblingData) => siblingData.showDetails
              }
            }
          ]
        },
        {
          name: 'content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true,
              admin: {
                disableListColumn: true
              }
            },
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
              imagePath: 'meta.image'
            }),
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaImageField({
              relationTo: 'media'
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            })
          ]
        }
      ]
    }
  ]
};
