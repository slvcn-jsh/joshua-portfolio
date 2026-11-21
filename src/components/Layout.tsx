import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Menu, ArrowRight } from 'lucide-react'
import { identity } from '../content/site'
import { BrandIcon } from './BrandIcon'
import { MotionEnhancements } from './MotionEnhancements'
import { ThemeControl } from './ThemeControl'
import { Sidebar, SidebarLinks } from './Sidebar'
import { Feedback } from './Feedback'

export function Layout({
  path,
  children,
}: {
  path: string
  children: ReactNode
}) {
  const menu = useRef<HTMLDetailsElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = matchMedia('(min-width: 1024px)')
    const close = () => {
      if (desktop.matches && menu.current) menu.current.open = false
    }
    desktop.addEventListener('change', close)
    return () => {
      document.body.style.overflow = overflow
      desktop.removeEventListener('change', close)
    }
  }, [menuOpen])
  return (
    <>
      <MotionEnhancements />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar path={path} />
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Joshua Salvacion, home">
            <img
              src="/brands/joshua-portrait.webp"
              alt=""
              width="160"
              height="160"
            />
            <span>
              Joshua <strong>Salvacion</strong>
            </span>
          </a>
          <details
            ref={menu}
            className="mobile-nav"
            onToggle={(event) => setMenuOpen(event.currentTarget.open)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.currentTarget.open = false
                event.currentTarget.querySelector('summary')?.focus()
              }
              if (event.key === 'Tab' && event.currentTarget.open) {
                const targets =
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    'summary, a, button',
                  )
                const first = targets[0],
                  last = targets[targets.length - 1]
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault()
                  last.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault()
                  first.focus()
                }
              }
            }}
          >
            <summary>
              <Menu size={20} aria-hidden="true" />
              <span>Menu</span>
            </summary>
            <button
              className="sidebar-scrim"
              type="button"
              aria-label="Close navigation"
              onClick={() => {
                if (menu.current) {
                  menu.current.open = false
                  menu.current.querySelector('summary')?.focus()
                }
              }}
            />
            <div className="sidebar-drawer">
              <p className="sidebar-caption">Your next stop</p>
              <SidebarLinks path={path} mobile />
              <div className="drawer-theme">
                <ThemeControl />
              </div>
            </div>
          </details>
        </div>
      </header>
      <div className="site-content" inert={menuOpen}>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <a className="footer-name" href="/">
                Joshua Salvacion
              </a>
              <p>Mobile & web application development</p>
              <nav
                className="background-links"
                aria-label="Background and credentials"
              >
                <a href="/achievements">Achievements</a>
                <a href="/certifications">Certifications</a>
              </nav>
            </div>
            <div className="footer-links">
              <a href={`mailto:${identity.email}`}>
                <BrandIcon name="Gmail" /> Email
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
              >
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
        <Feedback />
      </div>
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
