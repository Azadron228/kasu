'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media } from '@/collections/Media/components/Media'
import type { GallerySliderBlock as GallerySliderProps } from '@/payload-types'

export const GallerySliderBlock: React.FC<GallerySliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  if (!images || images.length === 0) return null

  return (
    <div className="container my-12">
      <div className="relative group overflow-hidden rounded-2xl bg-sky-pale shadow-xl aspect-video">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <div key={item.id || index} className="w-full h-full flex-shrink-0 relative">
              <Media
                resource={item.image}
                fill
                imgClassName="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all border border-white/50",
                currentIndex === index ? "bg-white w-8" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
