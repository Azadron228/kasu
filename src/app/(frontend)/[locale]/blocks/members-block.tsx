import getMembers from '@/api/find/find-members'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { Media } from '@/payload-types'

export default async function MembersBlock({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations('home')
  const members = await getMembers(locale)
  return (
    <section className="px-6 lg:px-16 py-20 bg-brand-white" id="members">
      <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
        {t('members')}
      </div>
      <h2 className="font-serif text-3xl lg:text-4xl text-brand-text mb-6">
        {t('membersTitle')}
      </h2>
      <p className="text-brand-muted text-base max-w-2xl mb-12">
        {t('membersSub')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, i) => {
          const logo = member.logo as Media | null
          return (
            <div
              key={member.id ?? i}
              className="bg-brand-white rounded-2xl p-8 border border-silver-lt shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="w-16 h-16 bg-sky-pale rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform overflow-hidden p-2">
                {logo?.url ? (
                  <img src={logo.url} alt={member.shortName} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-brand-muted">🏛️</span>
                )}
              </div>
              <h4 className="font-serif text-lg text-brand-text mb-2 line-clamp-2 min-h-[3.5rem]">
                {member.shortName}
              </h4>
              <span className="text-steel text-sm block mb-4">
                {member.city}
              </span>
              {member.website && (
                <a
                  href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                  className="text-gold font-bold text-sm hover:text-gold-lt flex items-center gap-1 mt-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('membersSite')} →
                </a>
              )}
            </div>
          )
        })}

        {/* Join Card */}
        <div className="bg-sky-pale rounded-2xl p-8 border-2 border-dashed border-silver flex flex-col items-center justify-center text-center shadow-none min-h-[16rem]">
          <div className="text-3xl mb-4 text-brand-muted font-light">＋</div>
          <h4 className="text-brand-muted font-serif text-lg mb-4 whitespace-pre">
            {t('membersJoin').replace(' в Ассоциацию', '\nв Ассоциацию')}
          </h4>
          <Link
            href="/join"
            className="text-gold font-extrabold text-sm flex items-center gap-1 hover:text-gold-lt"
          >
            {t('membersJoinBtn')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
