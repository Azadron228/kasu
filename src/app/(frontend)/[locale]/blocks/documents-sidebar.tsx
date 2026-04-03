import React from 'react'
import { DocumentCategory } from '@/payload-types'
import { BreadcrumbItem, FolderNode } from './documents-explorer-block'
import { FolderOpen, Folder, Folders, FileText, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = {
    categories: DocumentCategory[]
    folderRoots: FolderNode[]
    expandedFolders: Set<number>
    currentFolderId: number | 'root'
    selectedCategoryId: number | 'other' | null
    onNavigate: (id: number | 'root', name: string, parentChain?: BreadcrumbItem[]) => void
    onFilterCategory: (id: number | 'other' | null) => void
    onToggle: (id: number) => void
    folderMap: Map<number, FolderNode>
    totalDocs: number
    hasOther?: boolean
    isOpen?: boolean
    onClose?: () => void
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
                    <ChevronRight size={14} strokeWidth={2.5} />
                </span>

                <span className="shrink-0 text-[#A8B8CC] group-hover:text-[#4A6FA5] transition-colors">
                    {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
                </span>

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
    selectedCategoryId,
    onNavigate,
    onFilterCategory,
    onToggle,
    totalDocs,
    hasOther,
    isOpen,
    onClose,
}: Props) {
    const t = useTranslations('documents')
    const isRoot = currentFolderId === 'root'

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-navy/40 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside 
                className={[
                    'fixed inset-y-0 left-0 z-[101] w-72 shrink-0 border-r border-[#E4EBF3] bg-[#EAF2FA] transition-transform duration-300 lg:static lg:z-0 lg:flex lg:w-64 lg:translate-x-0 flex-col',
                    isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                ].join(' ')}
            >
                <div className="sticky top-0 lg:top-36 h-full max-h-screen lg:max-h-[calc(100vh-144px)] overflow-y-auto px-4 py-6">
                    {/* Mobile header */}
                    <div className="flex items-center justify-between mb-6 lg:hidden">
                        <p className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                            {t('navigation')}
                        </p>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/50 text-[#56647A] hover:bg-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Title (Desktop) */}
                    <p className="hidden lg:block mb-3 px-2 text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#56647A]">
                        {t('archiveTitle')}
                    </p>

                <nav>
                    <ul className="space-y-0.5">
                        {/* Root — All documents */}
                        <li>
                            <button
                                onClick={() => onNavigate('root', t('allDocuments'))}
                                className={[
                                    'flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-150',
                                    isRoot
                                        ? 'bg-[#1E3560] text-white shadow-sm'
                                        : 'text-[#1A2438] hover:bg-[#1E3560]/[0.07]',
                                ].join(' ')}
                            >
                                {/* spacer for chevron column */}
                                <span className="h-4 w-4 shrink-0" />
                                <span className="shrink-0 text-[#A8B8CC] group-hover:text-[#4A6FA5] transition-colors">
                                    <Folders size={16} />
                                </span>
                                <span
                                    className={`flex-1 truncate text-[13px] font-semibold ${isRoot ? 'text-white' : 'text-[#1A2438]'}`}
                                >
                                    {t('allDocuments')}
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
                            {t('categories')}
                        </p>
                        <ul className="space-y-0.5">
                            {categories.map((cat: any) => {
                                const isActive = selectedCategoryId === cat.id
                                return (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => onFilterCategory(isActive ? null : cat.id)}
                                            className={[
                                                'group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-medium transition-colors',
                                                isActive
                                                    ? 'bg-[#1E3560] text-white'
                                                    : 'text-[#56647A] hover:bg-[#1E3560]/[0.07] hover:text-[#1E3560]',
                                            ].join(' ')}
                                        >
                                            <span
                                                className={[
                                                    'shrink-0 transition-colors',
                                                    isActive ? 'text-white/70' : 'text-[#A8B8CC] group-hover:text-[#4A6FA5]',
                                                ].join(' ')}
                                            >
                                                <FileText size={16} />
                                            </span>
                                            <span className="flex-1 truncate">{cat.title}</span>
                                        </button>
                                    </li>
                                )
                            })}
                            {hasOther && (
                                <li>
                                    <button
                                        onClick={() =>
                                            onFilterCategory(selectedCategoryId === 'other' ? null : 'other')
                                        }
                                        className={[
                                            'group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-medium transition-colors',
                                            selectedCategoryId === 'other'
                                                ? 'bg-[#1E3560] text-white'
                                                : 'text-[#56647A] hover:bg-[#1E3560]/[0.07] hover:text-[#1E3560]',
                                        ].join(' ')}
                                    >
                                        <span
                                            className={[
                                                'shrink-0 transition-colors',
                                                selectedCategoryId === 'other'
                                                    ? 'text-white/70'
                                                    : 'text-[#A8B8CC] group-hover:text-[#4A6FA5]',
                                            ].join(' ')}
                                        >
                                            <FileText size={16} />
                                        </span>
                                        <span className="flex-1 truncate">{t('other')}</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </aside>
    </>
)
}