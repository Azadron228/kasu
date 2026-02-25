import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import Link from 'next/link'
import type { Settings } from '@/payload-types'

export async function Header() {
  const settingsData: Settings = await getCachedGlobal('settings', 1)()

  return (
    <>
      <div className="lang-bar">
        <span className="lang-bar-left">Қазақстандық Күміс Университеттер Қауымдастығы</span>
        <div className="lang-bar-right">
          <Link href="#" className="lang-btn">ҚАЗ</Link>
          <Link href="#" className="lang-btn active">РУС</Link>
          <Link href="#" className="lang-btn">ENG</Link>
        </div>
      </div>

      <header>
        <Link href="/" className="logo-area">
          <div className="logo-img" style={{ backgroundColor: '#1E3560', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            KASU
          </div>
          <div className="logo-text">
            <div className="abbr">{settingsData?.siteName || 'КАСУ'}</div>
            <div className="full">Казахстанская Ассоциация Сеньорских Университетов</div>
            <div className="u3a">U3A KAZAKHSTAN</div>
          </div>
        </Link>
        <nav>
          <Link href="/about">О нас</Link>
          <Link href="/activities">Деятельность</Link>
          <Link href="/news">Новости</Link>
          <Link href="/members">Участники</Link>
          <Link href="/documents">Документы</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/join" className="nav-cta">Вступить</Link>
        </nav>
      </header>
    </>
  )
}
