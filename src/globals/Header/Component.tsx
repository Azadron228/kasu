import React from 'react'
import Link from 'next/link'
import { LangSwitcher } from './LangSwitcher'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { Logo } from '@/components/Logo/Logo'
import { MobileMenu } from './MobileMenu'

export async function Header({ locale }: { locale: TypedLocale }) {
  const t = await getTranslations('nav')

  const navLinks = [
    { href: '/#about', label: t('about') },
    { href: '/activities', label: t('activities') },
    { href: '/news', label: t('news') },
    { href: '/members', label: t('members') },
    { href: '/documents', label: t('documents') },
    { href: '/#contacts', label: t('contacts') },
  ]

  const joinLabel = t('join')

  return (
    <>
      <div className="bg-navy-deep px-6 lg:px-16 py-2 flex justify-between items-center">
        <span className="text-sky text-xs font-semibold tracking-wider opacity-70">
          {t('topBarText')}
        </span>
        <LangSwitcher />
      </div>
      <header className="sticky top-0 z-50 bg-brand-white border-b border-silver-lt shadow-md h-20 px-6 lg:px-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 no-underline">
          <Logo className="w-16 h-16 rounded-full overflow-hidden shadow-lg shrink-0" />
          <div className="block">
            <div className="font-serif text-2xl font-extrabold text-navy leading-none uppercase">КАСУ</div>
            <div className="hidden xs:block text-[10px] sm:text-xs text-brand-muted font-semibold leading-tight max-w-[180px] sm:max-w-xs mt-0.5">
              {t('siteFullName')}
            </div>
            <span className="inline-block bg-navy text-sky text-[10px] sm:text-xs font-extrabold px-1.5 py-0.5 rounded mt-1 tracking-widest leading-none">
              {locale === 'ru' ? 'U3A КАЗАХСТАН' : locale === 'kk' ? 'U3A ҚАЗАҚСТАН' : 'U3A KAZAKHSTAN'}
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-navy font-bold text-sm px-3 py-2 rounded-lg hover:bg-sky-pale hover:text-steel transition-all whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="ml-2 bg-navy text-brand-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-navy-mid hover:-translate-y-0.5 transition-all"
          >
            {joinLabel}
          </Link>
        </nav>
        <MobileMenu navLinks={navLinks} joinButtonLabel={joinLabel} />
      </header>
    </>
  )
}
