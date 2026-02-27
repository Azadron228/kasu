import { Homepage } from "@/payload-types";

export default async function StatsBlock({ homepage }: { homepage: Homepage }) {
  return (
    <div>
      {homepage?.stats && homepage.stats.length > 0 && (
        <div className="stats">
          {homepage.stats.map((stat, i) => (
            <div className="stat" key={i}>
              <span className="n">{stat.number}</span>
              <span className="l">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
