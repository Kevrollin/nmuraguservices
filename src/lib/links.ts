import { siteConfig } from '../data/siteConfig'

const { business, contact } = siteConfig

export const telHref = `tel:${contact.phone.e164}`

/** wa.me deep link, optionally with a prefilled message. */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contact.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Opening message for the general "Talk to an accountant" buttons. */
export const generalEnquiryHref = whatsappHref(
  `Hello ${business.name}, I would like to talk to an accountant about accounting and tax support.`,
)

export function serviceEnquiryMessage(serviceTitle: string) {
  return `Hello ${business.name}, I would like to ask about your ${serviceTitle.toLowerCase()} services.`
}

export interface Enquiry {
  name: string
  phone: string
  service: string
  message: string
}

/** Formats an enquiry from the contact form as a WhatsApp message. */
export function enquiryMessage({ name, phone, service, message }: Enquiry) {
  return [
    `Hello ${business.name},`,
    '',
    '*Website enquiry*',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    '',
    message,
  ].join('\n')
}

/** Props for links that leave the site. */
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const
