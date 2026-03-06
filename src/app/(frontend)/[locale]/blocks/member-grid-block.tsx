import { getFilteredMembers } from '@/api/find/find-members'
import { MemberCard, MemberJoinCard } from './member-card-block'

type Props = {
  status?: string
  region?: string
  search?: string
  locale: any
}

export default async function MembersGridBlock({ status, region, search, locale }: Props) {
  const members = await getFilteredMembers({ status, region, search, locale })

  return (
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
          logo={member.logo as any}
          main_url={member.main_url}
          silver_url={member.silver_url}
        />
      ))}
      {/* Join CTA always last */}
      <MemberJoinCard />
    </div>
  )
}
