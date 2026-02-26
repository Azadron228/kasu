import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import Link from 'next/link'
import type { Setting } from '@/payload-types'
import { LangSwitcher } from './LangSwitcher'
import { getTranslations } from 'next-intl/server'

export async function Header({ locale }: { locale: string }) {
  const settings = (await getCachedGlobal('settings', 1)()) as Setting
  const t = await getTranslations('nav')

  return (
    <>
      <div className="lang-bar">
        <span className="lang-bar-left">Қазақстандық Күміс Университеттер Қауымдастығы</span>
        <LangSwitcher />
      </div>
      <header>
        <Link href="/" className="logo-area">
          <div
            className="logo-img"
            style={{
              backgroundColor: '#1E3560',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            KASU
          </div>
          <div className="logo-text">
            <div className="abbr">{settings?.siteName || 'КАСУ'}</div>
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
