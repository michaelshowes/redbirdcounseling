import type { Block } from 'payload';

export const MediaBlock: Block = {
  slug: 'media-block',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
};
