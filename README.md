# N. Muragu CPA-K Services: website

Single-page marketing site for N. Muragu CPA-K Services, an accounting, bookkeeping, tax, payroll and business advisory practice in Nyeri, Kenya.

**Status: demo for owner review.** Several facts must be confirmed before launch (see [Before launch](#before-launch)).

## Stack

- React 19, Vite 8, TypeScript, plain CSS with design tokens (`src/styles/tokens.css`)
- `lucide-react` icons; Manrope (headings) and DM Sans (body), self-hosted via Fontsource
- No backend, database or tracking. The enquiry form formats a message and opens WhatsApp.
- The build prerenders the page to static HTML, so it is fast and fully readable without JavaScript.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck, client build, SSR build, prerender to dist/
npm run preview    # serve dist/
```

## Editing content

Every business fact lives in **`src/data/siteConfig.ts`**:

| What | Where in `siteConfig` |
| --- | --- |
| Phone / WhatsApp numbers | `contact` |
| Google Business Profile, LinkedIn | `links` |
| Google rating, review count, "as of" month | `reviews` |
| Review quotes (optional, real and approved only) | `reviews.excerpts` |
| Services (title, text, icon, show/hide) | `services`, set `published: false` to hide one everywhere |
| "Why work with us" points | `differentiators` |
| Areas served (towns, counties, coordinates for the diagram) | `coverage` |
| Page title, meta description, share image | `seo` |
| Logo file paths | `brand` |

Section headings and paragraph copy live in the matching component in `src/components/`.

The `<head>` tags (title, description, Open Graph, icons) and the schema.org JSON-LD are generated from the same config by `src/seo/head.ts`.

## The logo

The owner supplied the Muragu & Co. CPA-K logo as a 160×160 PNG, archived at `assets-src/brand/muragu-logo-original.png` (not served). That is too small to stay sharp on a website, so the files in `public/brand/` were rebuilt from it as SVG:

- **Emblem** (circular M, ring, bar chart): vector-traced from the supplied artwork.
- **Wordmark** ("MURAGU", "& CO. CPA-K"): its letters are too small in the source to trace, so it is typeset in **Cinzel**, the closest matching typeface, at the original's proportions and colours.

| File | Use |
| --- | --- |
| `muragu-logo.svg` | Horizontal lockup, light backgrounds (header) |
| `muragu-logo-light.svg` | Horizontal lockup, dark backgrounds (footer) |
| `muragu-logo-stacked.svg` | Stacked, as the original artwork (structured data) |
| `muragu-emblem.svg` | Emblem alone (hero illustration) |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Browser and phone icons |
| `og-image.png` | 1200×630 image shown when the link is shared |

The small descriptor line and tagline in the original are not in the SVGs. The tagline ("Numbers You Trust. Growth You Deserve.") appears as text under the footer logo instead (`siteConfig.brand.tagline`).

**Best result:** ask the owner's designer for the original vector file (AI, EPS, SVG or PDF) and replace these files with exports of it, keeping the names. If the proportions change, update `brand.logo.width`/`height` so the header doesn't shift while loading.

The site's navy (`#00204E`) and gold (`#CD8C00`) are sampled from the logo. They live in `src/styles/tokens.css` and, for the SVG illustrations, `src/styles/palette.ts`.

## Before launch

Confirm with the owner (items are marked `VERIFY` in `siteConfig.ts`):

- [ ] Google rating (4.9) and review count (31) still match the live profile; update `reviews.asOf`
- [ ] Payroll is actively offered, and all four service descriptions are accurate
- [ ] The LinkedIn profile belongs to the practice's principal (otherwise set `links.linkedin.show: false`)
- [ ] Trading name: the logo reads **"Muragu & Co. CPA-K"**, while the site uses **"N. Muragu CPA-K Services"** (from the Google profile). Confirm which is correct, then update `business.name` and `seo`
- [ ] Owner approves the rebuilt logo files, or supplies the vector original
- [ ] Optional: an email address, street address or opening hours to add. None are shown, by design.

Then build for production with the real domain:

```bash
SITE_URL=https://www.example.co.ke ALLOW_INDEXING=true npm run build
```

Without both variables, the build is a **noindex demo** (`robots.txt` disallows all). With them, the build adds the canonical URL, absolute Open Graph URLs and `sitemap.xml`. `vercel.json` sets caching and security headers. On another static host, serve `dist/` and set the same variables at build time.

## Deliberate omissions

To keep the site accurate, it does not show: testimonials or reviewer names, client logos, statistics, years in practice, team size, certifications beyond CPA-K, office addresses or branches, or services that have not been confirmed (audit, company registration, etc.).

The Google rating is shown on the page but not marked up as `aggregateRating`, which Google treats as self-serving.
