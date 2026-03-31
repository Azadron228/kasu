import { Program, Direction } from '@/payload-types'
import { useTranslations } from 'next-intl'
import {
    Monitor,
    Building,
    ArrowLeftRight,
    Calendar,
    ChevronDown
} from 'lucide-react'
import { LucideIcon } from '../components/ui/lucide-icon'

type ProgramCardProps = {
    prog: Program
    isOpen: boolean
    toggleProgram: (id: number) => void
}

// Helper to determine styles and icons based on the format
const getFormatDetails = (format: string | null | undefined) => {
    switch (format) {
        case 'online':
            return {
                icon: <Monitor className="h-4 w-4" />,
                style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            }
        case 'offline':
            return {
                icon: <Building className="h-4 w-4" />,
                style: 'bg-sky-50 text-sky-800 border-sky-200',
            }
        case 'blended':
        default:
            return {
                icon: <ArrowLeftRight className="h-4 w-4" />,
                style: 'bg-amber-50 text-amber-800 border-amber-200',
            }
    }
}

export function ProgramCard({ prog, isOpen, toggleProgram }: ProgramCardProps) {
    const t = useTranslations('blocks.programsExplorer')

    // Fix: Safely cast to Direction by checking if it's an object, or casting through unknown
    const direction = (typeof prog.direction === 'object' ? prog.direction : null) as Direction | null

    const dirIcon = direction?.icon ?? 'BookOpen'
    const dirLabel = direction?.title ?? ''

    const fmtLabel = prog.format ? t(prog.format as any) : ''
    const formatDetails = getFormatDetails(prog.format)

    return (
        <div
            className={[
                'overflow-hidden rounded-2xl border-[1.5px] bg-[#FAFBFD] transition-all duration-200',
                isOpen
                    ? 'border-[#1E3560] shadow-[0_8px_36px_rgba(30,53,96,0.15)]'
                    : 'border-[#E4EBF3] shadow-[0_2px_12px_rgba(30,53,96,0.07)] hover:border-[#B8D0E8] hover:shadow-[0_6px_28px_rgba(30,53,96,0.13)]',
            ].join(' ')}
        >
            {/* accordion trigger */}
            <div
                onClick={() => toggleProgram(prog.id)}
                className="flex cursor-pointer select-none items-center gap-4 px-5 py-4"
            >
                <div className={[
                    'flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl transition-colors',
                    isOpen ? 'bg-[#1E3560] text-white' : 'bg-[#EAF2FA] text-[#1E3560]',
                ].join(' ')}>
                    <LucideIcon name={dirIcon} size={20} />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#4A6FA5]">
                        {dirLabel}
                    </p>
                    <p className={[
                        'font-serif text-[16px] font-semibold leading-snug',
                        isOpen ? 'text-[#1E3560]' : 'text-[#1A2438]',
                    ].join(' ')}>
                        {prog.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <span className={`rounded-xl border px-2 py-0.5 text-[10px] font-bold ${formatDetails.style}`}>
                            {fmtLabel}
                        </span>
                    </div>
                </div>

                <ChevronDown
                    className={[
                        'h-5 w-5 shrink-0 transition-transform duration-200',
                        isOpen ? 'rotate-180 text-[#1E3560]' : 'text-[#A8B8CC]',
                    ].join(' ')}
                />
            </div>

            {/* accordion body */}
            {isOpen && (
                <div className="border-t border-[#E4EBF3] px-5 pb-6 pt-5">
                    {prog.description && (
                        <p className="mb-4 rounded-xl border-l-[3px] border-[#B8D0E8] bg-[#EAF2FA] px-4 py-3.5 text-[13.5px] leading-[1.7] text-[#56647A]">
                            {prog.description}
                        </p>
                    )}

                    <div className="mb-4 grid grid-cols-2 gap-x-7 gap-y-3.5">
                        {[
                            { label: t('durationLabel'), icon: <Calendar className="h-4 w-4" />, value: prog.duration },
                            { label: t('formatStudyLabel'), icon: formatDetails.icon, value: fmtLabel },
                            { label: t('directionLabel'), icon: <LucideIcon name={dirIcon} size={16} />, value: dirLabel },
                        ].map(({ label, icon, value }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                                    {label}
                                </span>
                                <span className="flex items-center gap-1.5 text-[14px] font-semibold text-[#1A2438]">
                                    {icon}
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <button className="rounded-lg bg-[#1E3560] px-[22px] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#2A4A7F]">
                            {t('enrollButton')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
