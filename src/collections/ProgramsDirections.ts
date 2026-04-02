import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ProgramsDirections: CollectionConfig = {
  slug: 'programs-directions',
  labels: {
    singular: {
      en: 'Program Direction',
      ru: 'Направление программы',
      kk: 'Бағдарлама бағыты',
    },
    plural: {
      en: 'Program Directions',
      ru: 'Направления программ',
      kk: 'Бағдарлама бағыттары',
    },
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        ru: 'Заголовок',
        kk: 'Тақырып',
      },
      localized: true,
      required: true
    },
  ],
}
