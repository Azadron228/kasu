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
    <div className="flex gap-1.5">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`px-2 py-1 rounded text-xs font-bold tracking-widest uppercase transition-all ${
            locale === lang.code
              ? 'text-sky bg-sky/15'
              : 'text-silver hover:bg-sky/15 hover:text-sky'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
