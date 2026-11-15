import { spawnSync } from 'node:child_process'
import { readFile, writeFile, rm, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'

// Isolated generated fixtures; no public host is claimed or contacted.
const fixture = 'output/seo-fixture'
function run(file, args, env = {}) {
  const result = spawnSync(process.execPath, [file, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  })
  assert.equal(result.status, 0, result.stderr || result.stdout)
}
run('node_modules/vite/bin/vite.js', ['build', '--outDir', fixture])
const template = await readFile(resolve(fixture, 'index.html'), 'utf8')
const sitemap = resolve(fixture, 'sitemap.xml')
for (const scenario of [
  {
    name: 'production',
    origin: 'https://portfolio.example',
    env: 'production',
    index: true,
  },
  {
    name: 'preview',
    origin: 'https://portfolio.example',
    env: 'preview',
    index: false,
  },
  { name: 'unconfigured', origin: '', env: '', index: false },
]) {
  await writeFile(resolve(fixture, 'index.html'), template)
  // Remove only this known, generated fixture file between scenarios.
  await rm(sitemap, { force: true })
  run('node_modules/tsx/dist/cli.mjs', ['scripts/prerender.tsx', fixture], {
    SITE_URL: scenario.origin,
    VERCEL_ENV: scenario.env,
  })
  const html = await readFile(resolve(fixture, 'projects/barion.html'), 'utf8')
  const robots = await readFile(resolve(fixture, 'robots.txt'), 'utf8')
  assert.equal(html.includes('rel="canonical"'), scenario.index, scenario.name)
  assert.equal(
    html.includes('content="index, follow"'),
    scenario.index,
    scenario.name,
  )
  assert.equal(robots.includes('Allow: /'), scenario.index, scenario.name)
  if (scenario.index) {
    assert(html.includes('https://portfolio.example/projects/barion'))
    const xml = await readFile(sitemap, 'utf8')
    assert.equal((xml.match(/<loc>/g) ?? []).length, 10)
    assert(!xml.includes('/404'))
  } else {
    await assert.rejects(access(sitemap))
  }
}
console.log(
  'PASS: production canonical/OG/sitemap, preview noindex, and unconfigured noindex in isolated build fixtures.',
)
