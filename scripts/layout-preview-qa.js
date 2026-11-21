/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  async function settle() {
    await page.locator('.showcase-viewport').evaluate(async (el) => {
      await Promise.all(
        el
          .getAnimations({ subtree: true })
          .map((a) => a.finished.catch(() => {})),
      )
    })
  }
  let layouts = 0
  for (const width of [360, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto(origin)
    await page.locator('html[data-enhanced]').waitFor()
    const layout = await page.evaluate(() => {
      const rect = (selector) =>
        document.querySelector(selector).getBoundingClientRect().toJSON()
      return {
        intro: rect('.home-introduction'),
        name: rect('#intro-title'),
        info: rect('.intro-context'),
        work: rect('.showcase'),
        overflow: document.documentElement.scrollWidth > innerWidth,
      }
    })
    assert(
      !layout.overflow && layout.info.top >= layout.name.bottom,
      'Intro order/overflow: ' + width,
    )
    assert(
      width >= 1280
        ? layout.work.left >= layout.intro.right &&
            Math.abs(layout.work.top - layout.intro.top) < 2
        : layout.work.top >= layout.intro.bottom,
      'Home grid: ' + JSON.stringify({ width, layout }),
    )
    const density = await page.evaluate(() => {
      const selector = document
        .querySelector('.showcase-selector')
        .getBoundingClientRect()
      const viewport = document
        .querySelector('.showcase-viewport')
        .getBoundingClientRect()
      return {
        gap: viewport.top - selector.bottom,
        columns: getComputedStyle(
          document.querySelector('.showcase-slide'),
        ).gridTemplateColumns.split(' ').length,
        tagCounts: [
          ...document.querySelectorAll('.showcase-copy .tag-list'),
        ].map((el) => el.children.length),
        detailBlocks: document.querySelectorAll('.showcase-detail').length,
      }
    })
    assert(
      density.gap >= 16 &&
        !density.detailBlocks &&
        density.tagCounts.every((count) => count <= 3),
      'Home density: ' + JSON.stringify({ width, density }),
    )
    if (width >= 1280)
      assert(
        density.columns === 1,
        'Nested columns remain in right-hand showcase',
      )
    if (width === 390 || width === 1440 || width === 1920)
      await page.screenshot({
        path: `output/playwright/layout-home-${width}.png`,
        fullPage: true,
      })
    layouts++
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(origin)
  const trigger = page.locator('#showcase-pcosina .project-preview-button')
  await trigger.hover()
  await page.mouse.down()
  await page.locator('.project-hold-preview').waitFor()
  await page.screenshot({ path: 'output/playwright/preview-hold.png' })
  await page.mouse.up()
  await page.locator('.project-hold-preview').waitFor({ state: 'detached' })
  assert(
    (await page.locator('dialog[open]').count()) === 0,
    'Hold opens dialog on release',
  )
  await trigger.click()
  await page.locator('.project-preview-dialog[open]').waitFor()
  await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
  const previewViolations = await page.evaluate(async () =>
    (
      await window.axe.run(
        document.querySelector('.project-preview-dialog[open]'),
      )
    ).violations.map((v) => v.id),
  )
  assert(
    !previewViolations.length,
    'Preview dialog accessibility: ' + previewViolations,
  )
  await page.keyboard.press('Escape')
  assert(
    await trigger.evaluate((el) => el === document.activeElement),
    'Preview focus return failed',
  )
  await page.keyboard.press('Enter')
  await page.locator('.project-preview-dialog[open]').waitFor()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Barion', exact: true }).click()
  await settle()
  const barion = page.locator('#showcase-barion .project-preview-button')
  await barion.hover()
  await page.mouse.down()
  await page.waitForFunction(
    () =>
      document.querySelector('.project-hold-preview video')?.currentTime > 0.1,
  )
  await page.mouse.up()
  assert(
    (await page.locator('.project-hold-preview video').count()) === 0,
    'Recording remains mounted after release',
  )
  await page.getByRole('button', { name: 'FreshKeep', exact: true }).click()
  await page.keyboard.press('ArrowRight')
  await settle()
  assert(
    (await page.locator('#showcase-pcosina').getAttribute('data-position')) ===
      'active',
    'Wrap regression',
  )
  const animation = await page.locator('#showcase-pcosina').evaluate((el) => ({
    name: getComputedStyle(el).animationName,
    duration: getComputedStyle(el).animationDuration,
  }))
  assert(
    animation.name === 'project-enter-next' && animation.duration === '0.58s',
    'Wrong flow transition',
  )
  assert(
    (await page.getByRole('link', { name: /Live demo/ }).count()) === 0,
    'Unverified live demo link',
  )

  await page.goto(origin + '/projects')
  const card = page.locator('.collection-card.pcosina')
  await card.locator('.project-preview-button').hover()
  await page.mouse.down()
  const peek = page.locator('.project-hold-preview')
  await peek.waitFor()
  assert(
    await peek.evaluate((el) => {
      const r = el.getBoundingClientRect()
      return (
        r.width > 250 &&
        r.height > 250 &&
        r.left >= 0 &&
        r.top >= 0 &&
        r.right <= innerWidth &&
        r.bottom <= innerHeight
      )
    }),
    'Collection preview outside viewport',
  )
  await page.screenshot({ path: 'output/playwright/collection-hold.png' })
  await page.mouse.up()
  await card.locator('.project-preview-button').click()
  await page.locator('.project-preview-dialog[open]').waitFor()
  await page.keyboard.press('Escape')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(origin)
  await page.getByRole('button', { name: 'Barion', exact: true }).click()
  await barion.hover()
  await page.mouse.down()
  await page.locator('.project-hold-preview video').waitFor()
  assert(
    await page
      .locator('.project-hold-preview video')
      .evaluate((el) => el.paused),
    'Reduced-motion recording autoplays',
  )
  await page.mouse.up()
  await page.emulateMedia({ reducedMotion: 'no-preference' })

  const mobile = await page
    .context()
    .browser()
    .newContext({ hasTouch: true, viewport: { width: 390, height: 844 } })
  try {
    const touchPage = await mobile.newPage()
    await touchPage.goto(origin)
    const touchButton = touchPage.locator(
      '#showcase-pcosina .project-preview-button',
    )
    await touchButton.scrollIntoViewIfNeeded()
    const box = await touchButton.boundingBox()
    const session = await mobile.newCDPSession(touchPage)
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
    })
    await touchPage.locator('.project-hold-preview').waitFor()
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    })
    await touchPage
      .locator('.project-hold-preview')
      .waitFor({ state: 'detached' })
    assert(
      (await touchPage.locator('dialog[open]').count()) === 0,
      'Touch hold opens dialog on release',
    )
    await touchButton.tap()
    await touchPage.locator('.project-preview-dialog[open]').waitFor()
    await touchPage
      .getByRole('button', { name: 'Close preview', exact: true })
      .tap()
    await session.detach()
  } finally {
    await mobile.close()
  }

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto(origin + '/skills')
    const grid = await page.locator('.skills-list').evaluate((el) => ({
      columns: getComputedStyle(el).gridTemplateColumns.split(' ').length,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }))
    assert(
      !grid.overflow && grid.columns === (width < 768 ? 1 : 2),
      'Skills grid: ' + width,
    )
    await page.screenshot({
      path: `output/playwright/layout-skills-${width}.png`,
      fullPage: true,
    })
    await page.goto(origin + '/resume')
    assert(
      (await page.locator('.resume-obscured').count()) === 1 &&
        (await page.locator('.resume-preview img').count()) === 0,
      'Readable resume preview remains',
    )
    assert(
      (await page.locator('.resume-download-cover a[download]').count()) === 1,
      'Download missing from obscured preview',
    )
    await page.screenshot({
      path: `output/playwright/layout-resume-${width}.png`,
      fullPage: true,
    })
  }

  let sent = 0
  let mode = 'error'
  let payload
  await page.route('https://formsubmit.co/**', async (route) => {
    assert(
      route.request().url().includes('/ajax/'),
      'JS submission navigated away',
    )
    sent++
    payload = route.request().postDataJSON()
    if (mode === 'offline') return route.abort('failed')
    if (mode === 'invalid')
      return route.fulfill({
        status: 502,
        contentType: 'text/html',
        body: 'Bad gateway',
      })
    if (mode === 'rate') return route.fulfill({ status: 429, body: '' })
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        mode === 'success'
          ? { success: 'true', message: 'The form was submitted successfully.' }
          : mode === 'activation'
            ? { success: 'true', message: 'Please activate your form.' }
            : { success: 'false', message: 'Service unavailable' },
      ),
    })
  })
  await page.goto(origin + '/contact')
  assert(
    (await page.locator('main form').count()) === 0,
    'Duplicate contact composer remains',
  )
  assert(
    (await page.locator('.message-form').count()) === 0,
    'Feedback mounted before first use',
  )
  await page
    .getByRole('button', { name: 'Leave a thought', exact: true })
    .click()
  const form = page.locator('.feedback-dialog .message-form')
  const draft = 'Please keep the project previews easy to find and accessible.'
  await form.getByLabel('Your message', { exact: true }).fill(draft)
  await form.getByLabel(/Your email/).fill('visitor@example.com')
  await page.keyboard.press('Escape')
  await page
    .getByRole('button', { name: 'Leave a thought', exact: true })
    .click()
  assert(
    (await form.getByLabel('Your message', { exact: true }).inputValue()) ===
      draft,
    'Closing feedback discarded draft',
  )
  assert(
    (await page.locator('.message-form').count()) === 1,
    'More than one message composer mounted',
  )
  for (const nextMode of [
    'error',
    'invalid',
    'offline',
    'rate',
    'activation',
  ]) {
    mode = nextMode
    await form
      .getByRole('button', { name: 'Send message', exact: true })
      .click()
    await form.getByRole('alert').filter({ hasText: /./ }).waitFor()
    assert(
      (await form.getByLabel('Your message', { exact: true }).inputValue()) ===
        draft,
      'Error lost the draft: ' + mode,
    )
    assert(
      (await page
        .getByRole('heading', { name: 'Thanks for the thought.' })
        .count()) === 0,
      'False success: ' + mode,
    )
  }
  mode = 'success'
  await form.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.getByRole('heading', { name: 'Thanks for the thought.' }).waitFor()
  assert(
    payload.message === draft &&
      payload.email === 'visitor@example.com' &&
      payload._replyto === payload.email,
    'Feedback payload changed',
  )
  assert(page.url() === origin + '/contact', 'Feedback left the site')
  await page.getByRole('button', { name: /Send another message/ }).click()
  assert(
    (await form.getByLabel('Your message', { exact: true }).inputValue()) ===
      '',
    'Send another does not reset',
  )
  await page.keyboard.press('Escape')
  await page
    .getByRole('button', { name: 'Leave a thought', exact: true })
    .click()
  const modal = page.locator('.feedback-dialog')
  await modal.getByLabel('Your message', { exact: true }).fill(draft)
  await modal.getByRole('button', { name: 'Send message', exact: true }).click()
  await modal
    .getByRole('heading', { name: 'Thanks for the thought.' })
    .waitFor()
  assert(
    !payload.email && !payload._replyto,
    'Optional reply address not optional',
  )
  await page.keyboard.press('Escape')
  assert(!errors.length, errors.join('\n'))
  return {
    layouts,
    holdKeyboardAndTouchPreview: 'pass',
    recordingAndReducedMotion: 'pass',
    skillsAndObscuredResume: 'pass',
    feedbackSuccessAndFiveFailureModes: 'pass',
    singleLazyComposer: 'pass',
    mockedSubmissions: sent,
    realEmailsSent: 0,
    errors,
  }
}
