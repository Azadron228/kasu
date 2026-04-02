'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export type FilterOption = {
  label: string
  value: string // Use empty string '' for "All" options
  className?: string
}

export type FilterGroup = {
  label?: string
  paramName: string
  options: FilterOption[]
  type?: 'buttons' | 'select'
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

  const handleFilterChange = (paramName: string, value: string, toggle: boolean = false) => {
    let newValue = value
    if (toggle) {
      const currentVal = searchParams.get(paramName) || ''
      newValue = currentVal === value ? '' : value
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, pathname, searchParamName, router]) 

  return (
    <div className="bg-white px-6 md:px-16 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-silver-lt/50 gap-6 sticky top-[72px] z-30 shadow-sm transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 flex-1 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        {filters.map((group, groupIdx) => (
          <div className="flex items-center gap-3 whitespace-nowrap" key={groupIdx}>
            {group.label && (
              <span className="text-[11px] font-extrabold text-brand-muted tracking-[1.5px] uppercase">
                {group.label}
              </span>
            )}
            
            {group.type === 'select' ? (
              <div className="relative">
                <select
                  value={searchParams.get(group.paramName) || ''}
                  onChange={(e) => handleFilterChange(group.paramName, e.target.value, false)}
                  className="appearance-none bg-sky-pale text-navy text-sm font-semibold rounded-full px-5 py-2 pr-10 border border-silver-lt focus:outline-none focus:ring-2 focus:ring-navy/20 cursor-pointer transition-all"
                >
                  {group.options.map((opt, optIdx) => (
                    <option key={optIdx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {group.options.map((opt, optIdx) => {
                  const currentParam = searchParams.get(group.paramName) || ''
                  const isActive = currentParam === opt.value
                  
                  const isFounder = opt.className?.includes('founder')

                  let btnClasses = 'px-4 py-1.5 rounded-full border-[1.5px] text-[12px] font-bold transition-all duration-200 '
                  
                  if (isActive) {
                    if (isFounder) {
                      btnClasses += 'bg-[#C49A3C] border-[#C49A3C] text-white shadow-md'
                    } else {
                      btnClasses += 'bg-navy border-navy text-white shadow-md'
                    }
                  } else {
                    if (isFounder) {
                      btnClasses += 'border-[#C49A3C] text-[#C49A3C] hover:bg-[#C49A3C]/10'
                    } else {
                      btnClasses += 'border-silver-lt text-brand-muted hover:border-silver hover:text-navy'
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      className={btnClasses}
                      onClick={() => handleFilterChange(group.paramName, opt.value, true)}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full lg:w-auto relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted group-focus-within:text-navy transition-colors">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-[240px] bg-sky-pale border border-silver-lt rounded-full py-2.5 pl-10 pr-4 text-sm text-navy placeholder:text-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all duration-300 shadow-inner shadow-black/5"
        />
      </div>
    </div>
  )
}
