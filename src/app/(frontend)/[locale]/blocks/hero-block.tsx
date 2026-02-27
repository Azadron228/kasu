import { Homepage } from '@/payload-types'
import Link from 'next/link'

export default async function HeroBlock({ homepage }: { homepage: Homepage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-tag">
          <span className="dot"></span> {homepage?.heroSubheading}
        </div>
        <h2>{homepage?.heroHeadline}</h2>
        <h3>{homepage?.heroSubheading}</h3>
        <div className="hero-btns">
          <Link href="/about" className="btn-prim">
            Подробнее
          </Link>
          <Link href="/join" className="btn-ghost">
            Вступить
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-card">
          <div className="greeting-head">
            <div className="g-icon">🎓</div>
            <div>
              <div className="g-name">Приветственное слово</div>
              <div className="g-role">Президент КАСУ</div>
            </div>
          </div>
          <blockquote>{homepage?.presidentQuote}</blockquote>
        </div>
      </div>
    </section>
  )
}
