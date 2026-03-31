import { getTranslations } from 'next-intl/server'
import { getCachedCollectionCount } from '@/utilities/getCounts'

type Props = {
  stats?: {
    universitiesCount?: number | null
    programsCount?: number | null
    directionsCount?: number | null
  }
}

export default async function StatsBarBlock({ stats }: Props) {
  const t = await getTranslations('blocks.stats')

  // Fetch actual counts if not provided by global
  const [realUniversitiesCount, realProgramsCount, realDirectionsCount] = await Promise.all([
    getCachedCollectionCount('members')(),
    getCachedCollectionCount('programs')(),
    getCachedCollectionCount('directions')(),
  ])

  const cells = [
    { value: stats?.universitiesCount ?? realUniversitiesCount, label: t('universities') },
    { value: stats?.programsCount ?? realProgramsCount, label: t('programs') },
    { value: stats?.directionsCount ?? realDirectionsCount, label: t('directions') },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-navy">
      {cells.map((cell, i) => (
        <div
          key={i}
          className="border-b md:border-b-0 md:border-r border-white/[0.07] px-3 py-[18px] text-center last:border-b-0 md:last:border-r-0"
        >
          <span className="block font-serif text-[28px] font-extrabold leading-none text-sky">
            {cell.value}
          </span>
          <span className="mt-1 block text-[9.5px] font-extrabold uppercase tracking-[1.5px] text-white/40">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  )
}