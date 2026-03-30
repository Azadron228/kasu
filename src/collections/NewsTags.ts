import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const NewsTags: CollectionConfig = {
  slug: 'news-tags',
  labels: {
    singular: {
      en: 'News Tag',
      ru: 'Тег новостей',
    },
    plural: {
      en: 'News Tags',
      ru: 'Теги новостей',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
      localized: true,
      required: true,
    },
  ],
}
