import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '../content/projects'
import { ExternalLink } from './Layout'

export function ProjectCard({
  project,
  headingAs = 'h3',
  presentation = 'standard',
}: {
  project: Project
  headingAs?: 'h2' | 'h3'
  presentation?: 'standard' | 'featured' | 'supporting'
}) {
  const Heading = headingAs
  const featured = presentation === 'featured'
  const isPcosina = project.slug === 'pcosina'
  const caption = isPcosina
    ? featured
      ? 'Weekly meal planning · Application capture'
      : 'Meal planning & groceries · Application captures'
    : 'Earlier interface · MedStudy'
  const screenshots = featured
    ? project.screenshots.slice(0, 1)
    : project.screenshots
  return (
    <article className={`project-card ${project.slug} project-${presentation}`}>
      <div className="project-copy">
        <p className="project-meta">
          {featured ? 'Featured project / Android' : project.category}
        </p>
        <Heading>
          <a href={`/projects/${project.slug}`}>
            {project.name}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </Heading>
        <p className="project-description">{project.summary}</p>
        {!featured && (
          <ul className="tag-list" aria-label={`${project.name} technologies`}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <p className="project-status">{project.status}</p>
      </div>
      <a
        className={`project-preview ${project.slug}-preview`}
        href={`/projects/${project.slug}`}
        aria-label={`${caption} — explore the ${project.name} case study`}
      >
        {isPcosina ? (
          <div className="phone-pair">
            {screenshots.map((s) => (
              <img
                key={s.src}
                src={s.src}
                alt=""
                width={s.width}
                height={s.height}
                loading={featured ? 'eager' : 'lazy'}
                fetchPriority={featured ? 'high' : 'auto'}
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
          </div>
        )}
        <span className="preview-caption">{caption}</span>
      </a>
      <div className="project-actions">
        <div className="project-links">
          <a className="text-link" href={`/projects/${project.slug}`}>
            Read case study <ArrowRight size={16} aria-hidden="true" />
          </a>
          <ExternalLink href={project.repository}>Source code</ExternalLink>
        </div>
        {!featured && (
          <a
            className="scenario-entry"
            href={`/projects/${project.slug}#walkthrough`}
          >
            <span>
              {isPcosina
                ? 'What if the connection drops?'
                : 'What if the AI service is unavailable?'}
            </span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
