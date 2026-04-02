import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'
import type { GlobalConfig } from 'payload'

export const DocumentsPage: GlobalConfig = {
    slug: 'documents-page',
    admin: { group: 'Pages' },
    access: {
        read: anyone,
        update: authenticated,
    },
    hooks: {
        afterChange: [revalidateGlobal('documents-page')],
    },
    fields: [
        {
            name: 'tag',
            type: 'text',
            localized: true,
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'subtitle',
            type: 'textarea',
            localized: true,
        },
    ],
}
