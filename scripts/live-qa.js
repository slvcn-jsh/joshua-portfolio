/* eslint-disable @typescript-eslint/no-unused-expressions */
// Public, anonymous production smoke test. Update origin if the approved domain changes.
async (page) => {
  const origin = 'https://joshua-portfolio-phi-lemon.vercel.app'
  const issues = []
  page.on('pageerror', error => issues.push(error.message))
  page.on('console', message => { if (message.type() === 'error') issues.push(message.text()) })
  page.on('request', request => { if (new URL(request.url()).origin !== origin) issues.push('Unexpected external request: ' + new URL(request.url()).origin) })
  let checked = 0
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    for (const path of ['/', '/projects', '/projects/pcosina', '/projects/barion', '/projects/focusloop', '/projects/resolveops', '/projects/procura', '/projects/freshkeep', '/skills', '/about', '/achievements', '/certifications', '/resume', '/contact']) {
      const response = await page.goto(origin + path)
      if (response.status() !== 200) throw new Error('Page unavailable: ' + path)
      await page.locator('html[data-enhanced]').waitFor()
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Overflow: ' + path)
      if (path === '/') {
        for (const theme of ['light', 'dark']) {
          await page.getByLabel('Color theme').selectOption(theme)
          await page.locator('html[data-theme="' + theme + '"]').waitFor()
          for (const [name, slug] of [['PCOSina','pcosina'], ['Barion','barion'], ['FocusLoop','focusloop'], ['ResolveOps','resolveops'], ['Procura','procura'], ['FreshKeep','freshkeep']]) {
            await page.getByRole('button', { name, exact: true }).click()
            const slide = page.locator('#showcase-' + slug)
            await slide.locator('.showcase-capture').click()
            await page.locator('dialog[open] img').evaluate(image => image.decode())
            await page.keyboard.press('Escape')
            if (!await slide.locator('.showcase-capture').evaluate(el => el === document.activeElement)) throw new Error('Live showcase focus return')
          }
          await page.getByRole('button', { name: 'PCOSina', exact: true }).click()
          await page.locator('.showcase-viewport').evaluate(async el => { await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))) })
          await page.screenshot({ path: `output/playwright/live-home-${theme}-${width}.png`, fullPage: true })
        }
      }
      if (path === '/certifications' || path === '/achievements') {
        const selector = path === '/certifications' ? '.certificate-image-link' : '.event-image-link'
        const triggers = page.locator(selector)
        const count = await triggers.count()
        if (count !== (path === '/certifications' ? 2 : 3)) throw new Error('Missing live evidence')
        for (let i = 0; i < count; i++) {
          await triggers.nth(i).click()
          await page.locator('dialog[open] img').evaluate(image => image.decode())
          await page.keyboard.press('Escape')
          if (!await triggers.nth(i).evaluate(el => el === document.activeElement)) throw new Error('Live evidence focus restoration failed')
        }
        if (path === '/certifications') {
          for (let i = 0; i < 2; i++) {
            const pending = page.waitForEvent('download')
            await page.getByRole('link', { name: 'Download PDF', exact: true }).nth(i).click()
            if (await (await pending).failure()) throw new Error('Live certificate download failed')
          }
        }
      }
      if (path === '/projects') {
        if (await page.locator('.collection-card').count() !== 6) throw new Error('Live collection incomplete')
        await page.getByRole('button', { name: 'Web 2', exact: true }).click()
        if (await page.locator('.collection-card').count() !== 2) throw new Error('Live filtering failed')
      }
      if (['/projects/focusloop', '/projects/resolveops', '/projects/procura', '/projects/freshkeep'].includes(path)) {
        await page.locator('.gallery-capture').first().click()
        await page.locator('dialog[open] img').evaluate(image => image.decode())
        await page.keyboard.press('Escape')
        if (!await page.locator('.gallery-capture').first().evaluate(el => el === document.activeElement)) throw new Error('New gallery focus failed')
        if (await page.locator('.private-source-note').count() !== 1) throw new Error('Private source disclosure missing')
      }
      if (path === '/projects/pcosina' || path === '/projects/barion') {
        const pcosina = path.endsWith('pcosina')
        await page.locator('.scenario-disclosure > summary').click()
        await page.getByRole('button', { name: pcosina ? 'Connection lost' : 'AI service unavailable', exact: true }).click()
        if (!(await page.locator('.scenario-result').textContent()).includes(pcosina ? 'The connection stops.' : 'Keep studying.')) throw new Error('Scenario failed on production')
        await page.getByRole('button', { name: '02 What the system handles', exact: true }).click()
        if (await page.locator('.capture-highlight').evaluate(el => el.getBoundingClientRect().width) < 100) throw new Error('Highlight not rendered')
        await page.locator('.capture-link').click()
        await page.getByRole('dialog').waitFor()
        await page.keyboard.press('Escape')
        await page.locator('dialog[open]').waitFor({ state: 'detached' })
        if (!await page.locator('.capture-link').evaluate(el => el === document.activeElement)) throw new Error('Focus restoration failed')
        if (!await page.getByRole('heading', { name: 'Sole developer', exact: true }).isVisible()) throw new Error('Ownership missing')
        const record = await page.request.get(origin + '/evidence/' + (pcosina ? 'pcosina' : 'barion') + '-verification.json')
        if (record.status() !== 200 || !(await record.json()).result) throw new Error('Verification record unavailable')
        if (!pcosina) {
          await page.locator('.recording-disclosure > summary').click()
          await page.locator('video').evaluate(async video => { await video.play() })
          await page.waitForFunction(() => document.querySelector('video').currentTime > .2)
          await page.locator('video').evaluate(video => video.pause())
        }
      }
      checked++
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(origin)
  await page.locator('summary').filter({ hasText: 'Menu' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Resume', exact: true }).click()
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download resume', exact: true }).click()
  const download = await downloadEvent
  if (download.suggestedFilename() !== 'Joshua-Salvacion-Resume.pdf') throw new Error('Wrong resume filename')
  if (issues.length) throw new Error(JSON.stringify(issues))
  return { origin, pagesAndViewports: checked, productionInteractions: 'pass', evidenceDialogs: 'pass', certificateDownloads: 'pass', mobileNavigation: 'pass', resumeDownload: 'pass', browserOrPolicyErrors: issues }
}
