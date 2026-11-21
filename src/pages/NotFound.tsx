import { ArrowRight } from 'lucide-react'
import { PageIntro } from '../components/Layout'

export function NotFound() {
  return (
    <div className="container not-found">
      <PageIntro title="404 — Page not found">
        <p>
          The address may have changed. You can return home or explore the
          selected projects.
        </p>
      </PageIntro>
      <div className="inline-links">
        <a className="button button-primary" href="/">
          Back to home <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a className="button button-secondary" href="/projects">
          View projects
        </a>
      </div>
    </div>
  )
}
