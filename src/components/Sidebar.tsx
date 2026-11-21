import { useSyncExternalStore } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FileUser,
  House,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
} from 'lucide-react'
import { identity, navigation } from '../content/site'
import { ThemeControl } from './ThemeControl'

const icons: Record<string, typeof House> = {
  '/projects': BriefcaseBusiness,
  '/skills': Code2,
  '/about': UserRound,
  '/resume': FileUser,
  '/contact': Mail,
}
const subscribe = (callback: () => void) => {
  window.addEventListener('portfolio-sidebar-change', callback)
  return () => window.removeEventListener('portfolio-sidebar-change', callback)
}

export function SidebarLinks({
  path,
  mobile = false,
}: {
  path: string
  mobile?: boolean
}) {
  return (
    <nav
      className="sidebar-links"
      aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}
    >
      <a
        href="/"
        aria-label="Home"
        aria-current={path === '/' ? 'page' : undefined}
        title="Home"
      >
        <House size={19} aria-hidden="true" />
        <span>Home</span>
      </a>
      {navigation.map(({ href, label }) => {
        const Icon = icons[href] ?? House
        return (
          <a
            key={href}
            href={href}
            aria-label={label}
            title={label}
            aria-current={path.startsWith(href) ? 'page' : undefined}
          >
            <Icon size={19} aria-hidden="true" />
            <span>{label}</span>
            <span className="sidebar-active-dot" aria-hidden="true" />
          </a>
        )
      })}
    </nav>
  )
}

export function Sidebar({ path }: { path: string }) {
  const collapsed = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.sidebar === 'collapsed',
    () => false,
  )
  return (
    <aside className="portfolio-sidebar" aria-label="Portfolio sidebar">
      <div className="sidebar-top">
        <a
          className="sidebar-brand"
          href="/"
          aria-label={collapsed ? 'Joshua Salvacion, home' : undefined}
          title="Joshua Salvacion, home"
        >
          <img
            src="/brands/joshua-portrait.webp"
            alt=""
            width="160"
            height="160"
          />
          <span className="sidebar-brand-copy">
            Joshua Salvacion <small>Software engineering</small>
          </span>
          <span className="sr-only">, home</span>
        </a>
        <button
          className="sidebar-collapse"
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          aria-controls="sidebar-body"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => {
            document.documentElement.dataset.sidebarAnimated = 'true'
            document.documentElement.dataset.sidebar = collapsed
              ? 'expanded'
              : 'collapsed'
            try {
              localStorage.setItem(
                'portfolio-sidebar',
                collapsed ? 'expanded' : 'collapsed',
              )
            } catch {
              /* Optional preference. */
            }
            window.dispatchEvent(new Event('portfolio-sidebar-change'))
          }}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} aria-hidden="true" />
          ) : (
            <PanelLeftClose size={18} aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="sidebar-body" id="sidebar-body">
        <p className="sidebar-caption">Explore</p>
        <SidebarLinks path={path} />
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-feedback-slot" />
        <a
          className="sidebar-availability"
          href={`mailto:${identity.email}`}
          title="Available for internship opportunities"
        >
          <span aria-hidden="true" />
          <span className="availability-copy">
            Open to opportunities
            <ArrowUpRight size={13} aria-hidden="true" />
          </span>
        </a>
        <ThemeControl />
        <p className="sidebar-footnote">Built with care. Always evolving.</p>
      </div>
    </aside>
  )
}
