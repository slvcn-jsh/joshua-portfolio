import { useState } from 'react'
import { ArrowUpRight, ArrowRight, LockKeyhole } from 'lucide-react'
import {
  projectSummaries as projects,
  featuredProjectSlugs,
} from '../content/project-index'
import { ProjectIdentity } from './ProjectIdentity'
import { ProjectPreview } from './ProjectPreview'
import { ResponsiveCapture } from './ResponsiveCapture'

const filters = ['All', 'Android', 'Cross-platform', 'Web'] as const
type Filter = (typeof filters)[number]

export function ProjectCollection() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = projects.filter(
    (p) => filter === 'All' || p.platform === filter,
  )
  return (
    <section className="project-collection" aria-label="Project collection">
      <div className="collection-toolbar">
        <div
          className="collection-filters"
          role="group"
          aria-label="Filter projects by platform"
        >
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              aria-controls="project-results"
              onClick={() => setFilter(value)}
            >
              {value}
              <span>
                {value === 'All'
                  ? projects.length
                  : projects.filter((p) => p.platform === value).length}
              </span>
            </button>
          ))}
        </div>
        <p
          className="collection-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {visible.length} of {projects.length} projects
        </p>
      </div>
      <div className="collection-grid" id="project-results">
        {visible.map((p) => (
          <article
            key={p.slug}
            className={`collection-card ${p.slug}`}
            data-featured={featuredProjectSlugs.includes(p.slug)}
          >
            <div
              className={`collection-media ${p.platform === 'Android' ? 'collection-phone' : 'collection-browser'}`}
            >
              <a href={`/projects/${p.slug}`} aria-label={`Explore ${p.name}`}>
                <ResponsiveCapture
                  image={p.screenshots[0]}
                  sizes={
                    p.platform === 'Android'
                      ? '180px'
                      : '(min-width: 1024px) 550px, (min-width: 768px) 420px, 350px'
                  }
                />
              </a>
              <span className="collection-media-label">{p.previewLabel}</span>
              <ProjectPreview project={p} floating />
            </div>
            <div className="collection-copy">
              <p className="eyebrow">
                {featuredProjectSlugs.includes(p.slug)
                  ? 'Featured case study · '
                  : ''}
                {p.category}
              </p>
              <h2>
                <a href={`/projects/${p.slug}`}>
                  <ProjectIdentity project={p} />
                  {p.name}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
              </h2>
              <p className="collection-headline">{p.headline}</p>
              <p className="collection-summary">{p.summary}</p>
              <ul className="tag-list" aria-label={`${p.name} technologies`}>
                {p.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="collection-footer">
                <span className="project-status">{p.status}</span>
                <a className="text-link" href={`/projects/${p.slug}`}>
                  Case study <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
              {p.demoUrl && (
                <a
                  className="text-link"
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {p.repository ? (
                <a
                  className="collection-source"
                  href={p.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Public source <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <span className="collection-source">
                  <LockKeyhole size={13} aria-hidden="true" /> Private source ·
                  Public case study
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
