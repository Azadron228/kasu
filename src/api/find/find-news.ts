import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'

import { News } from '@/payload-types'

export default async function getNews(locale: TypedLocale): Promise<News[]> {
  const { docs: news } = await payload.find({
    collection: 'news',
    limit: 3,
    sort: '-publishedAt',
    locale,
  })

  return news
}
