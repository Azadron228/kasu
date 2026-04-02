import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import type { JoinPage as JoinPageType, Form as FormType } from '@/payload-types'
import PageHeaderBlock from '../blocks/page-header-block'
import JoinFormBlock from '../blocks/join-form-block'
import type { Metadata } from 'next'
import { ClipboardList } from 'lucide-react'
import { LucideIcon } from '../components/ui/lucide-icon'
import RichText from '@/fields/RichText'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'join' })
  return { title: t('metaTitle') }
}

export default async function JoinPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('join')
  const page = (await getCachedGlobal('join-page', locale, 2)()) as JoinPageType

  // Resolve the form relationship (depth=2 already populates it)
  const form = page?.form && typeof page.form !== 'number' ? (page.form as FormType) : null

  return (
    <div className="min-h-screen bg-page-bg pb-20">
      {/* ── Page header ── */}
      <PageHeaderBlock
        tag={page?.tag ?? t('tag')}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? t('subtitle')}
        breadcrumbLabel={t('breadcrumb')}
      />

      {/* ── Main content ── */}
      <div className="px-6 md:px-12 xl:px-[72px] py-14 max-w-[900px] mx-auto">
        <div className="space-y-12">

          {/* ── Body content ── */}
          {page?.body && (
            <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-brand-muted prose-strong:text-navy prose-li:text-brand-muted">
              <RichText data={page.body} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* ── Form card ── */}
          <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-silver-lt/40 relative overflow-hidden">
            <h2 className="font-serif text-2xl text-navy font-bold mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky">
                <ClipboardList size={20} />
              </div>
              {t('listTitle')}
            </h2>

            {form ? (
              <JoinFormBlock form={form} />
            ) : (
              <div className="text-center py-16 text-brand-muted bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">Форма заявки ещё не настроена в CMS.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
