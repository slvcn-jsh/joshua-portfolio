import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { renderToString } from 'react-dom/server'
import { App } from '../src/App'
import { pageMeta } from '../src/content/site'

const dist = resolve(process.argv[2] ?? 'dist')
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const rawOrigin = process.env.SITE_URL?.trim()
let origin = ''
if (rawOrigin) {
  const url = new URL(rawOrigin)
  if (
    url.protocol !== 'https:' ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'SITE_URL must be an HTTPS origin without a path, query, fragment or credentials.',
    )
  }
  origin = url.origin
}
const indexable =
  Boolean(origin) &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production')
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  )

for (const [route, meta] of Object.entries(pageMeta)) {
  const is404 = route === '/404'
  const canonical =
    indexable && !is404 ? `${origin}${route === '/' ? '/' : route}` : ''
  const head = [
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta name="robots" content="${indexable && !is404 ? 'index, follow' : 'noindex, nofollow'}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Joshua Salvacion" />',
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:image" content="${canonical ? origin : ''}/social-card.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Joshua Escalicas Salvacion — Software Engineering Student" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    canonical
      ? `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" />`
      : '',
  ].join('\n    ')
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace('<!--page-head-->', head)
    .replace('<div id="root">', `<div id="root" data-page="${route}">`)
    .replace('<!--app-html-->', () => renderToString(<App path={route} />))
  const file = resolve(
    dist,
    route === '/' ? 'index.html' : `${route.slice(1)}.html`,
  )
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

await writeFile(
  resolve(dist, 'robots.txt'),
  indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
)
if (indexable) {
  const urls = Object.keys(pageMeta)
    .filter((p) => p !== '/404')
    .map((p) => `<url><loc>${escape(origin + p)}</loc></url>`)
    .join('\n')
  await writeFile(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
}
console.log(
  `Prerendered ${Object.keys(pageMeta).length} pages. Indexing: ${indexable ? 'enabled for ' + origin : 'disabled until SITE_URL is configured for production'}.`,
)
