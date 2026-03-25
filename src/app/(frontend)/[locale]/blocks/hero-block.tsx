import { Homepage } from '@/payload-types'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function HeroBlock({ homepage }: { homepage: Homepage }) {
  const t = await getTranslations('blocks.hero')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-mid min-h-[640px] px-6 lg:px-16 py-20 flex flex-col lg:grid lg:grid-cols-2 items-center">
      <div className="absolute -top-32 -right-20 w-[560px] h-[560px] bg-[radial-gradient(circle,rgba(184,208,232,0.1)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 left-[38%] w-96 h-96 bg-[radial-gradient(circle,rgba(184,160,96,0.08)_0%,transparent_65%)] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-sky/10 border border-sky/25 text-sky text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-7">
          <span className="w-1.5 h-1.5 bg-sky rounded-full opacity-70"></span>
          {t('tagline')}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-white leading-[1.1] mb-6 whitespace-pre-line">
          {t('title')}
        </h1>
        <p className="text-brand-white/70 text-lg leading-relaxed max-w-lg mb-10">
          {t('desc')}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Link
            href="/join"
            className="bg-gold text-navy-deep font-extrabold text-sm px-7 py-3.5 rounded-full shadow-[0_6px_20px_rgba(184,160,96,0.35)] hover:-translate-y-1 hover:shadow-xl transition-all flex items-center gap-2"
          >
            {t('joinBtn')}
          </Link>
          <Link
            href="/about"
            className="bg-brand-white/10 border border-brand-white/25 text-brand-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-brand-white/20 transition-all"
          >
            {t('learnMoreBtn')}
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex relative z-10 flex-col gap-5 items-end">
        <div className="bg-brand-white/10 backdrop-blur-3xl border border-brand-white/10 p-7 rounded-3xl w-80">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-lt flex items-center justify-center text-xl shrink-0">
              🎓
            </div>
            <div>
              <div className="font-serif text-brand-white text-base font-semibold leading-tight">
                {t('welcomeTitle')}
              </div>
              <div className="text-sky text-xs font-bold uppercase tracking-wider">
                {t('welcomeRole')}
              </div>
            </div>
          </div>
          <blockquote className="text-brand-white/80 text-sm leading-relaxed italic border-l-2 border-gold pl-3.5">
            {t('quote')}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
