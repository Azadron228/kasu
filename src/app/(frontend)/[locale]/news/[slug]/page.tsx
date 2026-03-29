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
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { MediaBlock as MediaContentBlock } from '@/blocks/MediaBlock/Component'
import { RelatedNews } from '@/blocks/RelatedNews/Component'
import { RichTextSection } from '@/blocks/RichTextSection/Component'

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
import type { News } from '@/payload-types'

type Args = { params: Promise<{ slug?: string }> }

function renderContentSection(section: NonNullable<News['contentSections']>[number], index: number) {
  switch (section.blockType) {
    case 'banner':
      return <BannerBlock key={index} {...section} />
    case 'code':
      return <CodeBlock key={index} {...section} />
    case 'mediaBlock':
      return (
        <MediaContentBlock
          key={index}
          {...section}
          enableGutter={false}
          className=""
          imgClassName=""
          captionClassName=""
        />
      )
    case 'relatedNews':
      return (
        <RelatedNews
          key={index}
          {...section}
          introContent={section.introContent || undefined}
          className="w-full"
        />
      )
    case 'richTextSection':
      return <RichTextSection key={index} {...section} />
    default:
      return null
  }
}

export default async function NewsPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) {
    return null
  }

  const t = await getTranslations('news')

  return (
    <article className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_28%,#f7f9fc_100%)] py-12 md:py-16">
      <PageClient />
      {draft && <LivePreviewListener />}

      <div className="container">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/news"
            className="mb-8 inline-block text-sm font-bold text-steel transition-colors hover:text-navy"
          >
            {t('backToList')}
          </Link>
          <header className="mb-8 rounded-[2rem] border border-silver-lt/80 bg-brand-white px-6 py-8 shadow-[0_18px_50px_rgba(30,53,96,.08)] md:mb-10 md:px-10 md:py-10">
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-steel">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
            </div>
            <h1
              className="max-w-7xl text-3xl font-bold leading-tight text-navy md:text-[2.65rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>
          </header>

          <div className="space-y-8 md:space-y-10">
            {post.heroImage && typeof post.heroImage !== 'string' && (
              <div className="relative overflow-hidden rounded-[2rem] border border-silver-lt/80 bg-brand-white p-3 shadow-[0_18px_50px_rgba(30,53,96,.08)] md:p-4">
                <div className="relative h-[260px] overflow-hidden rounded-[1.4rem] md:h-[440px]">
                  <Media
                    resource={post.heroImage}
                    fill
                    imgClassName="object-cover"
                    priority
                    loading="eager"
                    htmlElement={null}
                  />
                </div>
              </div>
            )}

            {post.contentSections?.map((section, index) => renderContentSection(section, index))}
          </div>
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
