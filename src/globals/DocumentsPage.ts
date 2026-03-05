import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const DocumentsPage: GlobalConfig = {
    slug: 'documents-page',
    admin: { group: 'Страницы' },
    access: {
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'tag',
            type: 'text',
            localized: true,
            label: 'Подпись над заголовком',
            defaultValue: 'Официальный архив',
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
            label: 'Заголовок страницы',
            defaultValue: 'Документы Ассоциации',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            localized: true,
            label: 'Подзаголовок',
            defaultValue:
                'Устав, нормативные акты, протоколы заседаний и отчётность КАСУ. Все официальные документы в открытом доступе.',
        },
    ],
}
