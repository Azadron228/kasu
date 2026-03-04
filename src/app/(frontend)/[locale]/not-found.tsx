import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif text-9xl font-extrabold text-navy mb-4 opacity-10">404</h1>
      <div className="-mt-20">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
          Страница не найдена
        </h2>
        <p className="text-brand-muted text-lg mb-10 max-w-md mx-auto">
          К сожалению, запрашиваемая вами страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="bg-navy text-brand-white px-8 py-3 rounded-full font-bold text-base shadow-lg hover:bg-navy-mid transition-all inline-block"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
