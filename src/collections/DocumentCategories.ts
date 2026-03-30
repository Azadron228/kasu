import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const DocumentCategories: CollectionConfig = {
    slug: 'document-categories',
    labels: {
        singular: {
            en: 'Document Category',
            ru: 'Категория документа',
        },
        plural: {
            en: 'Document Categories',
            ru: 'Категории документов',
        },
    },
    admin: {
        useAsTitle: 'title',
        group: 'Documents',
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
            label: {
                en: 'Title',
                ru: 'Название категории',
            },
        },
    ],
}
