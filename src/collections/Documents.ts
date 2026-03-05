import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Documents: CollectionConfig = {
    slug: 'documents',
    folders: true,
    upload: {
        staticDir: 'documents',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'fileFormat', 'date', 'isNew'],
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
            label: 'Название документа',
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
            label: 'Описание',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'document-categories',
            required: true,
            hasMany: false,
            label: 'Категория',
        },
        {
            name: 'date',
            type: 'date',
            required: true,
            label: 'Дата документа',
            admin: {
                date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
            },
        },
        {
            name: 'isFeatured',
            type: 'checkbox',
            label: 'Показывать как избранный',
            defaultValue: false,
        },
    ],
}
