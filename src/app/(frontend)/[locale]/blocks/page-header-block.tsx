type Props = {
  tag?: string
  title: string
  subtitle?: string
}

export default function PageHeaderBlock({ tag, title, subtitle }: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-mid px-6 md:px-12 xl:px-[72px] pb-14 pt-12">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(184,208,232,0.1)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-16 left-[30%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(184,160,96,0.07)_0%,transparent_70%)]" />

      <div className="relative z-10 flex items-center gap-7">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-mid text-[34px] shadow-[0_0_0_3px_rgba(184,208,232,0.25),0_8px_36px_rgba(0,0,0,0.3)]">
          🎓
        </div>

        <div>
          {tag && (
            <div className="mb-2.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[3px] text-sky">
              <span className="h-px w-6 bg-sky opacity-50" />
              {tag}
            </div>
          )}
          <h1 className="mb-2 font-serif text-[34px] font-extrabold leading-[1.15] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-[600px] text-sm leading-[1.65] text-white/60">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}