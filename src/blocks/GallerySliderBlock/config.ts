import type { Block } from 'payload'

export const GallerySliderBlock: Block = {
  slug: 'gallerySlider',
  interfaceName: 'GallerySliderBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
