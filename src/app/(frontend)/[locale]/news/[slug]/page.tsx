import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const newsResults = await payload.find({
    collection: 'news',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return newsResults.docs.map(({ slug }) => ({ slug }))
}

import { getTranslations } from 'next-intl/server'

import { Media } from '@/components/Media'

type Args = { params: Promise<{ slug?: string }> }

export default async function NewsPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/news/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) {
    return null
  }

  const t = await getTranslations('news')

  return (
    <article className="container py-16">
      <PageClient />
      {draft && <LivePreviewListener />}

      <div className="max-w-3xl mx-auto">
        <Link href="/news" className="text-sm font-bold text-steel hover:text-navy mb-8 inline-block transition-colors">
          {t('backToList')}
        </Link>
        <div className="mb-8">
          <div className="text-sm text-muted font-bold mb-3">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</div>
          <h1 className="text-4xl font-bold text-navy leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{post.title}</h1>
        </div>

        {post.heroImage && typeof post.heroImage !== 'string' && (
          <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-2xl">
            <Media resource={post.heroImage} fill imgClassName="object-cover" priority loading="eager" htmlElement={null} />
          </div>
        )}
        <div className="prose max-w-none text-black leading-relaxed">
          <RichText data={post.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'news',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
