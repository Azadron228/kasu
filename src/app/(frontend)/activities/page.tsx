import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function ActivitiesPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: directions } = await payload.find({
    collection: 'directions',
    sort: 'order',
  })
  
  const { docs: projects } = await payload.find({
    collection: 'projects',
  })

  return (
    <main className="container py-16">
      <h1 className="s-title mb-12">Деятельность ассоциации</h1>
      
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-navy mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Направления работы</h2>
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

      <section id="projects">
        <h2 className="text-2xl font-bold text-navy mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Проекты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <div className="p-6 border border-silver-lt rounded-xl bg-white shadow-[0_8px_40px_rgba(30,53,96,0.06)]" key={i}>
               <div className="text-xs font-bold uppercase tracking-wider text-sky mb-3">
                 {proj.status === 'active' ? '🟢 Активный' : proj.status === 'completed' ? '⚫ Завершен' : '🟡 Планируется'}
               </div>
               <h3 className="text-xl font-bold text-navy mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{proj.title}</h3>
               <p className="text-muted text-sm line-clamp-3">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
