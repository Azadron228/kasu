import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'

export default async function getMembers(locale: TypedLocale) {
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 8,
    locale,
  })

  return members
}

type MembersParams = {
  status?: string
  region?: string
  search?: string
  locale?: TypedLocale
}

export async function getFilteredMembers({ status, region, search, locale }: MembersParams) {

  const and: Record<string, any>[] = []

  if (status) and.push({ status: { equals: status } })
  if (region) and.push({ region: { equals: region } })
  if (search) {
    and.push({
      or: [{ fullName: { like: search } }, { shortName: { like: search } }],
    })
  }

  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100,
    depth: 1,
    locale,
    where: and.length > 0 ? { and } : undefined,
  })

  return members
}
