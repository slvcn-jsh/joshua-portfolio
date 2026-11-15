// Optimize owner-supplied event photos without cropping or changing their content.
// Usage: node scripts/prepare-event-photos.mjs <champion.jpg> <hackathon.jpg> <buildathon.jpg>
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const names = [
  'design-thinking-champion',
  'up-computer-science-hackathon',
  'base-build-adamson',
]
const sources = process.argv.slice(2)
if (sources.length !== 3)
  throw new Error('Supply the three owner-approved photo paths in event order.')
await mkdir('public/images/events', { recursive: true })
const manifest = []
for (const [i, source] of sources.entries()) {
  const asset = `/images/events/${names[i]}.webp`
  const result = await sharp(source)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 88 })
    .toFile(`public${asset}`)
  manifest.push({
    asset,
    width: result.width,
    height: result.height,
    bytes: result.size,
    sourceSha256: createHash('sha256')
      .update(await readFile(source))
      .digest('hex'),
    provenance:
      'Owner-supplied event photo; event association confirmed by owner. Uncropped; metadata stripped.',
  })
}
await writeFile(
  'docs/event-media-manifest.json',
  JSON.stringify(manifest, null, 2) + '\n',
)
console.log(JSON.stringify(manifest, null, 2))
