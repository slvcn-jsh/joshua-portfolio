// One-time import of explicitly reviewed assets. Original repositories stay read-only.
// Usage: node scripts/prepare-media.mjs <PCOSina-root> <Barion-root> <approved-PDF>
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const [pcosina, barion, resume] = process.argv.slice(2)
if (!pcosina || !barion || !resume)
  throw new Error(
    'Provide PCOSina root, Barion root, and the approved PDF path.',
  )
await mkdir('public/images', { recursive: true })
const sources = [
  [
    resolve(pcosina, 'tools/avp/v2_3d/public/assets/week.png'),
    'pcosina-plan.webp',
  ],
  [
    resolve(pcosina, 'tools/avp/v2_3d/public/assets/shopping.png'),
    'pcosina-grocery.webp',
  ],
  [resolve(barion, 'medstudy-home-settled.png'), 'barion-home.webp'],
  [resolve(barion, 'medstudy-study-mobile.png'), 'barion-review.webp'],
]
const records = []
for (const [source, name] of sources) {
  const target = resolve('public/images', name)
  const result = await sharp(source)
    .webp({ quality: 88, effort: 6 })
    .toFile(target)
  records.push({
    asset: `/images/${name}`,
    width: result.width,
    height: result.height,
    bytes: result.size,
  })
}
await copyFile(resume, 'public/Joshua-Salvacion-Resume.pdf')
const hash = createHash('sha256')
  .update(await readFile(resume))
  .digest('hex')
await writeFile(
  'docs/media-manifest.json',
  JSON.stringify(
    {
      images: records,
      resume: {
        asset: '/Joshua-Salvacion-Resume.pdf',
        sha256: hash,
        treatment: 'Unmodified owner-approved PDF',
      },
    },
    null,
    2,
  ) + '\n',
)
console.log(JSON.stringify({ images: records, resumeSha256: hash }, null, 2))
