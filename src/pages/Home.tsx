import { ArrowRight, Download } from 'lucide-react'
import { identity } from '../content/site'
import { projects } from '../content/projects'
import { ProjectCard } from '../components/ProjectCard'
import { TechnologyList } from '../components/TechnologyList'

export function Home() {
  return (
    <div className="container home-page">
      <div className="home-overview">
        <section
          className="home-introduction"
          aria-labelledby="intro-title"
          data-reveal
        >
          <p className="intro-role">Software Engineering Student</p>
          <h1 id="intro-title">
            Joshua Escalicas
            <br />
            <span>Salvacion</span>
          </h1>
          <p className="intro-description">
            I build mobile applications and the systems behind them.
          </p>
          <p className="intro-education">
            Fourth-year BS Computer Science student at FEU Institute of
            Technology, majoring in Software Engineering.
          </p>
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
        </section>
        <ProjectCard
          project={projects[0]}
          headingAs="h2"
          presentation="featured"
        />
      </div>
      <ProjectCard
        project={projects[1]}
        headingAs="h2"
        presentation="supporting"
      />
    </div>
  )
}
