import React from 'react'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RelatedNews } from '@/blocks/RelatedNews/Component'
import { RichTextSection } from '@/blocks/RichTextSection/Component'
import { GallerySliderBlock } from '@/blocks/GallerySliderBlock/Component'

type Block = any // We can refine this with union of block types from payload-types

const blockComponents = {
  banner: BannerBlock,
  code: CodeBlock,
  mediaBlock: MediaBlock,
  relatedNews: RelatedNews,
  richTextSection: RichTextSection,
  gallerySlider: GallerySliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Block[]
}> = ({ blocks }) => {
  if (!blocks) return null

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const { blockType } = block
        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]
          if (Block) {
            return (
              <div key={index}>
                {/* @ts-ignore */}
                <Block {...block} />
              </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}
