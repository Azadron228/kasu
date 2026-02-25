import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'category', type: 'select', localized: true, options: [
      { label: 'Charter', value: 'charter' },
      { label: 'Regulations', value: 'regulations' },
      { label: 'Annual Reports', value: 'annual_reports' },
      { label: 'Agreements', value: 'agreements' }
    ], required: true },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'description', type: 'textarea', localized: true },
  ],
}
