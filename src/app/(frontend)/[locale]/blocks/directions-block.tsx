import { getDirections } from '@/api/find/find-directions'
import { PATHS } from '@/config/paths'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

import { TypedLocale } from 'payload'

export default async function DirectionsBlock({ locale }: { locale: TypedLocale }) {
  const directions = await getDirections(locale)
  const t = await getTranslations('home')
  return (
    <section className="dir-bg">
      <h2 className="s-title">{t('directions')}</h2>
      <div className="dir-grid">
        {directions.map((dir, i) =>
          i === 0 ? (
            <Link href={PATHS.EDU_PROGRAMS} className="dir-card" key={i}>
              <div className="dir-icon">{dir.icon}</div>
              <h3>{dir.title}</h3>
              <p>{dir.description}</p>
            </Link>
          ) : (
            <div className="dir-card" key={i}>
              <div className="dir-icon">{dir.icon}</div>
              <h3>{dir.title}</h3>
              <p>{dir.description}</p>
            </div>
          ),
        )}
      </div>
    </section>
  )
}
