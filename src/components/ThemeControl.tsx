import { useRef, useSyncExternalStore } from 'react'
import { Monitor } from 'lucide-react'

function subscribe(callback: () => void) {
  window.addEventListener('portfolio-theme-applied', callback)
  return () => window.removeEventListener('portfolio-theme-applied', callback)
}

export function ThemeControl() {
  const state = useSyncExternalStore(
    subscribe,
    () =>
      `${document.documentElement.dataset.themePreference ?? 'system'}:${document.documentElement.dataset.theme ?? 'light'}`,
    () => 'system:light',
  )
  const [preference, theme] = state.split(':')
  const transition = useRef<ViewTransition | null>(null)
  function change(next: string) {
    const apply = () => {
      window.dispatchEvent(
        new CustomEvent('portfolio-theme-change', { detail: next }),
      )
    }
    transition.current?.skipTransition()
    if (
      document.startViewTransition &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.documentElement.dataset.themeTransition = 'true'
      transition.current = document.startViewTransition(apply)
      const current = transition.current
      void current.finished
        .catch(() => {})
        .finally(() => {
          if (transition.current === current)
            delete document.documentElement.dataset.themeTransition
        })
    } else apply()
  }
  return (
    <div className="theme-control">
      <button
        type="button"
        className="theme-scene-button"
        title={`Switch to ${theme === 'dark' ? 'day' : 'night'} theme`}
        onClick={() => change(theme === 'dark' ? 'light' : 'dark')}
      >
        <span className="theme-landscape" aria-hidden="true">
          <span className="theme-stars" />
          <span className="theme-orb" />
          <span className="theme-hill theme-hill-back" />
          <span className="theme-hill" />
        </span>
        <span className="theme-copy">
          <span>{theme === 'dark' ? 'After hours' : 'A little daylight'}</span>{' '}
          <small>
            {theme === 'dark' ? 'Bring in the sun' : 'Settle into night'}
          </small>
        </span>
        <span className="sr-only">
          . Switch to {theme === 'dark' ? 'day' : 'night'} theme
        </span>
      </button>
      <button
        type="button"
        className="theme-system"
        aria-label="Use system theme"
        aria-pressed={preference === 'system'}
        title="Follow device theme"
        onClick={() => change('system')}
      >
        <Monitor size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
