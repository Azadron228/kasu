import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Setting } from '@/payload-types'

export async function Footer({ locale }: { locale: string }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="f-col f-brand">
          <div
            className="f-logo"
            style={{
              backgroundColor: '#1E3560',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            K
          </div>
          <div className="f-brand-text">
            <h3>КАСУ U3A</h3>
            <p>Казахстанская Ассоциация Сеньорских Университетов (U3A)</p>
          </div>
        </div>

        <div className="f-col">
          <h4>Организация</h4>
          <Link href="/about">О нас</Link>
          <Link href="/about#leadership">Руководство</Link>
          <Link href="/members">Участники</Link>
          <Link href="/documents">Документы</Link>
        </div>

        <div className="f-col">
          <h4>Деятельность</h4>
          <Link href="/activities">Направления</Link>
          <Link href="/activities#projects">Проекты</Link>
          <Link href="/news">Новости и события</Link>
          <Link href="/about#partners">Партнеры</Link>
        </div>

        <div className="f-col">
          <h4>Помощь</h4>
          <Link href="/contacts#faq">Частые вопросы</Link>
          <Link href="/join">Вступить в ассоциацию</Link>
          <Link href="/contacts">Контакты</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} КАСУ U3A. Все права защищены.</div>
        <div>Казахстан</div>
      </div>
    </footer>
  )
}
