/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const names = [
    'PCOSina',
    'Barion',
    'FocusLoop',
    'ResolveOps',
    'Procura',
    'FreshKeep',
  ]
  const slugs = [
    'pcosina',
    'barion',
    'focusloop',
    'resolveops',
    'procura',
    'freshkeep',
  ]
  const routes = [
    '/',
    '/projects',
    ...slugs.map((s) => '/projects/' + s),
    '/skills',
    '/about',
    '/achievements',
    '/certifications',
    '/resume',
    '/contact',
    '/not-a-page',
  ]
  const widths = [360, 390, 768, 1024, 1440]
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (msg) => {
    if (msg.type() === 'error' && /hydration|React error/i.test(msg.text()))
      errors.push(msg.text())
  })
  async function settled() {
    await page.locator('.showcase-viewport').evaluate(async (el) => {
      await Promise.all(
        el
          .getAnimations({ subtree: true })
          .map((a) => a.finished.catch(() => {})),
      )
    })
  }
  async function accessible(label) {
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
    const violations = await page.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
          },
        })
      ).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    )
    if (violations.length)
      throw new Error(label + ': ' + JSON.stringify(violations))
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw new Error(label + ': horizontal overflow')
  }
  await page.emulateMedia({ colorScheme: 'dark' })
  let darkPages = 0
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(origin + route)
      await page.locator('html[data-enhanced][data-theme="dark"]').waitFor()
      await accessible('dark ' + width + route)
      darkPages++
    }
  }
  let slides = 0
  let dialogs = 0
  for (const theme of ['light', 'dark']) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(origin)
      await page.evaluate(
        (detail) =>
          window.dispatchEvent(
            new CustomEvent('portfolio-theme-change', { detail }),
          ),
        theme,
      )
      for (let i = 0; i < names.length; i++) {
        const control = page.getByRole('button', {
          name: names[i],
          exact: true,
        })
        await control.focus()
        await page.keyboard.press('Enter')
        await settled()
        const active = page.locator('.showcase-slide[data-position="active"]')
        if ((await active.getAttribute('id')) !== 'showcase-' + slugs[i])
          throw new Error('Wrong slide')
        if ((await page.locator('.showcase-slide[inert]').count()) !== 5)
          throw new Error('Inactive slides remain interactive')
        if (!(await control.evaluate((el) => el === document.activeElement)))
          throw new Error('Selector focus lost')
        const view = await page.locator('.showcase-viewport').boundingBox()
        const box = await active.boundingBox()
        if (Math.abs(view.x - box.x) > 2 || box.width > view.width)
          throw new Error('Slide alignment')
        await active
          .locator('.showcase-capture img')
          .evaluate((img) => img.decode())
        await accessible(theme + ' slide ' + slugs[i] + width)
        if (width === 390 || width === 1440) {
          await page.locator('.showcase').screenshot({
            path: `output/playwright/showcase-${theme}-${slugs[i]}-${width}.png`,
          })
          const trigger = active.locator('.showcase-capture')
          await trigger.focus()
          await page.keyboard.press('Enter')
          await page.locator('dialog[open] img').evaluate((img) => img.decode())
          await accessible(theme + ' image dialog ' + slugs[i])
          await page.keyboard.press('Escape')
          if (!(await trigger.evaluate((el) => el === document.activeElement)))
            throw new Error('Showcase image focus return')
          dialogs++
        }
        slides++
      }
      await page.getByRole('button', { name: 'FreshKeep', exact: true }).focus()
      await page.keyboard.press('Home')
      if (
        (await page
          .getByRole('button', { name: 'PCOSina', exact: true })
          .getAttribute('aria-pressed')) !== 'true'
      )
        throw new Error('Home key')
      await page.keyboard.press('ArrowRight')
      if (
        (await page
          .getByRole('button', { name: 'Barion', exact: true })
          .getAttribute('aria-pressed')) !== 'true'
      )
        throw new Error('Arrow key')
      await page.keyboard.press('End')
      await page.keyboard.press('ArrowRight')
      if (
        (await page
          .locator('.showcase-slide[data-position="active"]')
          .getAttribute('id')) !== 'showcase-pcosina'
      )
        throw new Error('Forward loop boundary')
      await page.keyboard.press('ArrowLeft')
      if (
        (await page
          .locator('.showcase-slide[data-position="active"]')
          .getAttribute('id')) !== 'showcase-freshkeep'
      )
        throw new Error('Reverse loop boundary')
      if (width === 390 || width === 1440) {
        await page.getByRole('button', { name: 'PCOSina', exact: true }).click()
        await settled()
        await page.screenshot({
          path: `output/playwright/home-${theme}-${width}.png`,
          fullPage: true,
        })
      }
    }
  }
  // Fast repeated selection must settle on the last choice without a queued animation.
  await page.getByRole('button', { name: 'Barion', exact: true }).click()
  await page.getByRole('button', { name: 'Procura', exact: true }).click()
  await page.getByRole('button', { name: 'FocusLoop', exact: true }).click()
  await settled()
  if (
    (await page
      .locator('.showcase-slide[data-position="active"]')
      .getAttribute('id')) !== 'showcase-focusloop'
  )
    throw new Error('Rapid selection race')
  // Pointer gesture over the image itself must navigate, not open the image.
  const capture = page.locator('#showcase-focusloop .showcase-capture')
  await capture.dispatchEvent('pointerdown', {
    pointerType: 'touch',
    clientX: 250,
    clientY: 200,
  })
  await capture.dispatchEvent('pointerup', {
    pointerType: 'touch',
    clientX: 100,
    clientY: 205,
  })
  await capture.dispatchEvent('click')
  if (await page.locator('dialog[open]').count())
    throw new Error('Swipe opened image')
  if (
    (await page
      .locator('.showcase-slide[data-position="active"]')
      .getAttribute('id')) !== 'showcase-resolveops'
  )
    throw new Error('Swipe navigation')
  const viewport = page.locator('.showcase-viewport')
  await viewport.dispatchEvent('pointerdown', {
    pointerType: 'touch',
    clientX: 200,
    clientY: 200,
  })
  await viewport.dispatchEvent('pointerup', {
    pointerType: 'touch',
    clientX: 210,
    clientY: 350,
  })
  if (
    (await page
      .locator('.showcase-slide[data-position="active"]')
      .getAttribute('id')) !== 'showcase-resolveops'
  )
    throw new Error('Vertical scroll changed project')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('button', { name: 'FreshKeep', exact: true }).click()
  if (
    (await page
      .locator('.showcase-slide')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration)) !== '0s'
  )
    throw new Error('Reduced motion ignored')
  await page.evaluate(() =>
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-change', { detail: 'light' }),
    ),
  )
  await page.goto(origin + '/skills')
  if ((await page.locator('html').getAttribute('data-theme')) !== 'light')
    throw new Error('Theme not persisted across pages')
  const second = await page.context().newPage()
  await second.goto(origin + '/about')
  await page.evaluate(() =>
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-change', { detail: 'dark' }),
    ),
  )
  await second.locator('html[data-theme="dark"]').waitFor()
  await second.close()
  await page.evaluate(() =>
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-change', { detail: 'system' }),
    ),
  )
  await page.emulateMedia({ colorScheme: 'light' })
  await page.locator('html[data-theme="light"]').waitFor()
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.locator('html[data-theme="dark"]').waitFor()
  // Existing dark dialogs and interactive case states must remain readable too.
  for (const [route, selector] of [
    ['/certifications', '.certificate-image-link'],
    ['/achievements', '.event-image-link'],
    ['/projects/pcosina', '.capture-link'],
    ['/projects/procura', '.gallery-capture'],
  ]) {
    await page.goto(origin + route)
    await page.locator(selector).first().click()
    await accessible('dark existing dialog ' + route)
    await page.keyboard.press('Escape')
  }
  for (const slug of ['pcosina', 'barion']) {
    await page.goto(origin + '/projects/' + slug + '#walkthrough')
    await page
      .getByRole('button', {
        name: slug === 'pcosina' ? 'Connection lost' : 'AI service unavailable',
        exact: true,
      })
      .click()
    await accessible('dark interrupted scenario ' + slug)
  }
  // Browser-level touch input exercises actual gesture dispatch, beyond handler events.
  const touchContext = await page
    .context()
    .browser()
    .newContext({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
    })
  try {
    const p = await touchContext.newPage()
    await p.goto(origin)
    await p
      .locator('#showcase-pcosina .showcase-capture')
      .scrollIntoViewIfNeeded()
    const box = await p
      .locator('#showcase-pcosina .showcase-capture')
      .boundingBox()
    const cdp = await touchContext.newCDPSession(p)
    const x = box.x + box.width * 0.8
    const y = box.y + box.height * 0.5
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x, y }],
    })
    for (let step = 1; step <= 8; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x - step * 12, y }],
      })
    }
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    })
    await p.locator('#showcase-barion[data-position="active"]').waitFor()
    if (await p.locator('dialog[open]').count())
      throw new Error('Native touch swipe opened dialog')
  } finally {
    await touchContext.close()
  }
  const blocked = await page
    .context()
    .browser()
    .newContext({ colorScheme: 'dark' })
  try {
    await blocked.addInitScript(() => {
      Object.defineProperty(Storage.prototype, 'getItem', {
        value() {
          throw new Error('Blocked')
        },
      })
      Object.defineProperty(Storage.prototype, 'setItem', {
        value() {
          throw new Error('Blocked')
        },
      })
    })
    const p = await blocked.newPage()
    await p.goto(origin)
    await p.locator('html[data-theme="dark"]').waitFor()
    await p.evaluate(() =>
      window.dispatchEvent(
        new CustomEvent('portfolio-theme-change', { detail: 'light' }),
      ),
    )
    await p.locator('html[data-theme="light"]').waitFor()
  } finally {
    await blocked.close()
  }
  const beforeHydration = await page
    .context()
    .browser()
    .newContext({ colorScheme: 'dark' })
  try {
    const p = await beforeHydration.newPage()
    await p.route('**/assets/*.js', (route) => route.abort())
    await p.goto(origin)
    if ((await p.locator('html').getAttribute('data-theme')) !== 'dark')
      throw new Error('Theme depends on hydration')
    if (
      (await p
        .locator('body')
        .evaluate((el) => getComputedStyle(el).backgroundColor)) !==
      'rgb(20, 23, 28)'
    )
      throw new Error('Pre-hydration background flash')
  } finally {
    await beforeHydration.close()
  }
  const plain = await page
    .context()
    .browser()
    .newContext({
      javaScriptEnabled: false,
      colorScheme: 'dark',
      viewport: { width: 390, height: 844 },
    })
  try {
    const p = await plain.newPage()
    await p.goto(origin)
    for (const name of names)
      if (!(await p.getByRole('heading', { name, exact: true }).isVisible()))
        throw new Error('No-JS project missing')
    if (
      (await p.locator('.theme-control').first().isVisible()) ||
      (await p.locator('.showcase-selector').isVisible())
    )
      throw new Error('Inactive controls visible without JS')
    if (
      (await p
        .locator('body')
        .evaluate((el) => getComputedStyle(el).backgroundColor)) !==
      'rgb(20, 23, 28)'
    )
      throw new Error('No-JS system theme')
  } finally {
    await plain.close()
  }
  if (errors.length) throw new Error(JSON.stringify(errors))
  return {
    darkPages,
    showcaseStates: slides,
    showcaseDialogs: dialogs,
    themePersistence: 'pass',
    crossTab: 'pass',
    systemUpdates: 'pass',
    noStorage: 'pass',
    preHydrationTheme: 'pass',
    noJavaScript: 'pass',
    rapidSelection: 'pass',
    swipe: 'pass',
    browserTouchGesture: 'pass',
    reducedMotion: 'pass',
    errors,
  }
}
