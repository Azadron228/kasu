import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Directions: CollectionConfig = {
  slug: 'directions',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true, required: true },
    { name: 'icon', type: 'text', required: true, admin: { description: 'Emoji or short string' } },
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
  ],
}
