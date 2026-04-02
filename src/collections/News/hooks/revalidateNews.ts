import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { News } from '../../../payload-types'
import localization from '@/i18n/localization'

export const revalidateNews: CollectionAfterChangeHook<any> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/news/${doc.slug}`

      payload.logger.info(`Revalidating news at path: ${path}`)

      revalidatePath(path)
      revalidateTag('news-sitemap')

      // Revalidate homepage and news listing for all locales
      localization.locales.forEach((locale) => {
        payload.logger.info(`Revalidating paths for locale: ${locale.code}`)
        revalidatePath(`/${locale.code}`)
        revalidatePath(`/${locale.code}/news`)
      })
    }

    // If the news was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/news/${previousDoc.slug}`

      payload.logger.info(`Revalidating old news at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('news-sitemap')

      // Revalidate homepage and news listing for all locales
      localization.locales.forEach((locale) => {
        revalidatePath(`/${locale.code}`)
        revalidatePath(`/${locale.code}/news`)
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<any> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/news/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('news-sitemap')

    // Revalidate homepage and news listing for all locales
    localization.locales.forEach((locale) => {
      revalidatePath(`/${locale.code}`)
      revalidatePath(`/${locale.code}/news`)
    })
  }

  return doc
}
