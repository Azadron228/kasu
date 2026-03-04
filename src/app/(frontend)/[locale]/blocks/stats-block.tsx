import { Homepage } from "@/payload-types";

export default async function StatsBlock({ homepage }: { homepage: Homepage }) {
  return (
    <section className="bg-navy px-6 lg:px-16 py-10">
      {homepage?.stats && homepage.stats.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {homepage.stats.map((stat, i) => (
            <div className="text-center" key={i}>
              <span className="block font-serif text-4xl lg:text-5xl font-extrabold text-sky leading-none">
                {stat.number}
              </span>
              <span className="block text-[0.65rem] font-bold text-brand-white/60 tracking-widest uppercase mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
