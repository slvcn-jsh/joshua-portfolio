import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import {
  siNestjs,
  siExpress,
  siPrisma,
  siZod,
  siDocker,
  siJest,
  siVitest,
} from 'simple-icons'

// Explicit, reviewed assets only. Never traverse or copy an entire private repo.
// Run manually with StudioProjects and Developer/Projects as arguments.
const [studio, developer] = process.argv.slice(2)
if (!studio || !developer)
  throw new Error('Provide both source parent directories.')
const captures = [
  [
    'focusloop-home',
    studio,
    'FocusLoop',
    'docs/qa/evidence/native-ui/compact-home.png',
    'Native Compose capture; synthetic injected state; test banner retained.',
  ],
  [
    'focusloop-session',
    studio,
    'FocusLoop',
    'docs/qa/evidence/native-ui/compact-active.png',
    'Native Compose session; synthetic injected state.',
  ],
  [
    'freshkeep-inventory',
    studio,
    'freshkeep',
    'docs/screenshots/S04-inventory.png',
    'Native Compose inventory; synthetic fixture data.',
  ],
  [
    'freshkeep-batches',
    studio,
    'freshkeep',
    'docs/screenshots/S12-multiple-batches.png',
    'Native Compose independent batches; synthetic fixture data.',
  ],
  [
    'resolveops-queue',
    developer,
    'ResolveOps',
    'tests/e2e/visual.spec.ts-snapshots/S10-1440-chromium-win32.png',
    'Fictional React UI preview; not the authenticated workspace. SLA values are illustrative.',
  ],
  [
    'procura-approval',
    developer,
    'Procura',
    'output/playwright/live/approved-desktop.png',
    'Persisted approval in an isolated browser-test database; synthetic accounts and request. Downstream modules are not implemented.',
  ],
  [
    'procura-mobile',
    developer,
    'Procura',
    'output/playwright/live/approved-mobile.png',
    'Same isolated persisted approval flow at mobile width.',
  ],
]
await mkdir('public/images/projects', { recursive: true })
const assets = []
for (const [name, parent, repo, source, context] of captures) {
  const input = await readFile(resolve(parent, repo, source))
  const path = `/images/projects/${name}.webp`
  const output = await sharp(input)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toBuffer()
  const { width, height } = await sharp(output).metadata()
  await writeFile(`public${path}`, output)
  assets.push({
    path,
    project: repo.toLowerCase(),
    source,
    context,
    width,
    height,
    bytes: output.length,
    sha256: createHash('sha256').update(output).digest('hex'),
  })
}
for (const repo of ['Procura', 'ResolveOps']) {
  const source = 'apps/web/public/favicon.svg'
  const path = `/brands/${repo.toLowerCase()}.svg`
  await copyFile(resolve(developer, repo, source), `public${path}`)
  const output = await readFile(`public${path}`)
  assets.push({
    path,
    project: repo.toLowerCase(),
    source,
    context: 'Existing application favicon, unchanged.',
    bytes: output.length,
    sha256: createHash('sha256').update(output).digest('hex'),
  })
}
const icons = []
for (const icon of [
  siNestjs,
  siExpress,
  siPrisma,
  siZod,
  siDocker,
  siJest,
  siVitest,
]) {
  const path = `/brands/${icon.slug}.svg`
  await writeFile(
    `public${path}`,
    icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `),
  )
  icons.push({
    path,
    title: icon.title,
    source: icon.source,
    license:
      icon.license ??
      'Brand rights remain with owner; Simple Icons artwork under CC0.',
  })
}
await writeFile(
  'docs/project-expansion-media.json',
  JSON.stringify(
    {
      reviewedOn: '2026-11-18',
      approval:
        'Owner approved sanitized summaries and safe screenshots; source remains private.',
      processing:
        'Resize only when needed, WebP compression, metadata stripped. No content replacement or synthetic UI generation.',
      assets,
      icons,
    },
    null,
    2,
  ) + '\n',
)
console.log(
  assets.map(({ path, width, height, bytes }) => ({
    path,
    width,
    height,
    bytes,
  })),
)
