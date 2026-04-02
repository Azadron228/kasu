import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'

export const Settings: GlobalConfig = {
    slug: 'settings',
    access: { read: anyone },
    hooks: {
        afterChange: [revalidateGlobal('settings')],
    },
    fields: [
        {
            name: 'contactEmail',
            type: 'email',
            required: true,
        },
        {
            name: 'contactPhone',
            type: 'text',
            required: true,
        },
        {
            name: 'contactAddress',
            type: 'textarea',
            localized: true,
            required: true,
        },
        {
            name: 'socialLinks',
            type: 'array',
            fields: [
                {
                    name: 'platform',
                    type: 'select',
                    options: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Twitter', 'Telegram', 'WhatsApp'],
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
