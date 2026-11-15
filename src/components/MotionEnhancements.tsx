import { useEffect } from 'react'

/** Progressive enhancement: content remains visible before, without or after JS. */
export function MotionEnhancements() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (!preference.matches) entry.target.classList.add('is-revealing')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((element) => observer.observe(element))
    const stop = () => {
      if (preference.matches) {
        observer.disconnect()
        elements.forEach((element) => element.classList.remove('is-revealing'))
      }
    }
    preference.addEventListener('change', stop)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', stop)
      elements.forEach((element) => element.classList.remove('is-revealing'))
    }
  }, [])
  return null
}
