import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'

export default async function getNews(locale: TypedLocale) {
  const { docs: news } = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-publishedAt',
    locale,
  })

  return news
}
