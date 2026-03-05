'use client'

import React from 'react'
import { DocumentCategory } from '@/payload-types'
import { BreadcrumbItem, FolderNode } from './documents-explorer-block'

type Props = {
    categories: DocumentCategory[]
    folderRoots: FolderNode[]
    expandedFolders: Set<number>
    currentFolderId: number | 'root'
    onNavigate: (id: number | 'root', name: string, parentChain?: BreadcrumbItem[]) => void
    onToggle: (id: number) => void
    folderMap: Map<number, FolderNode>
    totalDocs: number
}

function FolderTreeNode({
    node,
    depth,
    expandedFolders,
    currentFolderId,
    onNavigate,
    onToggle,
    parentChain,
}: {
    node: FolderNode
    depth: number
    expandedFolders: Set<number>
    currentFolderId: number | 'root'
    onNavigate: Props['onNavigate']
    onToggle: Props['onToggle']
    parentChain: BreadcrumbItem[]
}) {
    const isExpanded = expandedFolders.has(node.id)
    const isActive = currentFolderId === node.id
    const hasChildren = node.children.length > 0

    const currentChain: BreadcrumbItem[] = parentChain

    const handleClick = () => {
        onNavigate(node.id, node.name, currentChain)
        if (hasChildren) onToggle(node.id)
    }

    const childChain: BreadcrumbItem[] = [...parentChain, { id: node.id, name: node.name }]

    return (
        <li>
            <button
                onClick={handleClick}
                style={depth > 0 ? { paddingLeft: `${depth * 16 + 12}px` } : undefined}
                className={[
                    'group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-150',
                    isActive
                        ? 'bg-[#1E3560] text-white shadow-sm'
                        : 'text-[#1A2438] hover:bg-[#1E3560]/[0.07]',
                ].join(' ')}
            >
                {/* Chevron toggle */}
                <span
                    className={[
                        'flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-200',
                        isActive ? 'text-white/70' : 'text-[#A8B8CC]',
                        hasChildren ? '' : 'invisible',
                        isExpanded ? 'rotate-90' : '',
                    ].join(' ')}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                            d="M3.5 2L6.5 5L3.5 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>

                <span className="shrink-0 text-sm">{isExpanded ? '📂' : '📁'}</span>

                <span
                    className={`flex-1 truncate text-[13px] font-semibold ${isActive ? 'text-white' : 'text-[#1A2438]'}`}
                >
                    {node.name}
                </span>
            </button>

            {hasChildren && isExpanded && (
                <ul className="mt-0.5 space-y-0.5">
                    {node.children.map((child) => (
                        <FolderTreeNode
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            expandedFolders={expandedFolders}
                            currentFolderId={currentFolderId}
                            onNavigate={onNavigate}
                            onToggle={onToggle}
                            parentChain={childChain}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default function DocumentsSidebar({
    categories,
    folderRoots,
    expandedFolders,
    currentFolderId,
    onNavigate,
    onToggle,
    totalDocs,
}: Props) {
    const isRoot = currentFolderId === 'root'

    return (
        <aside className="hidden w-64 shrink-0 border-r border-[#E4EBF3] bg-[#EAF2FA] lg:flex flex-col">
            <div className="sticky top-36 max-h-[calc(100vh-144px)] overflow-y-auto px-4 py-6">
                {/* Title */}
                <p className="mb-3 px-2 text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                    Архив документов
                </p>

                <nav>
                    <ul className="space-y-0.5">
                        {/* Root — All documents */}
                        <li>
                            <button
                                onClick={() => onNavigate('root', 'Все документы')}
                                className={[
                                    'flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-150',
                                    isRoot
                                        ? 'bg-[#1E3560] text-white shadow-sm'
                                        : 'text-[#1A2438] hover:bg-[#1E3560]/[0.07]',
                                ].join(' ')}
                            >
                                {/* spacer for chevron column */}
                                <span className="h-4 w-4 shrink-0" />
                                <span className="shrink-0 text-sm">🗂️</span>
                                <span
                                    className={`flex-1 truncate text-[13px] font-semibold ${isRoot ? 'text-white' : 'text-[#1A2438]'}`}
                                >
                                    Все документы
                                </span>
                                <span
                                    className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${isRoot ? 'bg-white/20 text-white' : 'bg-[#E4EBF3] text-[#56647A]'}`}
                                >
                                    {totalDocs}
                                </span>
                            </button>
                        </li>

                        {/* Folder tree */}
                        {folderRoots.map((folder) => (
                            <FolderTreeNode
                                key={folder.id}
                                node={folder}
                                depth={0}
                                expandedFolders={expandedFolders}
                                currentFolderId={currentFolderId}
                                onNavigate={onNavigate}
                                onToggle={onToggle}
                                parentChain={[]}
                            />
                        ))}
                    </ul>
                </nav>

                {/* Category links */}
                {categories.length > 0 && (
                    <>
                        <div className="my-4 h-px bg-[#E4EBF3]" />
                        <p className="mb-3 px-2 text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                            Категории
                        </p>
                        <ul className="space-y-0.5">
                            {categories.map((cat: any) => (
                                <li key={cat.id}>
                                    <a
                                        href={`#cat-${cat.slug}`}
                                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium text-[#56647A] transition-colors hover:bg-[#1E3560]/[0.07] hover:text-[#1E3560]"
                                    >
                                        <span className="shrink-0 text-sm">{cat.icon || '📄'}</span>
                                        <span className="flex-1 truncate">{cat.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

            </div>
        </aside>
    )
}
