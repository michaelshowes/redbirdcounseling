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
    defaultColumns: ['title', 'updatedAt'],
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
          fields: [
            {
              name: 'title',
              type: 'text'
            },
            {
              name: 'subtext',
              type: 'textarea'
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
          name: 'content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true
            },
            {
              name: 'content',
              type: 'blocks',
              admin: {
                initCollapsed: true
              },
              blockReferences: [
                'cta',
                'selection',
                'card-grid',
                'rich-text',
                'media-block',
                'credentials-grid',
                'accordion',
                'info-grid',
                'service-grid'
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
