import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

import PageHeaderBlock from '../blocks/page-header-block'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            { title: { like: query } },
            { 'meta.description': { like: query } },
            { 'meta.title': { like: query } },
            { slug: { like: query } },
          ],
        },
      }
      : {}),
  })

  return (
    <div className="bg-page-bg min-h-screen">
      <PageHeaderBlock
        title="Поиск по сайту"
        subtitle={query ? `Результаты поиска для: "${query}"` : 'Введите запрос для поиска по материалам Ассоциации'}
        breadcrumbLabel="Поиск"
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
            {query ? 'По вашему запросу ничего не найдено.' : 'Начните поиск, введя ключевое слово выше.'}
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Поиск | КАСУ U3A`,
  }
}
