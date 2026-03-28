import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { NewsGrid } from './components/grid-news'
import { Pagination } from '@/components/Pagination'
import PageHeaderBlock from '../blocks/page-header-block'
import PageClient from './page.client'
import { NewsFilter } from './components/news-filter'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Args = {
  searchParams: Promise<{ tag?: string; page?: string }>
}

export default async function NewsPage({ searchParams }: Args) {

  const searchParamsPromise = searchParams
  const translationsPromise = getTranslations<'news'>('news')

  const [{ tag, page }, t] = await Promise.all([searchParamsPromise, translationsPromise])



  const currentPage = Number(page) || 1


  const payload = await getPayload({ config: configPromise })

  const tagsResult = await payload.find({
    collection: 'news-tags',
    limit: 100,
    pagination: false,
  })

  const newsResult = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 12,
    page: currentPage,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      heroImage: true,
      publishedAt: true,
      tags: true,
      meta: { description: true },
    },
    ...(tag
      ? {
        where: {
          tags: { in: [tag] },
        },
      }
      : {}),
  })

  return (
    <main className="bg-page-bg min-h-screen">
      <PageClient />
      <PageHeaderBlock
        title={t('listTitle')}
        breadcrumbLabel={t('listTitle')}
        tag={t('archiveEvents')}
      />
      <div className="container py-16">
        <Suspense fallback={null}>
          <NewsFilter
            tags={tagsResult.docs as any}
            activeTag={tag}
            totalDocs={newsResult.totalDocs}
          />
        </Suspense>
        <NewsGrid newsItems={newsResult.docs as any} />
        {newsResult.totalPages > 1 && (
          <div className="mt-12">
            <Pagination page={newsResult.page!} totalPages={newsResult.totalPages} />
          </div>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('news')
  return { title: t('metaTitle') }
}
