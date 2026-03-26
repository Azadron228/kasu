import { getDirections } from '@/api/find/find-directions'
import { PATHS } from '@/config/paths'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

import { TypedLocale } from 'payload'

function DirectionCard({ dir }: { dir: any }) {
  return (
    <>
      <div className="w-12 h-12 bg-sky-pale rounded-xl flex items-center justify-center text-2xl mb-5">
        {dir.icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-navy mb-2.5">{dir.title}</h3>
      <p className="text-brand-muted text-sm leading-relaxed">{dir.description}</p>
    </>
  )
}

export default async function DirectionsBlock({ locale }: { locale: TypedLocale }) {
  const directions = await getDirections(locale)
  const t = await getTranslations('home')
  return (
    <section className="bg-sky-pale px-6 lg:px-16 py-20" id="activities">
      <div className="max-w-xl mb-12">
        <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
          {t('directions')}
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4">
          {t('directionsTitle')}
        </h2>
        <p className="text-brand-muted text-base leading-relaxed">
          {t('directionsDesc')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directions.map((dir, i) =>
          i === 0 ? (
            <Link
              href={PATHS.EDU_PROGRAMS}
              className="bg-brand-white p-8 rounded-2xl shadow-custom border-t-4 border-navy hover:-translate-y-1.5 transition-all"
              key={dir.id || i}
            >
              <DirectionCard dir={dir} />
            </Link>
          ) : (
            <div
              className="bg-brand-white p-8 rounded-2xl shadow-custom border-t-4 border-navy hover:-translate-y-1.5 transition-all"
              key={dir.id || i}
            >
              <DirectionCard dir={dir} />
            </div>
          ),
        )}
      </div>
    </section>
  )
}

