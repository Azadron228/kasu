import { FilterToolbar, FilterGroup } from '@/components/FilterToolbar'
import getRegions from '@/api/find/find-regions'
import { getTranslations } from 'next-intl/server'

export default async function FilterBlock() {
  const t = await getTranslations('blocks.filter')
  const regions = await getRegions()

  const filters: FilterGroup[] = [
    {
      label: t('label'),
      paramName: 'status',
      options: [
        { label: t('all'), value: '' },
        { label: t('statusFounder'), value: 'founder', className: 'founder' },
        { label: t('statusMember'), value: 'member' },
      ],
    },
    {
      label: t('regionLabel'),
      paramName: 'region',
      options: [
        { label: t('allRegions'), value: '' },
        ...regions.map((region) => ({
          label: typeof region.name === 'string' ? region.name : 'Unknown',
          value: region.id.toString(),
        })),
      ],
    },
  ]

  return (
    <FilterToolbar
      filters={filters}
      searchPlaceholder={t('searchPlaceholder')}
      searchParamName="search"
    />
  )
}
