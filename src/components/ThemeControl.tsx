import { useSyncExternalStore } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

function subscribe(callback: () => void) {
  window.addEventListener('portfolio-theme-applied', callback)
  return () => window.removeEventListener('portfolio-theme-applied', callback)
}

export function ThemeControl() {
  const preference = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.themePreference ?? 'system',
    () => 'system',
  )
  const Icon =
    preference === 'system' ? Monitor : preference === 'dark' ? Moon : Sun
  return (
    <label className="theme-control">
      <Icon size={16} aria-hidden="true" />
      <span className="sr-only">Color theme</span>
      <select
        value={preference}
        onChange={(event) => {
          window.dispatchEvent(
            new CustomEvent('portfolio-theme-change', {
              detail: event.target.value,
            }),
          )
        }}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  )
}
