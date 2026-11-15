import sharp from 'sharp'
import { mkdir, copyFile, readFile, writeFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'

// Run only after visually reviewing the isolated capture for private data.
const input = 'output/playwright/barion-current'
await mkdir('public/videos', { recursive: true })
const assets = []
for (const name of ['home', 'source', 'review']) {
  const target = `public/images/barion-current-${name}.webp`
  const metadata = await sharp(`${input}/${name}.png`)
    .webp({ quality: 90, effort: 6 })
    .toFile(target)
  assets.push({
    path: target.replace('public', ''),
    width: metadata.width,
    height: metadata.height,
    bytes: metadata.size,
    sha256: createHash('sha256')
      .update(await readFile(target))
      .digest('hex'),
  })
}
const video = 'public/videos/barion-review.webm'
await copyFile(`${input}/review.webm`, video)
assets.push({
  path: video.replace('public', ''),
  bytes: (await stat(video)).size,
  sha256: createHash('sha256')
    .update(await readFile(video))
    .digest('hex'),
})
const capture = JSON.parse(await readFile(`${input}/capture.json`, 'utf8'))
await writeFile(
  'docs/barion-capture-manifest.json',
  JSON.stringify(
    {
      ...capture,
      repositoryBase: '7e83b70917ff68b68bb5eaacaa458b2f096795a7',
      workingTree:
        'Modified local development tree, not a clean checkout of the public commit',
      assets,
    },
    null,
    2,
  ),
)
console.log(assets)
