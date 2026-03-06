import Image from 'next/image'

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
  /** Accent colour extracted from the logo or set per-university */
  accentColor?: string
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const STATUS_LABEL: Record<MemberCardProps['status'], string> = {
  founder: '★ Учредитель',
  member: 'Член',
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function MemberCard({
  id,
  index,
  shortName,
  fullName,
  city,
  region,
  status,
  logo,
  main_url,
  silver_url,
  description,
  accentColor = '#1E3560',
}: MemberCardProps) {
  const isFounder = status === 'founder'
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  return (
    <article className="relative flex flex-col rounded-2xl bg-brand-white border-[1.5px] border-silver-lt overflow-hidden shadow-[0_6px_32px_rgba(30,53,96,.10)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(30,53,96,.16)] hover:border-steel group">
      {/* ── Coloured top accent ── */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: accentColor }} />

      {/* ── Status badge ── */}
      <span
        className={[
          'absolute top-3.5 right-3.5 z-10',
          'text-[8.5px] font-black uppercase tracking-[0.8px] px-2.5 py-1 rounded-[4px]',
          isFounder
            ? 'bg-gold text-navy-deep shadow-[0_2px_8px_rgba(184,160,96,.4)]'
            : 'bg-steel text-white',
        ].join(' ')}
      >
        {STATUS_LABEL[status]}
      </span>

      {/* ── Main info ── */}
      <div className="flex items-start gap-4 px-5 pt-6 pb-4">
        {/* Logo */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden shadow-[0_4px_18px_rgba(30,53,96,.2)]">
          <Image
            src={logo?.url || '/logo.svg'}
            alt={logo?.alt ?? shortName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Text meta */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-serif text-[15px] font-bold text-navy leading-snug mb-1.5 line-clamp-2">
            {shortName}
          </h3>
          <p className="text-[12px] font-bold text-brand-muted flex items-center gap-1">
            <span className="text-[11px]">📍</span>
            {city}
          </p>
        </div>
      </div>

      {/* ── Full name ── */}
      {fullName && (
        <p className="mx-5 mb-3 pl-3 text-[12.5px] text-brand-muted italic leading-relaxed border-l-[3px] border-sky-pale">
          {fullName}
        </p>
      )}

      {/* ── Description (optional) ── */}
      {description && (
        <p className="mx-5 mb-3 text-[12px] text-brand-muted leading-relaxed line-clamp-3">
          {description}
        </p>
      )}

      {/* ── Region tag ── */}
      <div className="px-5 pb-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-muted bg-sky-pale rounded-full px-3 py-1">
          🗺️ {region.name}
        </span>
      </div>

      {/* ── Actions ── */}
      <div className="mt-auto flex items-center gap-2 px-[22px] py-[13px] bg-sky-pale border-t border-silver-lt">
        {main_url ? (
          <a
            href={main_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-[5px] bg-navy hover:bg-navy-mid text-white text-[11.5px] font-bold px-4 py-2 rounded-[18px] transition-all duration-200 hover:-translate-y-px"
          >
            🌐 Сайт
          </a>
        ) : null}
        {silver_url ? (
          <a
            href={silver_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-[5px] bg-transparent hover:bg-brand-muted text-brand-muted hover:text-white border-[1.5px] border-brand-muted text-[11.5px] font-bold px-[14px] py-2 rounded-[18px] transition-all duration-200 hover:-translate-y-px"
          >
            🎓 Серебр. ун-т
          </a>
        ) : null}
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────
// Join / CTA card (place last in the grid)
// ─────────────────────────────────────────────

export function MemberJoinCard() {
  return (
    <article className="relative flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden min-h-[300px] p-9 bg-gradient-to-br from-navy-deep via-navy to-navy-mid">
      {/* decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky/10 pointer-events-none" />

      <div className="text-[44px] leading-none text-white/20 mb-3 select-none">＋</div>
      <h3 className="font-serif text-xl text-white leading-snug mb-2">Вступите в Ассоциацию</h3>
      <p className="text-[12.5px] text-white/60 leading-relaxed max-w-[220px] mb-6">
        Если ваш университет реализует программу серебряного обучения — присоединяйтесь к КАСУ
      </p>
      <a
        href="#"
        className="bg-gold hover:bg-gold-lt text-navy-deep font-black text-[13px] px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(184,160,96,.35)] hover:shadow-[0_8px_28px_rgba(184,160,96,.5)]"
      >
        Подать заявку →
      </a>
    </article>
  )
}
