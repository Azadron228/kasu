import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import RichText from '@/components/RichText'
import type { Homepage, Setting } from '@/payload-types'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config: configPromise })
  const t = await getTranslations('home')

  const homepage = (await getCachedGlobal('homepage', 1)()) as Homepage
  const settings = (await getCachedGlobal('settings', 1)()) as Setting

  const { docs: directions } = await payload.find({
    collection: 'directions',
    limit: 6,
    sort: 'order',
    locale,
  })

  const { docs: news } = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-publishedAt',
    locale,
  })

  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 8,
    locale,
  })

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="dot"></span> {homepage?.heroSubheading || 'Официальный сайт'}
          </div>
          <h2>{homepage?.heroHeadline || 'КАСУ U3A'}</h2>
          <div className="hero-btns">
            <Link href="/about" className="btn-prim">
              {homepage?.heroPrimaryCtaLabel || 'Подробнее'}
            </Link>
            <Link href="/join" className="btn-ghost">
              {homepage?.heroSecondaryCtaLabel || 'Вступить'}
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <div className="greeting-head">
              <div className="g-icon">❝</div>
              <div>
                <div className="g-name">{homepage?.presidentName}</div>
                <div className="g-role">{homepage?.presidentRole}</div>
              </div>
            </div>
            <blockquote>{homepage?.presidentQuote}</blockquote>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {homepage?.stats && homepage.stats.length > 0 && (
        <div className="stats">
          {homepage.stats.map((stat, i) => (
            <div className="stat" key={i}>
              <span className="n">{stat.number}</span>
              <span className="l">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── DIRECTIONS ── */}
      <section className="dir-bg">
        <h2 className="s-title">{t('directions')}</h2>
        <div className="dir-grid">
          {directions.map((dir, i) => (
            <div className="dir-card" key={i}>
              <div className="dir-icon">{dir.icon}</div>
              <h3>{dir.title}</h3>
              <p>{dir.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section>
        <div className="about-inner">
          <div className="about-vis">
            <img className="about-vis-logo" src="/logo.png" alt="КАСУ U3A" />
            <h3>Миссия и цели КАСУ</h3>
            {homepage?.aboutInfoBlocks?.map((block, i) => (
              <div className="info-block" key={block.id ?? i}>
                <h4>{block.heading}</h4>
                <p>{block.body}</p>
              </div>
            ))}
          </div>
          <div className="about-text">
            <div className="s-label">Об Ассоциации</div>
            <h2 className="s-title">Kazakhstan Association of Universities of the Third Age</h2>
            {homepage?.aboutBody && (
              <RichText data={homepage.aboutBody} enableProse={false} enableGutter={false} />
            )}
            {homepage?.aboutBullets && (
              <ul className="about-list">
                {homepage.aboutBullets.map((b, i) => (
                  <li key={b.id ?? i}>{b.point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
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

      {/* ── MEMBERS ── */}
      <section>
        <h2 className="s-title">{t('members')}</h2>
        <div className="mem-grid">
          {members.map((member, i) => (
            <div className="mem-card" key={i}>
              <div className="mem-logo">U</div>
              <h4>{member.name}</h4>
              <span>{member.city}</span>
              {member.website && <a href={member.website}>{t('membersSite')}</a>}
            </div>
          ))}
          <div
            className="mem-card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <h4>{t('membersJoin')}</h4>
            <Link href="/join" className="btn-prim" style={{ margin: '14px auto 0' }}>
              {t('membersJoinBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── JOIN ── */}
      <section className="join">
        <h2>{homepage?.joinTitle}</h2>
        <p>{homepage?.joinDescription}</p>
        <div className="join-btns">
          <Link href="/join" className="btn-prim">
            {t('joinBtn')}
          </Link>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section>
        <div className="contacts-inner">
          <div>
            <h2 className="s-title">{t('contacts')}</h2>
            <div className="contact-info">
              <div className="c-row">
                <div className="c-icon">📍</div>
                <div>
                  <div className="c-label">{t('contactsAddress')}</div>
                  <div className="c-val">{settings?.contactAddress}</div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon">📞</div>
                <div>
                  <div className="c-label">{t('contactsPhone')}</div>
                  <div className="c-val">{settings?.contactPhone}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>{t('contactsWrite')}</h3>
            <form>
              <input type="text" placeholder={t('contactsName')} required />
              <input type="email" placeholder={t('contactsEmail')} required />
              <textarea placeholder={t('contactsMessage')} rows={4} required></textarea>
              <button type="submit" className="btn-prim">
                {t('contactsSend')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
