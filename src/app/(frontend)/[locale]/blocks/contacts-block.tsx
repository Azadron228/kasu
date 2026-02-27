import { Homepage } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

export default async function ContactsBlock({ homepage }: { homepage: Homepage }) {
  const t = await getTranslations('home')
  return (
    <section>
      <div className="contacts-inner">
        <div>
          <h2 className="s-title">{t('contacts')}</h2>
          <div className="contact-info">
            <div className="c-row">
              <div className="c-icon">📍</div>
              <div>
                <div className="c-label">{t('contactsAddress')}</div>
                <div className="c-val">{homepage?.contactAddress}</div>
              </div>
            </div>
            <div className="c-row">
              <div className="c-icon">📞</div>
              <div>
                <div className="c-label">{t('contactsPhone')}</div>
                <div className="c-val">{homepage?.contactPhone}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <h3>{t('contactsWrite')}</h3>
          <form>
            <input type="text" placeholder={t('contactsName')} required />
            <input type="email" placeholder={t('contactsEmail')} required />
            <textarea placeholder={t('contactsMessage')} rows={4} required></textarea>
            <button type="submit" className="btn-prim">
              {t('contactsSend')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
