import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TypedLocale, getPayload } from 'payload'
import configPromise from '@payload-config'
import type { JoinPage as JoinPageType, Form as FormType } from '@/payload-types'
import PageHeaderBlock from '../blocks/page-header-block'
import JoinFormBlock from '../blocks/join-form-block'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'join' })
  return { title: t('metaTitle') }
}

export default async function JoinPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('join')
  const page = (await getCachedGlobal('join-page', 2)()) as JoinPageType

  // Resolve the form relationship (depth=2 already populates it)
  const form = page?.form && typeof page.form !== 'number' ? (page.form as FormType) : null

  const infoBoxes = page?.infoBoxes ?? []

  return (
    <div className="min-h-screen bg-page-bg">
      {/* ── Page header ── */}
      <PageHeaderBlock
        tag={page?.tag ?? t('tag')}
        title={page?.title ?? t('listTitle')}
        subtitle={page?.subtitle ?? t('subtitle')}
        breadcrumbLabel={t('breadcrumb')}
      />

      {/* ── Main content ── */}
      <div className="px-6 md:px-12 xl:px-[72px] py-14 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Form card ── */}
          <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] p-8 md:p-12 border border-silver-lt/50">
            {form ? (
              <JoinFormBlock form={form} />
            ) : (
              <div className="text-center py-16 text-brand-muted">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-sm">Форма заявки ещё не настроена в CMS.</p>
              </div>
            )}
          </div>

          {/* ── Info sidebar ── */}
          <aside className="flex flex-col gap-5">
            {infoBoxes.length > 0 ? (
              infoBoxes.map((box, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl border border-silver-lt/60 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-pale flex items-center justify-center text-2xl mb-4 shadow-inner">
                    {box.icon}
                  </div>
                  {box.title && (
                    <h3 className="font-serif text-navy text-lg font-bold mb-2">{box.title}</h3>
                  )}
                  {box.body && (
                    <p className="text-brand-muted text-sm leading-relaxed">{box.body}</p>
                  )}
                </div>
              ))
            ) : (
              /* Default info boxes when CMS has none */
              <>
                <DefaultInfoBox
                  icon="🎓"
                  title="Кто может вступить?"
                  body="Любая образовательная организация Казахстана, реализующая программы для людей третьего возраста."
                />
                <DefaultInfoBox
                  icon="🤝"
                  title="Как проходит вступление?"
                  body="Заполните форму → мы свяжемся с вами → подписание соглашения → добро пожаловать в КАСУ!"
                />
                <DefaultInfoBox
                  icon="📜"
                  title="Что вы получите?"
                  body="Членство в профессиональном сообществе, доступ к методическим материалам и международным контактам."
                />
              </>
            )}

            {/* Helpline banner */}
            <div className="bg-gradient-to-br from-navy-deep to-navy rounded-2xl p-6 text-white mt-1 shadow-xl">
              <div className="text-2xl mb-3">📞</div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-sky/80 mb-1">
                Остались вопросы?
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Свяжитесь с нами по вопросам членства в КАСУ.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function DefaultInfoBox({
  icon,
  title,
  body,
}: {
  icon: string
  title: string
  body: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-silver-lt/60 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-12 h-12 rounded-xl bg-sky-pale flex items-center justify-center text-2xl mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="font-serif text-navy text-lg font-bold mb-2">{title}</h3>
      <p className="text-brand-muted text-sm leading-relaxed">{body}</p>
    </div>
  )
}
