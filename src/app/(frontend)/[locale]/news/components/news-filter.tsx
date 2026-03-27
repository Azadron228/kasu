'use client'

import React, { useState, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

type Tag = {
    id: number
    title: string
    slug?: string | null
}

const PILL_STYLE: Record<string, { active: string; idle: string; icon: string }> = {
    event: {
        icon: '📅',
        active: 'bg-[#1E3560] border-[#1E3560] text-white shadow-md',
        idle: 'bg-white border-[#C8D8EC] text-[#1E3560] hover:border-[#1E3560] hover:bg-[#EAF2FA]',
    },
    agreement: {
        icon: '🤝',
        active: 'bg-[#B8A060] border-[#B8A060] text-[#162848] shadow-md',
        idle: 'bg-white border-[#D4BC80] text-[#8a6e2a] hover:border-[#B8A060] hover:bg-[#F5F0E2]',
    },
    project: {
        icon: '🚀',
        active: 'bg-[#162848] border-[#162848] text-[#D4BC80] shadow-md',
        idle: 'bg-white border-[#C4CEDC] text-[#1E3560] hover:border-[#162848] hover:bg-[#E8EDF5]',
    },
}
const DEFAULT_PILL = {
    icon: '📰',
    active: 'bg-[#4A6FA5] border-[#4A6FA5] text-white shadow-md',
    idle: 'bg-white border-[#C8D8EC] text-[#56647A] hover:bg-[#EAF2FA]',
}

export function NewsFilter({
    tags,
    activeTag,
    totalDocs,
}: {
    tags: Tag[]
    activeTag?: string
    totalDocs: number
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const t = useTranslations('news')

    // Локальный стейт поиска — debounce через useTransition
    const [query, setQuery] = useState(searchParams.get('query') ?? '')

    function applyParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([k, v]) => {
            if (v === null) params.delete(k)
            else params.set(k, v)
        })
        params.delete('page')
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    function handleSearch(value: string) {
        setQuery(value)
        applyParams({ query: value || null })
    }

    function handleTag(slug: string | null) {
        applyParams({ tag: slug })
    }

    const hasFilters = !!activeTag || !!query

    return (
        <div className="mb-8">

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-[#56647A]">
                {t('filterTitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3">

                <div className="relative min-w-[240px]">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B8CC]"
                        width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        className="
              w-full rounded-xl border border-[#E4EBF3] bg-white
              py-2.5 pl-9 pr-4 text-sm font-semibold text-[#1A2438]
              placeholder:font-normal placeholder:text-[#A8B8CC]
              outline-none transition
              focus:border-[#4A6FA5] focus:ring-2 focus:ring-[#4A6FA5]/10
            "
                    />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-widest text-[#56647A]">
                    {t('categoryLabel')}
                </span>

                {tags.map((tagItem) => {
                    const tagId = tagItem.id.toString()
                    const key = tagItem.title?.toLowerCase()
                    const style = PILL_STYLE[key] ?? DEFAULT_PILL
                    const isActive = activeTag === tagId

                    return (
                        <button
                            key={tagItem.id}
                            onClick={() => handleTag(isActive ? null : tagId)}
                            className={`
                inline-flex items-center gap-1.5 rounded-full border px-4 py-2
                text-[13px] font-bold transition-all duration-200
                ${isActive ? style.active : style.idle}
              `}
                        >
                            <span className="text-[14px] leading-none">{style.icon}</span>
                            {tagItem.title}
                        </button>
                    )
                })}
                {hasFilters && (
                    <button
                        onClick={() => {
                            setQuery('')
                            handleTag(null)
                            applyParams({ query: null, tag: null })
                        }}
                        className="
              rounded-full border border-dashed border-[#C8D8EC] px-4 py-2
              text-[12px] font-bold text-[#56647A] transition
              hover:border-[#A8B8CC] hover:text-[#1A2438]
            "
                    >
                        {t('reset')}
                    </button>
                )}
            </div>
            <div className="mt-6 flex items-center justify-between border-b border-[#E4EBF3] pb-4">
                <p className="text-[13px] font-semibold text-[#56647A]">
                    {t('shown')}{' '}
                    <span className={`text-[16px] font-bold text-[#1E3560] transition-opacity ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                        {totalDocs}
                    </span>{' '}
                    {t('materials')}
                </p>
            </div>
        </div>
    )
}