import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { publishedServices, siteConfig } from '../data/siteConfig'
import { requestServiceEnquiry } from '../lib/enquiry'
import { external, telHref, whatsappHref } from '../lib/links'
import { handleSectionLink } from '../lib/scroll'
import { Logo } from './Logo'
import './Footer.css'

const { brand, business, contact, links, navigation, reviews } = siteConfig

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a href="#top" className="site-footer__logo-link" onClick={(e) => handleSectionLink(e, 'top')}>
              <Logo variant="onDark" className="site-footer__logo" loading="lazy" />
            </a>
            <p className="site-footer__tagline">
              {brand.tagline.lead} <span>{brand.tagline.accent}</span>
            </p>
            <p className="site-footer__blurb">{business.footerBlurb}</p>
            <p className="site-footer__location">{business.location.display}</p>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <h2 className="site-footer__heading">Explore</h2>
            <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => handleSectionLink(e, item.id)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Services</h2>
            <ul>
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <a
                    href="#contact"
                    onClick={(e) => handleSectionLink(e, 'contact', () => requestServiceEnquiry(service.id))}
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Get in touch</h2>
            <ul>
              <li>
                <a href={telHref}>
                  <span className="sr-only">Call </span>
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a href={whatsappHref()} {...external}>
                  WhatsApp <ArrowUpRight size={14} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {links.linkedin.show && (
                <li>
                  <a href={links.linkedin.url} {...external}>
                    LinkedIn <ArrowUpRight size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              <li>
                <a href={links.googleBusinessProfile} {...external}>
                  {reviews.platform} Business Profile <ArrowUpRight size={14} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {__BUILD_YEAR__} {business.name}. All rights reserved.
          </p>
          <a href="#top" className="site-footer__top" onClick={(e) => handleSectionLink(e, 'top')}>
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
