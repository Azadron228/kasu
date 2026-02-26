import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function MembersPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100, // retrieve all or paginate
  })

  // Group by region if necessary, or just list
  return (
    <main className="container py-16">
      <h1 className="s-title mb-6">Участники ассоциации</h1>
      <p className="text-muted text-lg mb-12 max-w-2xl">
        Сеть университетов третьего возраста представлена во многих регионах Казахстана. Присоединяйтесь к нам, чтобы развивать образование для старшего поколения в вашем городе.
      </p>
      
      <div className="mem-grid">
        {members.map((member, i) => (
          <div className="mem-card" key={i}>
            <div className="mem-logo">U</div>
            <h4>{member.name}</h4>
            <div className="mt-1 mb-2">
              <span className="block">{member.city}</span>
              <span className="text-sky font-semibold" style={{ fontSize: '10px' }}>{member.region}</span>
            </div>
            {member.website && (
              <a href={member.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-1.5 bg-sky-pale text-steel rounded hover:bg-navy hover:text-white transition-colors">
                Перейти на сайт
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
