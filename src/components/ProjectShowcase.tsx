import { useRef, useState, useSyncExternalStore } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from 'lucide-react'
import { projects } from '../content/projects'
import { ProjectIdentity } from './ProjectIdentity'
import { ImageViewer } from './ImageViewer'

const subscribe = () => () => {}

export function ProjectShowcase() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const [active, setActive] = useState(0)
  const [announced, setAnnounced] = useState(false)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const suppressClick = useRef(false)
  const selectors = useRef<(HTMLButtonElement | null)[]>([])
  function select(index: number) {
    setActive(Math.max(0, Math.min(projects.length - 1, index)))
    setAnnounced(true)
  }
  return (
    <section
      className={`showcase ${projects[active].slug}`}
      aria-labelledby="showcase-title"
    >
      <header className="showcase-heading">
        <div>
          <p className="eyebrow">Selected work / Mobile & web</p>
          <h2 id="showcase-title">Six projects. A closer look.</h2>
        </div>
        <a href="/projects" className="text-link">
          Project overview <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>
      <div
        className="showcase-selector"
        role="group"
        aria-label="Choose a project"
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            ref={(node) => {
              selectors.current[index] = node
            }}
            aria-pressed={index === active}
            aria-controls={`showcase-${project.slug}`}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              const destination =
                event.key === 'ArrowRight'
                  ? (index + 1) % projects.length
                  : event.key === 'ArrowLeft'
                    ? (index + projects.length - 1) % projects.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? projects.length - 1
                        : null
              if (destination === null) return
              event.preventDefault()
              select(destination)
              selectors.current[destination]?.focus({ preventScroll: true })
            }}
          >
            <ProjectIdentity project={project} />
            <span>{project.name}</span>
          </button>
        ))}
      </div>
      <div
        className="showcase-viewport"
        onPointerDown={(event) => {
          suppressClick.current = false
          if (
            event.pointerType === 'mouse' ||
            (event.target as Element).closest('button, dialog')
          )
            return
          pointer.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = pointer.current
          pointer.current = null
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            suppressClick.current = true
            select(active + (dx < 0 ? 1 : -1))
          }
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return
          event.preventDefault()
          event.stopPropagation()
          suppressClick.current = false
        }}
        onPointerCancel={() => {
          pointer.current = null
        }}
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={`showcase-${project.slug}`}
            className={`showcase-slide ${project.slug}`}
            data-position={
              index < active ? 'before' : index > active ? 'after' : 'active'
            }
            inert={enhanced && index !== active}
            aria-label={`${project.name}, project ${index + 1} of ${projects.length}`}
          >
            <div className="showcase-copy">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="showcase-headline">{project.headline}</p>
              <p className="showcase-summary">{project.summary}</p>
              <ul
                className="tag-list"
                aria-label={`${project.name} technologies`}
              >
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <p className="showcase-detail">
                <span>Engineering focus</span>
                {project.focus}
              </p>
              <div className="showcase-actions">
                <a className="text-link" href={`/projects/${project.slug}`}>
                  Read case study <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <span className="project-status">{project.status}</span>
              </div>
            </div>
            <div
              className={`showcase-media ${project.platform === 'Android' ? 'showcase-native' : 'showcase-web'}`}
            >
              <div className="showcase-capture-layout">
                <ImageViewer
                  image={project.screenshots[0]}
                  className="showcase-capture"
                  label={`${project.name} application capture`}
                >
                  <img
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    width={project.screenshots[0].width}
                    height={project.screenshots[0].height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                  <span className="showcase-enlarge">
                    <Expand size={14} aria-hidden="true" />
                    <span className="sr-only">
                      Enlarge {project.name} screenshot
                    </span>
                  </span>
                </ImageViewer>
                {project.platform === 'Android' && project.screenshots[1] && (
                  <img
                    className="showcase-secondary"
                    src={project.screenshots[1].src}
                    alt=""
                    aria-hidden="true"
                    width={project.screenshots[1].width}
                    height={project.screenshots[1].height}
                    loading="lazy"
                  />
                )}
              </div>
              <p className="showcase-caption">{project.previewLabel}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="showcase-bottom">
        <p className="showcase-hint">
          Explore at your own pace<span> · Swipe or choose a project</span>
        </p>
        <div className="showcase-pagination">
          <span className="showcase-position" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} <span>/ 06</span>
          </span>
          <button
            type="button"
            aria-label="Previous project"
            aria-disabled={active === 0}
            onClick={() => select(active - 1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            aria-disabled={active === projects.length - 1}
            onClick={() => select(active + 1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announced
          ? `${projects[active].name}, project ${active + 1} of ${projects.length}`
          : ''}
      </p>
    </section>
  )
}
