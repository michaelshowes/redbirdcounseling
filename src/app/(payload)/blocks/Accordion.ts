import { Block } from 'payload';

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'Accordion',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'headline',
      type: 'text',
      required: true
    },
    {
      name: 'text',
      type: 'textarea'
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true
        }
      ]
    }
  ]
};
