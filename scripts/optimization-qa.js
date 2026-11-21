/* eslint-disable @typescript-eslint/no-unused-expressions */
;async (page) => {
  const origin = 'http://127.0.0.1:4173'
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const contexts = []
  const measurements = {}
  try {
    for (const path of ['/contact', '/']) {
      const context = await page
        .context()
        .browser()
        .newContext({
          viewport: { width: 1366, height: 768 },
          reducedMotion: 'reduce',
        })
      contexts.push(context)
      const p = await context.newPage()
      await p.goto(origin + path)
      await p.locator('html[data-enhanced]').waitFor()
      const assets = await p.evaluate(() =>
        performance
          .getEntriesByType('resource')
          .filter((r) => r.name.endsWith('.js'))
          .map((r) => ({ url: r.name, decoded: r.decodedBodySize })),
      )
      assert(
        !assets.some((a) => /\/assets\/(CaseStudy|projects)-/.test(a.url)),
        path + ': full cases loaded unnecessarily',
      )
      if (path === '/contact')
        assert(
          !assets.some((a) =>
            /\/assets\/(Home|project-index|ProjectPreview)-/.test(a.url),
          ),
          'Contact downloads project UI/data',
        )
      measurements[path] = {
        decodedJavaScript: assets.reduce((sum, a) => sum + a.decoded, 0),
        chunks: assets.length,
      }
      assert(
        measurements[path].decodedJavaScript < 325000,
        path + ': initial JavaScript budget exceeded',
      )
      if (path === '/') {
        await p
          .getByText('Seeking a software engineering internship.', {
            exact: true,
          })
          .waitFor()
        const logo = p.locator('.education-mini-mark img')
        assert(
          (await logo.evaluate((img) => img.currentSrc)).includes(
            'feu-tech-64.webp',
          ),
          'Oversized education badge',
        )
        assert(
          !(await p.evaluate(() =>
            performance
              .getEntriesByType('resource')
              .some((r) => r.name.endsWith('/brands/feu-tech.webp')),
          )),
          'Original logo still requested',
        )
        await p
          .locator('#showcase-pcosina .showcase-secondary')
          .evaluate(async (img) => {
            if (!img.complete) await img.decode()
          })
        assert(
          await p
            .locator('#showcase-pcosina .showcase-secondary')
            .evaluate((img) => img.naturalWidth > 0),
          'Secondary capture did not load',
        )
        await p.screenshot({
          path: 'output/playwright/optimized-home-1366.png',
          animations: 'disabled',
        })
      }
    }
    await page.goto(origin + '/projects')
    await page.locator('html[data-enhanced]').waitFor()
    assert(
      (await page.locator('.collection-card[data-featured="true"]').count()) ===
        2,
      'Expected two featured case studies',
    )
    assert(
      (await page.locator('.collection-card').count()) === 6,
      'A project was removed',
    )
    await page.goto(origin + '/projects/barion')
    await page.locator('html[data-enhanced]').waitFor()
    assert(
      (await page.locator('video').count()) === 0,
      'Recording player mounted before opening',
    )
    const recording = page.locator('.recording-disclosure > summary')
    await recording.click()
    await page.locator('video').evaluate((video) => video.play())
    await page.waitForFunction(() => !document.querySelector('video').paused)
    await recording.click()
    await page.waitForFunction(() => document.querySelector('video').paused)
    const fallback = await page.context().browser().newContext()
    contexts.push(fallback)
    const p = await fallback.newPage()
    await p.route('**/assets/Contact-*.js', (route) => route.abort())
    await p.goto(origin + '/contact')
    await p
      .getByRole('heading', {
        name: 'Contact',
        exact: true,
      })
      .waitFor()
    assert(
      (await p.locator('a[href="mailto:salvacion.jsh@gmail.com"]').count()) > 0,
      'Chunk failure removed native contact path',
    )
    return {
      measurements,
      featuredProjects: 2,
      allProjects: 6,
      chunkFailureFallback: 'static contact preserved',
      recording: 'mounts on opening and pauses on closing',
    }
  } finally {
    await Promise.all(contexts.map((context) => context.close()))
  }
}
