import RichText from '@/components/RichText'
import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'

async function fetchPosts(locale: string) {
  const res = await fetch(`http://localhost:3000/api/posts?depth=1&limit=10&locale=${locale}`)
  if (!res.ok) throw new Error(`Failed to fetch posts`)
  const data = await res.json()
  return data.docs as Post[]
}

type Post = {
  id: number
  title: string
  excerpt: string
  slug: string
  heroImage: { url: string } | null
  content: any
  populatedAuthors: { id: number; name: string }[]
  publishedAt: string
}

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function AboutPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [posts, t] = await Promise.all([fetchPosts(locale), getTranslations('about')])

  return (
    <main className="container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="s-title mb-8">{t('title')}</h1>
        <div className="prose max-w-none text-muted mb-16">
          <p className="text-lg">{t('description1')}</p>
          <p className="text-lg mt-4">{t('description2')}</p>
        </div>

        <section id="leadership" className="mb-20">
          <h2 className="s-title mb-10">{t('leadership')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((doc) => (
              <div
                key={doc.id}
                className="mem-card border border-silver-lt p-6 rounded-xl hover:translate-y-[-4px] transition-all bg-white shadow-[0_8px_40px_rgba(30,53,96,0.08)]"
              >
                <div className="w-24 h-24 bg-sky-pale rounded-full mx-auto mb-4 flex items-center justify-center text-4xl overflow-hidden">
                  {doc.heroImage?.url ? (
                    <img
                      src={doc.heroImage.url}
                      alt={doc.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    '👤'
                  )}
                </div>
                <h3
                  className="font-bold text-navy text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {doc.title}
                </h3>
                <div className="text-sky text-sm font-semibold mb-3">
                  {doc.populatedAuthors.map((a) => a.name).join(', ')}
                </div>
                <p className="text-muted text-sm line-clamp-4">{doc.excerpt}</p>
                {doc.content && (
                  <div className="mt-4 text-sm text-muted">
                    <RichText data={doc.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="partners">
          <h2 className="s-title mb-10">{t('partners')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* TODO: подключить коллекцию partners из Payload */}
          </div>
        </section>
      </div>
    </main>
  )
}
