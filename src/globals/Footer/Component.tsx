import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-navy-deep text-brand-white/60 px-6 lg:px-16 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-1 flex items-start gap-4">
          <Logo color='white' outline='white' className="w-12 h-12 rounded-full overflow-hidden shadow-lg shrink-0" />
          <div>
            <h3 className="font-serif text-brand-white text-base mb-2">КАСУ — U3A Kazakhstan</h3>
            <p className="text-xs leading-relaxed">
              Официальная некоммерческая организация Республики Казахстан. Kazakhstan Association of
              Universities of the Third Age.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
            Организация
          </h4>
          <div className="space-y-2">
            <Link href="/about" className="block text-sm hover:text-sky transition-colors">
              Об Ассоциации
            </Link>
            <Link href="/about#leadership" className="block text-sm hover:text-sky transition-colors">
              Руководство
            </Link>
            <Link href="/members" className="block text-sm hover:text-sky transition-colors">
              Члены КАСУ
            </Link>
            <Link href="/documents" className="block text-sm hover:text-sky transition-colors">
              Документы
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
            Деятельность
          </h4>
          <div className="space-y-2">
            <Link href="/activities" className="block text-sm hover:text-sky transition-colors">
              Направления
            </Link>
            <Link
              href="/activities#projects"
              className="block text-sm hover:text-sky transition-colors"
            >
              Проекты
            </Link>
            <Link href="/news" className="block text-sm hover:text-sky transition-colors">
              Новости и события
            </Link>
            <Link href="/about#partners" className="block text-sm hover:text-sky transition-colors">
              Партнёры
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">Помощь</h4>
          <div className="space-y-2">
            <Link href="/contacts#faq" className="block text-sm hover:text-sky transition-colors">
              Частые вопросы
            </Link>
            <Link href="/join" className="block text-sm hover:text-sky transition-colors">
              Вступить в ассоциацию
            </Link>
            <Link href="/contacts" className="block text-sm hover:text-sky transition-colors">
              Контакты
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-brand-white/30">
        <div>© {new Date().getFullYear()} ОЮЛ «КАСУ». Все права защищены.</div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-brand-white/50 transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="hover:text-brand-white/50 transition-colors">
            Условия использования
          </Link>
        </div>
      </div>
    </footer>
  )
}
