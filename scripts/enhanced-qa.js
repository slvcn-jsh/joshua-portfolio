/* eslint-disable @typescript-eslint/no-unused-expressions */
// Run with the existing local preview: npx playwright-cli run-code --filename=scripts/enhanced-qa.js
async (page) => {
  const widths = [360, 390, 768, 1024, 1440]
  const errors = []
  const results = []
  let accessibilityChecks = 0
  page.on('pageerror', (error) => errors.push(error.message))
  const check = async (label) => {
    const state = await page.evaluate(async () => {
      const scan = await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      })
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        violations: scan.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      }
    })
    accessibilityChecks++
    if (state.overflow || state.violations.length)
      throw new Error(JSON.stringify({ label, ...state }))
  }
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
    for (const slug of ['pcosina', 'barion']) {
      await page.goto(`http://127.0.0.1:4173/projects/${slug}`)
      await page.locator('html[data-enhanced]').waitFor()
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
      await page.locator('.scenario-disclosure > summary').click()
      const failure =
        slug === 'pcosina' ? 'Connection lost' : 'AI service unavailable'
      const normal = slug === 'pcosina' ? 'Connected' : 'Service configured'
      const failureControl = page.getByRole('button', {
        name: failure,
        exact: true,
      })
      await failureControl.focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(
        (text) =>
          [...document.querySelectorAll('button')].some(
            (el) =>
              el.textContent === text &&
              el.getAttribute('aria-pressed') === 'true',
          ),
        failure,
      )
      if (
        !(await page.locator('.scenario-result').textContent()).includes(
          slug === 'pcosina' ? 'The connection stops.' : 'Keep studying.',
        )
      )
        throw new Error('Incorrect failure explanation')
      if (
        (await page
          .getByText('Illustrative walkthrough', { exact: true })
          .count()) !== 1
      )
        throw new Error('Missing simulation label')
      await check(`${width}/${slug}/failure`)
      if ([390, 1440].includes(width))
        await page
          .locator('.scenario-panel')
          .screenshot({
            path: `output/playwright/${slug}-scenario-${width}.png`,
          })
      await page.getByRole('button', { name: normal, exact: true }).click()
      if (
        (await page
          .getByRole('button', { name: normal, exact: true })
          .getAttribute('aria-pressed')) !== 'true'
      )
        throw new Error('Scenario reset failed')

      const names = [
        '01 What the user does',
        '02 What the system handles',
        '03 Why the decision matters',
      ]
      for (const name of names) {
        const control = page.getByRole('button', { name, exact: true })
        await control.focus()
        await page.keyboard.press('Space')
        await page.waitForFunction(
          (label) =>
            [...document.querySelectorAll('.annotation-controls button')].some(
              (el) =>
                el.getAttribute('aria-pressed') === 'true' &&
                label.startsWith(el.querySelector('span').textContent),
            ),
          name,
        )
        if ((await control.getAttribute('aria-pressed')) !== 'true')
          throw new Error('Annotation selection failed')
      }
      await check(`${width}/${slug}/annotation`)
      if (slug === 'barion') {
        await page.locator('.recording-disclosure > summary').click()
        await check(`${width}/${slug}/recording`)
        await page.locator('.recording-disclosure > summary').click()
      }
      if ([390, 1440].includes(width))
        await page
          .locator('.product-explorer')
          .screenshot({
            path: `output/playwright/${slug}-annotations-${width}.png`,
          })
      const trigger = page.locator('.capture-link')
      await trigger.focus()
      await page.keyboard.press('Enter')
      await page.getByRole('dialog').waitFor()
      await check(`${width}/${slug}/dialog`)
      await page.keyboard.press('Tab')
      if (
        !(await page
          .locator('dialog[open]')
          .evaluate((el) => el.contains(document.activeElement)))
      )
        throw new Error('Modal focus escaped')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Shift+Tab')
      if (
        !(await page
          .locator('dialog[open]')
          .evaluate((el) => el.contains(document.activeElement)))
      )
        throw new Error('Modal focus wrap failed')
      await page.keyboard.press('Escape')
      await page.locator('dialog[open]').waitFor({ state: 'detached' })
      if (!(await trigger.evaluate((el) => el === document.activeElement)))
        throw new Error('Modal focus not restored')
      await trigger.click()
      await page
        .getByRole('button', { name: 'Close image', exact: true })
        .click()
      await page.locator('dialog[open]').waitFor({ state: 'detached' })
      if (
        (await page.evaluate(() => document.body.style.overflow)) === 'hidden'
      )
        throw new Error('Body scroll remained locked')
      await page.locator('.additional-captures summary').click()
      if (
        !(
          (await page.locator('.additional-captures').getAttribute('open')) ===
          ''
        )
      )
        throw new Error('Additional images failed to open')
      const extraImage = page.locator('.additional-captures img')
      await extraImage.scrollIntoViewIfNeeded()
      await extraImage.evaluate((image) => image.decode())

      if (width < 1024) await page.locator('.case-contents-mobile > summary').click()
      await page
        .getByRole('navigation', { name: 'Case study contents' })
        .getByRole('link', { name: '04 Engineering decisions' })
        .click()
      await page.waitForFunction(
        () =>
          document
            .querySelector('.case-aside a[href="#engineering"]')
            ?.getAttribute('aria-current') === 'location',
      )
      if (
        !(await page
          .getByRole('heading', {
            name: 'Engineering decisions',
            exact: true,
          })
          .evaluate((el) => el === document.activeElement))
      )
        throw new Error('Contents did not move keyboard focus')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      if (
        (await page
          .locator('.scenario-path')
          .first()
          .evaluate((el) => getComputedStyle(el).transitionDuration)) !== '0s'
      )
        throw new Error('Reduced motion failed')
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      const next = await page.locator('.next-project').getAttribute('href')
      if (next !== `/projects/${slug === 'pcosina' ? 'barion' : 'focusloop'}`)
        throw new Error('Project navigation failed')
      results.push({ width, slug, result: 'pass' })
    }
  }
  if (errors.length) throw new Error(JSON.stringify(errors))
  return {
    cases: results.length,
    accessibilityChecks,
    browserErrors: errors,
    results,
  }
}
