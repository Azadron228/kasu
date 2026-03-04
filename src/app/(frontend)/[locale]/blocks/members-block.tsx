import getMembers from '@/api/find/find-members'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

export default async function MembersBlock({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations('home')
  const members = await getMembers(locale)
  return (
    <section className="px-6 lg:px-16 py-20" id="members">
      <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
        Наши партнеры
      </div>
      <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-tight">
        {t('members')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {members.map((member, i) => (
          <div
            className="group bg-brand-white rounded-2xl p-6 text-center shadow-custom border border-silver-lt transition-all hover:border-steel hover:-translate-y-1"
            key={i}
          >
            <div className="w-16 h-16 bg-sky-pale rounded-xl mx-auto mb-4 flex items-center justify-center text-3xl text-navy">
              🏢
            </div>
            <h4 className="font-serif text-sm text-navy mb-1 line-clamp-2 min-h-[40px]">
              {member?.fullName}
            </h4>
            <span className="text-xs text-brand-muted">{member.city}</span>
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-xs text-steel font-bold hover:text-navy transition-colors"
              >
                {t('membersSite')}
              </a>
            )}
          </div>
        ))}
        <div className="bg-brand-white rounded-2xl p-6 text-center shadow-custom border border-dashed border-silver flex flex-col items-center justify-center">
          <h4 className="font-serif text-base text-navy mb-4 font-bold">{t('membersJoin')}</h4>
          <Link
            href="/join"
            className="bg-navy text-brand-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-navy-mid transition-all"
          >
            {t('membersJoinBtn')}
          </Link>
        </div>
      </div>
    </section>
  )
}
