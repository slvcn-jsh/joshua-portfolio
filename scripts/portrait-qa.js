/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = process.env.PORTFOLIO_QA_ORIGIN || 'http://127.0.0.1:4173'
  // Browser instrumentation, not a page script: production CSP stays unchanged.
  await page.addInitScript({ path: 'node_modules/axe-core/axe.min.js' })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const results = []
  for (const theme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: theme })
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(origin)
      await page.locator('html[data-enhanced]').waitFor()
      await page.locator('.theme-control select').selectOption(theme)
      if (await page.locator('.brand img').count())
        throw new Error('Header must remain text-only')
      const geometry = await page.evaluate(() => {
        const brand = document.querySelector('.brand').getBoundingClientRect()
        const control = document
          .querySelector('.theme-control')
          .getBoundingClientRect()
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          overlap: brand.right > control.left,
        }
      })
      if (geometry.overflow || geometry.overlap)
        throw new Error(JSON.stringify({ theme, width, geometry }))
      if (width < 1024) {
        await page.locator('.mobile-nav summary').click()
        await page
          .getByRole('navigation', { name: 'Mobile navigation' })
          .getByRole('link', { name: 'Projects', exact: true })
          .click()
        await page
          .getByRole('link', { name: 'Joshua Salvacion, home', exact: true })
          .click()
        await page.waitForURL(origin + '/')
      }
      const violations = await page.evaluate(async () =>
        (
          await window.axe.run(document.querySelector('.site-header'))
        ).violations.map((v) => v.id),
      )
      if (violations.length)
        throw new Error('Header accessibility: ' + violations)
      if (width === 360 || width === 1440)
        await page.screenshot({
          path: `output/playwright/portrait-${theme}-${width}.png`,
        })
      results.push({ theme, width, header: 'pass' })
    }
  }
  for (const [rel, path] of [
    ['icon', '/favicon-portrait.png'],
    ['apple-touch-icon', '/apple-touch-icon.png'],
  ]) {
    if (
      (await page.locator(`link[rel="${rel}"]`).getAttribute('href')) !== path
    )
      throw new Error('Incorrect icon: ' + rel)
    const response = await page.request.get(origin + path)
    if (
      !response.ok() ||
      !response.headers()['content-type'].includes('image/png')
    )
      throw new Error('Missing image: ' + path)
  }
  if (errors.length) throw new Error(errors.join('\n'))
  return { results, icons: 'pass', runtimeErrors: errors.length }
}
