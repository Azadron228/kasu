import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

import {
  lexicalEditor,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

export const JoinPage: GlobalConfig = {
  slug: 'join-page',
  admin: { group: 'Pages' },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      localized: true,
      label: 'Подпись над заголовком',
      defaultValue: 'Серебряные университеты · КАСУ',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Заголовок Pages',
      defaultValue: 'Вступить в Ассоциацию',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Подзаголовок',
      defaultValue:
        'Станьте частью профессионального сообщества, объединяющего серебряные университеты Казахстана.',
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      label: 'Основной текст',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            UnorderedListFeature(),
            OrderedListFeature(),

            UploadFeature({
              collections: {
                media: {
                  fields: [
                  ],
                },
              },
            }),
          ]
        },
      }),
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Форма заявки',
      admin: {
        description:
          'Выберите форму, созданную в разделе "Forms". Если форма не выбрана — ничего не отображается.',
      },
    },
  ],
}