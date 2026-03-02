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
      <div className="lang-bar">
        {/* <g
          xmlns="http://www.w3.org/2000/svg"
          transform="translate(0.000000,913.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        ></g> */}
        <span className="lang-bar-left"> Қазақстандық Күміс Университеттер Қауымдастығы</span>
        <LangSwitcher />
      </div>
      <header>
        <Link href="/" className="logo-area">
          <Logo color="#1e2d5e" />
          <div className="logo-text">
            <div className="abbr">КАСУ</div>
            <div className="full">{t('siteFullName')}</div>
            <div className="u3a">U3A KAZAKHSTAN</div>
          </div>
        </Link>
        <nav>
          <Link href="/about">{t('about')}</Link>
          <Link href="/activities">{t('activities')}</Link>
          <Link href="/news">{t('news')}</Link>
          <Link href="/members">{t('members')}</Link>
          <Link href="/documents">{t('documents')}</Link>
          <Link href="/contacts">{t('contacts')}</Link>
          <Link href="/join" className="nav-cta">
            {t('join')}
          </Link>
        </nav>
      </header>
    </>
  )
}
