import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { runInThisContext } from 'node:vm'
import { chromium } from 'playwright'

// Reuse the same checked-in workflows as the interactive Playwright CLI.
// Only trusted repository scripts are evaluated; no page or remote code.
const suites = process.argv.includes('--live')
  ? ['live']
  : [
      'browser',
      'enhanced',
      'identity',
      'interaction',
      'editorial',
      'nojs',
      'csp',
      'refinement',
    ]
const ownServer =
  !process.argv.includes('--reuse-preview') && !process.argv.includes('--live')
const server = ownServer
  ? spawn(
      process.execPath,
      [
        'node_modules/vite/bin/vite.js',
        'preview',
        '--host',
        '127.0.0.1',
        '--port',
        '4173',
        '--strictPort',
      ],
      { stdio: 'pipe', windowsHide: true },
    )
  : null
let serverLog = ''
server?.stdout.on('data', (data) => {
  serverLog += data
})
server?.stderr.on('data', (data) => {
  serverLog += data
})
let browser
try {
  if (ownServer) {
    let ready = false
    for (let attempt = 0; attempt < 80; attempt++) {
      assert(server.exitCode === null, `Preview failed: ${serverLog}`)
      if (serverLog.includes('http://127.0.0.1:4173/')) {
        ready = true
        break
      }
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    assert(ready, `Preview did not become ready: ${serverLog}`)
  }
  await mkdir('output/playwright', { recursive: true })
  browser = await chromium.launch()
  const results = {}
  for (const suite of suites) {
    const context = await browser.newContext()
    try {
      const page = await context.newPage()
      page.setDefaultTimeout(20000)
      const file = `scripts/${suite}-qa.js`
      const run = runInThisContext(await readFile(file, 'utf8'), {
        filename: file,
      })
      assert.equal(typeof run, 'function')
      results[suite] = await run(page)
      console.log(`PASS ${suite}: ${JSON.stringify(results[suite])}`)
    } finally {
      await context.close()
    }
  }
  await writeFile(
    `output/playwright/${process.argv.includes('--live') ? 'live' : 'browser'}-report.json`,
    JSON.stringify({ executedAt: new Date().toISOString(), results }, null, 2),
  )
} finally {
  await browser?.close()
  if (server && server.exitCode === null) {
    const stopped = new Promise((resolve) => server.once('exit', resolve))
    server.kill()
    await stopped
  }
}
