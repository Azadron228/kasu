import React from 'react'
import Link from 'next/link'
import { LangSwitcher } from './LangSwitcher'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { Logo } from '@/components/Logo/Logo'

export async function Header({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations('nav')

  return (
    <>
      <div className="bg-navy-deep px-6 lg:px-16 py-2 flex justify-between items-center">
        <span className="text-sky text-xs font-semibold tracking-wider opacity-70">
          Қазақстандық Күміс Университеттер Қауымдастығы
        </span>
        <LangSwitcher />
      </div>
      <header className="sticky top-0 z-50 bg-brand-white border-b border-silver-lt shadow-md h-20 px-6 lg:px-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 no-underline">
          <Logo className="w-16 h-16 rounded-full overflow-hidden shadow-lg shrink-0" />
          <div className="hidden sm:block">
            <div className="font-serif text-2xl font-extrabold text-navy leading-none uppercase">КАСУ</div>
            <div className="text-xs text-brand-muted font-semibold leading-tight max-w-xs mt-0.5">
              {t('siteFullName')}
            </div>
            <span className="inline-block bg-navy text-sky text-xs font-extrabold px-1.5 py-0.5 rounded mt-1 tracking-widest">
              U3A KAZAKHSTAN
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link href="/about" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('about')}</Link>
          <Link href="/activities" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('activities')}</Link>
          <Link href="/news" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('news')}</Link>
          <Link href="/members" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('members')}</Link>
          <Link href="/documents" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('documents')}</Link>
          <Link href="/contacts" className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all">{t('contacts')}</Link>
          <Link href="/join" className="ml-2 bg-navy text-brand-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-navy-mid hover:-translate-y-0.5 transition-all">
            {t('join')}
          </Link>
        </nav>
      </header>
    </>
  )
}
