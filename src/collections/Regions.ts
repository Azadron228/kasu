import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Regions: CollectionConfig = {
  slug: 'regions',
  admin: { useAsTitle: 'name' },
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
      admin: { description: 'e.g., Akmola Region, Almaty City' },
    },
  ],
}
