import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import localization from '@/i18n/localization'

export const revalidatePaths = (paths: string[]): CollectionAfterChangeHook & CollectionAfterDeleteHook => {
  return ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating multiple paths`)
    
    paths.forEach((p) => {
        // If path starts with /, it's a relative path from root
        // We should revalidate it for all locales
        localization.locales.forEach((locale) => {
            const localizedPath = p === '/' ? `/${locale.code}` : `/${locale.code}${p}`
            payload.logger.info(`Revalidating path: ${localizedPath}`)
            revalidatePath(localizedPath)
        })
    })

    return doc
  }
}
