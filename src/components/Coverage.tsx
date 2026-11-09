import { Globe, MapPin } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { ReachDiagram } from './ReachDiagram'
import './Coverage.css'

const { business, coverage } = siteConfig

export function Coverage() {
  return (
    <section id="coverage" className="section coverage" tabIndex={-1} aria-labelledby="coverage-title">
      <div className="container coverage__grid">
        <div className="coverage__content">
          <div data-reveal>
            <p className="eyebrow">Our reach</p>
            <h2 id="coverage-title">Supporting businesses across Kenya.</h2>
            <p className="lead coverage__lead">
              Based in {business.location.locality}, {business.name} supports clients in different parts of the
              country.
            </p>
          </div>

          <ul className="coverage__list" data-reveal aria-label="Areas served">
            {coverage.areas.map((area) => (
              <li key={area.name} className={`coverage__item${area.isBase ? ' is-base' : ''}`}>
                <MapPin className="coverage__icon" />
                <span className="coverage__name">{area.name}</span>
                <span className="coverage__meta">{area.isBase ? 'Our base' : area.county}</span>
              </li>
            ))}
            {coverage.acrossKenya && (
              <li className="coverage__item">
                <Globe className="coverage__icon" />
                <span className="coverage__name">Across Kenya</span>
                <span className="coverage__meta">Other parts of the country</span>
              </li>
            )}
          </ul>
        </div>

        <figure className="coverage__panel" data-reveal>
          <ReachDiagram />
          <figcaption className="coverage__caption">
            Approximate direction and distance from {business.location.locality}. Rings mark 25&nbsp;km intervals.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
