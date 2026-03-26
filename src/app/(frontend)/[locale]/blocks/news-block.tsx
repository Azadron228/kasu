import getNews from '@/api/find/find-news'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

import { TypedLocale } from 'payload'

import { Media } from '@/components/Media'

export default async function NewsBlock({ locale }: { locale: TypedLocale }) {
  const news = await getNews(locale)
  const t = await getTranslations('home')
  return (
    <section className="bg-sky-pale px-6 lg:px-16 py-20" id="news">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
            {t('news')}
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-tight">
            {t('newsLatest')}
          </h2>
        </div>
        <Link
          href="/news"
          className="bg-brand-white/10 border border-navy/20 text-navy font-bold text-sm px-6 py-2.5 rounded-full hover:bg-navy hover:text-brand-white transition-all"
        >
          {t('newsAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((newsItem, i) => {
          const firstTag = newsItem.tags?.[0]
          const tagLabel = firstTag && typeof firstTag === 'object' ? firstTag.title : t('newsTag')

          return (
            <Link
              href={`/news/${newsItem.slug}`}
              className={`group bg-brand-white rounded-2xl overflow-hidden shadow-custom transition-all hover:-translate-y-1 ${i === 0 ? 'lg:col-span-2' : ''
                }`}
              key={i}
            >
              <div
                className={`relative bg-gradient-to-br from-navy to-navy-mid flex items-center justify-center text-4xl text-brand-white/20 ${i === 0 ? 'h-64 text-7xl' : 'h-48'
                  }`}
              >
                {newsItem.heroImage && typeof newsItem.heroImage !== 'string' ? (
                  <Media resource={newsItem.heroImage} fill imgClassName="object-cover transition-transform duration-500 group-hover:scale-110" htmlElement={null} />
                ) : (
                  <span>📰</span>
                )}
                <span className="absolute top-4 left-4 z-10 bg-steel text-brand-white text-[0.6rem] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded">
                  {tagLabel}
                </span>
              </div>
            <div className="p-6">
              <div className="text-xs text-brand-muted mb-2 font-bold">
                {newsItem.publishedAt ? new Date(newsItem.publishedAt).toLocaleDateString(locale) : ''}
              </div>
              <h3
                className={`font-serif text-navy leading-tight mb-3 group-hover:text-steel transition-colors ${i === 0 ? 'text-2xl' : 'text-lg'
                  }`}
              >
                {newsItem.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed line-clamp-3">
                {newsItem.excerpt || ''}
              </p>
            </div>
          </Link>
        )})}
      </div>
    </section>
  )
}
