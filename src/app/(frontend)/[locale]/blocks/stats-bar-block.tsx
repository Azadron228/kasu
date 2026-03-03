type Props = {
  stats?: {
    universitiesCount?: number | null
    programsCount?: number | null
    directionsCount?: number | null
    freeNote?: string | null
  }
}

export default function StatsBarBlock({ stats }: Props) {
  const cells = [
    { value: stats?.universitiesCount ?? 14, label: 'Университетов' },
    { value: stats?.programsCount ?? 68, label: 'Программ' },
    { value: stats?.directionsCount ?? 12, label: 'Направлений' },
    { value: 'Беспл.', label: stats?.freeNote ?? 'Большинство курсов' },
  ]

  return (
    <div className="grid grid-cols-4 bg-[#1E3560]">
      {cells.map((cell, i) => (
        <div
          key={i}
          className="border-r border-white/[0.07] px-3 py-[18px] text-center last:border-r-0"
        >
          <span className="block font-serif text-[28px] font-extrabold leading-none text-[#B8D0E8]">
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