import { Block } from 'payload';

export const RichText: Block = {
  slug: 'rich-text',
  interfaceName: 'RichText',
  imageURL: '/images/block-thumbnails/rich-text.png',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'headline',
      type: 'text'
    },
    {
      name: 'content',
      type: 'richText'
    }
  ]
};
