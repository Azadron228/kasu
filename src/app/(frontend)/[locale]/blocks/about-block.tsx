import { Homepage } from '@/payload-types'
import RichText from '@/components/RichText'

export default async function AboutBlock({ homepage }: { homepage: Homepage }) {
  return (
    <section className="px-6 lg:px-16 py-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy rounded-3xl p-10 text-center">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-[radial-gradient(circle,rgba(184,208,232,0.15)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
          <img
            className="w-24 h-24 rounded-full mx-auto mb-6 ring-4 ring-sky/20 shadow-2xl relative z-10 object-cover"
            src="/logo.svg"
            alt="КАСУ U3A"
          />
          <h3 className="font-serif text-brand-white text-xl mb-5 relative z-10">
            Миссия и цели КАСУ
          </h3>
          <div className="space-y-3 relative z-10">
            {homepage?.aboutInfoBlocks?.map((block, i) => (
              <div
                className="bg-brand-white/5 border-l-4 border-gold p-4 text-left rounded-r-lg"
                key={block.id ?? i}
              >
                <h4 className="text-sky text-xs font-extrabold tracking-widest uppercase mb-1.5">
                  {block.heading}
                </h4>
                <p className="text-brand-white/80 text-xs leading-relaxed">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-extrabold tracking-[0.3em] uppercase text-steel mb-3">
            Об Ассоциации
          </div>
          {homepage?.aboutBody && (
            <div className="text-brand-muted text-base leading-relaxed mb-4 about-body-content">
              <RichText data={homepage.aboutBody} enableProse={false} enableGutter={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
