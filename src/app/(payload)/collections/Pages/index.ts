import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from '@payloadcms/plugin-seo/fields';
import { CollectionConfig } from 'payload';

// import { generatePreviewPath } from '@/utils/generatePreviewPath';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { linkGroup } from '../../fields/linkGroup';
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
  defaultPopulate: {
    title: true,
    slug: true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt']
    // livePreview: {
    //   url: ({ data, req }) => {
    //     const slug = typeof data?.slug === 'string' ? data.slug : '';

    //     // Return root path for home page
    //     if (slug === 'home') {
    //       return '/';
    //     }

    //     const path = generatePreviewPath({
    //       slug,
    //       collection: 'pages',
    //       req
    //     });

    //     return path;
    //   }
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === 'string' ? data.slug : '',
    //     collection: 'pages',
    //     req
    //   })
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
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 100 // We set this interval for optimal live preview
  //     },
  //     schedulePublish: true
  //   },
  //   maxPerDoc: 50
  // },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    {
                      label: 'Home',
                      value: 'home'
                    },
                    {
                      label: 'About',
                      value: 'about'
                    },
                    {
                      label: 'Services',
                      value: 'services'
                    },
                    {
                      label: 'FAQ',
                      value: 'faq'
                    },
                    {
                      label: 'Contact',
                      value: 'contact'
                    }
                  ],
                  defaultValue: 'home'
                },
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    condition: (data) => {
                      if (data.hero.hero.type === 'faq') {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  }
                },
                {
                  name: 'subtext',
                  type: 'text',
                  admin: {
                    condition: (data) => {
                      if (data.hero.hero.type === 'faq') {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  }
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media'
                },
                {
                  name: 'secondaryImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    condition: (data) => {
                      if (data.hero.hero.type === 'about') {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                },
                linkGroup({
                  appearances: ['default', 'outline'],
                  overrides: {
                    maxRows: 2
                  }
                })
              ]
            }
          ]
        },
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              required: true,
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
                'accordion'
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
