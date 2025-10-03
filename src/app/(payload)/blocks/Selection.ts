import { Block } from 'payload';

export const Selection: Block = {
  slug: 'selection',
  interfaceName: 'Selection',
  imageURL: '/images/block-thumbnails/selection.png',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'text',
          type: 'textarea'
        }
      ]
    },
    {
      name: 'footerText',
      label: 'Footer Text',
      type: 'richText'
    }
  ]
};
