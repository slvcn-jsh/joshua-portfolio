/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const results = []
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const [route, selector, count] of [['/certifications', '.certificate-image-link', 2], ['/achievements', '.event-image-link', 3]]) {
      await page.goto(origin + route)
      await page.locator('html[data-enhanced]').waitFor()
      const links = page.locator(selector)
      if (await links.count() !== count) throw new Error('Missing evidence: ' + route)
      for (let i = 0; i < count; i++) {
        const trigger = links.nth(i)
        await trigger.scrollIntoViewIfNeeded()
        await trigger.locator('img').evaluate(image => image.decode())
        await trigger.click()
        await page.locator('dialog[open]').waitFor()
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
        const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(v => v.id))
        if (violations.length) throw new Error('Evidence dialog a11y: ' + violations)
        await page.keyboard.press('Escape')
        if (!await trigger.evaluate(el => el === document.activeElement)) throw new Error('Dialog focus not restored')
      }
    }
    await page.goto(origin + '/skills')
    if (await page.locator('.technology-list li').count() !== await page.locator('.technology-list .brand-icon').count()) throw new Error('Technology icon missing')
    await page.goto(origin + '/')
    if (await page.locator('.primary-technologies a').count() !== 3) throw new Error('Primary language links missing')
    results.push({ width, evidenceDialogs: 5, technologyIcons: 'pass' })
  }
  await page.goto(origin + '/certifications')
  for (let i = 0; i < 2; i++) {
    const pending = page.waitForEvent('download')
    await page.getByRole('link', { name: 'Download PDF', exact: true }).nth(i).click()
    const download = await pending
    if (!download.suggestedFilename().endsWith('.pdf') || await download.failure()) throw new Error('Certificate download failed')
  }
  await page.goto(origin + '/contact')
  if (await page.getByRole('link', { name: 'Visit LinkedIn profile', exact: false }).getAttribute('href') !== 'https://www.linkedin.com/in/joshua-salvacion/') throw new Error('LinkedIn URL mismatch')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(origin + '/')
  if (await page.locator('.primary-technologies img').first().evaluate(el => getComputedStyle(el).animationName) !== 'none') throw new Error('Reduced motion ignored')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const plain = await page.context().browser().newContext({ javaScriptEnabled: false })
  try {
    const p = await plain.newPage()
    await p.goto(origin + '/certifications')
    if (!await p.locator('.certificate-copy').first().isVisible() || !(await p.locator('.certificate-image-link').first().getAttribute('href')).endsWith('.webp')) throw new Error('No-JS certificate fallback failed')
  } finally { await plain.close() }
  return { results, certificateDownloads: 2, reducedMotion: 'pass', noJavaScriptEvidence: 'pass', linkedIn: 'pass' }
}
