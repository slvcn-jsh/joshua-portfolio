import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { pageMeta } from './content/site'
import './styles.css'
import './interactions.css'
import './editorial.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
)
document.title = (pageMeta[path] ?? pageMeta['/404']).title
const renderedPath = pageMeta[path] ? path : '/404'
if (root.dataset.page === renderedPath) hydrateRoot(root, app)
else createRoot(root).render(app)
document.documentElement.dataset.enhanced = 'true'
