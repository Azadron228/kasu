import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Star, MapPin, Map, Globe, GraduationCap, Plus, ArrowRight, List } from 'lucide-react'

// ─────────────────────────────────────────────
// Types that mirror the Payload Members collection
// ─────────────────────────────────────────────

export interface MemberCardProps {
  id: string | number
  index?: number
  shortName: string
  fullName: string
  city: string
  region: { name: string }
  status: 'founder' | 'member'
  logo?: {
    url: string
    alt?: string
    width?: number
    height?: number
  } | null
  main_url?: string | null
  silver_url?: string | null
  description?: string | null
  accentColor?: string
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function MemberCard({
  id,
  shortName,
  fullName,
  city,
  region,
  status,
  logo,
  main_url,
  silver_url,
}: MemberCardProps) {
  const isFounder = status === 'founder'

  return (
    <article className="relative flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden group">

      {/* ── Status badge ── */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={[
            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors',
            isFounder
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          ].join(' ')}
        >
          {isFounder && <Star size={10} fill="currentColor" />}
          {isFounder ? 'Учредитель' : 'Член'}
        </span>
      </div>

      {/* ── Header: Logo & Titles ── */}
      <div className="flex items-start gap-4 p-5 pb-0">
        {/* Logo (No background/shadow, clean look) */}
        <div className="relative flex-shrink-0 w-[68px] h-[68px]">
          <Image
            src={logo?.url || '/logo.svg'}
            alt={logo?.alt ?? shortName}
            fill
            sizes="68px"
            className="object-contain"
          />
        </div>

        {/* Titles */}
        <div className="flex-1 pt-1 pr-16 min-w-0">
          <h3 className="font-sans text-[16px] font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
            {shortName}
          </h3>
          {fullName && (
            <p className="text-[14px] text-slate-500 leading-snug line-clamp-2">
              {fullName}
            </p>
          )}
        </div>
      </div>

      {/* ── Location Tags ── */}
      <div className="px-5 mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-full">
          <MapPin size={13} className="text-slate-400" />
          {city}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-700 text-[12px] font-medium px-3 py-1.5 rounded-full">
          <Map size={13} className="text-slate-400" />
          {region.name}
        </span>
      </div>

      {/* ── Primary Action (View Programs) ── */}
      <div className="px-5 mt-5">
        <Link
          href={`/programs?member=${id}`}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#12365B] text-white font-medium text-[14px] px-4 py-3 rounded-xl transition-all duration-200"
        >
          <List size={16} /> Посмотреть программы
        </Link>
      </div>

      {/* ── Secondary Actions (Footer) ── */}
      <div className="mt-5 px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
        {main_url && (
          <a
            href={main_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-[12px] font-medium px-4 py-2.5 rounded-full transition-all duration-200"
          >
            <Globe size={14} className="text-slate-500" /> Сайт
          </a>
        )}
        {silver_url && (
          <a
            href={silver_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-[12px] font-medium px-4 py-2.5 rounded-full transition-all duration-200"
          >
            <GraduationCap size={14} className="text-slate-500" /> Серебр. ун-т
          </a>
        )}
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────
// Join / CTA card (Kept mostly the same, adjusted rounded corners to match)
// ─────────────────────────────────────────────

export function MemberJoinCard() {
  return (
    <article className="relative flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden min-h-[300px] p-9 bg-gradient-to-br from-[#0A2540] via-[#12365B] to-[#1a497b]">
      {/* decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

      <div className="text-[44px] leading-none text-white/20 mb-3 select-none">
        <Plus size={48} />
      </div>
      <h3 className="font-serif text-xl text-white leading-snug mb-2">Вступите в Ассоциацию</h3>
      <p className="text-[12.5px] text-white/70 leading-relaxed max-w-[220px] mb-6">
        Если ваш университет реализует программу серебряного обучения — присоединяйтесь к КАСУ
      </p>
      <a
        href="#"
        className="bg-white hover:bg-slate-50 text-[#0A2540] font-bold text-[13px] px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
      >
        Подать заявку <ArrowRight size={16} />
      </a>
    </article>
  )
}