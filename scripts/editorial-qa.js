/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const results = []
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('http://127.0.0.1:4173/')
    await page.locator('html[data-enhanced]').waitFor()
    for (const name of ['PCOSina', 'Barion', 'FocusLoop', 'ResolveOps', 'Procura', 'FreshKeep']) {
      if (await page.getByRole('heading', { name, exact: true, includeHidden: true }).count() !== 1) throw new Error('Duplicate project: ' + name)
    }
    const state = await page.evaluate(() => ({
      intro: document.querySelector('.home-introduction').getBoundingClientRect().toJSON(),
      showcase: document.querySelector('.showcase').getBoundingClientRect().toJSON(),
      name: document.querySelector('#intro-title').getBoundingClientRect().toJSON(),
      context: document.querySelector('.intro-context').getBoundingClientRect().toJSON(),
      obsolete: document.querySelectorAll('.project-featured, .project-supporting, .more-projects, main .contact-band').length,
      eager: document.querySelector('.showcase-slide .showcase-capture img').loading === 'eager',
      educationCount: (document.querySelector('main').textContent.match(/FEU Institute of Technology/g) || []).length,
    }))
    const layoutFits = width >= 1280
      ? state.showcase.left >= state.intro.right && Math.abs(state.showcase.top - state.intro.top) < 2
      : state.showcase.top >= state.intro.bottom
    if (!layoutFits || state.context.top < state.name.bottom || state.obsolete || !state.eager || state.educationCount !== 1) throw new Error('Homepage hierarchy regression: ' + JSON.stringify({ width, state }))
    for (const [name, slug] of [['PCOSina', 'pcosina'], ['Barion', 'barion']]) {
      await page.getByRole('button', { name, exact: true }).click()
      const slide = page.locator('#showcase-' + slug)
      await slide.locator('.showcase-capture img').evaluate(async image => {
        await image.decode()
        const r = image.getBoundingClientRect()
        if (Math.abs(r.width / r.height - image.naturalWidth / image.naturalHeight) > .02) throw new Error('Distorted capture')
      })
      await slide.getByRole('link', { name: 'Read case study', exact: false }).click()
      await page.waitForURL('**/projects/' + slug)
      await page.goto('http://127.0.0.1:4173/')
    }
    results.push({ width, uniqueProjects: 6, readingOrder: 'pass', imageScaling: 'pass', links: 'pass' })
  }
  return { homepageChecks: results }
}
