import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolvePage } from './routes'
import { pageMeta } from './content/site'
import './styles.css'
import './interactions.css'
import './editorial.css'
import './identity.css'
import './case-study.css'
import './collection.css'
import './theme.css'
import './experience.css'
import './showcase.css'
import './project-preview.css'
import './feedback.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const root = document.getElementById('root')!
document.title = (pageMeta[path] ?? pageMeta['/404']).title
async function enhance() {
  const page = await resolvePage(path)
  const app = (
    <StrictMode>
      <App path={path}>{page}</App>
    </StrictMode>
  )
  const renderedPath = pageMeta[path] ? path : '/404'
  if (root.dataset.page === renderedPath) hydrateRoot(root, app)
  else createRoot(root).render(app)
  document.documentElement.dataset.enhanced = 'true'
}
void enhance().catch((error) => {
  // Keep static content and ordinary links usable if a route chunk fails.
  console.error('Could not enhance this page.', error)
})
