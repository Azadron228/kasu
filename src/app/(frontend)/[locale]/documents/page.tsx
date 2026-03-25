import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import PageHeaderBlock from '../blocks/page-header-block'
import DocumentsExplorerBlock from '../blocks/documents-explorer-block'

import { getDocumentsData } from '@/api/find/find-documents'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function DocumentsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('documents')

  const page = (await getCachedGlobal('documents-page', 1)()) as any

  const { categories, documents, folders } = await getDocumentsData(locale)

  return (
    <div className="min-h-screen bg-sky-pale">
      <PageHeaderBlock
        tag={page?.tag ?? t('archive')}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? undefined}
        breadcrumbLabel={t('breadcrumb')}
      />

      <DocumentsExplorerBlock
        categories={categories as any}
        documents={documents as any}
        folders={folders as any}
      />
    </div>
  )
}