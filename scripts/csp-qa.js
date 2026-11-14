/* eslint-disable @typescript-eslint/no-unused-expressions */
// Reproduce the current vercel.json policy on local preview responses.
async (page) => {
  const policy =
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"
  const context = await page
    .context()
    .browser()
    .newContext({ viewport: { width: 390, height: 844 } })
  const secure = await context.newPage()
  try {
    await secure.addInitScript(() => {
      window.policyViolations = []
      document.addEventListener('securitypolicyviolation', (event) =>
        window.policyViolations.push(event.violatedDirective),
      )
    })
    await secure.route('http://127.0.0.1:4173/**', async (route) => {
      const response = await route.fetch()
      await route.fulfill({
        response,
        headers: { ...response.headers(), 'content-security-policy': policy },
      })
    })
    for (const slug of ['pcosina', 'barion']) {
      await secure.goto('http://127.0.0.1:4173/projects/' + slug)
      await secure.locator('.annotation-controls button').nth(1).click()
      const width = await secure
        .locator('.capture-highlight')
        .evaluate((el) => el.getBoundingClientRect().width)
      if (width < 100) throw new Error('Highlight styles blocked')
      await secure.locator('.capture-link').click()
      await secure.getByRole('dialog').waitFor()
      await secure.getByRole('button', { name: 'Close image' }).click()
      await secure.locator('.scenario-controls button').nth(1).click()
      const violations = await secure.evaluate(() => window.policyViolations)
      if (violations.length)
        throw new Error(JSON.stringify({ slug, violations }))
    }
    return {
      policy: 'vercel.json policy applied to local responses',
      pages: 2,
      violations: 0,
    }
  } finally {
    await context.close()
  }
}
