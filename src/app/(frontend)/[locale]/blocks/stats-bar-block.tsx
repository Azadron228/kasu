import { ProgramsPage } from '@/payload-types'

type Props = { page: ProgramsPage }

export default function StatsBarBlock({ page }: Props) {
  const s = page?.stats

  const cells = [
    { value: s?.universitiesCount ?? 14, label: 'Университетов' },
    { value: s?.programsCount ?? 68, label: 'Программ' },
    { value: s?.directionsCount ?? 12, label: 'Направлений' },
    { value: 'Беспл.', label: s?.freeNote ?? 'Большинство курсов' },
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