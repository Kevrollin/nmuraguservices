import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { external } from '../lib/links'
import { ReviewExcerpts } from './ReviewExcerpts'
import { Stars } from './Stars'
import './Reviews.css'

const { reviews, links, business } = siteConfig

export function Reviews() {
  return (
    <section className="section section--white reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__panel" data-reveal>
          <div className="reviews__content">
            <p className="eyebrow">Client feedback</p>
            <h2 id="reviews-title">Trusted by clients.</h2>
            <p className="lead reviews__lead">
              Clients have rated {business.name} {reviews.rating} out of {reviews.outOf} across {reviews.count}{' '}
              {reviews.platform} reviews. Read their experiences in their own words.
            </p>
            <a className="btn btn--primary btn--lg reviews__cta" href={links.googleBusinessProfile} {...external}>
              Read Our Google Reviews
              <ArrowUpRight className="icon-nudge-diag" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="reviews__score">
            <p className="reviews__figure tabular" aria-hidden="true">
              {reviews.rating}
              <span>/{reviews.outOf}</span>
            </p>
            <Stars rating={reviews.rating} outOf={reviews.outOf} size={22} className="reviews__stars" />
            <p className="reviews__count">
              <span className="sr-only">
                Rated {reviews.rating} out of {reviews.outOf},{' '}
              </span>
              Based on <strong className="tabular">{reviews.count}</strong> {reviews.platform} reviews
            </p>
            <p className="reviews__asof">Figures as shown on {reviews.platform}, {reviews.asOf}.</p>
          </div>
        </div>

        <ReviewExcerpts excerpts={reviews.excerpts} platform={reviews.platform} />
      </div>
    </section>
  )
}
