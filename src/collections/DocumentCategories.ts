import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const DocumentCategories: CollectionConfig = {
    slug: 'document-categories',
    admin: {
        useAsTitle: 'title',
        group: 'Документы',
    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
            label: 'Название категории',
        },
    ],
}
