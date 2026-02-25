import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'

export default async function ContactsPage() {
  const settings = await getCachedGlobal('settings', 1)()

  return (
    <main className="container py-16">
      <h1 className="s-title mb-10">Контакты</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Свяжитесь с нами</h2>
          <p className="text-muted mb-8 text-lg">
            Мы открыты для сотрудничества и будем рады ответить на ваши вопросы.
          </p>
          
          <div className="flex flex-col gap-6 mb-10 bg-sky-pale p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">📍</div>
              <div>
                <div className="font-bold text-navy uppercase text-xs tracking-wider mb-1">Адрес</div>
                <div className="text-muted text-sm">{settings?.contactAddress || 'г. Астана, Казахстан'}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">📞</div>
              <div>
                <div className="font-bold text-navy uppercase text-xs tracking-wider mb-1">Телефон</div>
                <div className="text-muted text-sm">{settings?.contactPhone || '+7 (000) 000-00-00'}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">✉️</div>
              <div>
                <div className="font-bold text-navy uppercase text-xs tracking-wider mb-1">Email</div>
                <div className="text-muted text-sm">{settings?.contactEmail || 'info@u3a.kz'}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-silver-lt rounded-2xl p-8 shadow-[0_8px_40px_rgba(30,53,96,0.08)]">
             <h3 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Написать сообщение</h3>
             {/* Simple form layout. Server action or API route needed for actual submission. */}
             <form className="flex flex-col gap-4">
               <div>
                 <label className="block text-sm font-semibold text-navy mb-2">Ваше имя *</label>
                 <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                 <input type="email" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-navy mb-2">Тема</label>
                 <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-navy mb-2">Сообщение *</label>
                 <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors resize-y" required></textarea>
               </div>
               <button type="submit" className="mt-2 bg-navy hover:bg-navy-mid text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(30,53,96,0.25)] hover:shadow-[0_6px_20px_rgba(30,53,96,0.4)] transition-all w-full md:w-auto self-start">
                 Отправить
               </button>
             </form>
          </div>
        </div>
      </div>
    </main>
  )
}
