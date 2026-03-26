import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

import PageHeaderBlock from '../blocks/page-header-block'
import { payload } from '@/config/instance'
import findPosts from '@/api/find/find-posts'
import { getTranslations } from 'next-intl/server'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const t = await getTranslations('search')

  const posts = await findPosts(query)
  return (
    <div className="bg-page-bg min-h-screen">
      <PageHeaderBlock
        title={t('title')}
        subtitle={query ? t('resultsFor', { query }) : t('initialText')}
        breadcrumbLabel={t('listTitle')}
      />
      <PageClient />

      <div className="container py-12">
        <div className="max-w-[50rem] mx-auto mb-16">
          <Search />
        </div>

        {posts.totalDocs > 0 ? (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="container text-center py-10 text-brand-muted">
            {query ? t('notFound') : t('emptyPrompt')}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('search')
  return {
    title: t('metaTitle'),
  }
}
