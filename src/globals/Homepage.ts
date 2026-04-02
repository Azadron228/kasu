import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'

import {
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Pages' },
  access: { read: anyone },
  hooks: {
    afterChange: [revalidateGlobal('homepage')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- TAB 1: Hero ---
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTagline',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroTitle',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'heroWelcomeTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroWelcomeRole',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroQuote',
              type: 'textarea',
              localized: true,
            },
          ],
        },

        // --- TAB 2: Stats ---
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'number', type: 'text' },
                { name: 'label', type: 'text', localized: true },
              ],
            },
          ],
        },

        // --- TAB 3: About ---
        {
          label: 'About',
          fields: [
            {
              name: 'aboutMission',
              type: 'text',
              localized: true,
            },
            {
              name: 'aboutTag',
              type: 'text',
              localized: true,
            },
            {
              name: 'aboutBody',
              type: 'richText',
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
              localized: true,
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
        },
      ],
    },
  ],
}