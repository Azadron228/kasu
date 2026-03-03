import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale } from 'next-intl/server'
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
  const page = (await getCachedGlobal('programs-page', 1)()) as ProgramsPageType

  return (
    <div className="min-h-screen bg-[#F0F4FA]">
      {/* ── HEADER ── */}
      <PageHeaderBlock 
        tag={page?.tag ?? undefined} 
        title={page?.title ?? 'Образовательные программы'} 
        subtitle={page?.subtitle ?? undefined} 
      />

      {/* ── STATS ── */}
      <StatsBarBlock stats={page?.stats} />

      {/* ── EXPLORER (sidebar + programs) ── */}
      <ProgramsExplorerBlock locale={locale} />
    </div>
  )
}