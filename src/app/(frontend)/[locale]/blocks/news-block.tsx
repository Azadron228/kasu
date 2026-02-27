import getNews from '@/api/find/find-news'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

import { TypedLocale } from 'payload'

export default async function NewsBlock({ locale }: { locale: TypedLocale }) {
  const news = await getNews(locale)
  const t = await getTranslations('home')
  return (
    <section className="news-bg">
      <div className="news-top">
        <div>
          <div className="s-label">{t('news')}</div>
          <h2 className="s-title">{t('newsLatest')}</h2>
        </div>
        <Link
          href="/news"
          className="btn-ghost"
          style={{ color: 'var(--navy)', borderColor: 'var(--navy)' }}
        >
          {t('newsAll')}
        </Link>
      </div>
      <div className="news-grid">
        {news.map((post, i) => (
          <Link
            href={`/news/${post.slug}`}
            className={`news-card ${i === 0 ? 'main' : ''}`}
            key={i}
            style={{ textDecoration: 'none' }}
          >
            <div className="n-img">
              <span className="n-tag">{t('newsTag')}</span>
            </div>
            <div className="n-body">
              <div className="n-date">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale) : ''}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt || ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
