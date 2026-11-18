/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const slugs = ['focusloop', 'resolveops', 'procura', 'freshkeep']
  const results = []
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(origin + '/projects')
    await page.locator('html[data-enhanced]').waitFor()
    if ((await page.locator('.collection-card').count()) !== 6)
      throw new Error('Expected six initial cards')
    for (const [name, count] of [
      ['Android 3', 3],
      ['Cross-platform 1', 1],
      ['Web 2', 2],
      ['All 6', 6],
    ]) {
      const control = page.getByRole('button', { name, exact: true })
      await control.focus()
      await page.keyboard.press('Enter')
      if (
        (await control.getAttribute('aria-pressed')) !== 'true' ||
        (await page.locator('.collection-card').count()) !== count
      )
        throw new Error('Filter mismatch: ' + name)
      if (!(await control.evaluate((el) => el === document.activeElement)))
        throw new Error('Filter lost keyboard focus')
      if (
        !(await page
          .getByRole('status')
          .textContent()
          .then((text) => text.includes(`${count} of 6`)))
      )
        throw new Error('Filter announcement missing')
    }
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
    const collectionViolations = await page.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
          },
        })
      ).violations.map((v) => v.id),
    )
    if (collectionViolations.length)
      throw new Error('Collection a11y: ' + collectionViolations)
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `output/playwright/collection-${width}.png`,
        fullPage: true,
      })
    for (const slug of slugs) {
      await page.goto(origin + '/projects/' + slug)
      await page.locator('html[data-enhanced]').waitFor()
      if ((await page.locator('.system-sequence .system-node').count()) !== 3)
        throw new Error('Architecture missing for ' + slug)
      if (
        await page
          .locator('a[href*="github.com/slvcn-jsh/' + slug + '" i]')
          .count()
      )
        throw new Error('Private source link leaked')
      if ((await page.locator('.private-source-note').count()) !== 1)
        throw new Error('Private-source disclosure missing')
      const captures = page.locator('.gallery-capture')
      for (let i = 0; i < (await captures.count()); i++) {
        await captures.nth(i).focus()
        await page.keyboard.press('Enter')
        await page.locator('dialog[open] img').evaluate((img) => img.decode())
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })
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
          throw new Error(slug + ' dialog a11y: ' + violations)
        await page.keyboard.press('Tab')
        if (
          !(await page
            .locator('dialog[open]')
            .evaluate((dialog) => dialog.contains(document.activeElement)))
        )
          throw new Error('Dialog focus escaped')
        await page.keyboard.press('Escape')
        if (
          !(await captures
            .nth(i)
            .evaluate((el) => el === document.activeElement))
        )
          throw new Error('Dialog focus did not return')
      }
      if (width === 390 || width === 1440) {
        await page.screenshot({
          path: `output/playwright/expanded-${slug}-${width}.png`,
          fullPage: true,
        })
        await page.locator('.case-hero').screenshot({
          path: `output/playwright/expanded-brief-${slug}-${width}.png`,
        })
      }
      if (width === 390 || width === 1440)
        await page.locator('.project-gallery').screenshot({
          path: `output/playwright/expanded-gallery-${slug}-${width}.png`,
        })
      results.push({
        slug,
        width,
        images: await captures.count(),
        architecture: 'pass',
        keyboardDialog: 'pass',
      })
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(origin + '/projects')
  await page.getByRole('button', { name: 'Web 2', exact: true }).click()
  const motion = await page
    .locator('.collection-card')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName)
  if (motion !== 'none') throw new Error('Reduced-motion preference ignored')
  await page.goto(origin)
  for (const name of [
    'PCOSina',
    'Barion',
    'FocusLoop',
    'ResolveOps',
    'Procura',
    'FreshKeep',
  ]) {
    if (
      (await page
        .getByRole('heading', { name, exact: true, includeHidden: true })
        .count()) !== 1
    )
      throw new Error('Homepage duplication or omission: ' + name)
  }
  if (errors.length) throw new Error(JSON.stringify(errors))
  return {
    caseStudyViewports: results.length,
    filterKeyboardChecks: 20,
    galleryDialogChecks: 35,
    reducedMotion: 'pass',
    homepageSixUniqueProjects: 'pass',
    results,
  }
}
