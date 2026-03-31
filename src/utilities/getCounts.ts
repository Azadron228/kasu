import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function getCollectionCount(slug: 'members' | 'programs' | 'directions') {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.count({
    collection: slug,
  })

  return result.totalDocs
}

export const getCachedCollectionCount = (slug: 'members' | 'programs' | 'directions') =>
  unstable_cache(async () => getCollectionCount(slug), [slug], {
    tags: [`collection_count_${slug}`],
  })
