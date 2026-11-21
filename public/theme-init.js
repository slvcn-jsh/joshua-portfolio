// Runs before styles and hydration. No inline script or relaxed CSP required.
;(() => {
  const key = 'portfolio-theme'
  const root = document.documentElement
  root.dataset.js = 'true'
  try { root.dataset.sidebar = localStorage.getItem('portfolio-sidebar') === 'collapsed' ? 'collapsed' : 'expanded' } catch { root.dataset.sidebar = 'expanded' }
  const system = matchMedia('(prefers-color-scheme: dark)')
  const valid = (value) => value === 'light' || value === 'dark' ? value : 'system'
  let preference = 'system'
  try { preference = valid(localStorage.getItem(key)) } catch { /* Storage is optional. */ }
  function apply() {
    root.dataset.themePreference = preference
    root.dataset.theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'dark' ? '#14171c' : '#fcfcfa')
    window.dispatchEvent(new Event('portfolio-theme-applied'))
  }
  window.addEventListener('portfolio-theme-change', (event) => {
    preference = valid(event.detail)
    try { localStorage.setItem(key, preference) } catch { /* Keep the session usable. */ }
    apply()
  })
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue)
      apply()
    }
  })
  system.addEventListener('change', apply)
  apply()
})()
