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
    for (const path of ['/', '/projects', '/projects/pcosina', '/projects/barion', '/skills', '/about', '/achievements', '/resume', '/contact']) {
      const response = await page.goto(origin + path)
      if (response.status() !== 200) throw new Error('Page unavailable: ' + path)
      await page.locator('html[data-enhanced]').waitFor()
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Overflow: ' + path)
      if (path === '/') await page.screenshot({ path: `output/playwright/live-home-${width}.png` })
      if (path.startsWith('/projects/')) {
        const pcosina = path.endsWith('pcosina')
        await page.getByRole('button', { name: pcosina ? 'Connection lost' : 'AI service unavailable', exact: true }).click()
        if (!(await page.locator('.scenario-result').textContent()).includes(pcosina ? 'The connection stops.' : 'Keep studying.')) throw new Error('Scenario failed on production')
        await page.getByRole('button', { name: '02 What the system handles', exact: true }).click()
        if (await page.locator('.capture-highlight').evaluate(el => el.getBoundingClientRect().width) < 100) throw new Error('Highlight not rendered')
        await page.locator('.capture-link').click()
        await page.getByRole('dialog').waitFor()
        await page.keyboard.press('Escape')
        await page.locator('dialog[open]').waitFor({ state: 'detached' })
        if (!await page.locator('.capture-link').evaluate(el => el === document.activeElement)) throw new Error('Focus restoration failed')
        if (!pcosina) {
          await page.locator('.decision-challenge summary').click()
          await page.getByRole('button', { name: '02 Keep reviewing cards saved on the device', exact: true }).click()
          await page.getByRole('heading', { name: 'The network took a break. Your flashcards didn’t.' }).waitFor()
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
  return { origin, pagesAndViewports: checked, productionInteractions: 'pass', mobileNavigation: 'pass', resumeDownload: 'pass', browserOrPolicyErrors: issues }
}
