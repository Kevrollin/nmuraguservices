import { publishedServices, siteConfig } from '../data/siteConfig.ts'

const { business, brand, contact, coverage, links, seo } = siteConfig

/**
 * schema.org data for the practice, built only from confirmed details.
 *
 * Deliberately left out until the owner confirms them: street address, opening
 * hours, email, founding date and geo coordinates. The Google rating is not
 * marked up as aggregateRating: Google treats a business's own review markup
 * as self-serving and does not show it in results.
 */
export function buildStructuredData(siteUrl: string) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: business.name,
    description: seo.description,
    slogan: business.tagline,
    telephone: contact.phone.e164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.location.locality,
      addressCountry: business.location.countryCode,
    },
    areaServed: [
      ...coverage.areas.map((area) => ({ '@type': 'City', name: area.name })),
      ...(coverage.acrossKenya ? [{ '@type': 'Country', name: business.location.country }] : []),
    ],
    knowsAbout: publishedServices.map((service) => service.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: publishedServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
    sameAs: [links.googleBusinessProfile],
  }

  if (siteUrl) {
    data['@id'] = `${siteUrl}/#business`
    data.url = `${siteUrl}/`
    data.image = `${siteUrl}${seo.ogImage}`
    data.logo = `${siteUrl}${brand.stacked}`
  }
  if (contact.email) data.email = contact.email

  return data
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** All <head> tags except charset/viewport. Used by the Vite plugin in vite.config.ts. */
export function buildHead({ siteUrl, allowIndexing }: { siteUrl: string; allowIndexing: boolean }) {
  const abs = (path: string) => (siteUrl ? `${siteUrl}${path}` : path)
  const meta = (attr: 'name' | 'property', key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`

  const tags = [
    `<title>${escapeAttr(seo.title)}</title>`,
    meta('name', 'description', seo.description),
    meta('name', 'theme-color', seo.themeColor),
    meta('name', 'format-detection', 'telephone=no'),
    `<link rel="icon" href="${brand.favicon}" type="image/svg+xml" />`,
    `<link rel="icon" href="${brand.faviconPng}" type="image/png" sizes="32x32" />`,
    `<link rel="apple-touch-icon" href="${brand.appleTouchIcon}" />`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:locale', seo.locale),
    meta('property', 'og:site_name', business.name),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:image', abs(seo.ogImage)),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', seo.ogImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
  ]

  if (!allowIndexing) tags.push(meta('name', 'robots', 'noindex, nofollow'))
  if (siteUrl) {
    tags.push(`<link rel="canonical" href="${siteUrl}/" />`, meta('property', 'og:url', `${siteUrl}/`))
  }

  const jsonLd = JSON.stringify(buildStructuredData(siteUrl)).replace(/</g, '\\u003c')
  tags.push(`<script type="application/ld+json">${jsonLd}</script>`)

  return tags.join('\n    ')
}
