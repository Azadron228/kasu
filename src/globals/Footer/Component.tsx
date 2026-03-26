import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { Logo } from '@/components/Logo/Logo'

async function getFooterData(locale: string) {
  const payload = await getPayload({ config })

  const getCached = unstable_cache(
    async () => {
      return payload.findGlobal({
        slug: 'footer',
        locale: locale as any,
      })
    },
    [`global_footer_${locale}`],
    { tags: ['global_footer'] },
  )

  return getCached()
}

export async function Footer({ locale }: { locale: string }) {
  const footer = await getFooterData(locale)

  const currentYear = new Date().getFullYear()

  const copyrightText = footer.copyrightText
    ? footer.copyrightText.replace('{year}', String(currentYear))
    : `© ${currentYear}`

  return (
    <footer className="bg-navy-deep text-brand-white/60 px-6 lg:px-16 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand column */}
        <div className="lg:col-span-1 flex items-start gap-4">
          <Logo
            color="white"
            outline="white"
            className="w-12 h-12 rounded-full overflow-hidden shadow-lg shrink-0"
          />
          <div>
            {footer.orgTitle && (
              <h3 className="font-serif text-brand-white text-base mb-2">{footer.orgTitle}</h3>
            )}
            {footer.orgDesc && <p className="text-xs leading-relaxed">{footer.orgDesc}</p>}
          </div>
        </div>

        {/* Dynamic link columns */}
        {footer.columns && footer.columns.length > 0
          ? footer.columns.map((col) => (
            <div key={col.id}>
              {col.columnTitle && (
                <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
                  {col.columnTitle}
                </h4>
              )}
              <div className="space-y-2">
                {col.links &&
                  col.links.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url || '#'}
                      className="block text-sm hover:text-sky transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>
          ))
          : null}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-brand-white/30">
        <div>{copyrightText}</div>
      </div>
    </footer>
  )
}
