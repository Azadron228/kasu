import type { GlobalConfig } from 'payload'

import {
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  fields: [
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'number', type: 'text' },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    {
      name: 'aboutBody', type: 'richText',

      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            UnorderedListFeature(),
            OrderedListFeature(),
          ]
        },
      }),
      localized: true
    },
    {
      name: 'aboutInfoBlocks',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'text', localized: true },
      ],
    },
  ],
}
