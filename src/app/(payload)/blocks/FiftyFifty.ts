import { Block } from 'payload';

import { link } from '../fields/link';

export const FiftyFifty: Block = {
  slug: 'fifty-fifty',
  interfaceName: 'FiftyFifty',
  imageURL: '/images/block-thumbnails/fifty-fifty.png',
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'headline',
          type: 'text'
        }
      ]
    },
    {
      name: 'ctaLink',
      label: 'CTA Link',
      type: 'group',
      fields: [
        link({
          overrides: {
            label: ''
          }
        })
      ]
    },
    {
      name: 'leftContentType',
      type: 'select',
      defaultValue: 'richText',
      options: [
        {
          label: 'Text',
          value: 'richText'
        },
        {
          label: 'Image',
          value: 'image'
        }
      ]
    },
    {
      name: 'leftContentText',
      label: 'Text',
      type: 'richText',
      admin: {
        condition: (_, siblingData) =>
          siblingData.leftContentType === 'richText'
      }
    },
    {
      name: 'leftContentImage',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.leftContentType === 'image'
      }
    },
    {
      name: 'rightContentType',
      type: 'select',
      defaultValue: 'image',
      options: [
        {
          label: 'Text',
          value: 'richText'
        },
        {
          label: 'Image',
          value: 'image'
        }
      ]
    },
    {
      name: 'rightContentText',
      label: 'Text',
      type: 'richText',
      admin: {
        condition: (_, siblingData) =>
          siblingData.rightContentType === 'richText'
      }
    },
    {
      name: 'rightContentImage',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      // required: true,
      admin: {
        condition: (_, siblingData) => siblingData.rightContentType === 'image'
      }
    }
  ]
};
