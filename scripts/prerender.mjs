// Runs after the client and SSR builds. Writes the rendered page into
// dist/index.html, inlines the stylesheet, preloads the brand fonts and
// creates robots.txt (plus sitemap.xml once a production domain is set).
//
//   SITE_URL        Production URL, e.g. https://www.example.co.ke
//   ALLOW_INDEXING  "true" to let search engines index the site.
//
// <head> meta tags and JSON-LD are written earlier by the site-head plugin in
// vite.config.ts, from src/data/siteConfig.ts.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const siteUrl = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '')
const allowIndexing = process.env.ALLOW_INDEXING === 'true' && siteUrl !== ''

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

let html = await readFile(join(dist, 'index.html'), 'utf8')
if (!html.includes('<!--app-html-->') || !html.includes('<!--head-extra-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> or <!--head-extra--> placeholder')
}

// Preload the Latin subsets of both brand fonts so text renders in them sooner.
const head = []
const bundles = await readdir(join(dist, 'static'))
for (const pattern of [/^manrope-latin-wght-normal-.*\.woff2$/, /^dm-sans-latin-wght-normal-.*\.woff2$/]) {
  const font = bundles.find((file) => pattern.test(file))
  if (font) head.push(`<link rel="preload" href="/static/${font}" as="font" type="font/woff2" crossorigin>`)
}

html = html.replace('<!--head-extra-->', head.join('\n    ')).replace('<!--app-html-->', render())

// Inline the stylesheet: the first paint no longer waits for a separate
// render-blocking request.
const cssTag = /<link rel="stylesheet" crossorigin href="\/static\/([^"]+\.css)">/.exec(html)
if (cssTag) {
  const css = await readFile(join(dist, 'static', cssTag[1]), 'utf8')
  if (css.includes('</style')) throw new Error('Stylesheet cannot be inlined safely')
  html = html.replace(cssTag[0], `<style>${css}</style>`)
}

// Hydrate after the first paint. The prerendered page is complete and its
// links work without JavaScript, so the bundle is requested only once the
// browser has painted.
const scriptTag = /<script type="module" crossorigin src="(\/static\/[^"]+\.js)"><\/script>/.exec(html)
if (scriptTag) {
  html = html
    .replace(scriptTag[0], '')
    .replace(
      '</body>',
      `  <script type="module">requestAnimationFrame(() => setTimeout(() => import('${scriptTag[1]}')))</script>\n  </body>`,
    )
}
await writeFile(join(dist, 'index.html'), html)

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'
await writeFile(join(dist, 'robots.txt'), robots)

if (allowIndexing) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
}

await rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered dist/index.html (${allowIndexing ? `indexable at ${siteUrl}` : 'noindex demo build'}).`)
