import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Pause, Play, ArrowUpRight, Expand } from 'lucide-react'
import {
  projectSummaries as projects,
  featuredProjectSlugs,
} from '../content/project-index'
import { ProjectIdentity } from './ProjectIdentity'
import { ImageViewer } from './ImageViewer'
import { ProjectPreview } from './ProjectPreview'
import { ResponsiveCapture } from './ResponsiveCapture'

const subscribe = () => () => {}
const subscribeMotion = (callback: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const loop = (index: number) => (index + projects.length) % projects.length

export function ProjectShowcase() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const [{ active, previous, direction }, setSlide] = useState<{
    active: number
    previous: number | null
    direction: number
  }>({ active: 0, previous: null, direction: 1 })
  const section = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [paused, setPaused] = useState(false)
  const [announced, setAnnounced] = useState(false)
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  )
  const visible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === 'visible',
    () => false,
  )
  const rotating =
    enhanced && inView && visible && !reduced && !hovered && !paused
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(section.current!)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!rotating) return
    const timer = window.setTimeout(() => {
      setSlide((current) => ({
        active: loop(current.active + 1),
        previous: current.active,
        direction: 1,
      }))
      setAnnounced(false)
    }, 8000)
    return () => window.clearTimeout(timer)
  }, [active, rotating])
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const suppressClick = useRef(false)
  const selectors = useRef<(HTMLButtonElement | null)[]>([])
  function select(index: number, nextDirection = index > active ? 1 : -1) {
    setPaused(true)
    setSlide((current) =>
      loop(index) === current.active
        ? current
        : {
            active: loop(index),
            previous: current.active,
            direction: nextDirection,
          },
    )
    setAnnounced(true)
  }
  return (
    <section
      ref={section}
      className={`showcase ${projects[active].slug}`}
      aria-labelledby="showcase-title"
      aria-roledescription="carousel"
      data-direction={direction > 0 ? 'next' : 'previous'}
      data-animated={previous !== null}
      data-rotating={rotating}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as Element).closest('[data-rotation-control]'))
          setPaused(true)
      }}
    >
      <header className="showcase-heading">
        <div>
          <p className="eyebrow">Selected work / Mobile & web</p>
          <h2 id="showcase-title">Six projects. Two to start with.</h2>
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
              select(
                destination,
                event.key === 'ArrowRight'
                  ? 1
                  : event.key === 'ArrowLeft'
                    ? -1
                    : undefined,
              )
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
          setPaused(true)
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
            select(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1)
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
            data-departing={index === previous}
            aria-label={`${project.name}, project ${index + 1} of ${projects.length}`}
          >
            <div className="showcase-copy">
              <p className="eyebrow">
                {featuredProjectSlugs.includes(project.slug)
                  ? 'Featured case study'
                  : 'More to explore'}{' '}
                · {project.category}
              </p>
              <h3>{project.name}</h3>
              <p className="showcase-summary">{project.summary}</p>
              <ul
                className="tag-list"
                aria-label={`${project.name} key technologies`}
              >
                {project.stack.slice(0, 3).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="showcase-actions">
                <a className="text-link" href={`/projects/${project.slug}`}>
                  Read case study <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                {project.demoUrl && (
                  <a
                    className="text-link"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
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
                  <ResponsiveCapture
                    image={project.screenshots[0]}
                    sizes={
                      project.platform === 'Android'
                        ? '180px'
                        : '(min-width: 1280px) 600px, (min-width: 768px) 480px, 300px'
                    }
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
                  <ResponsiveCapture
                    image={project.screenshots[1]}
                    sizes="150px"
                    className="showcase-secondary"
                    decorative
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
              <div className="showcase-media-footer">
                <p className="showcase-caption">{project.previewLabel}</p>
                <ProjectPreview project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="showcase-bottom">
        <p className="showcase-hint">
          {reduced
            ? 'Choose a project to explore'
            : paused
              ? 'Your pace. Your project.'
              : hovered
                ? 'Paused while you explore'
                : 'A new project, every eight seconds'}
          <span> · Select any project to stay</span>
        </p>
        <div className="showcase-pagination">
          <span className="showcase-position" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}{' '}
            <span>/ {String(projects.length).padStart(2, '0')}</span>
          </span>
          {!reduced && (
            <button
              type="button"
              data-rotation-control
              aria-label={
                paused ? 'Resume project rotation' : 'Pause project rotation'
              }
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live={rotating ? 'off' : 'polite'}
        aria-atomic="true"
      >
        {announced
          ? `${projects[active].name}, project ${active + 1} of ${projects.length}`
          : ''}
      </p>
    </section>
  )
}
