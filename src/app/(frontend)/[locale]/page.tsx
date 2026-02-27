import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'
import HeroBlock from './blocks/hero-block'
import { Homepage } from '@/payload-types'
import StatsBlock from './blocks/stats-block'
import DirectionsBlock from './blocks/directions-block'
import AboutBlock from './blocks/about-block'
import NewsBlock from './blocks/news-block'
import MembersBlock from './blocks/members-block'
import { JoinBlock } from './blocks/join-block'
import ContactsBlock from './blocks/contacts-block'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const homepage = (await getCachedGlobal('homepage', 1)()) as Homepage
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

      {/* ── CONTACTS ── */}
      <ContactsBlock homepage={homepage} />
    </div>
  )
}
