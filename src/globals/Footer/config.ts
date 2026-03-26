import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // ── Brand / org section ────────────────────────────────────────────
    {
      name: 'orgTitle',
      type: 'text',
      localized: true,
      admin: { description: 'Organisation name shown next to the logo' },
    },
    {
      name: 'orgDesc',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short description under the org title' },
    },

    // ── Navigation columns ─────────────────────────────────────────────
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      admin: {
        description: 'Up to 3 link columns displayed in the footer',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'Column heading (shown in uppercase)' },
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 8,
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: { description: 'Relative or absolute URL, e.g. /about or https://…' },
            },
          ],
        },
      ],
    },

    // ── Bottom bar ─────────────────────────────────────────────────────
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Copyright line. Use {year} as a placeholder for the current year, e.g. "© {year} КАСУ. All rights reserved."',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
