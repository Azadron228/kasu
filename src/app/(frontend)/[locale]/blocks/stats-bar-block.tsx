import { getTranslations } from 'next-intl/server'

type Props = {
  stats?: {
    universitiesCount?: number | null
    programsCount?: number | null
    directionsCount?: number | null
    freeNote?: string | null
  }
}

export default async function StatsBarBlock({ stats }: Props) {
  const t = await getTranslations('blocks.stats')
  const cells = [
    { value: stats?.universitiesCount ?? 14, label: t('universities') },
    { value: stats?.programsCount ?? 68, label: t('programs') },
    { value: stats?.directionsCount ?? 12, label: t('directions') },
    { value: t('free'), label: stats?.freeNote ?? t('defaultFreeNote') },
  ]

  return (
    <div className="grid grid-cols-4 bg-navy">
      {cells.map((cell, i) => (
        <div
          key={i}
          className="border-r border-white/[0.07] px-3 py-[18px] text-center last:border-r-0"
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