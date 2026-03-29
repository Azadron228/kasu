import React from 'react'

import RichText from '@/components/RichText'
import type { RichTextSectionBlock as RichTextSectionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = RichTextSectionBlockProps & {
  className?: string
}

export const RichTextSection: React.FC<Props> = ({ className, content }) => {
  return (
    <section className={cn('rounded-[2rem] px-6 py-8 md:px-10 md:py-10', className)}>
      <RichText
        data={content}
        enableGutter={false}
        className="text-brand-muted [&_p]:text-[1.02rem] [&_p]:leading-8"
      />
    </section>
  )
}
