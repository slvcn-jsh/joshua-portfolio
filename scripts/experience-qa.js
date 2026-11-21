/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const active = () =>
    page.locator('.showcase-slide[data-position="active"]').getAttribute('id')
  async function settled() {
    await page.locator('.showcase-viewport').evaluate(async (el) => {
      await Promise.all(
        el
          .getAnimations({ subtree: true })
          .map((a) => a.finished.catch(() => {})),
      )
    })
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(origin)
  await page.locator('.showcase[data-rotating="true"]').waitFor()
  assert(
    (await page
      .getByRole('button', { name: /^(Previous|Next) project$/ })
      .count()) === 0,
    'Arrow buttons remain',
  )
  await page.waitForTimeout(8200)
  assert((await active()) === 'showcase-barion', 'Automatic advance failed')
  await page.getByRole('button', { name: 'FreshKeep', exact: true }).click()
  await page.mouse.move(0, 0)
  await page.waitForTimeout(8200)
  assert(
    (await active()) === 'showcase-freshkeep',
    'Selected project did not stay paused',
  )
  await page.keyboard.press('ArrowRight')
  await settled()
  assert(
    (await active()) === 'showcase-pcosina',
    'Six-to-one keyboard loop failed',
  )
  assert(
    (await page.locator('.showcase').getAttribute('data-direction')) === 'next',
    'Forward loop moves backwards',
  )
  await page.keyboard.press('ArrowLeft')
  await settled()
  assert(
    (await active()) === 'showcase-freshkeep',
    'One-to-six keyboard loop failed',
  )
  await page.getByRole('button', { name: 'Resume project rotation' }).click()
  await page.mouse.move(0, 0)
  await page.locator('.showcase[data-rotating="true"]').waitFor()
  await page.waitForTimeout(8200)
  assert(
    (await active()) === 'showcase-pcosina',
    'Automatic six-to-one loop failed',
  )
  await page.locator('.showcase-heading').hover()
  await page.locator('.showcase[data-rotating="false"]').waitFor()
  await page.waitForTimeout(8200)
  assert(
    (await active()) === 'showcase-pcosina',
    'Reading hover did not pause rotation',
  )

  await page.goto(origin + '/projects/procura')
  assert(
    (await page
      .locator('.portfolio-sidebar a[aria-current="page"]')
      .getAttribute('href')) === '/projects',
    'Nested project route is not active',
  )
  await page
    .getByRole('button', { name: 'Collapse sidebar', exact: true })
    .click()
  await page.waitForFunction(
    () =>
      document.querySelector('.portfolio-sidebar').getBoundingClientRect()
        .width === 80,
  )
  const fixedBefore = await page.locator('.portfolio-sidebar').boundingBox()
  await page.evaluate(() => scrollTo({ top: 600, behavior: 'instant' }))
  assert(
    (await page.locator('.portfolio-sidebar').boundingBox()).y ===
      fixedBefore.y,
    'Sidebar moves with content',
  )
  await page.goto(origin + '/about')
  assert(
    (await page.locator('html').getAttribute('data-sidebar')) === 'collapsed',
    'Collapsed preference not persisted',
  )
  await page.getByRole('heading', { name: 'About me', exact: true }).waitFor()
  await page.locator('.education-panel img').evaluate((img) => img.decode())
  await page
    .getByRole('button', { name: 'Expand sidebar', exact: true })
    .click()
  await page.waitForFunction(
    () =>
      document.querySelector('.portfolio-sidebar').getBoundingClientRect()
        .width === 240,
  )

  let responsiveStates = 0
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const theme of ['dark', 'light']) {
      await page.goto(origin)
      if (width < 1024) await page.locator('.mobile-nav summary').click()
      if ((await page.locator('html').getAttribute('data-theme')) !== theme) {
        await page
          .getByRole('button', {
            name:
              theme === 'dark'
                ? /Switch to night theme$/
                : /Switch to day theme$/,
          })
          .click()
        await page.locator(`html[data-theme="${theme}"]`).waitFor()
        await page.waitForFunction(
          () => !document.documentElement.hasAttribute('data-theme-transition'),
        )
      }
      assert(
        (await page.getByRole('combobox').count()) === 0,
        'Theme dropdown remains',
      )
      if (width < 1024) {
        assert(
          (await page.locator('.site-content').getAttribute('inert')) !== null,
          'Background is interactive under drawer',
        )
        await page
          .getByRole('button', { name: 'Use system theme', exact: true })
          .focus()
        await page.keyboard.press('Tab')
        assert(
          await page
            .locator('.mobile-nav summary')
            .evaluate((el) => el === document.activeElement),
          'Drawer does not contain keyboard focus',
        )
        await page.keyboard.press('Escape')
        assert(
          !(await page.locator('.mobile-nav').evaluate((el) => el.open)),
          'Drawer Escape failed',
        )
      }
      const geometry = await page.evaluate(() => {
        const content = document
          .querySelector('main > .container')
          .getBoundingClientRect()
        const sidebar = document
          .querySelector('.portfolio-sidebar')
          .getBoundingClientRect()
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          overlap: innerWidth >= 1024 && content.left < sidebar.right,
        }
      })
      assert(
        !geometry.overflow && !geometry.overlap,
        `Layout conflict at ${width}/${theme}: ${JSON.stringify(geometry)}`,
      )
      await page
        .getByRole('button', { name: 'Leave a thought', exact: true })
        .click()
      await page
        .getByRole('button', { name: 'Something to fix', exact: true })
        .click()
      await page
        .getByLabel('Your message')
        .fill('Suggestion: make the project evidence easier to discover.')
      await page.locator('.feedback-dialog').evaluate(async (element) => {
        await Promise.all(
          element
            .getAnimations({ subtree: true })
            .map((animation) => animation.finished.catch(() => {})),
        )
      })
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
      const violations = await page.evaluate(async () =>
        (
          await window.axe.run(document.querySelector('.feedback-dialog'))
        ).violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      )
      assert(
        !violations.length,
        `Feedback accessibility ${width}/${theme}: ${JSON.stringify(violations)}`,
      )
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: `output/playwright/feedback-${theme}-${width}.png`,
          animations: 'disabled',
        })
      await page.keyboard.press('Escape')
      assert(
        await page
          .locator('.feedback-trigger')
          .evaluate((el) => el === document.activeElement),
        'Feedback focus not restored',
      )
      assert(
        (await page.locator('body').evaluate((el) => el.style.overflow)) !==
          'hidden',
        'Feedback leaves scroll locked',
      )
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: `output/playwright/experience-${theme}-${width}.png`,
          fullPage: true,
          animations: 'disabled',
        })
      responsiveStates++
    }
  }
  await page
    .getByRole('button', { name: 'Leave a thought', exact: true })
    .click()
  assert(
    (
      await page
        .getByRole('textbox', { name: 'Your message', exact: true })
        .inputValue()
    ).includes('Suggestion: make the project evidence easier to discover.'),
    'Feedback lost its in-memory draft',
  )
  assert(
    (await page
      .getByRole('button', { name: 'Copy message', exact: true })
      .count()) === 0,
    'Unnecessary copy action returned',
  )
  await page.keyboard.press('Escape')
  await page
    .getByRole('button', { name: 'Use system theme', exact: true })
    .click()
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.locator('html[data-theme="dark"]').waitFor()
  await page.emulateMedia({ colorScheme: 'light' })
  await page.locator('html[data-theme="light"]').waitFor()

  const reduced = await page
    .context()
    .browser()
    .newContext({
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
    })
  try {
    const p = await reduced.newPage()
    await p.goto(origin + '/about#education')
    await p.waitForFunction(() => {
      const panel = document.querySelector('#education').getBoundingClientRect()
      return panel.top >= 72 && panel.top < innerHeight
    })
    await p.goto(origin)
    await p.locator('html[data-enhanced]').waitFor()
    assert(
      (await p.locator('.showcase').getAttribute('data-rotating')) === 'false',
      'Reduced motion starts autoplay',
    )
    assert(
      (await p.locator('[data-rotation-control]').count()) === 0,
      'Reduced motion exposes autoplay',
    )
    await p.getByRole('button', { name: 'Barion', exact: true }).click()
    assert(
      (await p.locator('#showcase-barion').getAttribute('data-position')) ===
        'active',
      'Reduced-motion selection failed',
    )
    assert(
      (await p
        .locator('#showcase-barion')
        .evaluate((el) => getComputedStyle(el).animationName)) === 'none',
      'Reduced motion animates slides',
    )
  } finally {
    await reduced.close()
  }
  assert(!errors.length, errors.join('\n'))
  return {
    autoplay: 'pass',
    manualSelectionStops: 'pass',
    keyboardAndAutomaticWrap: 'pass',
    readingPause: 'pass',
    sidebarPersistenceAndFixedPosition: 'pass',
    realThemeControls: 'pass',
    responsiveStates,
    feedbackDialogAndDraftRetention: 'pass',
    reducedMotion: 'pass',
    errors,
  }
}
