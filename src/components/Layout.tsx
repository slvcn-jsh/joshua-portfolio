import type { ReactNode } from 'react'
import { ArrowUpRight, GitBranch, Menu, ArrowRight } from 'lucide-react'
import { identity, navigation } from '../content/site'

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
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="js. Joshua Salvacion, home">
            <span className="brand-mark" aria-hidden="true">
              js<span>.</span>
            </span>
            <span>Joshua Salvacion</span>
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
            <p>Software engineering, through practical work.</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${identity.email}`}>
              Email <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              GitHub <GitBranch size={15} aria-hidden="true" />
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
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </div>
  )
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <p className="eyebrow">Let’s connect</p>
        <h2>Have an internship opportunity?</h2>
        <p>
          I’d welcome a conversation about your team and the software you’re
          building.
        </p>
      </div>
      <a className="button button-light" href="/contact">
        Get in touch <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  )
}
