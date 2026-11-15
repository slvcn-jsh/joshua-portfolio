/* eslint-disable @typescript-eslint/no-unused-expressions */
// Execute through: npx playwright-cli run-code --filename=scripts/browser-qa.js
async (page) => {
  const routes = [
    '/',
    '/projects',
    '/projects/pcosina',
    '/projects/barion',
    '/skills',
    '/about',
    '/achievements',
    '/certifications',
    '/resume',
    '/contact',
    '/not-a-page',
  ]
  const widths = [360, 390, 768, 1024, 1440]
  const errors = []
  const results = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4173${route}`)
      await page.locator('main h1').waitFor()
      await page.evaluate(async () => {
        await document.fonts.ready
      })
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll('h1').length,
        brokenImages: [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.src),
        title: document.title,
        overflowing: [...document.querySelectorAll('main *')]
          .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
          .slice(0, 5)
          .map((el) => el.tagName + '.' + el.className),
      }))
      if (state.overflow || state.h1 !== 1 || state.brokenImages.length)
        throw new Error(JSON.stringify({ width, route, state }))
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
      const a11y = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
          },
        })
        return result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          elements: v.nodes.map((n) => n.target),
        }))
      })
      results.push({ width, route, overflow: state.overflow, violations: a11y })
      if (a11y.length)
        throw new Error(JSON.stringify({ width, route, violations: a11y }))
    }
  }
  if (errors.length) throw new Error(JSON.stringify({ browserErrors: errors }))
  return {
      pagesChecked: results.length,
      widths,
      accessibilityViolations: 0,
      horizontalOverflows: 0,
      browserErrors: errors,
      results,
  }
}
