import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const ProgramsPage: GlobalConfig = {
  slug: 'programs-page',
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
      defaultValue: 'Образовательные программы',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Подзаголовок',
    },
    // ── STATS BAR ──
    {
      name: 'stats',
      type: 'group',
      label: 'Статистика (бар под заголовком)',
      fields: [
        {
          name: 'universitiesCount',
          type: 'number',
          label: 'Кол-во университетов',
          defaultValue: 14,
        },
        {
          name: 'programsCount',
          type: 'number',
          label: 'Кол-во программ',
          defaultValue: 68,
        },
        {
          name: 'directionsCount',
          type: 'number',
          label: 'Кол-во направлений',
          defaultValue: 12,
        },
        {
          name: 'freeNote',
          type: 'text',
          localized: true,
          label: 'Подпись бесплатных курсов',
          defaultValue: 'Большинство курсов',
        },
      ],
    },
  ],
}