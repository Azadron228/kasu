import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const TextProjects: CollectionConfig = {
  slug: 'Pizda',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'text', localized: true, required: true },
  ],
}
