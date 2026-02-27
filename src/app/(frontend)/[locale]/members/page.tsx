import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { MemberCard, MemberJoinCard } from './MemberCard'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function MembersPage() {
  const payload = await getPayload({ config: configPromise })

  // Получаем членов
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100,
    depth: 1,
  })

  return (
    <section className="px-6 md:px-12 xl:px-[72px] py-11 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            id={member.id}
            index={i}
            shortName={member.shortName}
            fullName={member.fullName}
            city={member.city}
            region={typeof member.region === 'object' ? member.region : { name: '' }}
            status={member.status}
            logo={member.logo}
            website={member.website}
            description={member.description}
          />
        ))}

        {/* Join CTA always last */}
        <MemberJoinCard />
      </div>
    </section>
  )
}
