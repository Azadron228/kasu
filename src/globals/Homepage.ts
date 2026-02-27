import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  fields: [
    { name: 'heroHeadline', type: 'text', localized: true },
    { name: 'heroSubheading', type: 'text', localized: true },
    { name: 'presidentQuote', type: 'textarea', localized: true },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'number', type: 'text' },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    { name: 'aboutBody', type: 'richText', localized: true },
    {
      name: 'aboutInfoBlocks',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'text', localized: true },
      ],
    },
    {
      name: 'aboutBullets',
      type: 'array',
      localized: true,
      fields: [{ name: 'point', type: 'text', localized: true }],
    },
    { name: 'joinTitle', type: 'text', localized: true },
    { name: 'joinSubtitle', type: 'text', localized: true },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactAddress', type: 'textarea', localized: true },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Twitter'],
        },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
