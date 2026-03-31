import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateCollectionCount = (slug: string): CollectionAfterChangeHook & CollectionAfterDeleteHook => {
  const hook: any = ({ operation }: { operation?: string }) => {
    if (operation === 'create' || !operation) { // !operation for delete
      revalidateTag(`collection_count_${slug}`)
    }
    return
  }
  return hook
}
