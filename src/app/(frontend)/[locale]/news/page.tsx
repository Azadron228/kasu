import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function NewsPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 12,
    sort: '-publishedAt',
  })

  return (
    <main className="container py-16">
      <h1 className="s-title mb-10">Новости и события</h1>

      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        {posts.docs.map((post, i) => (
          <Link
            href={`/news/${post.slug}`}
            className={`news-card`}
            key={i}
            style={{ textDecoration: 'none' }}
          >
            <div className="n-img">
              <span className="n-tag">Новость</span>
            </div>
            <div className="n-body">
              <div className="n-date">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
              </div>
              <h3>{post.title}</h3>
              <p className="line-clamp-3">{post.excerpt || ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Новости | КАСУ U3A`,
  }
}
