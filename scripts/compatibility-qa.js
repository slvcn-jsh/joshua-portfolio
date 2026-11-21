/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const routes = [
    '/',
    '/projects',
    '/skills',
    '/about',
    '/achievements',
    '/certifications',
    '/resume',
    '/contact',
    ...[
      'pcosina',
      'barion',
      'focusloop',
      'resolveops',
      'procura',
      'freshkeep',
    ].map((slug) => '/projects/' + slug),
  ]
  const errors = []
  let routeStates = 0
  let interactions = 0
  for (const width of [390, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await page
        .context()
        .browser()
        .newContext({
          viewport: { width, height: 900 },
          reducedMotion: 'reduce',
        })
      try {
        await context.addInitScript(
          (mode) => localStorage.setItem('portfolio-theme', mode),
          theme,
        )
        const p = await context.newPage()
        p.on('pageerror', (error) => errors.push(error.message))
        p.on('console', (message) => {
          if (message.type() === 'error') errors.push(message.text())
        })
        for (const route of routes) {
          await p.goto(origin + route)
          await p.locator('html[data-enhanced]').waitFor()
          assert(
            (await p.locator('h1').count()) === 1,
            route + ': heading count',
          )
          assert(
            await p.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            route + ': horizontal overflow',
          )
          assert(
            (await p.locator('html').getAttribute('data-theme')) === theme,
            route + ': incorrect theme',
          )
          routeStates++
        }
        await p.goto(origin)
        await p.locator('html[data-enhanced]').waitFor()
        const selectors = p.locator('.showcase-selector button')
        await selectors.last().click()
        await selectors.last().press('ArrowRight')
        assert(
          (await selectors.first().getAttribute('aria-pressed')) === 'true',
          'Carousel wrap failed',
        )
        assert(
          (await p.locator('.showcase').getAttribute('data-rotating')) ===
            'false',
          'Reduced motion autoplay',
        )
        await p.locator('#showcase-pcosina .project-preview-button').click()
        await p.locator('.project-preview-dialog[open]').waitFor()
        await p.keyboard.press('Escape')
        assert(
          (await p.locator('.project-preview-dialog[open]').count()) === 0,
          'Preview escape failed',
        )
        const launcher = p.getByRole('button', {
          name: 'Leave a thought',
          exact: true,
        })
        assert((await launcher.count()) === 1, 'Duplicate launcher')
        if (width >= 1024)
          assert(
            (await p
              .locator('.sidebar-feedback-slot .feedback-trigger')
              .count()) === 1,
            'Feedback not docked',
          )
        await launcher.click()
        const message = p.getByRole('textbox', {
          name: 'Your message',
          exact: true,
        })
        await message.fill('Cross-browser test message, intercepted locally.')
        assert(
          (await p
            .getByRole('button', { name: 'Copy message', exact: true })
            .count()) === 0,
          'Copy message returned',
        )
        await p.keyboard.press('Escape')
        await launcher.click()
        assert(
          (await message.inputValue()).includes('intercepted locally'),
          'Draft lost',
        )
        await p.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
        const violations = await p.evaluate(async () =>
          (
            await window.axe.run(
              document.querySelector('.feedback-dialog[open]'),
              {
                runOnly: {
                  type: 'tag',
                  values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
                },
              },
            )
          ).violations.map((v) => v.id),
        )
        assert(!violations.length, 'Feedback accessibility: ' + violations)
        await p.route('https://formsubmit.co/ajax/**', (route) =>
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: 'true', message: 'Success' }),
          }),
        )
        await p
          .getByRole('button', { name: 'Send message', exact: true })
          .click()
        await p
          .getByRole('heading', {
            name: 'Thanks for the thought.',
            exact: true,
          })
          .waitFor()
        await p.keyboard.press('Escape')
        assert(
          await launcher.evaluate((el) => el === document.activeElement),
          'Feedback return focus',
        )
        await p.goto(origin + '/projects/pcosina')
        await p.locator('html[data-enhanced]').waitFor()
        const media = await p.locator('.case-opening-media').boundingBox()
        const ownership = await p.locator('.project-brief').boundingBox()
        assert(
          media.y < ownership.y && media.y < 550,
          'First case evidence is buried',
        )
        await p.screenshot({
          path: `output/playwright/compatibility-${context.browser().browserType().name()}-${theme}-${width}.png`,
          animations: 'disabled',
        })
        interactions++
      } finally {
        await context.close()
      }
    }
  }
  assert(!errors.length, 'Browser errors: ' + errors.join('; '))
  return {
    routeStates,
    interactionStates: interactions,
    accessibility: 'feedback in both themes and widths',
    realMailSent: false,
  }
}
