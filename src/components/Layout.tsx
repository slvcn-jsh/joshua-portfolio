import type { ReactNode } from 'react'
import { ArrowUpRight, Menu, ArrowRight } from 'lucide-react'
import { identity, navigation } from '../content/site'
import { BrandIcon } from './BrandIcon'
import { MotionEnhancements } from './MotionEnhancements'

export function Layout({
  path,
  children,
}: {
  path: string
  children: ReactNode
}) {
  const active = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href)
  const links = navigation.map(({ href, label }) => (
    <a key={href} href={href} aria-current={active(href) ? 'page' : undefined}>
      {label}
    </a>
  ))
  return (
    <>
      <MotionEnhancements />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Joshua Salvacion, home">
            <span>
              Joshua <strong>Salvacion</strong>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links}
          </nav>
          <details
            className="mobile-nav"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.currentTarget.open = false
                event.currentTarget.querySelector('summary')?.focus()
              }
            }}
          >
            <summary>
              <Menu size={20} aria-hidden="true" />
              <span>Menu</span>
            </summary>
            <nav aria-label="Mobile navigation">{links}</nav>
          </details>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a className="footer-name" href="/">
              Joshua Salvacion
            </a>
            <p>Mobile applications & supporting systems</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${identity.email}`}>
              <BrandIcon name="Gmail" /> Email
            </a>
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="GitHub" /> GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandIcon name="LinkedIn" /> LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="/resume">
              Resume <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export function ExternalLink({
  href,
  children,
  className = 'text-link',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function PageIntro({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="page-intro" data-reveal>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </div>
  )
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>Let’s talk about your team.</h2>
        <p>I’m looking for a software engineering internship.</p>
      </div>
      <a className="button button-secondary" href="/contact">
        Get in touch <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  )
}
