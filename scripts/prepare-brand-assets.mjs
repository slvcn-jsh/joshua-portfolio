// One-time local asset preparation, not a production build dependency.
// Arguments: reviewed PCOSina logo, Barion logo, official LinkedIn blue [in] PNG.
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import * as icons from 'simple-icons'
import sharp from 'sharp'

const [pcosina, barion, linkedin] = process.argv.slice(2)
if (!pcosina || !barion || !linkedin)
  throw new Error('Supply the three reviewed logo paths')
await mkdir('public/brands', { recursive: true })
const names = [
  'Kotlin',
  'Python',
  'Typescript',
  'Jetpackcompose',
  'React',
  'Expo',
  'Fastapi',
  'Firebase',
  'Supabase',
  'Sqlite',
  'Postgresql',
  'Git',
  'Github',
  'Androidstudio',
  'Vite',
  'Gmail',
  'Render',
]
const records = []
for (const name of names) {
  const icon = icons[`si${name}`]
  if (!icon || !/^[0-9A-F]{6}$/i.test(icon.hex))
    throw new Error(`Missing icon ${name}`)
  const asset = `/brands/${icon.slug}.svg`
  await writeFile(
    `public${asset}`,
    icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `),
  )
  records.push({
    asset,
    title: icon.title,
    source: icon.source,
    guidelines: icon.guidelines,
    license:
      icon.license ??
      'No individual license supplied; brand rights remain with owner',
  })
}
for (const [source, name] of [
  [pcosina, 'pcosina'],
  [barion, 'barion'],
]) {
  await sharp(source)
    .resize({
      width: 256,
      height: 256,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 95 })
    .toFile(`public/brands/${name}.webp`)
}
// Preserve the approved color and aspect ratio of the downloaded official mark.
await sharp(linkedin)
  .resize({ width: 128, withoutEnlargement: true })
  .png()
  .toFile('public/brands/linkedin.png')
const certificates = []
for (const name of ['it-specialist-python', 'sap-autonomous-enterprise']) {
  const result = await sharp(`output/pdf/${name}.png`)
    .webp({ quality: 94, effort: 6 })
    .toFile(`public/certificates/${name}.webp`)
  const pdf = await readFile(`public/certificates/${name}.pdf`)
  certificates.push({
    name,
    width: result.width,
    height: result.height,
    bytes: pdf.length,
    sha256: createHash('sha256').update(pdf).digest('hex'),
  })
}
await writeFile(
  'docs/brand-asset-manifest.json',
  JSON.stringify({ icons: records, certificates }, null, 2) + '\n',
)
console.log(JSON.stringify({ icons: names.length, certificates }, null, 2))
