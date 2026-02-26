import type { Metadata } from 'next'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { TypedLocale } from 'payload'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import localization from '@/i18n/localization'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: TypedLocale }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Nunito:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <AdminBar adminBarProps={{ preview: isEnabled }} />
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
