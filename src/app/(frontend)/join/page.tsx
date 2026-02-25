import React from 'react'

export default function JoinPage() {
  return (
    <main className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="s-title mb-6">Вступить в ассоциацию</h1>
        <p className="text-muted text-lg mb-10">
          Мы приглашаем организации и инициативные группы, разделяющие наши ценности, присоединиться к Казахстанской Ассоциации Сеньорских Университетов.
        </p>

        <div className="bg-sky-pale p-8 rounded-2xl mb-12">
          <h2 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Преимущества участника</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-3 items-start"><span className="text-gold">✦</span> Совместные грантовые и образовательные проекты</li>
            <li className="flex gap-3 items-start"><span className="text-gold">✦</span> Обмен опытом и методическими материалами</li>
            <li className="flex gap-3 items-start"><span className="text-gold">✦</span> Участие в форумах и конференциях</li>
            <li className="flex gap-3 items-start"><span className="text-gold">✦</span> Информационная поддержка мероприятий</li>
          </ul>
        </div>

        <div className="bg-white border border-silver-lt rounded-2xl p-8 lg:p-10 shadow-[0_8px_40px_rgba(30,53,96,0.08)]">
          <h2 className="text-2xl font-bold text-navy mb-8 border-b border-silver-lt pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Заявка на вступление</h2>
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Название организации *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Город *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Контактное лицо (ФИО) *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Должность *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Телефон *</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Дополнительная информация (опыт работы с пенсионерами, проекты)</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-silver-lt bg-sky-pale focus:bg-white focus:border-steel outline-none transition-colors resize-y"></textarea>
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-gold hover:bg-gold-lt text-navy-deep font-bold py-4 px-10 rounded-full shadow-[0_6px_20px_rgba(184,160,96,0.35)] hover:shadow-[0_12px_32px_rgba(184,160,96,0.5)] transition-all w-full md:w-auto self-center text-lg">
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
