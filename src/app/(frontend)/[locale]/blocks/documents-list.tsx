'use client'

import React, { useState } from 'react'
import { Document, DocumentCategory, FolderInterface } from '@/payload-types'
import { BreadcrumbItem, FolderNode } from './documents-explorer-block'
import { ChevronRight, Search, FileText, FileEdit, Menu } from 'lucide-react'

type Props = {
    categories: DocumentCategory[]
    viewData: {
        subFolders: FolderNode[]
        documents: Document[]
        isRoot: boolean
    }
    groupedByCategory: Record<string, Document[]> | null
    selectedCategoryId: number | 'other' | null
    featured: Document[]
    breadcrumbs: BreadcrumbItem[]
    currentFolderId: number | 'root'
    onNavigate: (id: number | 'root', name: string, parentChain?: BreadcrumbItem[]) => void
    onBreadcrumb: (index: number) => void
    folderMap: Map<number, FolderNode>
    onOpenSidebar: () => void
}

import {
    FileTableWrapper,
    FolderCard,
    EmptyState,
} from './documents-list-components'

export default function DocumentsContent({
    categories,
    viewData,
    groupedByCategory,
    selectedCategoryId,
    featured,
    breadcrumbs,
    currentFolderId,
    onNavigate,
    onBreadcrumb,
    onOpenSidebar,
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
            <div className="border-b border-[#E4EBF3] bg-white sticky top-20 z-10 backdrop-blur-md bg-white/80">
                <div className="flex flex-col gap-3 px-4 py-3.5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <button
                            onClick={onOpenSidebar}
                            className="flex lg:hidden shrink-0 items-center gap-2 rounded-xl bg-[#EAF2FA] px-3 py-2 text-[12px] font-bold text-[#1E3560] transition-colors hover:bg-[#1E3560]/10"
                        >
                            <Menu size={16} /> <span className="hidden xs:inline">Меню</span>
                        </button>

                        <nav className="flex items-center gap-1 text-[13px] overflow-hidden">
                            {/* Desktop Breadcrumbs: full path */}
                            <div className="hidden sm:flex items-center gap-1">
                                {breadcrumbs.map((bc, i) => {
                                    const isLast = i === breadcrumbs.length - 1
                                    return (
                                        <React.Fragment key={String(bc.id)}>
                                            {i > 0 && <ChevronRight size={12} className="text-[#A8B8CC]" />}
                                            <button
                                                onClick={() => !isLast && onBreadcrumb(i)}
                                                className={[
                                                    'truncate max-w-[120px] rounded-md px-2 py-1 font-bold transition-colors',
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
                            </div>

                            {/* Mobile Breadcrumbs: "Parent > Current" or just "Current" */}
                            <div className="flex sm:hidden items-center gap-1 overflow-hidden">
                                {breadcrumbs.length > 1 && (
                                    <button
                                        onClick={() => onBreadcrumb(breadcrumbs.length - 2)}
                                        className="flex items-center gap-1 text-[#56647A] font-bold"
                                    >
                                        <ChevronRight size={12} className="rotate-180" />
                                        <span className="truncate max-w-[80px] opacity-60">{breadcrumbs[breadcrumbs.length - 2].name}</span>
                                    </button>
                                )}
                                {breadcrumbs.length > 1 && <ChevronRight size={12} className="text-[#A8B8CC] shrink-0" />}
                                <span className="font-bold text-[#1E3560] truncate max-w-[150px]">
                                    {breadcrumbs[breadcrumbs.length - 1].name}
                                </span>
                            </div>
                        </nav>
                    </div>

                    {/* Search box */}
                    <div className="relative w-full lg:w-auto">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B8CC]"
                            size={14}
                            strokeWidth={2.5}
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск документов…"
                            className="w-full lg:w-48 xl:w-60 rounded-xl border-[1.5px] border-[#E4EBF3] bg-[#EAF2FA] py-2 pl-9 pr-3 text-[13px] text-[#1A2438] outline-none transition-all placeholder:text-[#A8B8CC] focus:border-[#4A6FA5] focus:bg-white"
                        />
                    </div>
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
                        {/* Featured (root only) — only show when no category filter is active */}
                        {isRoot && featured.length > 0 && !selectedCategoryId && (
                            <section className="mb-10">
                                <h2 className="mb-4 text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                    Избранные документы
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {featured.map((doc: any) => {
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
                                                        className={`inline-block rounded px-2.5 py-1 text-[10px] font-extrabold tracking-wide bg-blue-50 text-blue-600`}
                                                    >
                                                        {doc.category?.title ?? ''}
                                                    </span>
                                                </div>
                                                <div className="mb-3 text-[#A8B8CC]">
                                                    <FileEdit size={20} />
                                                </div>
                                                <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1E3560] group-hover:text-[#2A4A7F]">
                                                    {doc.title}
                                                </h3>
                                                {doc.description && (
                                                    <p className="mb-4 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-[#56647A]">
                                                        {doc.description}
                                                    </p>
                                                )}
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
                                    // Filter by category if selected
                                    if (selectedCategoryId && selectedCategoryId !== cat.id) return null

                                    // Grouping relies on ID strings now
                                    const docs = groupedByCategory[String(cat.id)]
                                    if (!docs || docs.length === 0) return null
                                    return (
                                        <section key={cat.id} id={`cat-${cat.id}`} className="mb-10 scroll-mt-40">
                                            <div className="mb-4 flex items-center gap-2">
                                                <FileText size={18} className="text-[#A8B8CC]" />
                                                <h2 className="text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                                    {cat.title}
                                                </h2>
                                            </div>
                                            <FileTableWrapper docs={docs} />
                                        </section>
                                    )
                                })}

                                {/* Other documents (no category or unrecognized) */}
                                {groupedByCategory['other'] &&
                                    groupedByCategory['other'].length > 0 &&
                                    (!selectedCategoryId || selectedCategoryId === 'other') && (
                                        <section id="cat-other" className="mb-10 scroll-mt-40">
                                            <div className="mb-4 flex items-center gap-2">
                                                <FileText size={18} className="text-[#A8B8CC]" />
                                                <h2 className="text-[10.5px] font-extrabold uppercase tracking-[3px] text-[#56647A]">
                                                    {/* Fallback to localized 'Documents' if 'documents:docsFallback' is available, or use a default */}
                                                    Прочее
                                                </h2>
                                            </div>
                                            <FileTableWrapper docs={groupedByCategory['other']} />
                                        </section>
                                    )}
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

                        {/* Sub-folder grid — only show when no category filter is active */}
                        {viewData.subFolders.length > 0 && !selectedCategoryId && (
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
