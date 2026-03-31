import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateCollectionCount } from '@/hooks/revalidateCounts'

export const Members: CollectionConfig = {
  slug: 'members',
  hooks: {
    afterChange: [revalidateCollectionCount('members')],
    afterDelete: [revalidateCollectionCount('members')],
  },
  labels: {
    singular: {
      en: 'Member',
      ru: 'Участник',
    },
    plural: {
      en: 'Members',
      ru: 'Участники',
    },
  },
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
      label: {
        en: 'Short Name / Abbreviation',
        ru: 'Краткое название / Аббревиатура',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Full University Name',
        ru: 'Полное название университета',
      },
    },
    {
      name: 'city',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'City',
        ru: 'Город',
      },
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: true,
      hasMany: false,
      label: {
        en: 'Region',
        ru: 'Регион',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: { en: 'Founder', ru: 'Учредитель' }, value: 'founder' },
        { label: { en: 'Member', ru: 'Член' }, value: 'member' },
      ],
      defaultValue: 'member',
      required: true,
      label: {
        en: 'Status',
        ru: 'Статус',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: {
        en: 'Logo',
        ru: 'Логотип',
      },
    },
    {
      name: 'main_url',
      type: 'text',
      label: {
        en: 'Main URL',
        ru: 'Основной URL',
      },
    },
    {
      name: 'silver_url',
      type: 'text',
      label: {
        en: 'Silver University URL',
        ru: 'URL Серебряного университета',
      },
    },
  ],
}
