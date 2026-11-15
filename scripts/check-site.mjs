import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, relative, extname } from 'node:path'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const root = resolve('dist')
async function walk(dir) {
  const result = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = resolve(dir, entry.name)
    if (entry.isDirectory()) result.push(...(await walk(file)))
    else result.push(file)
  }
  return result
}
const files = await walk(root)
const htmlFiles = files.filter((f) => f.endsWith('.html'))
const titles = new Set()
let checked = 0
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const page = relative(root, file)
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${page}: expected one h1`,
  )
  assert.match(html, /<html lang="en">/, `${page}: missing language`)
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${page}: missing description`,
  )
  assert.match(html, /<main id="main"/, `${page}: missing main landmark`)
  assert(!html.includes('<!--app-html-->'), `${page}: not prerendered`)
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  assert(title && !titles.has(title), `${page}: missing or repeated title`)
  titles.add(title)
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
  assert.equal(ids.length, new Set(ids).size, `${page}: duplicate IDs`)
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image[0], /\balt="[^"]*"/, `${page}: missing image alt`)
    assert.match(image[0], /\bwidth="\d+"/, `${page}: missing image width`)
    assert.match(image[0], /\bheight="\d+"/, `${page}: missing image height`)
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const href = match[1]
    assert(href && href !== '#', `${page}: empty link`)
    assert(!/^javascript:/i.test(href), `${page}: unsafe link`)
    if (href.startsWith('#')) {
      assert(ids.includes(href.slice(1)), `${page}: missing fragment ${href}`)
      continue
    }
    if (/^(https?:|mailto:|data:)/.test(href)) continue
    assert(
      href.startsWith('/'),
      `${page}: expected root-relative asset/link: ${href}`,
    )
    const [pathname, fragment] = href.split('#')
    const target =
      pathname === '/'
        ? 'index.html'
        : extname(pathname)
          ? pathname.slice(1)
          : `${pathname.slice(1)}.html`
    const full = resolve(root, target)
    assert(files.includes(full), `${page}: broken internal link ${href}`)
    if (fragment)
      assert(
        (await readFile(full, 'utf8')).includes(`id="${fragment}"`),
        `${page}: broken target fragment ${href}`,
      )
    checked++
  }
}
assert.equal(htmlFiles.length, 11, 'Expected ten pages and a 404 page')
const brandManifest = JSON.parse(
  await readFile('docs/brand-asset-manifest.json', 'utf8'),
)
for (const certificate of brandManifest.certificates) {
  const original = await readFile(
    resolve(root, `certificates/${certificate.name}.pdf`),
  )
  assert.equal(original.subarray(0, 5).toString(), '%PDF-')
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    certificate.sha256,
    'Certificate original must remain unchanged',
  )
}
const pdf = await readFile(resolve(root, 'Joshua-Salvacion-Resume.pdf'))
assert.equal(
  pdf.subarray(0, 5).toString(),
  '%PDF-',
  'Resume must be a real PDF',
)
for (const file of files) {
  assert(
    !/\.(?:env|db|sqlite|map|csv|py|kt|docx)$/i.test(file),
    `Unexpected public file: ${relative(root, file)}`,
  )
  assert(
    !relative(root, file).includes('node_modules'),
    'Dependencies must not be copied to dist',
  )
}
const total = (await Promise.all(files.map((f) => stat(f)))).reduce(
  (n, s) => n + s.size,
  0,
)
console.log(
  `PASS: ${htmlFiles.length} pages, ${checked} local references, headings, metadata, image attributes, PDF signature and public-file allowlist. ${(total / 1024).toFixed(0)} KB total output.`,
)
