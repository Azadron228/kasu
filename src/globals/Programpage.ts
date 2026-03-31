import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const ProgramsPage: GlobalConfig = {
  slug: 'programs-page',
  admin: { group: 'Pages' },
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
      label: 'Заголовок Pages',
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
          label: 'Кол-во университетов (оставьте пустым для автоподсчета)',
        },
        {
          name: 'programsCount',
          type: 'number',
          label: 'Кол-во программ (оставьте пустым для автоподсчета)',
        },
        {
          name: 'directionsCount',
          type: 'number',
          label: 'Кол-во направлений (оставьте пустым для автоподсчета)',
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