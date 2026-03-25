import { Setting } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

export default async function ContactsBlock({ settings }: { settings: Setting }) {
  const t = await getTranslations('home')
  return (
    <section className="px-6 lg:px-16 py-20" id="contacts">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
            {t('contactsTag')}
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-tight">
            {t('contacts')}
          </h2>
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-sky-pale rounded-xl flex items-center justify-center text-navy shrink-0 text-xl">
                📍
              </div>
              <div>
                <div className="font-extrabold text-navy text-sm mb-1">{t('contactsAddress')}</div>
                <div className="text-brand-muted text-sm">{settings?.contactAddress}</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-sky-pale rounded-xl flex items-center justify-center text-navy shrink-0 text-xl">
                📞
              </div>
              <div>
                <div className="font-extrabold text-navy text-sm mb-1">{t('contactsPhone')}</div>
                <div className="text-brand-muted text-sm">{settings?.contactPhone}</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-sky-pale rounded-xl flex items-center justify-center text-navy shrink-0 text-xl">
                ✉️
              </div>
              <div>
                <div className="font-extrabold text-navy text-sm mb-1">{t('contactsEmail')}</div>
                <div className="text-brand-muted text-sm">{settings?.contactEmail}</div>
              </div>
            </div>
          </div>
        </div>
        <form className="bg-sky-pale p-8 rounded-3xl">
          <h3 className="font-serif text-navy text-2xl mb-6">{t('contactsWrite')}</h3>
          <input
            type="text"
            placeholder={t('contactsName')}
            className="w-full p-3.5 mb-3 border border-silver-lt rounded-xl focus:ring-1 focus:ring-steel outline-none bg-brand-white"
            required
          />
          <input
            type="email"
            placeholder={t('contactsEmailPlaceholder')}
            className="w-full p-3.5 mb-3 border border-silver-lt rounded-xl focus:ring-1 focus:ring-steel outline-none bg-brand-white"
            required
          />
          <textarea
            placeholder={t('contactsMessage')}
            rows={4}
            className="w-full p-3.5 mb-4 border border-silver-lt rounded-xl focus:ring-1 focus:ring-steel outline-none bg-brand-white resize-y"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-navy text-brand-white font-bold py-4 rounded-xl hover:bg-navy-mid transition-all"
          >
            {t('contactsSend')}
          </button>
        </form>
      </div>
    </section>
  )
}
