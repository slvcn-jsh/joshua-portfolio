/* eslint-disable @typescript-eslint/no-unused-expressions */
// Regression checks for content ownership, media and responsive reading order.
async (page) => {
  const results = []
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('http://127.0.0.1:4173/')
    await page.locator('html[data-enhanced]').waitFor()
    for (const name of ['PCOSina', 'Barion']) {
      if (await page.getByRole('heading', { name, exact: true }).count() !== 1) throw new Error('Duplicate project presentation: ' + name)
    }
    const state = await page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON()
      const imageSources = [...document.querySelectorAll('main img')].map(i => i.src)
      return {
        intro: box('.home-introduction'),
        featured: box('.project-featured'),
        supporting: box('.project-supporting'),
        imageCount: imageSources.length,
        uniqueImages: new Set(imageSources).size,
        obsoleteBlocks: document.querySelectorAll('.hero-project-index, .home-about, main .contact-band').length,
        eagerFeature: document.querySelector('.project-featured img').loading === 'eager',
        body: document.querySelector('main').textContent,
      }
    })
    if (state.imageCount !== 2 || state.uniqueImages !== 2 || state.obsoleteBlocks || !state.eagerFeature) throw new Error('Homepage media or repetition regression')
    if ((state.body.match(/FEU Institute of Technology/g) || []).length !== 1) throw new Error('Education repeated')
    if (width < 768 ? state.featured.top < state.intro.bottom : state.featured.left < state.intro.right) throw new Error('Responsive reading order failed')
    if (state.supporting.top < Math.max(state.featured.bottom, state.intro.bottom)) throw new Error('Project overlap')
    const captures = page.locator('main img')
    for (let i = 0; i < state.imageCount; i++) {
      await captures.nth(i).scrollIntoViewIfNeeded()
      const valid = await captures.nth(i).evaluate(async image => {
        await image.decode()
        const rect = image.getBoundingClientRect()
        return image.naturalWidth > 0 && Math.abs(rect.width / rect.height - image.naturalWidth / image.naturalHeight) < 0.02
      })
      if (!valid) throw new Error('Screenshot distorted or unavailable')
    }
    await page.locator('.project-featured').getByRole('link', { name: 'Read case study', exact: true }).click()
    await page.waitForURL('**/projects/pcosina')
    await page.goto('http://127.0.0.1:4173/')
    await page.locator('.project-supporting').getByRole('link', { name: 'Read case study', exact: true }).click()
    await page.waitForURL('**/projects/barion')
    results.push({ width, uniquePresentations: 'pass', readingOrder: 'pass', imageScaling: 'pass', projectLinks: 'pass' })
  }
  for (const [route, heading] of [['/projects', 'Selected projects'], ['/skills', 'Technical skills'], ['/about', 'About Joshua'], ['/achievements', 'Achievements & activities'], ['/resume', 'Resume'], ['/contact', 'Contact']]) {
    await page.goto('http://127.0.0.1:4173' + route)
    if (await page.getByRole('heading', { level: 1, name: heading, exact: true }).count() !== 1) throw new Error('Unclear page title: ' + route)
  }
  return { homepageChecks: results, directPageTitles: 6 }
}
