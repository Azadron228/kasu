import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  // No pages collection exists, return empty array
  return []
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  // If you still want a placeholder page
  const page = {
    hero: null,
    layout: null,
    title: 'Page not found',
    slug: decodedSlug,
  }

  return (
    <article className="pt-16 pb-24">
      <PageClient />

      {draft && <LivePreviewListener />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = {
    title: 'Page not found',
    slug: decodedSlug,
  }

  return generateMeta({ doc: page })
}