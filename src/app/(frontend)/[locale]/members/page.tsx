import React from 'react'
import FilterBlock from '../blocks/filter-block'
import MembersGridBlock from '../blocks/member-grid-block'

type Args = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function MembersPage({ searchParams }: Args) {
  const params = await searchParams

  const status = typeof params.status === 'string' ? params.status : undefined
  const region = typeof params.region === 'string' ? params.region : undefined
  const search = typeof params.search === 'string' ? params.search : undefined

  return (
    <section>
      {/* ── FILTER ── */}
      <FilterBlock />

      {/* ── GRID ── */}
      <MembersGridBlock status={status} region={region} search={search} />
    </section>
  )
}
