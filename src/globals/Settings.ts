import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', localized: true },
    { name: 'siteDescription', type: 'textarea', localized: true },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactAddress', type: 'textarea', localized: true },
    { name: 'socialLinks', type: 'array', fields: [
      { name: 'platform', type: 'select', options: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Twitter'] },
      { name: 'url', type: 'text' }
    ] },
    { name: 'footerCopyright', type: 'text', localized: true },
  ],
}
