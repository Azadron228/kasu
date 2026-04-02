import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import path from 'path'
import { fileURLToPath } from 'url'
import { revalidatePaths } from '@/hooks/revalidatePaths'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
    slug: 'documents',
    hooks: {
        afterChange: [revalidatePaths(['/', '/documents'])],
        afterDelete: [revalidatePaths(['/', '/documents'])],
    },
    labels: {
        singular: {
            en: 'Document',
            ru: 'Документ',
        },
        plural: {
            en: 'Documents',
            ru: 'Документы',
        },
    },
    folders: true,
    upload: {
        staticDir: path.resolve(dirname, '../../public/documents'),
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'fileFormat', 'date', 'isNew'],
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
                ru: 'Название документа',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
            label: {
                en: 'Description',
                ru: 'Описание',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'document-categories',
            required: true,
            hasMany: false,
            label: {
                en: 'Category',
                ru: 'Категория',
            },
        },
        {
            name: 'date',
            type: 'date',
            required: true,
            label: {
                en: 'Date',
                ru: 'Дата документа',
            },
            admin: {
                date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
            },
        },
        {
            name: 'isFeatured',
            type: 'checkbox',
            label: {
                en: 'Featured',
                ru: 'Показывать как избранный',
            },
            defaultValue: false,
        },
    ],
}
