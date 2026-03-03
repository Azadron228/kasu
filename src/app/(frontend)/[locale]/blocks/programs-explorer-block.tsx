import getMembersWithPrograms from '@/api/find/getMembersWithPrograms'
import { TypedLocale } from 'payload'
import ProgramsExplorerClient from './programs-explorer-client-block'

type Props = { locale: TypedLocale }

export default async function ProgramsExplorerBlock({ locale }: Props) {
  const { members, programs } = await getMembersWithPrograms(locale)

  return (
    <ProgramsExplorerClient
      members={members as any[]}
      programs={programs as any[]}
    />
  )
}