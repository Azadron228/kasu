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

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

function formatFilesize(bytes?: number | null): string {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

function getFileIcon(mimeType?: string | null) {
    if (!mimeType) return { emoji: '📄', bg: 'bg-red-50', text: 'text-red-500' }
    if (mimeType.includes('pdf')) return { emoji: '📄', bg: 'bg-red-50', text: 'text-red-500' }
    if (mimeType.includes('word') || mimeType.includes('document'))
        return { emoji: '📝', bg: 'bg-blue-50', text: 'text-blue-600' }
    if (mimeType.includes('sheet') || mimeType.includes('excel'))
        return { emoji: '📊', bg: 'bg-green-50', text: 'text-green-600' }
    return { emoji: '📄', bg: 'bg-slate-50', text: 'text-slate-500' }
}

function DocRow({ doc }: { doc: Document }) {
    const fileIcon = getFileIcon(doc.mimeType)
    const cat = typeof doc.category === 'object' ? doc.category : null

    return (
        <tr className="group border-b border-[#E4EBF3] transition-colors last:border-0 hover:bg-[#EAF2FA]">
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${fileIcon.bg} ${fileIcon.text}`}
                    >
                        {fileIcon.emoji}
                    </div>
                    <div className="min-w-0">
                        <a
                            href={doc.url ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[13.5px] font-bold text-[#1E3560] hover:underline"
                        >
                            {doc.title}
                        </a>
                        {doc.description && (
                            <p className="mt-0.5 truncate text-[11px] text-[#56647A]">{doc.description}</p>
                        )}
                    </div>
                </div>
            </td>

            <td className="hidden px-4 py-3.5 md:table-cell">
                {cat && (
                    <span className="inline-block rounded px-2 py-0.5 text-[10px] font-extrabold bg-[#E8F0FA] text-[#1E3560]">
                        {cat.title}
                    </span>
                )}
            </td>

            <td className="px-4 py-3.5 text-right text-[12.5px] text-[#56647A]">
                {doc.date ? formatDate(doc.date) : '—'}
            </td>

            <td className="hidden px-4 py-3.5 text-right text-[12px] text-[#56647A] md:table-cell">
                {formatFilesize(doc.filesize)}
            </td>

            <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-1.5">
                    <a
                        href={doc.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg bg-[#1E3560] px-3 py-1.5 text-[11px] font-extrabold text-white transition-colors hover:bg-[#2A4A7F]"
                    >
                        ⬇ Скачать
                    </a>
                    <a
                        href={doc.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-lg bg-[#EAF2FA] px-2.5 py-1.5 text-[12px] text-[#4A6FA5] transition-colors hover:bg-[#E4EBF3]"
                    >
                        👁
                    </a>
                </div>
            </td>
        </tr>
    )
}

function FileTableWrapper({ docs }: { docs: Document[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#E4EBF3] bg-white">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-[#EAF2FA]">
                        <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                            Название
                        </th>
                        <th className="hidden px-4 py-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A] md:table-cell">
                            Тип
                        </th>
                        <th className="px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                            Дата
                        </th>
                        <th className="hidden px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A] md:table-cell">
                            Размер
                        </th>
                        <th className="px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]" />
                    </tr>
                </thead>
                <tbody>
                    {docs.map((doc) => (
                        <DocRow key={doc.id} doc={doc} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function FolderCard({
    folder,
    onClick,
}: {
    folder: FolderNode
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border-[1.5px] border-[#E4EBF3] bg-white p-5 text-center transition-all duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#1E3560] before:to-[#4A6FA5] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-1 hover:border-[#B8D0E8] hover:shadow-[0_12px_36px_rgba(30,53,96,0.12)] hover:before:opacity-100"
        >
            <span className="mb-2.5 text-4xl drop-shadow-sm">📁</span>
            <p className="mb-1 text-[13px] font-bold leading-tight text-[#1E3560]">{folder.name}</p>
            <p className="text-[11px] text-[#56647A]">
                {folder.children.length > 0 ? `${folder.children.length} папок` : 'Открыть'}
            </p>
        </button>
    )
}

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
                                                    <span className="text-xs font-semibold text-[#A8B8CC]">
                                                        {doc.mimeType?.includes('pdf')
                                                            ? 'PDF'
                                                            : doc.mimeType?.includes('sheet')
                                                                ? 'XLSX'
                                                                : 'DOC'}
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
                                                <div className="mt-auto flex items-center justify-between border-t border-[#E4EBF3] pt-3 text-[11px] font-semibold text-[#56647A]">
                                                    <span>{doc.date ? formatDate(doc.date) : ''}</span>
                                                    <span className="text-[#4A6FA5] group-hover:underline">⬇ Скачать</span>
                                                </div>
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

function EmptyState({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-[#E4EBF3] bg-white py-20 text-center">
            <div className="mb-4 text-5xl">📭</div>
            <h3 className="mb-2 font-serif text-xl font-bold text-[#1E3560]">{title}</h3>
            <p className="text-[13.5px] text-[#56647A]">{desc}</p>
        </div>
    )
}
