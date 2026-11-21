import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react'
import { identity } from '../content/site'
import { PageIntro, ExternalLink } from '../components/Layout'
import { BrandIcon } from '../components/BrandIcon'

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }
  return (
    <div className="container page-bottom contact-page">
      <PageIntro title="Contact">
        <p>
          For software engineering internships, project conversations or
          questions about my work, email is the best way to reach me.
        </p>
      </PageIntro>
      <div className="contact-grid">
        <section className="contact-card" data-reveal>
          <BrandIcon name="Gmail" />
          <p className="eyebrow">Email</p>
          <h2>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </h2>
          <p>Send a message directly from your email app.</p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${identity.email}`}
            >
              Send email <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button className="button button-secondary" onClick={copyEmail}>
              {copyState === 'copied' ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              {copyState === 'copied' ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <p className="copy-status small" role="status" aria-live="polite">
            {copyState === 'copied'
              ? 'Email address copied to your clipboard.'
              : copyState === 'failed'
                ? 'Copy is unavailable. Select the email address above or use Send email.'
                : ''}
          </p>
        </section>
        <section className="contact-card github-card" data-reveal>
          <BrandIcon name="GitHub" />
          <p className="eyebrow">GitHub</p>
          <h2>slvcn-jsh</h2>
          <p>
            Explore the repositories behind the projects and follow my
            development work.
          </p>
          <ExternalLink href={identity.github}>
            Visit GitHub profile
          </ExternalLink>
        </section>
        <section className="contact-card linkedin-card" data-reveal>
          <a
            className="contact-brand-link"
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Joshua Salvacion on LinkedIn (opens in a new tab)"
          >
            <BrandIcon name="LinkedIn" />
          </a>
          <p className="eyebrow">LinkedIn</p>
          <h2>Joshua Salvacion</h2>
          <p>
            Connect with me professionally and continue the conversation about
            software engineering.
          </p>
          <ExternalLink href={identity.linkedin}>
            Visit LinkedIn profile
          </ExternalLink>
        </section>
      </div>
      <div className="contact-extra">
        <p>Prefer a quick overview of my background?</p>
        <a className="text-link" href="/resume">
          View my resume <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
