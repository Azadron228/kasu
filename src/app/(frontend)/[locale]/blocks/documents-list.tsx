'use client'

import React, { useState } from 'react'
import { Document, DocumentCategory, FolderInterface } from '@/payload-types'
import { BreadcrumbItem, FolderNode } from './documents-explorer-block'

type Props = {
    categories: DocumentCategory[]
    viewData: {
        subFolders: FolderNode[]
        documents: Document[]
        isRoot: boolean
    }
    groupedByCategory: Record<string, Document[]> | null
    featured: Document[]
    breadcrumbs: BreadcrumbItem[]
    currentFolderId: number | 'root'
    onNavigate: (id: number | 'root', name: string, parentChain?: BreadcrumbItem[]) => void
    onBreadcrumb: (index: number) => void
    folderMap: Map<number, FolderNode>
}

import {
    formatDate,
    getFileIcon,
    FileTableWrapper,
    FolderCard,
    EmptyState,
} from './documents-list-components'

export default function DocumentsContent({
    categories,
    viewData,
    groupedByCategory,
    featured,
    breadcrumbs,
    currentFolderId,
    onNavigate,
    onBreadcrumb,
}: Props) {
    const [search, setSearch] = useState('')

    const filteredDocs = search.trim()
        ? viewData.documents.filter(
            (d) =>
                d.title.toLowerCase().includes(search.toLowerCase()) ||
                (d.description ?? '').toLowerCase().includes(search.toLowerCase()),
        )
        : viewData.documents

    const isRoot = currentFolderId === 'root'
    const isSearching = search.trim().length > 0

    return (
        <main className="flex-1 min-w-0">
            {/* Toolbar: breadcrumbs + search */}
            <div className="flex flex-wrap items-center gap-3 border-b border-[#E4EBF3] bg-white px-6 py-3.5 lg:px-10">
                <nav className="flex flex-1 flex-wrap items-center gap-1.5 text-[13px]">
                    {breadcrumbs.map((bc, i) => {
                        const isLast = i === breadcrumbs.length - 1
                        return (
                            <React.Fragment key={String(bc.id)}>
                                {i > 0 && <span className="text-[#A8B8CC]">›</span>}
                                <button
                                    onClick={() => !isLast && onBreadcrumb(i)}
                                    className={[
                                        'rounded-md px-2 py-1 font-bold transition-colors',
                                        isLast
                                            ? 'cursor-default text-[#1E3560]'
                                            : 'text-[#56647A] hover:bg-[#EAF2FA] hover:text-[#1E3560]',
                                    ].join(' ')}
                                >
                                    {bc.name}
                                </button>
                            </React.Fragment>
                        )
                    })}
                </nav>

                {/* Search box */}
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B8CC]"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск документов…"
                        className="w-48 rounded-xl border-[1.5px] border-[#E4EBF3] bg-[#EAF2FA] py-2 pl-9 pr-3 text-[13px] text-[#1A2438] outline-none transition-all placeholder:text-[#A8B8CC] focus:w-60 focus:border-[#4A6FA5] focus:bg-white"
                    />
                </div>
            </div>

            <div className="px-6 py-8 lg:px-10">
                {/* ── SEARCH RESULTS ── */}
                {isSearching && (
                    <section>
                        <h2 className="mb-4 text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                            Результаты поиска ({filteredDocs.length})
                        </h2>
                        {filteredDocs.length > 0 ? (
                            <FileTableWrapper docs={filteredDocs} />
                        ) : (
                            <EmptyState title="Ничего не найдено" desc="Попробуйте изменить поисковый запрос" />
                        )}
                    </section>
                )}

                {/* ── NORMAL VIEW (not searching) ── */}
                {!isSearching && (
                    <>
                        {/* Featured (root only) */}
                        {isRoot && featured.length > 0 && (
                            <section className="mb-10">
                                <h2 className="mb-4 text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                    Избранные документы
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {featured.map((doc: any) => {
                                        const fileIcon = getFileIcon(doc.mimeType)
                                        return (
                                            <a
                                                key={doc.id}
                                                href={doc.url ?? '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#E4EBF3] bg-white p-6 shadow-[0_4px_20px_rgba(30,53,96,0.07)] transition-all duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#1E3560] before:to-[#4A6FA5] hover:-translate-y-1 hover:border-[#B8D0E8] hover:shadow-[0_16px_48px_rgba(30,53,96,0.14)]"
                                            >
                                                <div className="mb-3 flex items-start justify-between">
                                                    <span
                                                        className={`inline-block rounded px-2.5 py-1 text-[10px] font-extrabold tracking-wide ${fileIcon.bg} ${fileIcon.text}`}
                                                    >
                                                        {doc.category?.title ?? ''}
                                                    </span>
                                                </div>
                                                <div className="mb-3 text-3xl">{fileIcon.emoji}</div>
                                                <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1E3560] group-hover:text-[#2A4A7F]">
                                                    {doc.title}
                                                </h3>
                                                {doc.description && (
                                                    <p className="mb-4 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-[#56647A]">
                                                        {doc.description}
                                                    </p>
                                                )}
                                                {/* <div className="mt-auto flex items-center justify-between border-t border-[#E4EBF3] pt-3 text-[11px] font-semibold text-[#56647A]">
                                                    <span>{doc.date ? formatDate(doc.date) : ''}</span>
                                                    <span className="text-[#4A6FA5] group-hover:underline">⬇ Скачать</span>
                                                </div> */}
                                            </a>
                                        )
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Files — root view groups by category */}
                        {isRoot && groupedByCategory ? (
                            <>
                                {categories.map((cat: any) => {
                                    const docs = groupedByCategory[cat.slug]
                                    if (!docs || docs.length === 0) return null
                                    return (
                                        <section key={cat.id} id={`cat-${cat.slug}`} className="mb-10 scroll-mt-40">
                                            <div className="mb-4 flex items-center gap-2">
                                                <span className="text-xl opacity-60">{cat.icon}</span>
                                                <h2 className="text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                                    {cat.title}
                                                </h2>
                                            </div>
                                            <FileTableWrapper docs={docs} />
                                        </section>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {/* Folder view — single file table */}
                                {filteredDocs.length > 0 && (
                                    <section>
                                        <h2 className="mb-4 text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                            Файлы
                                        </h2>
                                        <FileTableWrapper docs={filteredDocs} />
                                    </section>
                                )}

                                {filteredDocs.length === 0 && viewData.subFolders.length === 0 && (
                                    <EmptyState title="Папка пуста" desc="Документы ещё не загружены в этот раздел." />
                                )}
                            </>
                        )}


                        {/* Sub-folder grid */}
                        {viewData.subFolders.length > 0 && (
                            <section className="mb-8">
                                <h2 className="mb-4 text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                    Папки
                                </h2>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                                    {viewData.subFolders.map((folder) => {
                                        const parentChain = breadcrumbs.slice(1)
                                        return (
                                            <FolderCard
                                                key={folder.id}
                                                folder={folder}
                                                onClick={() => onNavigate(folder.id, folder.name, parentChain)}
                                            />
                                        )
                                    })}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}


