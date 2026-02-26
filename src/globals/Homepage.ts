import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  fields: [
    { name: 'heroHeadline', type: 'text', localized: true },
    { name: 'heroSubheading', type: 'text', localized: true },
    { name: 'heroPrimaryCtaLabel', type: 'text', localized: true },
    { name: 'heroSecondaryCtaLabel', type: 'text', localized: true },
    { name: 'presidentQuote', type: 'textarea', localized: true },
    { name: 'presidentName', type: 'text', localized: true },
    { name: 'presidentRole', type: 'text', localized: true },
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
    { name: 'joinDescription', type: 'textarea', localized: true },
    {
      name: 'joinBenefits',
      type: 'array',
      localized: true,
      fields: [{ name: 'benefit', type: 'text', localized: true }],
    },
  ],
}
