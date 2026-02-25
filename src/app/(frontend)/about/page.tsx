import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: leadership } = await payload.find({
    collection: 'leadership',
    sort: 'order',
  })
  
  const { docs: partners } = await payload.find({
    collection: 'partners',
  })

  return (
    <main className="container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="s-title mb-8">О нас - U3A Kazakhstan</h1>
        <div className="prose max-w-none text-muted mb-16">
          <p className="text-lg">Казахстанская Ассоциация Сеньорских Университетов (U3A) — это некоммерческая организация, объединяющая учреждения, предоставляющие образовательные программы для людей серебряного возраста.</p>
          <p className="text-lg mt-4">Наша миссия — создание условий для активного долголетия, непрерывного обучения и социализации старшего поколения.</p>
        </div>

        <section id="leadership" className="mb-20">
          <h2 className="s-title mb-10">Руководство</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((person, i) => (
              <div key={i} className="mem-card border border-silver-lt p-6 rounded-xl hover:translate-y-[-4px] transition-all bg-white shadow-[0_8px_40px_rgba(30,53,96,0.08)]">
                <div className="w-24 h-24 bg-sky-pale rounded-full mx-auto mb-4 flex items-center justify-center text-4xl overflow-hidden">
                  {/* Ideally render person.photo */}
                  👤
                </div>
                <h3 className="font-bold text-navy text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{person.name}</h3>
                <div className="text-sky text-sm font-semibold mb-3">{person.role}</div>
                <p className="text-muted text-sm line-clamp-4">{person.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="partners">
          <h2 className="s-title mb-10">Наши партнеры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <div key={i} className="p-6 border border-silver-lt rounded-xl text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-16 flex items-center justify-center mb-3">
                  {/* partner.logo */}
                  <div className="text-3xl">🤝</div>
                </div>
                <h4 className="font-bold text-navy text-sm">{partner.name}</h4>
                <div className="text-xs text-muted mt-1 uppercase tracking-wider">{partner.type}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
