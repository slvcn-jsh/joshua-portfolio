/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const context = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const plain = await context.newPage()
  try {
    for (const route of ['/', '/projects', '/projects/pcosina', '/projects/barion', '/skills', '/about', '/achievements', '/resume', '/contact']) {
      const response = await plain.goto('http://127.0.0.1:4173' + route)
      if (response.status() !== 200 || await plain.locator('h1').count() !== 1) throw new Error('Static page failed: ' + route)
    }
    for (const slug of ['pcosina', 'barion']) {
      await plain.goto('http://127.0.0.1:4173/projects/' + slug)
      if (await plain.getByRole('group', { name: 'Choose an illustrative scenario' }).isVisible()) throw new Error('Inactive controls exposed without JS')
      await plain.locator('.scenario-notes summary').click()
      if (!await plain.locator('.scenario-notes p').first().isVisible()) throw new Error('Scenario fallback missing')
      if (!await plain.locator('.static-annotations').isVisible()) throw new Error('Static annotation explanations missing')
      const href = await plain.locator('.capture-link').getAttribute('href')
      if (!href.endsWith('.webp')) throw new Error('Image fallback missing')
      if (slug === 'barion') {
        await plain.locator('.decision-challenge summary').click()
        if (!await plain.locator('.decision-challenge noscript').isVisible()) throw new Error('Decision fallback missing')
      }
    }
    await plain.goto('http://127.0.0.1:4173/')
    await plain.locator('summary').filter({ hasText: 'Menu' }).click()
    await plain.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects', exact: true }).click()
    await plain.waitForURL('**/projects')
    return { staticPages: 9, nativeMenuWithoutJavaScript: 'passed', walkthroughAndAnnotationFallbacks: 'passed', challengeFallback: 'passed' }
  } finally { await context.close() }
}
