import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { MembersPage as MembersPageType } from '@/payload-types'
import PageHeaderBlock from '../blocks/page-header-block'
import FilterBlock from '../blocks/filter-block'
import MembersGridBlock from '../blocks/member-grid-block'

type Args = {
  params: Promise<{ locale: TypedLocale }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function MembersPage({ params, searchParams }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const queryParams = await searchParams
  const t = await getTranslations('members')
  const page = (await getCachedGlobal('members-page', 1)()) as MembersPageType

  const status = typeof queryParams.status === 'string' ? queryParams.status : undefined
  const region = typeof queryParams.region === 'string' ? queryParams.region : undefined
  const search = typeof queryParams.search === 'string' ? queryParams.search : undefined

  return (
    <div className="min-h-screen bg-page-bg">
      <PageHeaderBlock
        tag={page?.tag ?? undefined}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? undefined}
        breadcrumbLabel={t('breadcrumb')}
      />

      {/* ── FILTER — full-width sticky bar, no side padding ── */}
      <FilterBlock />

      {/* ── GRID — 72px sides, 44px top, 80px bottom ── */}
      <div className="px-[72px] pb-20 pt-11 max-md:px-6">
        <MembersGridBlock status={status} region={region} search={search} locale={locale} />
      </div>
    </div>
  )
}