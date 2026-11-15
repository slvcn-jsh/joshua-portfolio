/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const captures = []
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    for (const [slug, route] of [['home', '/'], ['pcosina', '/projects/pcosina'], ['barion', '/projects/barion'], ['skills', '/skills'], ['about', '/about'], ['achievements', '/achievements'], ['certifications', '/certifications'], ['resume', '/resume'], ['contact', '/contact']]) {
      await page.goto('http://127.0.0.1:4173' + route)
      await page.locator('main h1').waitFor()
      // Request visible lazy images individually; closed disclosures deliberately
      // do not load, so decoding every document image can wait indefinitely.
      const images = page.locator('main img:visible')
      const imageCount = await images.count()
      for (let i = 0; i < imageCount; i++) {
        await images.nth(i).scrollIntoViewIfNeeded()
        await images.nth(i).evaluate(image => image.decode())
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      const path = `output/playwright/${slug}-${width}.png`
      await page.screenshot({ path, fullPage: true })
      captures.push(path)
    }
  }
  return captures
}
