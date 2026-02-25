import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'type', type: 'select', localized: true, options: [
      { label: 'Government', value: 'government' },
      { label: 'NGO', value: 'ngo' },
      { label: 'Corporate', value: 'corporate' },
      { label: 'Academic', value: 'academic' },
      { label: 'Other', value: 'other' }
    ], required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
  ],
}
