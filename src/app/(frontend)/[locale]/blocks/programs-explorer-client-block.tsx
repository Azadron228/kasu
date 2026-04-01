'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Member, Program } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  MapPin,
  Library,
  Monitor,
  Building,
  ArrowLeftRight,
  Menu,
  X,
  Globe,
  GraduationCap
} from 'lucide-react'

import { ProgramCard } from './programs-explorer-components'

// ── types ────────────────────────────────────────────────────────────────────

type Props = {
  members: Member[]
  programs: Program[]
}

// ── helpers ──────────────────────────────────────────────────────────────────

const getFormatIcon = (format: string) => {
  switch (format) {
    case 'online':
      return <Monitor className="h-3.5 w-3.5" />
    case 'offline':
      return <Building className="h-3.5 w-3.5" />
    case 'blended':
      return <ArrowLeftRight className="h-3.5 w-3.5" />
    default:
      return null
  }
}

// ── component ────────────────────────────────────────────────────────────────

export default function ProgramsExplorerClient({ members, programs }: Props) {
  const t = useTranslations('blocks.programsExplorer')
  const searchParams = useSearchParams()
  const memberIdParam = searchParams.get('member')

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [formatFilter, setFormatFilter] = useState<string>('all')
  const [openIds, setOpenIds] = useState<Set<number>>(new Set())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // handle initial or changed memberId from URL
  useEffect(() => {
    if (memberIdParam) {
      const id = Number(memberIdParam)
      if (!isNaN(id)) {
        setSelectedId(id)
      }
    }
  }, [memberIdParam])

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

  function selectMember(id: number) {
    setSelectedId(id)
    setFormatFilter('all')
    setOpenIds(new Set())
    setIsSidebarOpen(false)
  }

  function toggleProgram(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function logoData(member: Member) {
    if (!member.logo || typeof member.logo !== 'object') return null
    return {
      url: member.logo.url ?? null,
      alt: member.logo.alt ?? member.shortName ?? ''
    }
  }

  function programCount(memberId: number) {
    return programs.filter((p) => {
      const mid = typeof p.member === 'object' ? p.member?.id : p.member
      return mid === memberId
    }).length
  }

  return (
    <div className="relative flex min-h-[calc(100vh-200px)] flex-col lg:grid lg:grid-cols-[300px_1fr]">

      {/* ── MOBILE TOGGLE ────────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 flex items-center gap-3 border-b border-[#E4EBF3] bg-white/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#EAF2FA] px-4 py-2 text-[12px] font-bold text-[#1E3560] transition-colors hover:bg-[#1E3560]/10"
        >
          <Menu className="h-4 w-4" /> {t('menu')}
        </button>
        {selectedMember && (
          <p className="truncate text-[13px] font-bold text-[#1E3560]">
            {selectedMember.shortName}
          </p>
        )}
      </div>

      {/* ── SIDEBAR OVERLAY (Mobile) ────────────────────────────────────── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[100] bg-navy/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className={[
        "fixed inset-y-0 left-0 z-[101] flex h-screen w-72 flex-col overflow-y-auto border-r border-[#E4EBF3] bg-[#FAFBFD] transition-transform duration-300 lg:static lg:z-0 lg:flex lg:w-full lg:translate-x-0",
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      ].join(' ')}>

        {/* sticky header */}
        <div className="sticky top-0 z-10 border-b border-[#E4EBF3] bg-[#FAFBFD] px-6 py-5">
          <div className="mb-4 flex items-center justify-between lg:mb-3">
            <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-[#56647A]">
              <span className="h-px w-4 bg-[#A8B8CC]" />
              {t('sidebarTitle')}
            </p>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-[#56647A] hover:bg-[#EAF2FA] lg:hidden"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-[#E4EBF3] bg-[#EAF2FA] px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-[#A8B8CC]" />
            <input
              type="text"
              placeholder={t('sidebarSearchPlaceholder')}
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
            const logo = logoData(member)

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
                <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-sky-pale p-1 shadow-[0_2px_8px_rgba(30,53,96,0.15)]">
                  {logo?.url ? (
                    <Image
                      src={logo.url}
                      alt={logo.alt}
                      fill
                      sizes="38px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-[#1E3560]">
                      {member.shortName?.slice(0, 3)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold leading-snug text-[#1A2438]">
                    {member.shortName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#56647A]">
                    <MapPin className="h-3 w-3" /> {member.city}
                  </p>
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
      <div className="px-4 py-8 md:px-10">

        {/* Welcome screen */}
        {!selectedMember && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#EAF2FA] to-[#F5F0E2] shadow-[0_8px_36px_rgba(30,53,96,0.1)]">
              <Library className="h-12 w-12 text-[#1E3560]" />
            </div>
            <h2 className="mb-3 font-serif text-[26px] font-bold text-[#1E3560]">
              {t('welcomeTitle')}
            </h2>
            <p className="max-w-[420px] text-sm leading-[1.7] text-[#56647A]">
              {t('welcomeText')}
            </p>
            <div className="mt-8 flex items-center gap-3 text-[13px] font-bold text-[#4A6FA5]">
              <span className="h-px w-10 bg-[#A8B8CC]" />
              {t('backToSidebar')}
            </div>
          </div>
        )}

        {/* University panel */}
        {selectedMember && (
          <div key={selectedMember.id} className="animate-[fadeIn_0.3s_ease]">

            {/* ── University header card ── */}
            <div className="relative mb-6 flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-[#FAFBFD] p-6 shadow-[0_8px_40px_rgba(30,53,96,0.12)] sm:flex-row sm:p-7">
              {/* accent bar */}
              <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#1E3560] to-[#B8A060]" />

              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-sky-pale p-2 shadow-[0_4px_16px_rgba(30,53,96,0.18)]">
                {logoData(selectedMember)?.url ? (
                  <Image
                    src={logoData(selectedMember)!.url!}
                    alt={logoData(selectedMember)!.alt}
                    fill
                    sizes="72px"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-black text-[#1E3560]">
                    {selectedMember.shortName?.slice(0, 3)}
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="mb-1.5 text-[9.5px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                  {t('tagline')}
                </p>
                <h2 className="mb-1 font-serif text-[22px] font-bold leading-snug text-[#1A2438]">
                  {selectedMember.shortName}
                </h2>
                <p className="text-[12.5px] leading-relaxed text-[#56647A]">
                  {selectedMember.fullName}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                  {[
                    { icon: <MapPin className="h-3 w-3 mr-1 inline-block" />, text: selectedMember.city },
                    { text: selectedMember.status === 'founder' ? t('statusFounder') : t('statusMember') },
                    { text: t('programCount', { count: memberPrograms.length }) },
                  ].map((chip, idx) => (
                    <span
                      key={idx}
                      className="flex items-center rounded-full border border-[#E4EBF3] bg-[#EAF2FA] px-2.5 py-1 text-[11px] font-bold text-[#1E3560]"
                    >
                      {chip.icon}
                      {chip.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
                {selectedMember.main_url && (
                  <a
                    href={selectedMember.main_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#1E3560] px-4 py-2.5 text-center text-[12px] font-bold text-white transition-colors hover:bg-[#2A4A7F]"
                  >
                    <Globe size={14} /> {t('website')}
                  </a>
                )}
                {selectedMember.silver_url && (
                  <a
                    href={selectedMember.silver_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#EAF2FA] border border-[#B8D0E8] px-4 py-2.5 text-center text-[12px] font-bold text-[#1E3560] transition-colors hover:bg-[#1E3560]/10"
                  >
                    <GraduationCap size={14} /> {t('silverUniversity')}
                  </a>
                )}
              </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10.5px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                  {t('formatLabel')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'online', 'offline', 'blended'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setFormatFilter(key)}
                      className={[
                        'flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-1 text-[11px] font-bold transition-all',
                        formatFilter === key
                          ? 'border-[#1E3560] bg-[#1E3560] text-white'
                          : 'border-[#E4EBF3] text-[#56647A] hover:border-[#1E3560] hover:bg-[#1E3560] hover:text-white',
                      ].join(' ')}
                    >
                      {key === 'all' ? (
                        t('allFormats')
                      ) : (
                        <>
                          {getFormatIcon(key)}
                          {t(key as any)}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[12px] font-bold text-[#56647A]">
                {t('shown')}{' '}
                <span className="font-extrabold text-[#1E3560]">{visiblePrograms.length}</span>{' '}
                {t('programsSuffix_one', { count: visiblePrograms.length })}
              </p>
            </div>

            {/* ── Programs list ── */}
            {visiblePrograms.length === 0 ? (
              <div className="py-20 text-center">
                <Search className="mx-auto mb-5 h-12 w-12 text-[#A8B8CC] opacity-40" />
                <h3 className="mb-2 font-serif text-[22px] font-bold text-[#1E3560]">
                  {t('notFoundTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-[#56647A]">
                  {t('notFoundText')}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visiblePrograms.map((prog) => (
                  <ProgramCard
                    key={prog.id}
                    prog={prog}
                    isOpen={openIds.has(prog.id)}
                    toggleProgram={toggleProgram}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
