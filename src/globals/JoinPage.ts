import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const JoinPage: GlobalConfig = {
  slug: 'join-page',
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
      defaultValue: 'Серебряные университеты · КАСУ',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Заголовок страницы',
      defaultValue: 'Вступить в Ассоциацию',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Подзаголовок',
      defaultValue:
        'Станьте частью профессионального сообщества, объединяющего серебряные университеты Казахстана.',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Форма заявки',
      admin: {
        description:
          'Выберите форму, созданную в разделе "Forms". Если форма не выбрана — ничего не отображается.',
      },
    },
    {
      name: 'infoBoxes',
      type: 'array',
      label: 'Информационные блоки (справа)',
      admin: {
        description: 'Иконка + заголовок + текст, которые показываются справа от формы',
      },
      fields: [
        { name: 'icon', type: 'text', label: 'Иконка (emoji или текст)', defaultValue: '🎓' },
        { name: 'title', type: 'text', localized: true, label: 'Заголовок блока' },
        { name: 'body', type: 'textarea', localized: true, label: 'Текст блока' },
      ],
    },
  ],
}
