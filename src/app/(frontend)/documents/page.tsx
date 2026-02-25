import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function DocumentsPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: documents } = await payload.find({
    collection: 'documents',
    sort: '-year',
    limit: 100,
  })

  // Grouping documents by category
  const grouped = documents.reduce((acc, doc) => {
    const cat = doc.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(doc)
    return acc
  }, {} as Record<string, any[]>)

  const categoryLabels: Record<string, string> = {
    charter: 'Уставные документы',
    regulations: 'Положения',
    annual_reports: 'Годовые отчеты',
    agreements: 'Соглашения и меморандумы',
    other: 'Прочие документы'
  }

  return (
    <main className="container py-16">
      <h1 className="s-title mb-6">Документы</h1>
      <p className="text-muted text-lg mb-12 max-w-2xl">
        В данном разделе представлены официальные документы Казахстанской Ассоциации Сеньорских Университетов, отчеты о деятельности и нормативные акты.
      </p>

      {Object.keys(grouped).map(category => (
        <section key={category} className="mb-14">
          <h2 className="text-2xl font-bold text-navy mb-6 border-b border-silver-lt pb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {categoryLabels[category]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[category].map((doc, i) => (
              <div key={i} className="doc-card border border-silver-lt bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="doc-icon text-sky mb-4 text-3xl">📄</div>
                <h3 className="font-bold text-navy text-lg mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{doc.title}</h3>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-sm text-muted bg-sky-pale px-3 py-1 rounded-md font-semibold">{doc.year}</span>
                  {/* Assuming doc.file is populated with URL */}
                  {doc.file && typeof doc.file === 'object' && doc.file.url ? (
                    <a href={doc.file.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-steel hover:text-navy transition-colors underline underline-offset-4">
                      Скачать
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
