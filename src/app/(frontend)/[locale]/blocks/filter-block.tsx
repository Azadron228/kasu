import { FilterToolbar, FilterGroup } from '@/components/FilterToolbar'
import getRegions from '@/api/find/find-regions'

export default async function FilterBlock() {
  const regions = await getRegions()

  const filters: FilterGroup[] = [
    {
      label: 'Фильтр:',
      paramName: 'status',
      options: [
        { label: 'Всё', value: '' },
        { label: 'Учредитель', value: 'founder', className: 'founder' },
        { label: 'Новые члены', value: 'member' },
      ],
    },
    {
      label: 'Регион:',
      paramName: 'region',
      options: [
        { label: 'Все', value: '' },
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
      searchPlaceholder="Найти участника..."
      searchParamName="search"
    />
  )
}
