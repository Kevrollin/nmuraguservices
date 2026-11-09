/**
 * ───────────────────────────────────────────────────────────────────────────
 *  N. MURAGU CPA-K SERVICES: SITE CONFIGURATION
 * ───────────────────────────────────────────────────────────────────────────
 *  Every business fact shown on the website lives in this one file:
 *  contact details, links, review figures, services, locations, brand files
 *  and SEO text. Edit here; the components read from it.
 *
 *  Only facts supplied in the project brief are used. Anything not yet
 *  confirmed by the owner is marked `VERIFY` below. Do not add an email
 *  address, street address, opening hours, years in practice, client
 *  numbers or extra services until the owner confirms them.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type ServiceIcon = 'books' | 'tax' | 'payroll' | 'advisory'

export interface Service {
  /** Stable id: used in links, the enquiry form and analytics. */
  id: string
  title: string
  description: string
  icon: ServiceIcon
  /**
   * Set to `false` to remove a service from the whole site (services grid,
   * enquiry form, footer and structured data) without deleting its text.
   * Only publish services the owner confirms are actively offered.
   */
  published: boolean
}

export interface CoverageArea {
  name: string
  county: string
  /** Approximate town-centre coordinates [latitude, longitude], used only to place the town on the reach diagram. */
  coords: [number, number]
  /** The town the practice is based in. */
  isBase?: boolean
}

export interface ReviewExcerpt {
  /** Short quote, copied word for word from a public Google review, with the reviewer's permission. */
  quote: string
  /** Name exactly as it appears on Google. */
  author: string
  /** Optional, e.g. "October 2026". */
  date?: string
}

export interface NavItem {
  id: string
  label: string
}

export const siteConfig = {
  business: {
    name: 'N. Muragu CPA-K Services',
    tagline: 'Clear numbers. Better business decisions.',
    summary:
      'Professional accounting, bookkeeping and tax support that helps individuals and businesses stay organized, compliant and financially informed.',
    footerBlurb:
      'Accounting, bookkeeping, tax and business advisory support for individuals and businesses in Nyeri and across Kenya.',
    credential: 'CPA-K',
    credentialLong: 'Certified Public Accountant of Kenya',
    location: {
      locality: 'Nyeri',
      country: 'Kenya',
      countryCode: 'KE',
      display: 'Nyeri, Kenya',
    },
  },

  contact: {
    phone: { display: '+254 704 403211', e164: '+254704403211' },
    whatsapp: { display: '+254 704 403211', number: '254704403211' },
    /** No email address has been supplied. Leave empty until the owner provides one. */
    email: '',
  },

  links: {
    googleBusinessProfile: 'https://share.google/5K3BhCAK7IM8UIYE1',
    linkedin: {
      url: 'https://ke.linkedin.com/in/cpa-isaac-muragu-b47173106',
      label: 'CPA Isaac Muragu',
      /** VERIFY: confirm this profile belongs to the practice's principal before launch. Set `show` to false to hide it everywhere. */
      show: true,
    },
  },

  reviews: {
    /** VERIFY against the live Google Business Profile before launch. */
    rating: 4.9,
    outOf: 5,
    count: 31,
    platform: 'Google',
    /** Month the figures above were last checked. */
    asOf: 'November 2026',
    /**
     * Optional review quotes. Leave empty until real excerpts are approved;
     * the reviews section then shows the rating summary only. Never write or
     * paraphrase reviews.
     */
    excerpts: [] as ReviewExcerpt[],
  },

  services: [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      description:
        'Keep your financial records organized, accurate and up to date. Gain a clearer view of your business finances.',
      icon: 'books',
      published: true,
    },
    {
      id: 'tax-support',
      title: 'Tax Support',
      description:
        'Get professional support with tax preparation, tax obligations and practical tax guidance.',
      icon: 'tax',
      published: true,
    },
    {
      id: 'payroll',
      title: 'Payroll Services',
      // VERIFY: confirm payroll is actively offered and that this description is accurate.
      description:
        'Get support with payroll processes and maintaining organized employee payment records.',
      icon: 'payroll',
      published: true,
    },
    {
      id: 'business-advisory',
      title: 'Business Advisory',
      description:
        'Make more informed decisions with practical financial insights and guidance for your business.',
      icon: 'advisory',
      published: true,
    },
  ] satisfies Service[] as Service[],

  differentiators: [
    {
      title: 'Professional approach',
      text: 'Careful attention to your financial records and obligations.',
    },
    {
      title: 'Reliable support',
      text: 'Approachable communication and dependable professional assistance.',
    },
    {
      title: 'Business-focused guidance',
      text: 'Financial information that helps you understand your position and plan ahead.',
    },
  ],

  coverage: {
    /** Areas where the practice serves clients. These are not branch offices. */
    areas: [
      { name: 'Nyeri', county: 'Nyeri County', coords: [-0.4197, 36.9511], isBase: true },
      { name: 'Nanyuki', county: 'Laikipia County', coords: [0.0167, 37.0742] },
      { name: 'Embu', county: 'Embu County', coords: [-0.531, 37.45] },
      { name: "Murang'a", county: "Murang'a County", coords: [-0.721, 37.1526] },
      { name: 'Nairobi', county: 'Nairobi County', coords: [-1.2864, 36.8172] },
    ] satisfies CoverageArea[] as CoverageArea[],
    /** Shown as a final "Across Kenya" entry. */
    acrossKenya: true,
  },

  /**
   * The owner's logo (Muragu & Co. CPA-K). The supplied file was 160px, so
   * these SVGs were rebuilt from it: the emblem is traced from the artwork and
   * the wordmark is typeset in Cinzel, the closest match. The original is kept
   * in /assets-src/brand. If the owner's designer can supply the vector
   * original (AI, EPS, SVG or PDF), replace these files with exports of it.
   */
  brand: {
    logo: {
      /** Horizontal lockup for light backgrounds (header). */
      onLight: '/brand/muragu-logo.svg',
      /** Horizontal lockup for dark backgrounds (footer). */
      onDark: '/brand/muragu-logo-light.svg',
      /** Intrinsic size of the horizontal lockup files (sets the aspect ratio). */
      width: 374,
      height: 100,
      /** Describes the logo image itself, so it matches the text in the artwork. */
      alt: 'Muragu & Co. CPA-K',
    },
    /** Stacked logo, as the original artwork (without the small descriptor lines). */
    stacked: '/brand/muragu-logo-stacked.svg',
    /** The circular M emblem on its own. */
    emblem: '/brand/muragu-emblem.svg',
    /** Tagline from the logo artwork, shown under the footer logo. */
    tagline: { lead: 'Numbers You Trust.', accent: 'Growth You Deserve.' },
    favicon: '/brand/favicon.svg',
    faviconPng: '/brand/favicon-32.png',
    appleTouchIcon: '/brand/apple-touch-icon.png',
  },

  seo: {
    title: 'N. Muragu CPA-K Services | Accounting & Tax Support in Kenya',
    description:
      'Professional accounting, bookkeeping, tax and business advisory services for individuals and businesses in Nyeri and across Kenya.',
    ogImage: '/brand/og-image.png',
    ogImageAlt: 'N. Muragu CPA-K Services: Clear numbers. Better business decisions.',
    locale: 'en_KE',
    themeColor: '#F7F6F1',
  },

  navigation: [
    { id: 'top', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'coverage', label: 'Our Reach' },
    { id: 'contact', label: 'Contact' },
  ] satisfies NavItem[] as NavItem[],
}

/** Services currently shown on the site. */
export const publishedServices = siteConfig.services.filter((service) => service.published)
