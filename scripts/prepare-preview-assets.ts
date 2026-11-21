/** Resize only approved portfolio assets; originals and evidence hashes stay unchanged. */
import { createHash } from 'node:crypto'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import assert from 'node:assert/strict'
import sharp from 'sharp'
import { projectSummaries } from '../src/content/project-index'

const publicRoot = resolve('public')
await mkdir(resolve(publicRoot, 'images/previews'), { recursive: true })
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const manifest = []
const inputs = [
  ...new Set(
    projectSummaries.flatMap((p) => p.screenshots.map((image) => image.src)),
  ),
]
for (const src of ['/brands/feu-tech.webp', ...inputs]) {
  const input = resolve(publicRoot, src.slice(1))
  assert(
    input.startsWith(publicRoot + '\\') || input.startsWith(publicRoot + '/'),
  )
  const original = await readFile(input)
  const { width } = await sharp(original).metadata()
  assert(width)
  const widths = src.includes('feu-tech')
    ? [64, 128]
    : [...new Set([Math.min(480, width), Math.min(960, width)])]
  const variants = []
  for (const target of widths) {
    const path = src.includes('feu-tech')
      ? `/brands/feu-tech-${target}.webp`
      : `/images/previews/${basename(src, '.webp')}-${target}.webp`
    const bytes = await sharp(original)
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 84, effort: 6 })
      .toBuffer()
    await writeFile(resolve(publicRoot, path.slice(1)), bytes)
    const info = await sharp(bytes).metadata()
    variants.push({
      path,
      width: info.width,
      height: info.height,
      bytes: bytes.length,
      sha256: hash(bytes),
    })
  }
  manifest.push({ source: src, sourceSha256: hash(original), variants })
}
await writeFile(
  'docs/preview-asset-manifest.json',
  JSON.stringify(
    {
      treatment:
        'Resized derivatives of reviewed originals; no generated or reconstructed UI.',
      assets: manifest,
    },
    null,
    2,
  ) + '\n',
)
console.log(
  `Prepared responsive derivatives for ${manifest.length} approved assets; originals unchanged.`,
)
