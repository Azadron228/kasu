import { payload } from '@/config/instance'
import { TypedLocale } from 'payload'


export async function getDirections(locale: TypedLocale) {
  const { docs: directions } = await payload.find({
    collection: 'directions',
    limit: 6,
    sort: 'order',
    locale,
  })
  return directions
}
