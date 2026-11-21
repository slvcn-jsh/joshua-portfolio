import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, LoaderCircle, Send } from 'lucide-react'
import { identity } from '../content/site'

const topics = ['An idea', 'Something to fix', 'Just saying hello']

export function MessageForm() {
  const id = useId()
  const [topic, setTopic] = useState(topics[0])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const [status, setStatus] = useState('')
  const request = useRef<AbortController | null>(null)
  useEffect(() => () => request.current?.abort(), [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (request.current) return
    const data = new FormData(event.currentTarget)
    if (String(data.get('_honey') ?? '').trim()) {
      setState('error')
      setStatus('Unable to submit this message.')
      return
    }
    if (message.trim().length < 10) {
      setState('error')
      setStatus(
        'Please write at least 10 characters so I can understand your message.',
      )
      return
    }
    const controller = new AbortController()
    request.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    setState('sending')
    setStatus('')
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${identity.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          signal: controller.signal,
          body: JSON.stringify({
            message: message.trim(),
            topic,
            ...(email.trim()
              ? { email: email.trim(), _replyto: email.trim() }
              : {}),
            _subject: `Portfolio feedback: ${topic}`,
            _template: 'table',
            _honey: '',
            _url: `${location.origin}${location.pathname}`,
          }),
        },
      )
      if (response.status === 429)
        throw new Error(
          'Please wait a few minutes before sending another message.',
        )
      const result = await response.json().catch(() => null)
      if (
        !response.ok ||
        !result ||
        (result.success !== true && result.success !== 'true') ||
        /activat|confirm your|verify your/i.test(String(result.message ?? ''))
      )
        throw new Error(
          'The message service could not accept your message yet. Your draft is saved here; please try again later.',
        )
      setState('success')
      setStatus(
        'Your message has been submitted. Thank you for taking the time.',
      )
    } catch (error) {
      if (controller.signal.aborted)
        setStatus(
          'We couldn’t confirm submission. Your message is still here; please try again.',
        )
      else
        setStatus(
          error instanceof Error && error.message !== 'Failed to fetch'
            ? error.message
            : 'Couldn’t connect to the message service. Your message is still here; please try again.',
        )
      setState('error')
    } finally {
      window.clearTimeout(timeout)
      request.current = null
    }
  }
  if (state === 'success')
    return (
      <div className="message-success" role="status">
        <span>
          <Check size={22} aria-hidden="true" />
        </span>
        <h3>Thanks for the thought.</h3>
        <p>{status}</p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setMessage('')
            setEmail('')
            setStatus('')
            setState('idle')
          }}
        >
          Send another message <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    )
  return (
    <form
      className="message-form"
      action={`https://formsubmit.co/${identity.email}`}
      method="POST"
      onSubmit={submit}
      aria-busy={state === 'sending'}
    >
      <input
        type="hidden"
        name="_subject"
        value={`Portfolio feedback: ${topic}`}
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="topic" value={topic} />
      <div className="feedback-trap" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input
          id={`${id}-website`}
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={state === 'sending'}>
        <legend className="sr-only">Your message to Joshua</legend>
        <div
          className="feedback-topics"
          role="group"
          aria-label="Feedback topic"
        >
          {topics.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={item === topic}
              onClick={() => {
                setTopic(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-email`}>
          Your email <span className="muted">(optional, for a reply)</span>
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
        <label htmlFor={`${id}-message`}>Your message</label>
        <textarea
          id={`${id}-message`}
          name="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
          }}
          required
          minLength={10}
          maxLength={1500}
          rows={4}
          placeholder="I was exploring your portfolio and…"
          aria-describedby={state === 'error' ? `${id}-status` : undefined}
        />
        <p className="feedback-note">
          Sent privately to Joshua via{' '}
          <a
            href="https://formsubmit.co/privacy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            FormSubmit
            <span className="sr-only">
              {' '}
              privacy policy (opens in a new tab)
            </span>
          </a>
          . No email app needed.
        </p>
      </fieldset>
      <div className="feedback-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? (
            <>
              <LoaderCircle
                size={16}
                className="message-spinner"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <p
        id={`${id}-status`}
        className={`feedback-status${state === 'error' ? ' message-error' : ''}`}
        role={state === 'error' ? 'alert' : 'status'}
      >
        {status}
      </p>
    </form>
  )
}
