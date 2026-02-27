import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { FilterToolbar, FilterGroup } from '@/components/FilterToolbar'

type Args = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function EduProgramsPage({ searchParams }: Args) {
  const payload = await getPayload({ config: configPromise })
  const params = await searchParams

  const regionParam = typeof params.region === 'string' ? params.region : undefined
  const searchParam = typeof params.search === 'string' ? params.search : undefined

  // Build the Payload where query
  const where: Record<string, any> = { and: [] }

  if (regionParam) {
    where.and.push({ region: { equals: regionParam } })
  }

  if (searchParam) {
    where.and.push({
      or: [{ fullName: { like: searchParam } }, { shortName: { like: searchParam } }],
    })
  }

  // If no filters were applied, we should safely remove the empty "and"
  const finalWhere = where.and.length > 0 ? where : undefined

  // Fetch regions for the filter options
  const { docs: regions } = await payload.find({
    collection: 'regions',
    limit: 100,
  })

  // Prepare filter groups for FilterToolbar
  const filters: FilterGroup[] = [
    {
      label: 'Регион:',
      paramName: 'region',
      options: [
        { label: 'Все', value: '' },
        ...regions.map((region) => ({
          label: typeof region.name === 'string' ? region.name : 'Unknown',
          value: region.id.toString(),
        })),
      ],
    },
  ]

  // Fetch members
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100,
    depth: 1,
    where: finalWhere,
  })

  return (
    <section>
      <FilterToolbar
        filters={filters}
        searchPlaceholder="Найти участника..."
        searchParamName="search"
      />

      <div className="px-6 md:px-12 xl:px-[72px] py-11 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          Hello
        </div>
      </div>
    </section>
  )
}
