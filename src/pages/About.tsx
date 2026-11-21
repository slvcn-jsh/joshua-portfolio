import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PageIntro } from '../components/Layout'

export function About() {
  useEffect(() => {
    // Restore the education deep link after hydration has settled the layout.
    if (window.location.hash === '#education') {
      document
        .getElementById('education')
        ?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [])
  return (
    <div className="container page-bottom">
      <PageIntro title="About me">
        <p>
          My development interests span mobile and web applications, backend
          services and reliable data. I’m working toward a career in software
          engineering.
        </p>
      </PageIntro>
      <div className="about-layout">
        <div className="about-prose">
          <section>
            <h2>Application development</h2>
            <p>
              I’m the sole developer of PCOSina and Barion, working across the
              interface, local storage and supporting backend services with AI
              coding assistance. FocusLoop and FreshKeep extend my native
              Android work; ResolveOps and Procura bring that attention to data
              and workflow correctness into React and TypeScript web systems.
            </p>
          </section>
          <section>
            <h2>How I approach the work</h2>
            <p>
              I start with the user’s next action and the data it needs. In
              PCOSina, viewing a saved meal plan is separate from generating a
              new one. In Barion, reviewing saved cards is separate from
              requesting AI-generated candidates.
            </p>
            <p>
              I use that separation to keep everyday tasks independent of
              optional services. The case studies show the implementation,
              focused checks and limits—not just the intended behavior.
            </p>
          </section>
          <nav
            className="background-links"
            aria-label="More about my background"
          >
            <a className="text-link" href="/achievements">
              Achievements & activities{' '}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href="/certifications">
              Certification documents{' '}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </nav>
          <section>
            <h2>What’s next</h2>
            <p>
              I’m pursuing software engineering internship opportunities where I
              can contribute to application development, learn from an
              experienced team and strengthen my engineering practice.
            </p>
            <a className="text-link" href="/contact">
              Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>
        </div>
        <aside className="education-panel" id="education">
          <div className="education-identity">
            <a
              href="https://www.feutech.edu.ph/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FEU Institute of Technology official website (opens in a new tab)"
            >
              <img
                src="/brands/feu-tech-128.webp"
                srcSet="/brands/feu-tech-64.webp 64w, /brands/feu-tech-128.webp 128w"
                sizes="48px"
                alt="FEU Tech"
                width="128"
                height="156"
                loading="lazy"
              />
            </a>
            <div>
              <p className="eyebrow">Education</p>
              <h2>FEU Institute of Technology</h2>
            </div>
          </div>
          <p className="education-degree">BS Computer Science</p>
          <p className="muted">Major in Software Engineering</p>
          <div className="education-meta">
            <span>Fourth-year student</span>
            <span>August 2023 – Present</span>
          </div>
          <a className="text-link" href="/resume">
            View resume <ArrowRight size={16} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </div>
  )
}
