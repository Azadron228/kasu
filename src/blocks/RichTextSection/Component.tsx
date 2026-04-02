import React from 'react'

import RichText from '@/fields/RichText'
import type { RichTextSectionBlock as RichTextSectionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = RichTextSectionBlockProps & {
  className?: string
}

export const RichTextSection: React.FC<Props> = ({ className, content }) => {
  return (
    <section>
      <RichText
        data={content}
        enableGutter={false}
        className="text-brand-text"
      />
    </section>
  )
}
