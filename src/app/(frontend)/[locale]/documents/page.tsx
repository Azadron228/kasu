import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'
import PageHeaderBlock from '../blocks/page-header-block'
import DocumentsExplorerBlock from '../blocks/documents-explorer-block'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function DocumentsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config: configPromise })
  const page = (await getCachedGlobal('documents-page', 1)()) as any

  const { docs: categories } = await payload.find({
    collection: 'document-categories',
    sort: 'order',
    limit: 50,
  })

  const { docs: documents } = await payload.find({
    collection: 'documents',
    sort: '-date',
    limit: 500,
    depth: 2,
    locale,
  })

  // Fetch all payload-folders (Payload's built-in folder system)
  const { docs: folders } = await payload.find({
    collection: 'payload-folders',
    limit: 200,
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-sky-pale">
      <PageHeaderBlock
        tag={page?.tag ?? 'Официальный архив'}
        title={page?.title ?? 'Документы Ассоциации'}
        subtitle={page?.subtitle ?? undefined}
      />

      <DocumentsExplorerBlock
        categories={categories as any}
        documents={documents as any}
        folders={folders as any}
      />
    </div>
  )
}