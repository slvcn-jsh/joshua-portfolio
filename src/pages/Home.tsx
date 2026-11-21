import { ArrowRight, Download } from 'lucide-react'
import { identity } from '../content/site'
import { TechnologyList } from '../components/TechnologyList'
import { ProjectShowcase } from '../components/ProjectShowcase'

export function Home() {
  return (
    <div className="container home-page">
      <section className="home-introduction" aria-labelledby="intro-title">
        <p className="intro-role">Software Engineering Student</p>
        <h1 id="intro-title">
          Joshua Escalicas
          <br />
          <span>Salvacion</span>
        </h1>
        <div className="intro-context">
          <p className="intro-description">
            I build Android applications and dependable web workflows.
          </p>
          <p className="intro-availability">
            Seeking a software engineering internship.
          </p>
          <a className="intro-education" href="/about#education">
            <span className="education-mini-mark">
              <img
                src="/brands/feu-tech-64.webp"
                srcSet="/brands/feu-tech-64.webp 64w, /brands/feu-tech-128.webp 128w"
                sizes="26px"
                alt=""
                width="64"
                height="78"
              />
            </span>
            <span>
              <strong>FEU Institute of Technology</strong>
              <span>
                BS Computer Science · Software Engineering
                <br />
                Fourth-year student
              </span>
            </span>
          </a>
          <div className="intro-languages">
            <span>Primary languages</span>
            <TechnologyList
              items={['Kotlin', 'Python', 'TypeScript']}
              primary
            />
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="/projects">
              View projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href={identity.resume} download>
              Download resume <Download size={16} aria-hidden="true" />
            </a>
          </div>
          <a
            className="intro-email text-link"
            href={`mailto:${identity.email}`}
          >
            {identity.email}
          </a>
        </div>
      </section>
      <ProjectShowcase />
    </div>
  )
}
