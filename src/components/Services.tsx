import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { publishedServices } from '../data/siteConfig'
import { requestServiceEnquiry } from '../lib/enquiry'
import { external, generalEnquiryHref } from '../lib/links'
import { handleSectionLink } from '../lib/scroll'
import { ServiceIcon } from './ServiceIcon'
import './Services.css'

export function Services() {
  return (
    <section id="services" className="section section--white services" tabIndex={-1} aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <div data-reveal>
            <p className="eyebrow">Services</p>
            <h2 id="services-title">How we can help.</h2>
          </div>
          <p className="lead services__lead" data-reveal>
            Practical financial support designed around the needs of individuals and growing businesses.
          </p>
        </div>

        <ul className="services__grid" style={{ '--cols': Math.min(publishedServices.length, 4) } as CSSProperties}>
          {publishedServices.map((service, index) => (
            <li
              key={service.id}
              className="service"
              data-reveal
              style={{ '--reveal-delay': `${(index % 4) * 70}ms` } as CSSProperties}
            >
              <div className="service__top">
                <span className="service__icon">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="service__index tabular" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="service__title">{service.title}</h3>
              <p className="service__text">{service.description}</p>
              <a
                className="text-link service__link"
                href="#contact"
                onClick={(event) => handleSectionLink(event, 'contact', () => requestServiceEnquiry(service.id))}
              >
                Ask about this service<span className="sr-only">: {service.title}</span>
                <ArrowRight />
              </a>
            </li>
          ))}
        </ul>

        <p className="services__note" data-reveal>
          <span>Not sure which service you need?</span>
          <a className="text-link" href={generalEnquiryHref} {...external}>
            Talk it through on WhatsApp
            <ArrowUpRight />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  )
}
