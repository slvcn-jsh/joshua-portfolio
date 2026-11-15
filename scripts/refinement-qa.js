/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const results = []
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    for (const slug of ['pcosina', 'barion']) {
      await page.goto('http://127.0.0.1:4173/projects/' + slug)
      await page.locator('html[data-enhanced]').waitFor()
      const ownership = await page
        .getByRole('heading', { name: 'Sole developer', exact: true })
        .boundingBox()
      if (!ownership || ownership.y > 600)
        throw new Error('Ownership is buried')
      if (
        width < 1024 &&
        (await page.locator('.case-contents-mobile').getAttribute('open')) !==
          null
      )
        throw new Error('Mobile contents should start compact')
      const words = await page.locator('.case-body').innerText()
      const record = await page.request.get(
        'http://127.0.0.1:4173/evidence/' + slug + '-verification.json',
      )
      const evidence = await record.json()
      if (record.status() !== 200 || evidence.executedOn !== '2026-11-15')
        throw new Error('Verification unavailable')
      for (const hash of Object.values(evidence.sha256))
        if (!/^[a-f\d]{64}$/i.test(hash))
          throw new Error('Invalid evidence hash')
      if ((await page.locator('.system-branch').count()) !== 2)
        throw new Error('Data boundaries missing')
      await page.screenshot({
        path: `output/playwright/refined-${slug}-${width}.png`,
        fullPage: true,
      })
      await page
        .locator('.case-hero')
        .screenshot({ path: `output/playwright/brief-${slug}-${width}.png` })
      await page
        .locator('.system-map')
        .screenshot({ path: `output/playwright/map-${slug}-${width}.png` })
      results.push({
        slug,
        width,
        ownershipTop: Math.round(ownership.y),
        pageHeight: await page.evaluate(
          () => document.documentElement.scrollHeight,
        ),
        bodyWords: words.trim().split(/\s+/).length,
      })
      await page.goto('http://127.0.0.1:4173/projects/' + slug + '#walkthrough')
      await page.locator('.scenario-controls button').first().waitFor()
      if (
        (await page.locator('.scenario-disclosure').getAttribute('open')) ===
        null
      )
        throw new Error('Scenario deep link stayed closed')
      if (slug === 'barion') {
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
        await page.locator('.recording-disclosure > summary').click()
        const video = page.locator('video')
        if (
          (await video.getAttribute('preload')) !== 'none' ||
          (await video.getAttribute('autoplay')) !== null
        )
          throw new Error('Video must be opt-in')
        await video.evaluate(async (element) => {
          await element.play()
        })
        await page.waitForFunction(
          () => document.querySelector('video').currentTime > 0.2,
        )
        await video.evaluate((element) => {
          element.pause()
          element.currentTime = 10
        })
        await page.waitForFunction(
          () =>
            !document.querySelector('video').seeking &&
            document.querySelector('video').readyState >= 2,
        )
        await page
          .locator('.recording-layout')
          .screenshot({ path: `output/playwright/recording-${width}.png` })
        const violations = await page.evaluate(async () =>
          (
            await window.axe.run(document, {
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
              },
            })
          ).violations.map((v) => v.id),
        )
        if (violations.length)
          throw new Error('Recording accessibility: ' + violations)
        const pending = page.waitForEvent('download')
        await page
          .getByRole('link', { name: 'Download recording', exact: false })
          .click()
        if (await (await pending).failure())
          throw new Error('Video download failed')
      }
    }
    await page.goto('http://127.0.0.1:4173/')
    await page.screenshot({
      path: `output/playwright/refined-home-${width}.png`,
      fullPage: true,
    })
    if ((await page.locator('.desktop-nav a').count()) !== 5)
      throw new Error('Primary navigation regression')
    for (const href of ['/achievements', '/certifications']) {
      if ((await page.locator(`footer a[href="${href}"]`).count()) !== 1)
        throw new Error('Background route lost')
    }
  }
  return results
}
