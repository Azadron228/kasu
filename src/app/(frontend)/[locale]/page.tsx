import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'
import HeroBlock from './blocks/hero-block'
import { Homepage, Settings } from '@/payload-types'
import StatsBlock from './blocks/stats-block'
import DirectionsBlock from './blocks/directions-block'
import AboutBlock from './blocks/about-block'
import NewsBlock from './blocks/news-block'
import MembersBlock from './blocks/members-block'
import { JoinBlock } from './blocks/join-block'
import ContactsBlock from './blocks/contacts-block'
import HomeFeaturedDocsBlock from './blocks/home-featured-docs-block'


type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const homepage = (await getCachedGlobal('homepage', 1)()) as Homepage
  const settings = (await getCachedGlobal('settings', 1)()) as Settings
  return (
    <div>
      <HeroBlock homepage={homepage} />
      <StatsBlock homepage={homepage} />
      <DirectionsBlock locale={locale} />

      {/* ── ABOUT ── */}
      <AboutBlock homepage={homepage} />

      {/* ── NEWS ── */}
      <NewsBlock locale={locale} />

      {/* ── MEMBERS ── */}
      <MembersBlock locale={locale} />

      {/* ── JOIN ── */}
      <JoinBlock homepage={homepage} />

      {/* ── FEATURED DOCUMENTS ── */}
      <HomeFeaturedDocsBlock locale={locale} />

      {/* ── CONTACTS ── */}
      <ContactsBlock settings={settings} />
    </div>
  )
}
