import React from 'react'
import { Document } from '@/payload-types'
import { FolderNode } from './documents-explorer-block'

// ── UTILS ──

export function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

export function formatFilesize(bytes?: number | null): string {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

export function getFileIcon(mimeType?: string | null) {
    if (!mimeType) return { emoji: '📄', bg: 'bg-red-50', text: 'text-red-500' }
    if (mimeType.includes('pdf')) return { emoji: '📄', bg: 'bg-red-50', text: 'text-red-500' }
    if (mimeType.includes('word') || mimeType.includes('document'))
        return { emoji: '📝', bg: 'bg-blue-50', text: 'text-blue-600' }
    if (mimeType.includes('sheet') || mimeType.includes('excel'))
        return { emoji: '📊', bg: 'bg-green-50', text: 'text-green-600' }
    return { emoji: '📄', bg: 'bg-slate-50', text: 'text-slate-500' }
}

// ── DOC ROW ──

export function DocRow({ doc }: { doc: Document }) {
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

// ── FILE TABLE WRAPPER ──

export function FileTableWrapper({ docs }: { docs: Document[] }) {
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
            <span className="mb-2.5 text-4xl drop-shadow-sm">📁</span>
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
            <div className="mb-4 text-5xl">📭</div>
            <h3 className="mb-2 font-serif text-xl font-bold text-[#1E3560]">{title}</h3>
            <p className="text-[13.5px] text-[#56647A]">{desc}</p>
        </div>
    )
}
