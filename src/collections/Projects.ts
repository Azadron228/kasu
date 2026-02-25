import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'status', type: 'select', localized: true, options: [
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' },
      { label: 'Planned', value: 'planned' }
    ], defaultValue: 'active', required: true },
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
