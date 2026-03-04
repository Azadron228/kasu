import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  color?: string // Maintained for compatibility, but might not be used if static svg
}

export const Logo = (props: Props) => {
  const { className, loading, priority } = props

  return (
    <div className={className}>
      <Image
        src="/logo.svg"
        alt="КАСУ Логотип"
        width={64}
        height={64}
        className="w-full h-full object-cover"
        loading={loading}
        priority={priority ?? true}
      />
    </div>
  )
}
