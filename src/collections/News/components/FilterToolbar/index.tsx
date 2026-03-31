'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import './index.scss'

export type FilterOption = {
  label: string
  value: string // Use empty string '' for "All" options
  className?: string
}

export type FilterGroup = {
  label?: string
  paramName: string
  options: FilterOption[]
}

type Props = {
  filters?: FilterGroup[]
  searchPlaceholder?: string
  searchParamName?: string
}

export const FilterToolbar: React.FC<Props> = ({
  filters = [],
  searchPlaceholder = 'Search...',
  searchParamName = 'search',
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get(searchParamName) || '')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams],
  )

  const handleFilterClick = (paramName: string, value: string) => {
    // If the value is the same as the current, we can also deselect it,
    // or if the user clicks "All" (value === ''), it clears the filter.
    const currentVal = searchParams.get(paramName) || ''
    const newValue = currentVal === value ? '' : value // toggle

    router.push(`${pathname}?${createQueryString(paramName, newValue)}`, { scroll: false })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const p = new URLSearchParams(searchParams.toString())
      if (searchTerm) {
        p.set(searchParamName, searchTerm)
      } else {
        p.delete(searchParamName)
      }
      
      const newUrl = `${pathname}?${p.toString()}`
      if (`${pathname}?${searchParams.toString()}` !== newUrl) {
         router.push(newUrl, { scroll: false })
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
    // Only reacting to searchTerm changes to avoid infinite loop with searchParams
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, pathname, searchParamName, router]) 

  return (
    <div className="toolbar">
      {filters.map((group, groupIdx) => (
        <div className="filter-row" key={groupIdx}>
          {group.label && <span className="filter-label">{group.label}</span>}
          {group.options.map((opt, optIdx) => {
            const currentParam = searchParams.get(group.paramName) || ''
            // Consider active if matching value, or if currentParam is empty and opt.value is empty ("All" button)
            const isActive = currentParam === opt.value

            return (
              <button
                key={optIdx}
                className={`f-btn ${opt.className || ''} ${isActive ? 'active' : ''}`.trim()}
                onClick={() => handleFilterClick(group.paramName, opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      ))}
      <div className="search-box">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
