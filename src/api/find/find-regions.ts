import { payload } from '@/config/instance'

export default async function getRegions() {
  const { docs: regions } = await payload.find({
    collection: 'regions',
    limit: 100,
  })

  return regions
}
