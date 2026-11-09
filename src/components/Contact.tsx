import { ArrowUpRight, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { siteConfig } from '../data/siteConfig'
import { external, generalEnquiryHref, telHref, whatsappHref } from '../lib/links'
import { EnquiryForm } from './EnquiryForm'
import './Contact.css'

const { contact, business, links } = siteConfig

interface Detail {
  label: string
  icon: ReactNode
  value: ReactNode
}

const details: Detail[] = [
  {
    label: 'Telephone',
    icon: <Phone />,
    value: (
      <a href={telHref} className="contact__value-link">
        {contact.phone.display}
      </a>
    ),
  },
  {
    label: 'WhatsApp',
    icon: <MessageCircle />,
    value: (
      <a href={whatsappHref()} className="contact__value-link" {...external}>
        {contact.whatsapp.display}
        <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
      </a>
    ),
  },
  {
    label: 'Location',
    icon: <MapPin />,
    value: <span>{business.location.display}</span>,
  },
  ...(links.linkedin.show
    ? [
        {
          label: 'LinkedIn',
          icon: <UserRound />,
          value: (
            <a href={links.linkedin.url} className="contact__value-link" {...external}>
              {links.linkedin.label}
              <ArrowUpRight size={16} />
              <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
            </a>
          ),
        },
      ]
    : []),
]

export function Contact() {
  return (
    <section id="contact" className="section contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let&rsquo;s put your finances in order.</h2>
          <p className="lead contact__lead">
            Have a question or need professional accounting support? Get in touch and let&rsquo;s discuss how we can
            help.
          </p>

          <div className="contact__actions">
            <a className="btn btn--primary btn--lg" href={telHref}>
              <Phone />
              Call Now
            </a>
            <a className="btn btn--secondary btn--lg" href={generalEnquiryHref} {...external}>
              <MessageCircle />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <ul className="contact__details">
            {details.map((detail) => (
              <li key={detail.label} className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  {detail.icon}
                </span>
                <span className="contact__detail-label">{detail.label}</span>
                <span className="contact__detail-value">{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form" data-reveal style={{ '--reveal-delay': '90ms' } as CSSProperties}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
