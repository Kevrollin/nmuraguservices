import { ArrowDown, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { external, generalEnquiryHref, telHref } from '../lib/links'
import { handleSectionLink } from '../lib/scroll'
import { HeroIllustration } from './HeroIllustration'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero" tabIndex={-1} aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span>Accounting</span>
            <span aria-hidden="true" className="hero__dot" />
            <span>Tax</span>
            <span aria-hidden="true" className="hero__dot" />
            <span>Business Advisory</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            Clear <span className="hero__ruled">numbers.</span>
            <br /> Better business decisions.
          </h1>

          <p className="hero__lead">
            Professional accounting, bookkeeping and tax support for individuals and businesses across Kenya.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href={generalEnquiryHref} {...external}>
              Talk to an Accountant
              <MessageCircle className="icon-nudge-x" />
            </a>
            <a className="btn btn--secondary btn--lg" href="#services" onClick={(e) => handleSectionLink(e, 'services')}>
              Explore Our Services
              <ArrowDown className="icon-nudge-y" />
            </a>
          </div>

          <p className="hero__phone">
            <Phone size={16} />
            <span>
              Prefer to call?{' '}
              <a href={telHref} className="hero__phone-link">
                {siteConfig.contact.phone.display}
              </a>
            </span>
          </p>
        </div>

        <div className="hero__art">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}
