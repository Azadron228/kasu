import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/fields/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/app/(frontend)/[locale]/components/LivePreviewListener'
import Link from 'next/link'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { MediaBlock as MediaContentBlock } from '@/blocks/MediaBlock/Component'
import { RelatedNews } from '@/blocks/RelatedNews/Component'
import { RichTextSection } from '@/blocks/RichTextSection/Component'
import { getTranslations } from 'next-intl/server'
import { Media } from '@/collections/Media/components/Media'
import type { News, NewsTag } from '@/payload-types'
import { ChevronLeft, Calendar, Tag as TagIcon, Clock, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react'

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

type Args = { params: Promise<{ slug?: string }> }

function renderContentSection(section: NonNullable<News['contentSections']>[number], index: number) {
  switch (section.blockType) {
    case 'banner':
      return <div key={index} className="my-8"><BannerBlock {...section} /></div>
    case 'code':
      return <div key={index} className="my-8"><CodeBlock {...section} /></div>
    case 'mediaBlock':
      return (
        <MediaContentBlock
          key={index}
          {...section}
          enableGutter={false}
          className="my-10 md:my-16"
          imgClassName="rounded-3xl shadow-xl border border-silver-lt/50"
          captionClassName="text-center text-sm font-medium text-brand-muted mt-5 italic"
        />
      )
    case 'relatedNews':
      return (
        <div key={index} className="border-t border-silver-lt pt-16 mt-20">
          <RelatedNews
            {...section}
            introContent={section.introContent || undefined}
            className="w-full"
          />
        </div>
      )
    case 'richTextSection':
      return (
        <div key={index} className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-steel hover:prose-a:text-navy prose-strong:text-navy prose-img:rounded-2xl prose-img:shadow-md">
          <RichTextSection {...section} className="px-0 py-0 md:px-0 md:py-0 rounded-none shadow-none" />
        </div>
      )
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

  const tags = post.tags?.filter((tag): tag is NewsTag => typeof tag === 'object') || []

  return (
    <div className="bg-white min-h-screen pb-24">
      <PageClient />
      {draft && <LivePreviewListener />}

      {/* ── TOP NAVIGATION ── */}
      <div className="bg-brand-white border-b border-silver-lt/50 py-5 mb-12 sticky top-20 z-40 backdrop-blur-md bg-white/80">
        <div className="container max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A6FA5] hover:text-[#1E3560] transition-colors"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {t('backToList')}
          </Link>
        </div>
      </div>

      <article className="container max-w-5xl mx-auto px-6">
        {/* ── HEADER ── */}
        <header className="mb-12">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-sky-pale text-navy px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] border border-sky/30 shadow-sm"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-navy leading-[1.05] tracking-tight mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-brand-muted text-[13px] font-bold border-y border-silver-lt/50 py-6">
            {post.publishedAt && (
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-gold" />
                <time dateTime={post.publishedAt} className="text-navy/80 uppercase tracking-wider">
                  {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            )}
          </div>
        </header>

        {/* ── HERO IMAGE ── */}
        {post.heroImage && typeof post.heroImage === 'object' && (
          <div className="relative mb-16 md:mb-24">
            <div className="aspect-[21/9] relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-navy/15 border border-silver-lt/50 bg-sky-pale group">
              <Media
                resource={post.heroImage}
                fill
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                loading="eager"
                htmlElement={null}
              />
            </div>
            {post.heroImage.caption && (
              <div className="mt-6 flex justify-center">
                <span className="inline-block px-6 py-2 bg-brand-white rounded-full text-xs font-medium text-brand-muted italic border border-silver-lt/50 shadow-sm">
                  {post.heroImage.caption}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── CONTENT ── */}
        <div className="mx-auto">
          <div className="news-post-content space-y-4">
            {post.contentSections?.map((section, index) => renderContentSection(section, index))}
          </div>
        </div>
      </article>
    </div>
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

