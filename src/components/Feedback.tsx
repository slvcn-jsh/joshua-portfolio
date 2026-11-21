import { useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X } from 'lucide-react'
import { MessageForm } from './MessageForm'

function subscribeViewport(callback: () => void) {
  const query = matchMedia('(min-width: 1024px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

export function Feedback() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const overflow = useRef('')
  const title = useId()
  // Mount on first use, then retain the in-memory draft across closes.
  const [started, setStarted] = useState(false)
  const desktop = useSyncExternalStore(
    subscribeViewport,
    () => matchMedia('(min-width: 1024px)').matches,
    () => false,
  )
  const slot = desktop ? document.querySelector('.sidebar-feedback-slot') : null
  function close() {
    dialog.current?.close()
    document.body.style.overflow = overflow.current
    trigger.current?.focus({ preventScroll: true })
  }
  const launcher = (
    <button
      ref={trigger}
      className="feedback-trigger"
      type="button"
      aria-label="Leave a thought"
      onClick={() => {
        setStarted(true)
        overflow.current = document.body.style.overflow
        dialog.current?.showModal()
        document.body.style.overflow = 'hidden'
      }}
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>Leave a thought</span>
    </button>
  )
  return (
    <>
      {slot ? createPortal(launcher, slot) : launcher}
      <dialog
        ref={dialog}
        className="feedback-dialog"
        aria-labelledby={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              close()
          }
        }}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
      >
        <div className="feedback-heading">
          <span className="feedback-mark">
            <MessageCircle size={20} aria-hidden="true" />
          </span>
          <button
            type="button"
            className="feedback-close"
            aria-label="Close feedback"
            onClick={close}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <p className="eyebrow">A work in progress, by design</p>
        <h2 id={title}>What’s on your mind?</h2>
        <p className="feedback-intro">
          A small idea, a rough edge, a fresh perspective. I’d like to hear it.
        </p>
        {started && <MessageForm />}
      </dialog>
    </>
  )
}
