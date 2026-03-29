import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Directions: CollectionConfig = {
  slug: 'directions',
  // Localize the Collection Name in the Sidebar
  labels: {
    singular: {
      en: 'Direction',
      ru: 'Направление',
      kk: 'Бағыт',
    },
    plural: {
      en: 'Directions',
      ru: 'Направления',
      kk: 'Бағыттар',
    },
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        ru: 'Заголовок',
        kk: 'Тақырып',
      },
      localized: true, // This connects to your shared config to translate the actual data
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Description',
        ru: 'Описание',
        kk: 'Сипаттама',
      },
      localized: true,
      required: true
    },
    {
      name: 'icon',
      type: 'text',
      label: {
        en: 'Icon',
        ru: 'Иконка',
        kk: 'Белгіше',
      },
      required: true,
      admin: {
        description: {
          en: 'Emoji or short string',
          ru: 'Эмодзи или короткая строка',
          kk: 'Эмодзи немесе қысқа жол',
        }
      }
    },
    {
      name: 'order',
      type: 'number',
      label: {
        en: 'Order',
        ru: 'Порядок',
        kk: 'Реті',
      },
      required: true,
      defaultValue: 0
    },
  ],
}