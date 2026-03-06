'use client'

import { useState, useMemo } from 'react'
import { Member, Program } from '@/payload-types'

import {
  ProgramCard,
  FORMAT_ICONS,
  FORMAT_LABELS
} from './programs-explorer-components'

// ── types ────────────────────────────────────────────────────────────────────

type Props = {
  members: Member[]
  programs: Program[]
}

// ── component ────────────────────────────────────────────────────────────────

export default function ProgramsExplorerClient({ members, programs }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [formatFilter, setFormatFilter] = useState<string>('all')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  // filtered sidebar list
  const filteredMembers = useMemo(
    () =>
      members.filter((m) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
          m.shortName?.toLowerCase().includes(q) ||
          m.city?.toLowerCase().includes(q)
        )
      }),
    [members, search],
  )

  const selectedMember = members.find((m) => m.id === selectedId) ?? null

  // programs belonging to selected member
  const memberPrograms = useMemo(
    () =>
      programs.filter((p) => {
        const mid = typeof p.member === 'object' ? p.member?.id : p.member
        return mid === selectedId
      }),
    [programs, selectedId],
  )

  // after format filter
  const visiblePrograms = useMemo(
    () =>
      formatFilter === 'all'
        ? memberPrograms
        : memberPrograms.filter((p) => p.format === formatFilter),
    [memberPrograms, formatFilter],
  )

  function selectMember(id: string) {
    setSelectedId(id)
    setFormatFilter('all')
    setOpenIds(new Set())
  }

  function toggleProgram(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function logoSrc(member: Member): string | null {
    if (!member.logo) return null
    return typeof member.logo === 'object' ? (member.logo.url ?? null) : null
  }

  function programCount(memberId: string) {
    return programs.filter((p) => {
      const mid = typeof p.member === 'object' ? p.member?.id : p.member
      return mid === memberId
    }).length
  }

  return (
    <div className="grid min-h-[calc(100vh-200px)] grid-cols-[300px_1fr]">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="sticky top-0 flex h-screen flex-col overflow-y-auto border-r border-[#E4EBF3] bg-[#FAFBFD]">

        {/* sticky header */}
        <div className="sticky top-0 z-10 border-b border-[#E4EBF3] bg-[#FAFBFD] px-6 py-5">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-[#56647A]">
            <span className="h-px w-4 bg-[#A8B8CC]" />
            Выберите университет
          </p>
          <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-[#E4EBF3] bg-[#EAF2FA] px-3 py-2">
            <span className="shrink-0 text-sm text-[#A8B8CC]">🔍</span>
            <input
              type="text"
              placeholder="Поиск университета..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#1A2438] outline-none placeholder:text-[#A8B8CC]"
            />
          </div>
        </div>

        {/* university list */}
        <ul className="pb-6 pt-2">
          {filteredMembers.map((member) => {
            const isActive = member.id === selectedId
            const count = programCount(member.id)
            const src = logoSrc(member)

            return (
              <li
                key={member.id}
                onClick={() => selectMember(member.id)}
                className={[
                  'flex cursor-pointer items-center gap-3 border-l-[3px] px-6 py-3 transition-all duration-200',
                  isActive
                    ? 'border-l-[#1E3560] bg-gradient-to-r from-[#EAF2FA] to-transparent'
                    : 'border-l-transparent hover:border-l-[#B8D0E8] hover:bg-[#EAF2FA]',
                ].join(' ')}
              >
                {src ? (
                  <img
                    src={src}
                    alt={member.shortName ?? ''}
                    className="h-[38px] w-[38px] shrink-0 rounded-full object-cover shadow-[0_2px_8px_rgba(30,53,96,0.15)]"
                  />
                ) : (
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white shadow-[0_2px_8px_rgba(30,53,96,0.15)]"
                    style={{ backgroundColor: '#1E3560' }}>
                    {member.shortName?.slice(0, 3)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold leading-snug text-[#1A2438]">
                    {member.shortName}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#56647A]">📍 {member.city}</p>
                </div>

                <span className={[
                  'shrink-0 rounded-xl bg-[#1E3560] px-[7px] py-[2px] text-[10px] font-extrabold text-white transition-opacity duration-200',
                  isActive ? 'opacity-100' : 'opacity-0',
                ].join(' ')}>
                  {count}
                </span>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* ── CONTENT AREA ────────────────────────────────────────────────── */}
      <div className="px-10 py-8">

        {/* Welcome screen */}
        {!selectedMember && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#EAF2FA] to-[#F5F0E2] text-5xl shadow-[0_8px_36px_rgba(30,53,96,0.1)]">
              📚
            </div>
            <h2 className="mb-3 font-serif text-[26px] font-bold text-[#1E3560]">
              Выберите университет
            </h2>
            <p className="max-w-[420px] text-sm leading-[1.7] text-[#56647A]">
              Выберите университет из списка слева, чтобы увидеть его образовательные программы для
              старшего поколения
            </p>
            <div className="mt-8 flex items-center gap-3 text-[13px] font-bold text-[#4A6FA5]">
              <span className="h-px w-10 bg-[#A8B8CC]" />
              ← Список университетов
            </div>
          </div>
        )}

        {/* University panel */}
        {selectedMember && (
          <div key={selectedMember.id} className="animate-[fadeIn_0.3s_ease]">

            {/* ── University header card ── */}
            <div className="relative mb-6 flex items-center gap-6 overflow-hidden rounded-2xl bg-[#FAFBFD] p-7 shadow-[0_8px_40px_rgba(30,53,96,0.12)]">
              {/* accent bar */}
              <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#1E3560] to-[#B8A060]" />

              {logoSrc(selectedMember) ? (
                <img
                  src={logoSrc(selectedMember)!}
                  alt={selectedMember.shortName ?? ''}
                  className="h-[72px] w-[72px] shrink-0 rounded-full object-cover shadow-[0_4px_16px_rgba(30,53,96,0.18)]"
                />
              ) : (
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#1E3560] text-xl font-black text-white shadow-[0_4px_16px_rgba(30,53,96,0.18)]">
                  {selectedMember.shortName?.slice(0, 3)}
                </div>
              )}

              <div className="flex-1">
                <p className="mb-1.5 text-[9.5px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                  Серебряный университет · КАСУ
                </p>
                <h2 className="mb-1 font-serif text-[22px] font-bold leading-snug text-[#1A2438]">
                  {selectedMember.shortName}
                </h2>
                <p className="text-[12.5px] leading-relaxed text-[#56647A]">
                  {selectedMember.fullName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {[
                    `📍 ${selectedMember.city}`,
                    selectedMember.status === 'founder' ? '★ Учредитель' : 'Член КАСУ',
                    `🎓 ${memberPrograms.length} программ`,
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#E4EBF3] bg-[#EAF2FA] px-2.5 py-1 text-[11px] font-bold text-[#1E3560]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2">
                {selectedMember.main_url && (
                  <a
                    href={selectedMember.main_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#1E3560] px-4 py-2 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#2A4A7F]"
                  >
                    🌐 Сайт
                  </a>
                )}
                {selectedMember.silver_url && (
                  <a
                    href={selectedMember.silver_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#1E3560] px-4 py-2 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#2A4A7F]"
                  >
                    🎓 Серебр. ун-т
                  </a>
                )}
              </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10.5px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                  Формат
                </span>
                {(['all', 'online', 'offline', 'blended'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setFormatFilter(key)}
                    className={[
                      'rounded-full border-[1.5px] px-3.5 py-1 text-[11px] font-bold transition-all',
                      formatFilter === key
                        ? 'border-[#1E3560] bg-[#1E3560] text-white'
                        : 'border-[#E4EBF3] text-[#56647A] hover:border-[#1E3560] hover:bg-[#1E3560] hover:text-white',
                    ].join(' ')}
                  >
                    {key === 'all'
                      ? 'Все'
                      : `${FORMAT_ICONS[key]} ${FORMAT_LABELS[key]}`}
                  </button>
                ))}
              </div>
              <p className="text-[12px] font-bold text-[#56647A]">
                Показано:{' '}
                <span className="font-extrabold text-[#1E3560]">{visiblePrograms.length}</span>{' '}
                программ
              </p>
            </div>

            {/* ── Programs list ── */}
            {visiblePrograms.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mb-5 text-5xl opacity-40">🔍</div>
                <h3 className="mb-2 font-serif text-[22px] font-bold text-[#1E3560]">
                  Программы не найдены
                </h3>
                <p className="text-sm leading-relaxed text-[#56647A]">
                  По выбранному фильтру программ нет. Попробуйте другой формат обучения.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                return (
                <ProgramCard
                  key={prog.id}
                  prog={prog}
                  isOpen={openIds.has(prog.id)}
                  toggleProgram={toggleProgram}
                />
                )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}