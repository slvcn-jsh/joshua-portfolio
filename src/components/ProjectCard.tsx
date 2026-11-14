import { ArrowRight } from 'lucide-react'
import type { Project } from '../content/projects'
import { ExternalLink } from './Layout'

export function ProjectCard({
  project,
  index,
  headingAs = 'h3',
}: {
  project: Project
  index: number
  headingAs?: 'h2' | 'h3'
}) {
  const Heading = headingAs
  return (
    <article className={`project-card ${project.slug}`}>
      <div className="project-copy">
        <div className="project-meta">
          <span className="project-number">0{index + 1}</span>
          <span>{project.category}</span>
        </div>
        <Heading>
          <a href={`/projects/${project.slug}`}>
            {project.name}
            <ArrowUpRightSmall />
          </a>
        </Heading>
        <p className="project-description">{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.name} technologies`}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <p className="project-status">
          <span aria-hidden="true" />
          {project.status}
        </p>
        <div className="project-links">
          <a className="text-link" href={`/projects/${project.slug}`}>
            Read case study <ArrowRight size={16} aria-hidden="true" />
          </a>
          <ExternalLink href={project.repository}>Source code</ExternalLink>
        </div>
        <a
          className="scenario-entry"
          href={`/projects/${project.slug}#walkthrough`}
        >
          <span className="node-number" aria-hidden="true">
            ↳
          </span>
          <span>
            <span className="scenario-entry-label">Behind the interface</span>
            {project.slug === 'pcosina'
              ? 'What if the connection drops?'
              : 'What if the AI service is unavailable?'}
          </span>
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
      <a
        className={`project-preview ${project.slug}-preview`}
        href={`/projects/${project.slug}`}
        aria-label={`${project.slug === 'barion' ? 'Earlier interface · MedStudy' : 'Application captures · Android'} — explore the ${project.name} case study`}
      >
        {project.slug === 'pcosina' ? (
          <div className="phone-pair">
            {project.screenshots.map((s) => (
              <img
                key={s.src}
                src={s.src}
                alt=""
                width={s.width}
                height={s.height}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="barion-captures">
            <img
              className="desktop-capture"
              src={project.screenshots[0].src}
              alt=""
              width="1366"
              height="900"
              loading="lazy"
            />
            <img
              className="mobile-capture"
              src={project.screenshots[1].src}
              alt=""
              width="390"
              height="844"
              loading="lazy"
            />
          </div>
        )}
        <span className="preview-caption">
          {project.slug === 'barion'
            ? 'Earlier interface · MedStudy'
            : 'Application captures · Android'}
        </span>
      </a>
    </article>
  )
}

function ArrowUpRightSmall() {
  return (
    <span className="project-title-arrow" aria-hidden="true">
      ↗
    </span>
  )
}
