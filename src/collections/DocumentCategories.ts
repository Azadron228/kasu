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
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (идентификатор)',
            admin: {
                description: 'e.g. charter, legal, report, protocol, policy, agreement',
            },
        },
        {
            name: 'icon',
            type: 'text',
            required: true,
            label: 'Иконка (emoji)',
            defaultValue: '📄',
            admin: { description: 'Emoji для отображения в сайдбаре' },
        },
        {
            name: 'sectionLabel',
            type: 'text',
            localized: true,
            label: 'Подпись секции',
            admin: { description: 'e.g. Основные документы, Внутренние акты' },
        },
        {
            name: 'order',
            type: 'number',
            required: true,
            defaultValue: 0,
            label: 'Порядок сортировки',
        },
    ],
}
