import { Homepage } from '@/payload-types'
import RichText from '@/components/RichText'

export default async function AboutBlock({ homepage }: { homepage: Homepage }) {
  return (
    <section>
      <div className="about-inner">
        <div className="about-vis">
          <img className="about-vis-logo" src="/logo.png" alt="КАСУ U3A" />
          <h3>Миссия и цели КАСУ</h3>
          {homepage?.aboutInfoBlocks?.map((block, i) => (
            <div className="info-block" key={block.id ?? i}>
              <h4>{block.heading}</h4>
              <p>{block.body}</p>
            </div>
          ))}
        </div>
        <div className="about-text">
          <div className="s-label">Об Ассоциации</div>
          <h2 className="s-title">Kazakhstan Association of Universities of the Third Age</h2>
          {homepage?.aboutBody && (
            <RichText data={homepage.aboutBody} enableProse={false} enableGutter={false} />
          )}
          {homepage?.aboutBullets && (
            <ul className="about-list">
              {homepage.aboutBullets.map((b, i) => (
                <li key={b.id ?? i}>{b.point}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
