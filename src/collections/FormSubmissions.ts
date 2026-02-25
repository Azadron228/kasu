import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const FormSubmissions: CollectionConfig = {
  slug: 'kasu-form-submissions',
  access: { create: () => true, delete: authenticated, read: authenticated, update: authenticated },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'organisation', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'type', type: 'select', options: [
      { label: 'Contact', value: 'contact' },
      { label: 'Join', value: 'join' }
    ], required: true },
  ],
}
