import { CollectionConfig } from 'payload';

import { CTA } from '../blocks/CTA';
import { linkGroup } from '../fields/linkGroup';
import { slugField } from '../fields/slug';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt']
  },
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'subtext',
          type: 'text'
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 2
          }
        }),
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            position: 'sidebar'
          }
        },
        ...slugField()
      ]
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [CTA]
    }
  ]
};
