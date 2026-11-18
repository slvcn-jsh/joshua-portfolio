import { Expand } from 'lucide-react'
import type { Project } from '../content/projects'
import { ImageViewer } from './ImageViewer'

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <div
      className={`project-gallery ${project.platform === 'Android' ? 'native-gallery' : 'web-gallery'}`}
    >
      {project.screenshots.map((capture, index) => (
        <figure key={capture.src}>
          <ImageViewer
            image={capture}
            label={`${project.name} capture ${index + 1}`}
            className={`gallery-capture${capture.height > capture.width * 2.5 ? ' gallery-tall' : ''}`}
          >
            <span className="gallery-viewport">
              <img
                src={capture.src}
                alt={capture.alt}
                width={capture.width}
                height={capture.height}
                loading="lazy"
              />
            </span>
            <span className="gallery-expand">
              <Expand size={15} aria-hidden="true" /> Enlarge full capture
            </span>
          </ImageViewer>
          <figcaption>{capture.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
