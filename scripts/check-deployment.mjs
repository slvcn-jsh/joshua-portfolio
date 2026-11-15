// Read-only anonymous checks against an explicitly supplied production origin.
// Usage: node scripts/check-deployment.mjs https://your-site.vercel.app
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const target = new URL(process.argv[2] ?? '')
assert(
  target.protocol === 'https:' &&
    target.pathname === '/' &&
    !target.search &&
    !target.hash &&
    !target.username &&
    !target.password,
  'Supply an HTTPS origin only.',
)
const origin = target.origin
const routes = [
  '/',
  '/projects',
  '/projects/pcosina',
  '/projects/barion',
  '/skills',
  '/about',
  '/achievements',
  '/certifications',
  '/resume',
  '/contact',
]
const config = JSON.parse(
  await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
)
const expectedHeaders = config.headers.find(
  (rule) => rule.source === '/(.*)',
).headers
const get = (path) =>
  fetch(origin + path, { signal: AbortSignal.timeout(30000) })
let home = ''
for (const path of routes) {
  const response = await get(path)
  assert.equal(response.status, 200, path)
  assert.equal(
    new URL(response.url).origin,
    origin,
    'Unexpected authentication redirect',
  )
  for (const { key, value } of expectedHeaders)
    assert.equal(response.headers.get(key), value, `${path}: ${key}`)
  const html = await response.text()
  assert(
    html.includes(`rel="canonical" href="${origin}${path}"`),
    `${path}: canonical`,
  )
  assert(html.includes('content="index, follow"'), `${path}: robots metadata`)
  if (path === '/') home = html
}
const sitemap = await get('/sitemap.xml')
assert.equal(sitemap.status, 200)
const sitemapText = await sitemap.text()
assert.equal((sitemapText.match(/<loc>/g) ?? []).length, 10)
for (const path of routes)
  assert(
    sitemapText.includes(`<loc>${origin}${path}</loc>`),
    `Sitemap: ${path}`,
  )
const robots = await get('/robots.txt')
assert.equal(robots.status, 200)
assert((await robots.text()).includes(`Sitemap: ${origin}/sitemap.xml`))
const missing = await get('/portfolio-qa-missing-route')
assert.equal(missing.status, 404, 'Real missing-route status')
assert((await missing.text()).includes('noindex'), 'Missing-page indexing')
const missingAsset = await get('/assets/portfolio-qa-missing.js')
assert.equal(
  missingAsset.status,
  404,
  'Missing asset must not return the app shell',
)
const pdf = await get('/Joshua-Salvacion-Resume.pdf')
assert.equal(pdf.status, 200)
const hash = createHash('sha256')
  .update(Buffer.from(await pdf.arrayBuffer()))
  .digest('hex')
const manifest = JSON.parse(
  await readFile(
    new URL('../docs/media-manifest.json', import.meta.url),
    'utf8',
  ),
)
assert.equal(hash, manifest.resume.sha256, 'Approved PDF integrity')
const brands = JSON.parse(
  await readFile('docs/brand-asset-manifest.json', 'utf8'),
)
for (const certificate of brands.certificates) {
  const response = await get(`/certificates/${certificate.name}.pdf`)
  assert.equal(response.status, 200)
  assert.equal(
    createHash('sha256')
      .update(Buffer.from(await response.arrayBuffer()))
      .digest('hex'),
    certificate.sha256,
    'Public certificate integrity',
  )
  assert.equal(
    (await get(`/certificates/${certificate.name}.webp`)).status,
    200,
  )
}
const events = JSON.parse(
  await readFile('docs/event-media-manifest.json', 'utf8'),
)
for (const photo of events) assert.equal((await get(photo.asset)).status, 200)
for (const item of manifest.images)
  assert.equal((await get(item.asset)).status, 200, item.asset)
const asset = home.match(/src="(\/assets\/[^" ]+\.js)"/)?.[1]
assert(asset, 'Hashed JavaScript entry')
const js = await get(asset)
assert.equal(js.status, 200)
assert(
  js.headers.get('cache-control')?.includes('immutable'),
  'Immutable asset caching',
)
console.log(
  JSON.stringify(
    {
      origin,
      routes: routes.length,
      headers: 'pass',
      canonicalAndSitemap: 'pass',
      missingRouteAndAsset: 404,
      approvedResumeSha256: hash,
      projectImages: manifest.images.length,
      certificatePdfs: brands.certificates.length,
      eventPhotos: events.length,
      immutableAssets: 'pass',
    },
    null,
    2,
  ),
)
