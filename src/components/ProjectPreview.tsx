import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Expand, Play, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import type { ProjectSummary } from '../content/project-index'

function subscribeMotion(callback: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function PreviewMedia({
  project,
  playing = false,
  controls = false,
}: {
  project: ProjectSummary
  playing?: boolean
  controls?: boolean
}) {
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  )
  useEffect(() => {
    const element = video.current
    if (!element) return
    if (playing && !reduced) void element.play().catch(() => {})
    else element.pause()
    return () => element.pause()
  }, [playing, reduced])
  return project.video ? (
    <video
      ref={video}
      src={project.video.src}
      poster={project.video.poster}
      muted
      loop
      playsInline
      controls={controls}
      preload="metadata"
      aria-label={`${project.name} recorded application preview`}
    />
  ) : (
    <div className="preview-captures">
      {project.screenshots.map((capture) => (
        <figure key={capture.src}>
          <img
            src={capture.src}
            alt={capture.alt}
            width={capture.width}
            height={capture.height}
          />
          <figcaption>{capture.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Hold for a quick look; click/Enter opens the same evidence in a native dialog. */
export function ProjectPreview({
  project,
  floating = false,
}: {
  project: ProjectSummary
  floating?: boolean
}) {
  const [holding, setHolding] = useState(false)
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const wasHeld = useRef(false)
  const start = useRef<{ x: number; y: number } | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const label = useId()
  function endHold() {
    window.clearTimeout(timer.current)
    setHolding(false)
    start.current = null
  }
  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])
  useEffect(() => {
    if (!open) return
    const element = dialog.current!
    const triggerElement = trigger.current
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = overflow
      triggerElement?.focus({ preventScroll: true })
    }
  }, [open])
  useEffect(() => {
    const cancel = () => {
      window.clearTimeout(timer.current)
      setHolding(false)
    }
    window.addEventListener('blur', cancel)
    document.addEventListener('visibilitychange', cancel)
    return () => {
      window.removeEventListener('blur', cancel)
      document.removeEventListener('visibilitychange', cancel)
    }
  }, [])
  const heldPreview = holding ? (
    <div
      className={`project-hold-preview${floating ? ' preview-floating' : ''}`}
      aria-hidden="true"
    >
      <PreviewMedia project={project} playing />
      <p>
        {project.video ? 'Recorded application preview' : project.previewLabel}
        <span>Release to return</span>
      </p>
    </div>
  ) : null
  return (
    <div className="project-preview-control">
      <button
        ref={trigger}
        className="project-preview-button"
        type="button"
        aria-label={`Hold to preview ${project.name}; click to open preview`}
        aria-haspopup="dialog"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          wasHeld.current = false
          start.current = { x: event.clientX, y: event.clientY }
          event.currentTarget.setPointerCapture(event.pointerId)
          timer.current = window.setTimeout(() => {
            wasHeld.current = true
            setHolding(true)
          }, 220)
        }}
        onPointerMove={(event) => {
          const initial = start.current
          if (
            initial &&
            Math.hypot(event.clientX - initial.x, event.clientY - initial.y) >
              14
          ) {
            wasHeld.current = true
            endHold()
          }
        }}
        onPointerUp={endHold}
        onPointerCancel={endHold}
        onLostPointerCapture={endHold}
        onContextMenu={(event) => event.preventDefault()}
        onClick={(event) => {
          if (wasHeld.current && event.detail !== 0) {
            wasHeld.current = false
            return
          }
          wasHeld.current = false
          endHold()
          setOpen(true)
        }}
      >
        <Play size={14} aria-hidden="true" />
        <span>Hold to preview</span>
      </button>
      {holding && floating
        ? createPortal(heldPreview, document.body)
        : heldPreview}
      <dialog
        ref={dialog}
        className="project-preview-dialog"
        aria-labelledby={label}
        onCancel={(event) => {
          event.preventDefault()
          setOpen(false)
        }}
      >
        <div className="preview-dialog-heading">
          <div>
            <p className="eyebrow">
              {project.video ? 'Application recording' : 'Application captures'}
            </p>
            <h2 id={label}>{project.name} preview</h2>
          </div>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setOpen(false)}
          >
            <X size={16} aria-hidden="true" />
            Close preview
          </button>
        </div>
        {open && <PreviewMedia project={project} controls />}
        <p className="preview-evidence-note">
          {project.video ? project.video.caption : project.previewLabel}
        </p>
        <a className="text-link" href={`/projects/${project.slug}`}>
          Read the full case study
          <Expand size={14} aria-hidden="true" />
        </a>
      </dialog>
    </div>
  )
}
