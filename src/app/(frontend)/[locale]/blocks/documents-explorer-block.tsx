'use client'

import React, { useMemo, useState, useCallback } from 'react'
import { Document, DocumentCategory, FolderInterface } from '@/payload-types'
import DocumentsSidebar from './documents-sidebar'
import DocumentsContent from './documents-list'

type Props = {
    categories: DocumentCategory[]
    documents: Document[]
    folders: FolderInterface[]
}

export type BreadcrumbItem = {
    id: number | 'root'
    name: string
}

export type FolderNode = {
    id: number
    name: string
    folder?: (number | null) | FolderInterface
    folderType?: ('media' | 'documents')[] | null
    updatedAt: string
    createdAt: string
    children: FolderNode[]
}

/** Build a nested tree from flat folder list */
function buildFolderTree(
    folders: FolderInterface[],
): { roots: FolderNode[]; map: Map<number, FolderNode> } {
    const map = new Map<number, FolderNode>()
    for (const f of folders) {
        map.set(f.id, {
            id: f.id,
            name: f.name,
            folder: f.folder,
            folderType: f.folderType,
            updatedAt: f.updatedAt,
            createdAt: f.createdAt,
            children: [],
        })
    }
    const roots: FolderNode[] = []
    for (const f of folders) {
        const node = map.get(f.id)!
        const parentId =
            f.folder && typeof f.folder === 'object'
                ? (f.folder as FolderInterface).id
                : typeof f.folder === 'number'
                    ? f.folder
                    : null
        if (parentId && map.has(parentId)) {
            map.get(parentId)!.children.push(node)
        } else {
            roots.push(node)
        }
    }
    return { roots, map }
}

export default function DocumentsExplorerBlock({ categories, documents, folders }: Props) {
    const { roots: folderRoots, map: folderMap } = useMemo(
        () => buildFolderTree(folders),
        [folders],
    )

    const [currentFolderId, setCurrentFolderId] = useState<number | 'root'>('root')
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
        { id: 'root', name: 'Все документы' },
    ])
    const [expandedFolders, setExpandedFolders] = useState<Set<number>>(new Set())

    const navigateTo = useCallback(
        (folderId: number | 'root', folderName: string, parentChain?: BreadcrumbItem[]) => {
            setCurrentFolderId(folderId)
            if (folderId === 'root') {
                setBreadcrumbs([{ id: 'root', name: 'Все документы' }])
            } else if (parentChain) {
                setBreadcrumbs([
                    { id: 'root', name: 'Все документы' },
                    ...parentChain,
                    { id: folderId, name: folderName },
                ])
            } else {
                setBreadcrumbs([
                    { id: 'root', name: 'Все документы' },
                    { id: folderId, name: folderName },
                ])
            }
        },
        [],
    )

    const navigateToBreadcrumb = useCallback((index: number) => {
        setBreadcrumbs((prev) => {
            const newBc = prev.slice(0, index + 1)
            const target = newBc[newBc.length - 1]
            setCurrentFolderId(target.id as number | 'root')
            return newBc
        })
    }, [])

    const toggleFolder = useCallback((folderId: number) => {
        setExpandedFolders((prev) => {
            const next = new Set(prev)
            if (next.has(folderId)) next.delete(folderId)
            else next.add(folderId)
            return next
        })
    }, [])

    // Documents visible in current view
    const viewData = useMemo(() => {
        if (currentFolderId === 'root') {
            const unfolderedDocs = documents.filter((d) => {
                if (!d.folder) return true
                if (typeof d.folder === 'number') return false
                return !d.folder?.id
            })
            return { subFolders: folderRoots, documents: unfolderedDocs, isRoot: true }
        } else {
            const currentNode = folderMap.get(currentFolderId as number)
            const subFolders = currentNode?.children ?? []
            const folderDocs = documents.filter((d) => {
                if (!d.folder) return false
                const fid =
                    typeof d.folder === 'object' ? (d.folder as FolderInterface).id : d.folder
                return fid === currentFolderId
            })
            return { subFolders, documents: folderDocs, isRoot: false }
        }
    }, [currentFolderId, folderRoots, folderMap, documents])

    // Group unfoldered docs by category (for root view)
    // Group unfoldered docs by category (for root view)
    const groupedByCategory = useMemo(() => {
        if (!viewData.isRoot) return null
        const res: Record<string, Document[]> = {}

        for (const doc of viewData.documents) {
            const cat = typeof doc.category === 'object' ? doc.category : null
            // Group by ID instead of slug, fallback to 'other'
            const groupKey = cat?.id ? String(cat.id) : 'other'

            if (!res[groupKey]) res[groupKey] = []
            res[groupKey].push(doc)
        }
        return res
    }, [viewData])

    const featured = useMemo(() => documents.filter((d) => d.isFeatured), [documents])

    return (
        <div className="flex min-h-[calc(100vh-220px)]">
            <DocumentsSidebar
                categories={categories}
                folderRoots={folderRoots}
                expandedFolders={expandedFolders}
                currentFolderId={currentFolderId}
                onNavigate={navigateTo}
                onToggle={toggleFolder}
                folderMap={folderMap}
                totalDocs={documents.length}
            />
            <DocumentsContent
                categories={categories}
                viewData={viewData}
                groupedByCategory={groupedByCategory}
                featured={featured}
                breadcrumbs={breadcrumbs}
                currentFolderId={currentFolderId}
                onNavigate={navigateTo}
                onBreadcrumb={navigateToBreadcrumb}
                folderMap={folderMap}
            />
        </div>
    )
}
