'use client'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

const langs = [
  { code: 'kk', label: 'ҚАЗ' },
  { code: 'ru', label: 'РУС' },
  { code: 'en', label: 'ENG' },
]

export function LangSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (code: string) => {
    router.replace(pathname, { locale: code })
  }

  return (
    <div className="lang-bar-right">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`lang-btn ${locale === lang.code ? 'active' : ''}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
