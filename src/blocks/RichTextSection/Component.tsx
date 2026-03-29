import React from 'react'

import RichText from '@/components/RichText'
import type { RichTextSectionBlock as RichTextSectionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = RichTextSectionBlockProps & {
  className?: string
}

export const RichTextSection: React.FC<Props> = ({ className, title, content }) => {
  return (
    <section className={cn('rounded-[2rem] border border-silver-lt/80 bg-brand-white px-6 py-8 shadow-[0_18px_50px_rgba(30,53,96,.08)] md:px-10 md:py-10', className)}>
      {title ? (
        <h2
          className="mb-5 text-2xl font-semibold leading-tight text-navy md:text-[2rem]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
      ) : null}
      <RichText
        data={content}
        enableGutter={false}
        className="text-brand-muted [&_p]:text-[1.02rem] [&_p]:leading-8"
      />
    </section>
  )
}
