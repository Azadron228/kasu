import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Tag = {
    id: number
    title: string
    slug?: string
}

type News = {
    id: number
    slug: string
    title: string
    heroImage?: (number | null) | MediaType
    excerpt?: string | null
    publishedAt?: string | null
    tags?: (number | Tag)[] | null
    meta?: {
        description?: string | null
    } | null
}

const BENTO_SPANS = [
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-2',
]

const CATEGORY_STYLE: Record<string, { badge: string; dot: string }> = {
    событие: { badge: 'bg-[#EAF2FA] text-[#4A6FA5]', dot: 'bg-[#4A6FA5]' },
    соглашение: { badge: 'bg-[#F5F0E2] text-[#8a6e2a]', dot: 'bg-[#B8A060]' },
    проект: { badge: 'bg-[#E8EDF5] text-[#1E3560]', dot: 'bg-[#1E3560]' },
}
const DEFAULT_STYLE = { badge: 'bg-[#EAF2FA] text-[#4A6FA5]', dot: 'bg-[#A8B8CC]' }

function getTagStyle(tags?: (number | Tag)[] | null) {
    const first = tags?.find((t): t is Tag => typeof t !== 'number')
    return CATEGORY_STYLE[first?.title?.toLowerCase() ?? ''] ?? DEFAULT_STYLE
}

export function NewsGrid({ newsItems }: { newsItems: News[] }) {
    if (!newsItems.length) {
        return (
            <div className="py-24 text-center">
                <div className="mb-4 text-5xl opacity-30">📭</div>
                <p className="font-playfair text-xl text-[#1E3560]">Новостей пока нет</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {newsItems.map((news, i) => {
                const span = BENTO_SPANS[i % BENTO_SPANS.length]
                const isFeatured = span === 'md:col-span-2'
                const style = getTagStyle(news.tags)
                const description = news.excerpt || news.meta?.description || null

                const formattedDate = news.publishedAt
                    ? new Date(news.publishedAt).toLocaleDateString('ru-RU', {
                        day: 'numeric', month: 'long', year: 'numeric',
                    })
                    : ''

                return (
                    <Link
                        key={news.id}
                        href={`/news/${news.slug}`}
                        className={`
              group flex flex-col justify-between overflow-hidden rounded-[18px]
              border border-[#E4EBF3] bg-white p-6 transition-all duration-300
              hover:-translate-y-1.5 hover:border-[#B8D0E8]
              hover:shadow-[0_20px_48px_rgba(30,53,96,0.11)]
              ${span}
              ${news.heroImage ? (isFeatured ? 'min-h-[420px]' : 'min-h-[360px]') : (isFeatured ? 'min-h-[220px]' : 'min-h-[190px]')}
            `}
                    >
                        <div>
                            {news.heroImage && typeof news.heroImage !== 'string' && (
                                <div className={`relative mb-6 -mx-6 -mt-6 overflow-hidden ${isFeatured ? 'h-56' : 'h-40'}`}>
                                    <Media resource={news.heroImage} fill imgClassName="object-cover transition-transform duration-500 group-hover:scale-110" htmlElement={null} />
                                </div>
                            )}
                            {news.tags && news.tags.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                    {news.tags.map((tagItem) => {
                                        if (typeof tagItem === 'number') return null
                                        const s = CATEGORY_STYLE[tagItem.title?.toLowerCase()] ?? DEFAULT_STYLE
                                        return (
                                            <span
                                                key={tagItem.id}
                                                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${s.badge}`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                                {tagItem.title}
                                            </span>
                                        )
                                    })}
                                </div>
                            )}

                            <h3 className={`
                font-playfair font-bold leading-snug text-[#1E3560]
                transition-colors group-hover:text-[#4A6FA5]
                ${isFeatured ? 'text-[22px]' : 'text-[16px]'}
              `}>
                                {news.title}
                            </h3>

                            {description && (
                                <p className={`
                  mt-2.5 leading-relaxed text-[#56647A]
                  ${isFeatured ? 'line-clamp-3 text-[14px]' : 'line-clamp-2 text-[13px]'}
                `}>
                                    {description}
                                </p>
                            )}
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            {formattedDate ? (
                                <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-[#A8B8CC]">
                                    <span className="inline-block h-[1.5px] w-3 rounded bg-[#B8A060]" />
                                    {formattedDate}
                                </div>
                            ) : <span />}

                            <span className="
                flex h-8 w-8 items-center justify-center rounded-full
                bg-[#EAF2FA] text-sm text-[#1E3560] transition-all duration-200
                group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                group-hover:bg-[#1E3560] group-hover:text-white
              ">
                                →
                            </span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}