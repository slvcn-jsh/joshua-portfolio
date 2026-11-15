// Run only against the isolated local web preview with EXPO_NO_DOTENV=1.
// Creates fresh browser storage; records the application's built-in sample deck.
// Never connects to remote services or alters the application source repository.
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = 'http://127.0.0.1:8081'
await mkdir('output/playwright/barion-current', { recursive: true })
const browser = await chromium.launch()
const blocked = []
const errors = []
const context = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  reducedMotion: 'reduce',
})
const isolate = async (context) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url())
    if (
      url.hostname === '127.0.0.1' ||
      url.hostname === 'localhost' ||
      ['data:', 'blob:'].includes(url.protocol)
    )
      return route.continue()
    blocked.push(url.origin)
    return route.abort()
  })
}
try {
  await isolate(context)
  const desktop = await context.newPage()
  await desktop.goto(origin)
  await desktop
    .getByRole('button', { name: 'Study now (5)', exact: true })
    .waitFor({ timeout: 60000 })
  await desktop.screenshot({
    path: 'output/playwright/barion-current/home.png',
  })
  await context.close()
  const recording = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    recordVideo: {
      dir: 'output/playwright/barion-current/raw',
      size: { width: 390, height: 844 },
    },
  })
  await isolate(recording)
  const page = await recording.newPage()
  page.on('pageerror', (error) => errors.push(error.message))
  try {
    await page.goto(origin)
    await page
      .getByRole('button', { name: 'Study now (5)', exact: true })
      .waitFor({ timeout: 60000 })
    await page.waitForTimeout(1800) // Intentional reading time in the recording.
    await page
      .getByRole('button', { name: 'Study now (5)', exact: true })
      .click()
    await page.getByRole('button', { name: 'Reveal', exact: true }).waitFor()
    await page.screenshot({
      path: 'output/playwright/barion-current/review.png',
    })
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Reveal', exact: true }).click()
    await page
      .getByRole('button', { name: 'Toggle source provenance', exact: true })
      .waitFor()
    await page.screenshot({
      path: 'output/playwright/barion-current/answer.png',
    })
    await page.waitForTimeout(2000)
    await page
      .getByRole('button', { name: 'Toggle source provenance', exact: true })
      .click()
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: 'output/playwright/barion-current/source.png',
    })
    await page.getByRole('button', { name: /^Good / }).click()
    await page.getByRole('button', { name: 'Reveal', exact: true }).waitFor()
    await page.waitForTimeout(2000)
    const video = page.video()
    await recording.close()
    await video.saveAs('output/playwright/barion-current/review.webm')
  } finally {
    await recording.close()
  }
  await writeFile(
    'output/playwright/barion-current/capture.json',
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        viewport: '390x844',
        data: 'Built-in synthetic sample deck, isolated browser storage',
        workflow: [
          'Open study',
          'Reveal answer',
          'Expand source provenance',
          'Rate Good',
          'Continue to next card',
        ],
        blockedOrigins: [...new Set(blocked)],
        pageErrors: errors,
        limits:
          'Local web development preview, not native release or content-quality validation. Silent recording.',
      },
      null,
      2,
    ),
  )
  if (errors.length)
    throw new Error('App errors during capture: ' + errors.join('; '))
  console.log(
    'Captured genuine local Barion web review with sample data. Blocked external origins:',
    [...new Set(blocked)],
  )
} finally {
  await browser.close()
}
