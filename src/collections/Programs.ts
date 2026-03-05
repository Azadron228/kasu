import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Programs: CollectionConfig = {
  slug: 'programs',
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
      label: 'Название программы',
    },
    {
      name: 'direction',
      type: 'select',
      required: true,
      label: 'Направление',
      options: [
        { label: 'Финансы', value: 'finance' },
        { label: 'IT и технологии', value: 'it' },
        { label: 'Гуманитарные науки', value: 'humanities' },
        { label: 'Здоровый образ жизни', value: 'health' },
        { label: 'Психология', value: 'psychology' },
        { label: 'Языки', value: 'languages' },
        { label: 'Искусство', value: 'art' },
        { label: 'Природа и экология', value: 'nature' },
        { label: 'Интеллектуальные игры', value: 'games' },
        { label: 'Педагогика', value: 'pedagogy' },
      ],
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      label: 'Формат обучения',
      options: [
        { label: 'Онлайн', value: 'online' },
        { label: 'Очно', value: 'offline' },
        { label: 'Смешанный', value: 'blended' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
      required: true,
      label: 'Длительность',
      admin: { description: 'e.g. 2 месяца, 6 недель, Постоянно' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Описание программы',
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hasMany: false,
      label: 'Университет',
    },
  ],
}