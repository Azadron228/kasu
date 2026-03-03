import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'

export default async function getMembersWithPrograms(locale: TypedLocale) {
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100,
    depth: 1,
    locale,
  })

  const { docs: programs } = await payload.find({
    collection: 'programs',
    limit: 500,
    depth: 0,
    locale,
  })

  return { members, programs }
}