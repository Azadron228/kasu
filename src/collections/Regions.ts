import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Regions: CollectionConfig = {
    slug: 'regions',
    labels: {
        singular: {
            en: 'Region',
            ru: 'Регион',
        },
        plural: {
            en: 'Regions',
            ru: 'Регионы',
        },
    },
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
            label: {
                en: 'Name',
                ru: 'Название',
            },
            localized: true,
            required: true,
            admin: {
                description: {
                    en: 'e.g., Akmola Region, Almaty City',
                    ru: 'напр. Акмолинская область, г. Алматы',
                }
            },
        },
    ],
}
