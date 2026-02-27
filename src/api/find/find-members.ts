import { payload } from "@/config/instance"
import { TypedLocale } from "payload"


export default async function getMembers(locale: TypedLocale) {
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 8,
    locale,
  })

  return members
}
