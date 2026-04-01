import React from 'react'
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
                style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            }
        case 'offline':
            return {
                icon: <Building className="h-4 w-4" />,
                style: 'bg-sky-50 text-sky-700 border-sky-200',
            }
        case 'blended':
        default:
            return {
                icon: <ArrowLeftRight className="h-4 w-4" />,
                style: 'bg-amber-50 text-amber-700 border-amber-200',
            }
    }
}

export function ProgramCard({ prog, isOpen, toggleProgram }: ProgramCardProps) {
    const t = useTranslations('blocks.programsExplorer')

    // Safely cast to Direction by checking if it's an object
    const direction = (typeof prog.direction === 'object' ? prog.direction : null) as Direction | null

    const dirIcon = direction?.icon ?? 'BookOpen'
    const dirLabel = direction?.title ?? ''

    const fmtLabel = prog.format ? t(prog.format as any) : ''
    const formatDetails = getFormatDetails(prog.format)

    return (
        <div
            className={[
                'overflow-hidden rounded-2xl border-[1.5px] bg-white transition-all duration-300',
                isOpen
                    ? 'border-[#1E3560] shadow-[0_8px_32px_rgba(30,53,96,0.12)]'
                    : 'border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]',
            ].join(' ')}
        >
            {/* ── Accordion Trigger (Header) ── */}
            <div
                onClick={() => toggleProgram(prog.id)}
                className="flex cursor-pointer select-none items-start md:items-center gap-4 px-6 py-5"
            >
                {/* Icon Container */}
                <div className={[
                    'flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
                    isOpen ? 'bg-[#1E3560] text-white' : 'bg-slate-100 text-[#1E3560]',
                ].join(' ')}>
                    <LucideIcon name={dirIcon} size={22} />
                </div>

                {/* Title & Badges */}
                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-500">
                        {dirLabel}
                    </p>
                    <p className={[
                        'font-serif text-[18px] md:text-[20px] font-bold leading-snug transition-colors',
                        isOpen ? 'text-[#1E3560]' : 'text-slate-900',
                    ].join(' ')}>
                        {prog.name}
                    </p>

                    {/* Format Badge */}
                    <div className={`mt-2 flex flex-wrap gap-2 ${isOpen ? 'md:hidden' : ''}`}>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${formatDetails.style}`}>
                            {formatDetails.icon} {fmtLabel}
                        </span>
                    </div>
                </div>

                {/* Chevron */}
                <div className="pt-2 md:pt-0">
                    <ChevronDown
                        className={[
                            'h-5 w-5 shrink-0 transition-transform duration-300',
                            isOpen ? 'rotate-180 text-[#1E3560]' : 'text-slate-400',
                        ].join(' ')}
                    />
                </div>
            </div>

            {/* ── Accordion Body ── */}
            {isOpen && (
                <div className="border-t border-slate-100 px-6 pb-7 pt-6">
                    {/* 2-Column Layout Container */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                        {/* Left Column: Description */}
                        <div className="flex-1 min-w-0">
                            {prog.description ? (
                                <div className="prose prose-slate prose-sm md:prose-base max-w-none">
                                    <p className="text-[15px] leading-relaxed text-slate-600">
                                        {prog.description}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-[14px] italic text-slate-400">
                                    Описание отсутствует
                                </p>
                            )}
                        </div>

                        {/* Right Column: Metadata Details */}
                        {/* ИСПРАВЛЕНИЕ: Добавлены w-full md:w-[280px] shrink-0 для фиксации справа */}
                        <div className="w-full md:w-[280px] shrink-0">
                            <div className="flex flex-col gap-4 rounded-xl bg-slate-50 border border-slate-100 p-5">
                                {[
                                    { label: t('durationLabel'), icon: <Calendar className="h-4 w-4 text-slate-400" />, value: prog.duration },
                                    { label: t('formatStudyLabel'), icon: formatDetails.icon, value: fmtLabel },
                                    { label: t('directionLabel'), icon: <LucideIcon name={dirIcon} size={16} className="text-slate-400" />, value: dirLabel },
                                ].map(({ label, icon, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="mt-0.5 text-slate-400">{icon}</div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-slate-500">
                                                {label}
                                            </span>
                                            <span className="text-[14px] font-semibold text-slate-900">
                                                {value || '—'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}