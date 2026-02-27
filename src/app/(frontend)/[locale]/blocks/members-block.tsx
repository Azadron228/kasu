import getMembers from '@/api/find/find-members'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { T } from 'node_modules/vitest/dist/chunks/traces.d.402V_yFI'
import { TypedLocale } from 'payload'

export default async function MembersBlock({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations('home')
  const members = await getMembers(locale)
  return (
    <section>
      <h2 className="s-title">{t('members')}</h2>
      <div className="mem-grid">
        {members.map((member, i) => (
          <div className="mem-card" key={i}>
            <div className="mem-logo">U</div>
            <h4>{member?.name}</h4>
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
  )
}
