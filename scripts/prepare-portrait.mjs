import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

// Explicit, owner-approved source only. Never invoked as part of a public build.
const source = process.argv[2]
assert(source, 'Pass the approved portrait path as the only argument.')
const original = await readFile(source)
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex')
await mkdir('public/brands', { recursive: true })
// Top-aligned square keeps the full hairline; no retouching or synthetic content.
const square = sharp(original).rotate()
await square
  .clone()
  .resize(160, 160, { fit: 'cover', position: 'top' })
  .webp({ quality: 90 })
  .toFile('public/brands/joshua-portrait.webp')
await square
  .clone()
  .resize(64, 64, { fit: 'cover', position: 'top' })
  .png()
  .toFile('public/favicon-portrait.png')
await square
  .clone()
  .resize(180, 180, { fit: 'cover', position: 'top' })
  .png()
  .toFile('public/apple-touch-icon.png')
assert.equal(
  hash(await readFile(source)),
  hash(original),
  'Source must remain unchanged',
)
console.log(
  `Portrait assets prepared; original unchanged. SHA-256: ${hash(original)}`,
)
