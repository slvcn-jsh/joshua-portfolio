/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const captures = []
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    for (const [slug, route] of [['home', '/'], ['pcosina', '/projects/pcosina'], ['barion', '/projects/barion'], ['skills', '/skills'], ['about', '/about'], ['achievements', '/achievements'], ['resume', '/resume'], ['contact', '/contact']]) {
      await page.goto('http://127.0.0.1:4173' + route)
      await page.locator('main h1').waitFor()
      // Scroll once to request below-the-fold media before a full-page capture.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.evaluate(async () => { await Promise.all([...document.images].map(i => i.decode().catch(() => {}))) })
      await page.evaluate(() => window.scrollTo(0, 0))
      const path = `output/playwright/${slug}-${width}.png`
      await page.screenshot({ path, fullPage: true })
      captures.push(path)
    }
  }
  return captures
}
