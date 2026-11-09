import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { buildHead } from './src/seo/head.ts'

/**
 * Build settings (environment variables):
 *
 *   SITE_URL        Production URL, e.g. https://www.example.co.ke
 *   ALLOW_INDEXING  "true" to let search engines index the site.
 *
 * Without both, the build is marked noindex: the right default for a demo the
 * owner has not approved yet. Canonical URL, og:url, absolute image URLs and
 * the sitemap are only added once SITE_URL is set.
 */
const siteUrl = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '')
const allowIndexing = process.env.ALLOW_INDEXING === 'true' && siteUrl !== ''

if (siteUrl && !/^https:\/\/[^/\s]+$/.test(siteUrl)) {
  throw new Error(`SITE_URL must look like https://www.example.co.ke (got "${siteUrl}")`)
}

/** Writes the <head> tags (title, meta, Open Graph, icons, JSON-LD) from src/data/siteConfig.ts. */
function siteHead(): Plugin {
  return {
    name: 'site-head',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--site-head-->', buildHead({ siteUrl, allowIndexing })),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteHead()],
  define: {
    // Shared by the client and prerender builds so the footer year hydrates cleanly.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // Hashed JS/CSS/fonts go to /static (safe to cache for a year), keeping
    // them apart from the replaceable brand files in /brand.
    assetsDir: 'static',
  },
})
