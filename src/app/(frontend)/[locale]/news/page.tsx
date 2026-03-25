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
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function NewsPage({ searchParams }: Args) {
  const { category, page } = await searchParams
  const currentPage = Number(page) || 1
  const t = await getTranslations('news')

  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
  })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: currentPage,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      categories: true,
      meta: { description: true },
    },
    ...(category
      ? {
        where: {
          'categories.slug': { equals: category },
        },
      }
      : {}),
  })

  return (
    <main className="bg-page-bg min-h-screen">
      <PageClient />
      <PageHeaderBlock
        title={t('listTitle')}
        breadcrumbLabel={t('breadcrumb')}
        tag={t('archiveEvents')}
      />
      <div className="container py-16">
        <Suspense fallback={null}>
          <NewsFilter
            categories={categoriesResult.docs}
            activeCategory={category}
            totalDocs={posts.totalDocs}
          />
        </Suspense>
        <NewsGrid posts={posts.docs} />
        {posts.totalPages > 1 && (
          <div className="mt-12">
            <Pagination page={posts.page!} totalPages={posts.totalPages} />
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