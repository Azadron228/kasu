import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateCollectionCount } from '@/hooks/revalidateCounts'

export const Programs: CollectionConfig = {
  slug: 'programs',
  hooks: {
    afterChange: [revalidateCollectionCount('programs')],
    afterDelete: [revalidateCollectionCount('programs')],
  },
  labels: {
    singular: {
      en: 'Program',
      ru: 'Программа',
    },
    plural: {
      en: 'Programs',
      ru: 'Программы',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'direction', 'format', 'member', 'free'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Program Name',
        ru: 'Название программы',
      },
    },
    {
      name: 'direction',
      type: 'relationship',
      relationTo: 'directions',
      required: true,
      label: {
        en: 'Direction',
        ru: 'Направление',
      },
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      label: {
        en: 'Study Format',
        ru: 'Формат обучения',
      },
      options: [
        { label: { en: 'Online', ru: 'Онлайн' }, value: 'online' },
        { label: { en: 'In-person', ru: 'Очно' }, value: 'offline' },
        { label: { en: 'Blended', ru: 'Смешанный' }, value: 'blended' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Duration',
        ru: 'Длительность',
      },
      admin: {
        description: {
          en: 'e.g. 2 months, 6 weeks, Ongoing',
          ru: 'напр. 2 месяца, 6 недель, Постоянно',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Program Description',
        ru: 'Описание программы',
      },
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hasMany: false,
      label: {
        en: 'University',
        ru: 'Университет',
      },
    },
  ],
}