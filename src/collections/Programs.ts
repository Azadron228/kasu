import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Programs: CollectionConfig = {
  slug: 'programs',
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
      type: 'select',
      required: true,
      label: {
        en: 'Direction',
        ru: 'Направление',
      },
      options: [
        { label: { en: 'Finance', ru: 'Финансы' }, value: 'finance' },
        { label: { en: 'IT and Technologies', ru: 'IT и технологии' }, value: 'it' },
        { label: { en: 'Humanities', ru: 'Гуманитарные науки' }, value: 'humanities' },
        { label: { en: 'Healthy Lifestyle', ru: 'Здоровый образ жизни' }, value: 'health' },
        { label: { en: 'Psychology', ru: 'Психология' }, value: 'psychology' },
        { label: { en: 'Languages', ru: 'Языки' }, value: 'languages' },
        { label: { en: 'Art', ru: 'Искусство' }, value: 'art' },
        { label: { en: 'Nature and Ecology', ru: 'Природа и экология' }, value: 'nature' },
        { label: { en: 'Intellectual Games', ru: 'Интеллектуальные игры' }, value: 'games' },
        { label: { en: 'Pedagogy', ru: 'Педагогика' }, value: 'pedagogy' },
      ],
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