import { useEffect, useState } from 'react'

const sections = [
  ['overview', 'Problem & approach'],
  ['product', 'Inside the application'],
  ['architecture', 'System architecture'],
  ['engineering', 'Engineering decisions'],
  ['validation', 'Verification & status'],
  ['learnings', 'Lessons & next steps'],
]

export function CaseContents() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = Math.min(window.innerHeight * 0.25, 180)
      let current = sections[0][0]
      for (const [id] of sections) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= threshold
        )
          current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  const links = (
    <>
      {sections.map(([id, label], index) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? 'location' : undefined}
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return
            const section = document.getElementById(id)
            const heading = section?.querySelector('h2')
            if (heading) {
              event.preventDefault()
              if (window.location.hash !== `#${id}`)
                window.history.pushState(null, '', `#${id}`)
              section?.scrollIntoView({ block: 'start', behavior: 'instant' })
              heading.tabIndex = -1
              heading.focus({ preventScroll: true })
            }
          }}
        >
          <span>0{index + 1}</span>
          {label}
        </a>
      ))}
    </>
  )
  return (
    <>
      <nav className="case-contents-desktop" aria-label="Case study contents">
        <p className="eyebrow">In this case study</p>
        {links}
      </nav>
      <details className="case-contents-mobile">
        <summary>
          In this case study <span className="small muted">6 sections</span>
        </summary>
        <nav aria-label="Case study contents">{links}</nav>
      </details>
    </>
  )
}
