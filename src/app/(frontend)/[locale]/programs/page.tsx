import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { ProgramsPage as ProgramsPageType } from '@/payload-types'
import PageHeaderBlock from '../blocks/page-header-block'
import StatsBarBlock from '../blocks/stats-bar-block'
import ProgramsExplorerBlock from '../blocks/programs-explorer-block'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function ProgramsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('programs')
  const page = (await getCachedGlobal('programs-page', 1)()) as ProgramsPageType

  return (
    <div className="min-h-screen bg-page-bg">
      {/* ── HEADER ── */}
      <PageHeaderBlock
        tag={page?.tag ?? undefined}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? undefined}
        breadcrumbLabel={page?.title ?? t('listTitle')}
      />

      {/* ── STATS ── */}
      <StatsBarBlock stats={page?.stats} />

      {/* ── EXPLORER (sidebar + programs) ── */}
      <ProgramsExplorerBlock locale={locale} />
    </div>
  )
}