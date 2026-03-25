import React from 'react'
import { Link } from '@/i18n/routing'
import { TypedLocale } from 'payload'
import { getFeaturedDocuments } from '@/api/find/find-documents'
import { getTranslations } from 'next-intl/server'

type Props = {
  locale: TypedLocale
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'kk' ? 'kk-KZ' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getFileEmoji(mimeType?: string | null): string {
  if (!mimeType) return '📄'
  if (mimeType.includes('pdf')) return '📄'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊'
  return '📄'
}

export default async function HomeFeaturedDocsBlock({ locale }: Props) {
  const { categories, featured } = await getFeaturedDocuments(locale)
  const t = await getTranslations('home')

  if (!featured.length) return null

  // Group featured docs by category
  const grouped: Record<
    string,
    {
      category: (typeof categories)[number]
      docs: typeof featured
    }
  > = {}

  for (const doc of featured) {
    const cat = typeof doc.category === 'object' ? doc.category : null
    const key = cat?.slug ?? 'other'
    if (!grouped[key]) {
      grouped[key] = {
        category: cat ?? ({ id: 0, slug: 'other', title: t('docsFallback'), order: 999 } as any),
        docs: [],
      }
    }
    grouped[key].docs.push(doc)
  }

  // Build ordered list: categories first (in their order), then 'other' at the end
  const orderedGroups = [
    ...categories.filter((cat: any) => grouped[cat.slug]).map((cat: any) => grouped[cat.slug]),
    ...(grouped['other'] ? [grouped['other']] : []),
  ]

  if (!orderedGroups.length) return null

  return (
    <section className="bg-sky-pale px-6 lg:px-16 py-20" id="documents">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
        <div>
          <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">{t('docsTag')}</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-tight">{t('docsTitle')}</h2>
          <p className="mt-3 text-brand-muted text-sm leading-relaxed max-w-xl">{t('docsDesc')}</p>
        </div>
        <Link
          href="/documents"
          className="shrink-0 bg-brand-white/10 border border-navy/20 text-navy font-bold text-sm px-6 py-2.5 rounded-full hover:bg-navy hover:text-brand-white transition-all"
        >
          {t('docsAll')} →
        </Link>
      </div>

      {/* Category cards grid — matches kasu-website-v2 doc-card layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {orderedGroups.map(({ category, docs }) => (
          <div
            key={category.slug ?? category.id}
            className="bg-brand-white rounded-2xl p-7 shadow-custom border border-silver-lt"
          >
            {/* Category icon */}
            <div className="text-3xl mb-3.5">{(category as any).icon ?? '📁'}</div>

            {/* Category title */}
            <h3 className="font-serif text-navy text-[17px] font-bold mb-3">{category.title}</h3>

            {/* Document links list */}
            <ul className="space-y-0">
              {docs.map((doc: any, i) => (
                <li key={doc.id} className={i < docs.length - 1 ? 'border-b border-silver-lt' : ''}>
                  <a
                    href={doc.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 text-steel text-[12.5px] font-bold no-underline transition-colors hover:text-navy"
                  >
                    <span className="shrink-0 text-sm">{getFileEmoji(doc.mimeType)}</span>
                    <span className="flex-1 leading-tight">{doc.title}</span>
                    {doc.date && (
                      <span className="shrink-0 text-[10.5px] font-semibold text-silver ml-1">
                        {formatDate(doc.date, locale)}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
