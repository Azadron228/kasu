import React from 'react'
import { Document, Media } from '@/payload-types'
import { FolderNode } from './documents-explorer-block'
import { FileEdit, Folder, Inbox } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatFilesize(bytes?: number | null): string {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${((bytes as number) / 1024).toFixed(0)} КБ`
    return `${((bytes as number) / (1024 * 1024)).toFixed(1)} МБ`
}


export function DocRow({ doc }: { doc: Document }) {
    const cat = typeof doc.category === 'object' ? doc.category : null
    const file = typeof doc.file === 'object' ? (doc.file as Media) : null
    const url = file?.url ?? '#'
    const filesize = file?.filesize ?? null

    return (
        <tr className="group border-b border-[#E4EBF3] transition-colors last:border-0 hover:bg-[#EAF2FA]">
            <td className="px-3 py-3.5 sm:px-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div
                        className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600`}
                    >
                        <FileEdit size={18} className="sm:size-5" />
                    </div>
                    <div className="min-w-0">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[13px] sm:text-[13.5px] font-bold text-[#1E3560] hover:underline"
                        >
                            {doc.title}
                        </a>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            {doc.description && (
                                <p className="truncate text-[10px] sm:text-[11px] text-[#56647A]">{doc.description}</p>
                            )}
                            {cat && (
                                <span className="md:hidden inline-block rounded-md px-1.5 py-0.5 text-[9px] font-bold bg-[#E8F0FA] text-[#1E3560]">
                                    {cat.title}
                                </span>
                            )}
                        </div>
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

            <td className="hidden sm:table-cell px-4 py-3.5 text-right text-[12.5px] text-[#56647A]">
                {doc.date ? format(doc.date, 'dd.MM.yyyy', { locale: ru }) : '—'}
            </td>

            <td className="hidden lg:table-cell px-4 py-3.5 text-right text-[12px] text-[#56647A]">
                {formatFilesize(filesize)}
            </td>

            <td className="px-3 py-3.5 sm:px-4">
                <div className="flex items-center justify-end gap-1.5">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg bg-[#1E3560] px-2.5 py-1.5 sm:px-3 text-[10px] sm:text-[11px] font-extrabold text-white transition-colors hover:bg-[#2A4A7F]"
                    >
                        <span className="hidden xs:inline">Скачать</span>
                        <span className="xs:hidden">⬇</span>
                    </a>
                </div>
            </td>
        </tr>
    )
}

// ── FILE TABLE WRAPPER ──

export function FileTableWrapper({ docs }: { docs: Document[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#E4EBF3] bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-[#EAF2FA]">
                        <th className="px-3 py-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A] sm:px-4">
                            Название
                        </th>
                        <th className="hidden px-4 py-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A] md:table-cell">
                            Тип
                        </th>
                        <th className="hidden sm:table-cell px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                            Дата
                        </th>
                        <th className="hidden lg:table-cell px-4 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A]">
                            Размер
                        </th>
                        <th className="px-3 py-3 text-right text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#56647A] sm:px-4" />
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

// ── FOLDER CARD ──

export function FolderCard({
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
            <Folder size={40} className="mb-2.5 text-[#A8B8CC] transition-colors group-hover:text-[#4A6FA5]" />
            <p className="mb-1 text-[13px] font-bold leading-tight text-[#1E3560]">{folder.name}</p>
            <p className="text-[11px] text-[#56647A]">
                {folder.children.length > 0 ? `${folder.children.length} папок` : 'Открыть'}
            </p>
        </button>
    )
}

// ── EMPTY STATE ──

export function EmptyState({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-[#E4EBF3] bg-white py-20 text-center">
            <div className="mb-4 flex justify-center opacity-30">
                <Inbox size={48} />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-[#1E3560]">{title}</h3>
            <p className="text-[13.5px] text-[#56647A]">{desc}</p>
        </div>
    )
}
