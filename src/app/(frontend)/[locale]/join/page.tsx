import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale, getPayload } from 'payload'
import configPromise from '@payload-config'
import type { JoinPage as JoinPageType, Form as FormType } from '@/payload-types'
import PageHeaderBlock from '../blocks/page-header-block'
import JoinFormBlock from '../blocks/join-form-block'
import type { Metadata } from 'next'
import { ClipboardList, GraduationCap, Handshake, ScrollText, Phone } from 'lucide-react'
import { LucideIcon } from '../components/ui/lucide-icon'

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
  const page = (await getCachedGlobal('join-page', 2)()) as JoinPageType

  // Resolve the form relationship (depth=2 already populates it)
  const form = page?.form && typeof page.form !== 'number' ? (page.form as FormType) : null

  const infoBoxes = page?.infoBoxes ?? []

  return (
    <div className="min-h-screen bg-page-bg">
      {/* ── Page header ── */}
      <PageHeaderBlock
        tag={page?.tag ?? t('tag')}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? t('subtitle')}
        breadcrumbLabel={t('breadcrumb')}
      />

      {/* ── Main content ── */}
      <div className="px-6 md:px-12 xl:px-[72px] py-14 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Form card ── */}
          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] p-8 md:p-12 border border-silver-lt/50">
            {form ? (
              <JoinFormBlock form={form} />
            ) : (
              <div className="text-center py-16 text-brand-muted">
                <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Форма заявки ещё не настроена в CMS.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DefaultInfoBox({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-silver-lt/60 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-12 h-12 rounded-xl bg-sky-pale flex items-center justify-center text-[#1E3560] mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="font-serif text-navy text-lg font-bold mb-2">{title}</h3>
      <p className="text-brand-muted text-sm leading-relaxed">{body}</p>
    </div>
  )
}
