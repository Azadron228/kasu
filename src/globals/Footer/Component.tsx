import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations('footer')

  return (
    <footer className="bg-navy-deep text-brand-white/60 px-6 lg:px-16 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-1 flex items-start gap-4">
          <Logo color="white" outline="white" className="w-12 h-12 rounded-full overflow-hidden shadow-lg shrink-0" />
          <div>
            <h3 className="font-serif text-brand-white text-base mb-2">{t('orgTitle')}</h3>
            <p className="text-xs leading-relaxed">
              {t('orgDesc')}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
            {t('orgHeader')}
          </h4>
          <div className="space-y-2">
            <Link href="/about" className="block text-sm hover:text-sky transition-colors">
              {t('aboutBtn')}
            </Link>
            <Link href="/about#leadership" className="block text-sm hover:text-sky transition-colors">
              {t('leadershipBtn')}
            </Link>
            <Link href="/members" className="block text-sm hover:text-sky transition-colors">
              {t('membersBtn')}
            </Link>
            <Link href="/documents" className="block text-sm hover:text-sky transition-colors">
              {t('docsBtn')}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">
            {t('activityHeader')}
          </h4>
          <div className="space-y-2">
            <Link href="/activities" className="block text-sm hover:text-sky transition-colors">
              {t('directionsBtn')}
            </Link>
            <Link
              href="/activities#projects"
              className="block text-sm hover:text-sky transition-colors"
            >
              {t('projectsBtn')}
            </Link>
            <Link href="/news" className="block text-sm hover:text-sky transition-colors">
              {t('newsEventsBtn')}
            </Link>
            <Link href="/about#partners" className="block text-sm hover:text-sky transition-colors">
              {t('partnersBtn')}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-4">{t('helpHeader')}</h4>
          <div className="space-y-2">
            <Link href="/contacts#faq" className="block text-sm hover:text-sky transition-colors">
              {t('faqBtn')}
            </Link>
            <Link href="/join" className="block text-sm hover:text-sky transition-colors">
              {t('joinBtn')}
            </Link>
            <Link href="/contacts" className="block text-sm hover:text-sky transition-colors">
              {t('contactsBtn')}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-brand-white/30">
        <div>{t('copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-brand-white/50 transition-colors">
            {t('privacyBtn')}
          </Link>
          <Link href="/terms" className="hover:text-brand-white/50 transition-colors">
            {t('termsBtn')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
