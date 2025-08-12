import { Block } from 'payload';

export const Selection: Block = {
  slug: 'selection',
  interfaceName: 'Selection',
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
    }
  ]
};
