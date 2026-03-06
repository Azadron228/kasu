import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'

export async function getDocumentsData(locale: TypedLocale) {
    const { docs: categories } = await payload.find({
        collection: 'document-categories',
        sort: 'order',
        limit: 50,
    })

    const { docs: documents } = await payload.find({
        collection: 'documents',
        sort: '-date',
        limit: 500,
        depth: 2,
        locale,
    })

    const { docs: folders } = await payload.find({
        collection: 'payload-folders',
        limit: 200,
        depth: 1,
    })

    return { categories, documents, folders }
}

export async function getFeaturedDocuments(locale: TypedLocale) {
    const { docs: categories } = await payload.find({
        collection: 'document-categories',
        sort: 'order',
        limit: 50,
    })

    const { docs: featured } = await payload.find({
        collection: 'documents',
        where: { isFeatured: { equals: true } },
        sort: '-date',
        limit: 100,
        depth: 1,
        locale,
    })

    return { categories, featured }
}
