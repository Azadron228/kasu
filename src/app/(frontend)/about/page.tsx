import RichText from '@/components/RichText'
import React from 'react'

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api'

async function fetchPosts() {
  const res = await fetch(`http://localhost:3000/api/posts?depth=1&limit=10`)
  if (!res.ok) throw new Error(`Failed to fetch posts`)
  const data = await res.json()
  return data.docs as Post[]
}


// Минимальные типы под структуру ответа
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

export default async function AboutPage() {
  const posts = await fetchPosts()

  return (
    <main className="container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="s-title mb-8">О нас - U3A Kazakhstan</h1>
        <div className="prose max-w-none text-muted mb-16">
          <p className="text-lg">
            Казахстанская Ассоциация Сеньорских Университетов (U3A) — это некоммерческая
            организация, объединяющая учреждения, предоставляющие образовательные программы для
            людей серебряного возраста.
          </p>
          <p className="text-lg mt-4">
            Наша миссия — создание условий для активного долголетия, непрерывного обучения и
            социализации старшего поколения.
          </p>
        </div>

        <section id="leadership" className="mb-20">
          <h2 className="s-title mb-10">Руководство</h2>
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

        {/* Секция партнёров — добавь fetchPartners() по аналогии когда будет коллекция */}
        <section id="partners">
          <h2 className="s-title mb-10">Наши партнеры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* TODO: подключить коллекцию partners из Payload */}
          </div>
        </section>
      </div>
    </main>
  )
}
