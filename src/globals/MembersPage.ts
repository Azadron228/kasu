import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const MembersPage: GlobalConfig = {
  slug: 'members-page',
  admin: { group: 'Страницы' },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    // ── HEADER ──
    {
      name: 'tag',
      type: 'text',
      localized: true,
      label: 'Подпись над заголовком',
      defaultValue: 'Серебряные университеты · КАСУ',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Заголовок страницы',
      defaultValue: 'Участники ассоциации',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Подзаголовок',
      defaultValue: 'Университеты и организации, входящие в состав Казахстанской Ассоциации Серебряных Университетов (U3A Kazakhstan)',
    },
  ],
}
