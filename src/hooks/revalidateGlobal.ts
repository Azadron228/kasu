import { revalidatePath, revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'
import localization from '@/i18n/localization'

export const revalidateGlobal = (slug: string): GlobalAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating global: ${slug}`)
    revalidateTag(`global_${slug}`)

    // Also revalidate the homepage for all locales just in case
    localization.locales.forEach((locale) => {
      const path = `/${locale.code}`
      payload.logger.info(`Revalidating path: ${path}`)
      revalidatePath(path)
    })

    return doc
  }
}
