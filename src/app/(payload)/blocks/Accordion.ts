import { Block } from 'payload';

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'Accordion',
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
      name: 'text',
      type: 'richText'
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: '@/app/(payload)/components/AccordionRowLabel',
            clientProps: {
              customProp: 'customValue'
            }
          }
        }
      },
      fields: [
        {
          name: 'itemTitle',
          label: 'Item Title',
          type: 'text',
          required: true
        },
        {
          name: 'answer',
          type: 'textarea',
          admin: {
            readOnly: true,
            description:
              'Deprecated. This will be removed in the future. Use Item Text instead.'
          }
        },
        {
          name: 'text',
          label: 'Item Text',
          type: 'richText'
        }
      ]
    }
  ]
};
