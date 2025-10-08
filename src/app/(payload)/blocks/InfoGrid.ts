import { Block } from 'payload';

export const InfoGrid: Block = {
  slug: 'info-grid',
  interfaceName: 'InfoGrid',
  imageURL: '/images/block-thumbnails/info-grid.png',
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
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          required: true
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            {
              label: 'Badge',
              value: 'badge'
            },
            {
              label: 'Eye',
              value: 'eye'
            },
            {
              label: 'Heart',
              value: 'heart'
            },
            {
              label: 'Circle Check',
              value: 'circle-check'
            },
            {
              label: 'Globe',
              value: 'globe'
            },
            {
              label: 'Star',
              value: 'star'
            }
          ]
        }
      ]
    }
  ]
};
