import type { CSSProperties } from 'react'
import { siteConfig } from '../data/siteConfig'
import './WhyChooseUs.css'

export function WhyChooseUs() {
  return (
    <section className="section section--navy on-dark why" aria-labelledby="why-title">
      <div className="container">
        <div className="why__head" data-reveal>
          <p className="eyebrow">Why work with us</p>
          <h2 id="why-title">A dependable partner for your finances.</h2>
        </div>

        <ol className="why__list">
          {siteConfig.differentiators.map((item, index) => (
            <li
              key={item.title}
              className="why__item"
              data-reveal
              style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
            >
              <span className="why__num tabular" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="why__title">{item.title}</h3>
              <p className="why__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
