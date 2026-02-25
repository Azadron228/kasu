import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'city', type: 'text', localized: true, required: true },
    { name: 'region', type: 'select', localized: true, options: [
      { label: 'Abai Region', value: 'abai' },
      { label: 'Akmola Region', value: 'akmola' },
      { label: 'Aktobe Region', value: 'aktobe' },
      { label: 'Almaty Region', value: 'almaty' },
      { label: 'Atyrau Region', value: 'atyrau' },
      { label: 'East Kazakhstan Region', value: 'east_kazakhstan' },
      { label: 'Jambyl Region', value: 'jambyl' },
      { label: 'Jetisu Region', value: 'jetisu' },
      { label: 'Karaganda Region', value: 'karaganda' },
      { label: 'Kostanay Region', value: 'kostanay' },
      { label: 'Kyzylorda Region', value: 'kyzylorda' },
      { label: 'Mangystau Region', value: 'mangystau' },
      { label: 'North Kazakhstan Region', value: 'north_kazakhstan' },
      { label: 'Pavlodar Region', value: 'pavlodar' },
      { label: 'Turkistan Region', value: 'turkistan' },
      { label: 'West Kazakhstan Region', value: 'west_kazakhstan' },
      { label: 'Ulytau Region', value: 'ulytau' },
      { label: 'Almaty City', value: 'almaty_city' },
      { label: 'Astana City', value: 'astana_city' },
      { label: 'Shymkent City', value: 'shymkent_city' }
    ], required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'website', type: 'text' },
    { name: 'description', type: 'textarea', localized: true },
  ],
}
