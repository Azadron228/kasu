import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: { useAsTitle: 'shortName' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'shortName',
      type: 'text',
      localized: true,
      required: true,
      label: 'Short Name / Abbreviation',
    },
    {
      name: 'fullName',
      type: 'text',
      localized: true,
      required: true,
      label: 'Full University Name',
    },
    { name: 'city', type: 'text', localized: true, required: true },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: true,
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Учредитель (Founder)', value: 'founder' },
        { label: 'Член (Member)', value: 'member' },
      ],
      defaultValue: 'member',
      required: true,
    },
    { name: 'logo', type: 'upload', relationTo: 'media', required: false },
    { name: 'main_url', type: 'text' },
    { name: 'silver_url', type: 'text' },
  ],
}
