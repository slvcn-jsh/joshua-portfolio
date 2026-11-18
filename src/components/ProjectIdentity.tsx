import { CircleDashed, Leaf } from 'lucide-react'
import type { Project } from '../content/projects'

export function ProjectIdentity({ project }: { project: Project }) {
  if (project.slug === 'focusloop' || project.slug === 'freshkeep') {
    const Icon = project.slug === 'focusloop' ? CircleDashed : Leaf
    // Descriptive portfolio symbols, not invented official application logos.
    return (
      <span className={`project-symbol ${project.slug}`} aria-hidden="true">
        <Icon size={28} strokeWidth={1.6} />
      </span>
    )
  }
  const extension =
    project.slug === 'procura' || project.slug === 'resolveops' ? 'svg' : 'webp'
  return (
    <img
      className="project-logo"
      src={`/brands/${project.slug}.${extension}`}
      alt=""
      width="56"
      height="56"
    />
  )
}
