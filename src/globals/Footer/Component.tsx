import Link from 'next/link'
import React from 'react'
import { Logo } from '@/globals/Header/components/Logo/Logo'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Footer as FooterType, Setting as SettingsType } from '@/payload-types'
import { TypedLocale } from 'payload'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin, Twitter, Send } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={16} />,
  Facebook: <Facebook size={16} />,
  YouTube: <Youtube size={16} />,
  LinkedIn: <Linkedin size={16} />,
  Twitter: <Twitter size={16} />,
  Telegram: <Send size={16} />,
  WhatsApp: <Phone size={16} />,
}

export async function Footer({ locale }: { locale: string }) {
  const [footer, settings, t] = await Promise.all([
    getCachedGlobal('footer', locale as TypedLocale, 1)(),
    getCachedGlobal('settings', locale as TypedLocale, 1)(),
    getTranslations('footer'),
  ])

  const currentYear = new Date().getFullYear()

  const copyrightText = (footer as FooterType).copyrightText
    ? (footer as FooterType).copyrightText!.replace('{year}', String(currentYear))
    : `© ${currentYear}`

  return (
    <footer className="bg-navy-deep text-brand-white/60 px-6 lg:px-16 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand column */}
        <div className="lg:col-span-1 flex items-start gap-4">
          <Logo
            color="white"
            outline="white"
            className="w-12 h-12 rounded-full overflow-hidden shadow-lg shrink-0"
          />
          <div>
            {(footer as FooterType).orgTitle && (
              <h3 className="font-serif text-brand-white text-base mb-2">{(footer as FooterType).orgTitle}</h3>
            )}
            {(footer as FooterType).orgDesc && <p className="text-xs leading-relaxed">{(footer as FooterType).orgDesc}</p>}
          </div>
        </div>

        {/* Dynamic link columns */}
        {(footer as FooterType).columns && (footer as FooterType).columns!.length > 0
          ? (footer as FooterType).columns!.map((col) => (
            <div key={col.id}>
              {col.columnTitle && (
                <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
                  {col.columnTitle}
                </h4>
              )}
              <div className="space-y-2">
                {col.links &&
                  col.links.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url || '#'}
                      className="block text-sm hover:text-sky transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>
          ))
          : null}

        {/* Contacts column */}
        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
            {t('contacts')}
          </h4>
          <div className="space-y-4 text-sm">
            {(settings as SettingsType).contactEmail && (
              <a
                href={`mailto:${(settings as SettingsType).contactEmail}`}
                className="flex items-center gap-3 hover:text-sky transition-colors"
              >
                <Mail size={16} className="shrink-0 opacity-70" />
                <span>{(settings as SettingsType).contactEmail}</span>
              </a>
            )}
            {(settings as SettingsType).contactPhone && (
              <a
                href={`tel:${(settings as SettingsType).contactPhone}`}
                className="flex items-center gap-3 hover:text-sky transition-colors"
              >
                <Phone size={16} className="shrink-0 opacity-70" />
                <span>{(settings as SettingsType).contactPhone}</span>
              </a>
            )}
            {(settings as SettingsType).contactAddress && (
              <div className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-1 opacity-70" />
                <span className="leading-relaxed">{(settings as SettingsType).contactAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
        <div className="text-brand-white/30">{copyrightText}</div>

        {/* Social Links */}
        {(settings as SettingsType).socialLinks && (settings as SettingsType).socialLinks!.length > 0 && (
          <div className="flex items-center gap-4">
            {(settings as SettingsType).socialLinks!.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brand-white/5 flex items-center justify-center hover:bg-sky/20 hover:text-sky transition-all"
                title={social.platform}
              >
                {socialIcons[social.platform] || <Send size={14} />}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
