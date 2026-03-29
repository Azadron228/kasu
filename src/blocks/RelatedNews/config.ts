import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RelatedNewsBlock: Block = {
  slug: 'relatedNews',
  interfaceName: 'RelatedNewsBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
    },
    {
      name: 'docs',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      required: true,
    },
  ],
}
