import { getFilteredMembers } from '@/api/find/find-members'
import { MemberCard, MemberJoinCard } from './member-card-block'

type Props = {
  status?: string
  region?: string
  search?: string
}

export default async function MembersGridBlock({ status, region, search }: Props) {
  const members = await getFilteredMembers({ status, region, search })

  return (
    <div className="px-6 md:px-12 xl:px-[72px] py-11 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            id={member.id}
            index={i}
            shortName={member.shortName}
            fullName={member.fullName}
            city={member.city}
            region={
              typeof member.region === 'object' && member.region !== null
                ? member.region
                : { name: '' }
            }
            status={member.status}
            logo={member.logo}
            website={member.website ?? ''}
            description={member.description}
          />
        ))}
        {/* Join CTA always last */}
        <MemberJoinCard />
      </div>
    </div>
  )
}
