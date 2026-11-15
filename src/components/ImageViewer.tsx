import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import type { Project } from '../content/projects'

type Screenshot = Project['screenshots'][number]

export function ImageViewer({
  image,
  children,
  className,
  label = 'Application capture',
}: {
  image: Screenshot
  children: ReactNode
  className?: string
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const labelId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current!
    const trigger = triggerRef.current
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <a
        ref={triggerRef}
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            !dialogRef.current?.showModal
          )
            return
          event.preventDefault()
          setOpen(true)
        }}
      >
        {children}
      </a>
      <dialog
        ref={dialogRef}
        className="image-dialog"
        aria-labelledby={labelId}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const targets = event.currentTarget.querySelectorAll<HTMLElement>(
            'button, [tabindex="0"]',
          )
          const first = targets[0]
          const last = targets[targets.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
        onCancel={(event) => {
          event.preventDefault()
          setOpen(false)
        }}
      >
        <div className="image-dialog-toolbar">
          <p id={labelId}>{label}</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setOpen(false)}
          >
            <X size={16} aria-hidden="true" />
            Close image
          </button>
        </div>
        {open && (
          <figure
            tabIndex={0}
            aria-label={`Enlarged ${label.toLowerCase()} and caption`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <figcaption>{image.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  )
}
