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
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { revalidateDelete, revalidatePost } from './revalidatePost';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  trash: true,
  // Newest first, matching how the blog itself is ordered.
  defaultSort: '-publishedAt',
  defaultPopulate: {
    title: true,
    slug: true,
    publishedAt: true,
    excerpt: true,
    image: true,
    meta: {
      image: true,
      description: true
    }
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt', 'status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req
        })
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req
      })
  },
  hooks: {
    afterChange: [revalidatePost],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        // Draft persistence only. Live preview updates come from postMessage via
        // `useLivePreview`, not autosave.
        interval: 800
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
        position: 'sidebar',
        description:
          'Controls ordering on /blog. The newest published post is featured at the top.'
      }
    },
    ...slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Short summary shown on the blog listing and in the featured card. Aim for one or two sentences.'
      }
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Used on the listing, the featured card, and the post hero.'
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'body',
              label: 'Article',
              type: 'richText',
              required: true,
              admin: {
                disableListColumn: true
              }
            },
            {
              name: 'content',
              label: 'Additional Blocks',
              type: 'blocks',
              admin: {
                initCollapsed: true,
                disableListColumn: true,
                description:
                  'Optional sections appended below the article - e.g. a CTA or an FAQ accordion.'
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
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            })
          ]
        }
      ]
    }
  ]
};
