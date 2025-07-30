import { Block } from 'payload';

import { linkGroup } from '../fields/linkGroup';

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
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
      appearances: ['default', 'outline']
    })
  ]
};
