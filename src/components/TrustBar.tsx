import { ArrowUpRight, BadgeCheck, MapPin } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { external } from '../lib/links'
import { Stars } from './Stars'
import './TrustBar.css'

const { business, reviews, links } = siteConfig

export function TrustBar() {
  return (
    <section className="trust" aria-label="At a glance">
      <div className="container">
        <ul className="trust__list">
          <li className="trust__item">
            <div className="trust__cell">
              <BadgeCheck className="trust__icon" />
              <span className="trust__text">
                <strong>{business.credential}-led practice</strong>
                <span>{business.credentialLong}</span>
              </span>
            </div>
          </li>

          <li className="trust__item">
            <a className="trust__cell trust__cell--link" href={links.googleBusinessProfile} {...external}>
              <span className="trust__figure tabular">
                {reviews.rating}
                <span className="sr-only"> out of {reviews.outOf}</span>
              </span>
              <span className="trust__text">
                <strong>
                  {reviews.platform} rating <ArrowUpRight size={14} />
                </strong>
                <Stars rating={reviews.rating} outOf={reviews.outOf} size={14} />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>

          <li className="trust__item">
            <a className="trust__cell trust__cell--link" href={links.googleBusinessProfile} {...external}>
              <span className="trust__figure tabular">{reviews.count}</span>
              <span className="trust__text">
                <strong>
                  {reviews.platform} reviews <ArrowUpRight size={14} />
                </strong>
                <span>Read client feedback</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>

          <li className="trust__item">
            <div className="trust__cell">
              <MapPin className="trust__icon" />
              <span className="trust__text">
                <strong>Serving clients across Kenya</strong>
                <span>Based in {business.location.locality}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
