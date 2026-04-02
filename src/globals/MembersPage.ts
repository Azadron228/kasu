import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'
import type { GlobalConfig } from 'payload'

export const MembersPage: GlobalConfig = {
  slug: 'members-page',
  admin: { group: 'Pages' },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal('members-page')],
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
      label: 'Заголовок Pages',
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
