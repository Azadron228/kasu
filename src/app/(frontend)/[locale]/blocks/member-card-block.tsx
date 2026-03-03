import Link from 'next/link'
import Image from 'next/image'

// ─────────────────────────────────────────────
// Types that mirror the Payload Members collection
// ─────────────────────────────────────────────

export interface MemberCardProps {
  id: string
  index?: number
  shortName: string
  fullName: string
  city: string
  region: { name: string }
  status: 'founder' | 'member'
  logo: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  website?: string
  description?: string
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
  website,
  description,
  accentColor = '#1E3560',
}: MemberCardProps) {
  const isFounder = status === 'founder'
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  return (
    <article className="relative flex flex-col rounded-2xl bg-[#FAFBFD] border-[1.5px] border-[#E4EBF3] overflow-hidden shadow-[0_6px_32px_rgba(30,53,96,.10)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(30,53,96,.16)] hover:border-[#4A6FA5] group">
      {/* ── Coloured top accent ── */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: accentColor }} />

      {/* ── Status badge ── */}
      <span
        className={[
          'absolute top-3.5 right-3.5 z-10',
          'text-[8.5px] font-black uppercase tracking-[0.8px] px-2.5 py-1 rounded-[4px]',
          isFounder
            ? 'bg-[#B8A060] text-[#162848] shadow-[0_2px_8px_rgba(184,160,96,.4)]'
            : 'bg-[#4A6FA5] text-white',
        ].join(' ')}
      >
        {STATUS_LABEL[status]}
      </span>

      {/* ── Main info ── */}
      <div className="flex items-start gap-4 px-5 pt-6 pb-4">
        {/* Logo */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden shadow-[0_4px_18px_rgba(30,53,96,.2)]">
          <Image
            src={logo?.url || '/placeholder-logo.png'}
            alt={logo?.alt ?? shortName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Text meta */}
        <div className="flex-1 min-w-0 pt-0.5">
          {num && (
            <span
              className="inline-block text-[9.5px] font-black tracking-[1px] px-2 py-0.5 rounded-[4px] mb-2"
              style={{
                background: accentColor + '22',
                color: accentColor,
              }}
            >
              #{num} · КАСУ
            </span>
          )}
          <h3 className="font-serif text-[15px] font-bold text-[#1E3560] leading-snug mb-1.5 line-clamp-2">
            {shortName}
          </h3>
          <p className="text-[12px] font-bold text-[#56647A] flex items-center gap-1">
            <span className="text-[11px]">📍</span>
            {city}
          </p>
        </div>
      </div>

      {/* ── Full name ── */}
      {fullName && (
        <p className="mx-5 mb-3 pl-3 text-[12.5px] text-[#56647A] italic leading-relaxed border-l-[3px] border-[#EAF2FA]">
          {fullName}
        </p>
      )}

      {/* ── Description (optional) ── */}
      {description && (
        <p className="mx-5 mb-3 text-[12px] text-[#56647A] leading-relaxed line-clamp-3">
          {description}
        </p>
      )}

      {/* ── Silver university pill ── */}
      <div className="mx-5 mb-4 flex items-center gap-2.5 bg-gradient-to-br from-[#EAF2FA] to-[#DDE8F5] rounded-xl p-3 border border-[#E4EBF3]">
        <div className="flex-shrink-0 w-8 h-8 bg-[#1E3560] rounded-lg flex items-center justify-center text-base">
          🎓
        </div>
        <div>
          <span className="block text-[9.5px] font-black uppercase tracking-[1.5px] text-[#4A6FA5] mb-0.5">
            Серебряный университет
          </span>
          <span className="text-[12px] font-bold text-[#1E3560]">
            Программа U3A · активный участник КАСУ
          </span>
        </div>
      </div>

      {/* ── Region tag ── */}
      <div className="px-5 pb-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#56647A] bg-[#F0F4FA] rounded-full px-3 py-1">
          🗺️ {region.name}
        </span>
      </div>

      {/* ── Actions ── */}
      <div className="mt-auto flex gap-2 px-5 py-3 bg-[#EAF2FA] border-t border-[#E4EBF3]">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#1E3560] hover:bg-[#2A4A7F] text-white text-[11.5px] font-bold px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-px"
          >
            🌐 Сайт
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center gap-1.5 bg-[#E4EBF3] text-[#A8B8CC] text-[11.5px] font-bold px-4 py-2 rounded-full cursor-not-allowed">
            🌐 Нет сайта
          </span>
        )}
        <Link
          href={`/members/${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white text-[11.5px] font-bold px-4 py-2 rounded-full transition-all duration-200"
        >
          🎓 Подробнее
        </Link>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────
// Join / CTA card (place last in the grid)
// ─────────────────────────────────────────────

export function MemberJoinCard() {
  return (
    <article className="relative flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden min-h-[300px] p-9 bg-gradient-to-br from-[#162848] via-[#1E3560] to-[#2A4A7F]">
      {/* decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#B8D0E8]/10 pointer-events-none" />

      <div className="text-[44px] leading-none text-white/20 mb-3 select-none">＋</div>
      <h3 className="font-serif text-xl text-white leading-snug mb-2">Вступите в Ассоциацию</h3>
      <p className="text-[12.5px] text-white/60 leading-relaxed max-w-[220px] mb-6">
        Если ваш университет реализует программу серебряного обучения — присоединяйтесь к КАСУ
      </p>
      <a
        href="#"
        className="bg-[#B8A060] hover:bg-[#D4BC80] text-[#162848] font-black text-[13px] px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(184,160,96,.35)] hover:shadow-[0_8px_28px_rgba(184,160,96,.5)]"
      >
        Подать заявку →
      </a>
    </article>
  )
}
