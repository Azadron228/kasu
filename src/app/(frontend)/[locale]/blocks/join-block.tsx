import { PATHS } from '@/config/paths'
import { Link } from '@/i18n/routing'
import { Homepage } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

export async function JoinBlock({ homepage }: { homepage: Homepage }) {
  const t = await getTranslations('home')
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-mid text-center px-6 lg:px-16 py-24" id="join">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-80 bg-[radial-gradient(ellipse,rgba(184,208,232,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      <img
        className="w-24 h-24 rounded-full mx-auto mb-7 ring-4 ring-sky/20 shadow-2xl relative z-10 object-cover"
        src="/logo.svg"
        alt="Logo"
      />
      <h2 className="relative z-10 font-serif text-4xl text-brand-white mb-4">
        {homepage?.joinTitle}
      </h2>
      <p className="relative z-10 text-brand-white/70 text-base max-w-lg mx-auto mb-9 leading-relaxed">
        {homepage?.joinSubtitle}
      </p>
      <div className="relative z-10 flex flex-wrap justify-center gap-4">
        <Link
          href={PATHS.JOIN}
          className="bg-gold text-navy-deep font-extrabold text-sm px-10 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all"
        >
          {t('joinBtn')}
        </Link>
        <Link
          href="/about"
          className="bg-brand-white/10 border border-brand-white/25 text-brand-white font-bold text-sm px-10 py-4 rounded-full hover:bg-brand-white/20 transition-all font-sans"
        >
          Узнать условия
        </Link>
      </div>
    </section>
  )
}
