import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300
      },
      {
        name: 'About Hero',
        width: 797,
        height: 736
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center'
      }
    ]
  },
  folders: true
};
