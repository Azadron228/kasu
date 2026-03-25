import { Program } from '@/payload-types'

export const DIRECTION_LABELS: Record<string, string> = {
    finance: 'Финансы',
    it: 'IT и технологии',
    humanities: 'Гуманитарные науки',
    health: 'Здоровый образ жизни',
    psychology: 'Психология',
    languages: 'Языки',
    art: 'Искусство',
    nature: 'Природа и экология',
    games: 'Интеллектуальные игры',
    pedagogy: 'Педагогика',
}

export const DIRECTION_ICONS: Record<string, string> = {
    finance: '💰',
    it: '💻',
    humanities: '📜',
    health: '🏃',
    psychology: '🧠',
    languages: '🗣',
    art: '🎨',
    nature: '🌿',
    games: '♟',
    pedagogy: '👨‍🏫',
}

export const FORMAT_LABELS: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Очно',
    blended: 'Смешанный',
}

export const FORMAT_STYLES: Record<string, string> = {
    online: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    offline: 'bg-sky-50 text-sky-800 border-sky-200',
    blended: 'bg-amber-50 text-amber-800 border-amber-200',
}

export const FORMAT_ICONS: Record<string, string> = {
    online: '🖥',
    offline: '🏛',
    blended: '↔',
}

type ProgramCardProps = {
    prog: Program
    isOpen: boolean
    toggleProgram: (id: number) => void
}

export function ProgramCard({ prog, isOpen, toggleProgram }: ProgramCardProps) {
    const dirIcon = DIRECTION_ICONS[prog.direction ?? ''] ?? '📖'
    const dirLabel = DIRECTION_LABELS[prog.direction ?? ''] ?? prog.direction
    const fmtLabel = FORMAT_LABELS[prog.format ?? ''] ?? prog.format
    const fmtIcon = FORMAT_ICONS[prog.format ?? ''] ?? ''
    const fmtStyle = FORMAT_STYLES[prog.format ?? ''] ?? FORMAT_STYLES['blended']

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
                    'flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl text-xl transition-colors',
                    isOpen ? 'bg-[#1E3560]' : 'bg-[#EAF2FA]',
                ].join(' ')}>
                    {dirIcon}
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
                        <span className={`rounded-xl border px-2 py-0.5 text-[10px] font-bold ${fmtStyle}`}>
                            {fmtLabel}
                        </span>
                    </div>
                </div>

                <span className={[
                    'shrink-0 text-lg transition-transform duration-200',
                    isOpen ? 'rotate-180 text-[#1E3560]' : 'text-[#A8B8CC]',
                ].join(' ')}>
                    ▾
                </span>
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
                            { label: 'Длительность', value: `📅 ${prog.duration}` },
                            { label: 'Формат обучения', value: `${fmtIcon} ${fmtLabel}` },
                            { label: 'Направление', value: `${dirIcon} ${dirLabel}` },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                                    {label}
                                </span>
                                <span className="text-[14px] font-semibold text-[#1A2438]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <button className="rounded-lg bg-[#1E3560] px-[22px] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#2A4A7F]">
                            Записаться на курс →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
