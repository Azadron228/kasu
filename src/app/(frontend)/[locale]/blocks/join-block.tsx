import { PATHS } from '@/config/paths'
import { Link } from '@/i18n/routing'
import { Homepage } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

export async function JoinBlock({ homepage }: { homepage: Homepage }) {
  const t = await getTranslations('home')
  return (
    <section className="join">
      <h2>{homepage?.joinTitle}</h2>
      <p>{homepage?.joinDescription}</p>
      <div className="join-btns">
        <Link href={PATHS.join} className="btn-prim">
          {t('joinBtn')}
        </Link>
      </div>
    </section>
  )
}
