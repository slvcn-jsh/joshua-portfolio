import { useState } from 'react'
import { Expand } from 'lucide-react'
import type { Project } from '../content/projects'
import { annotations } from '../content/interactions'
import { ImageViewer } from './ImageViewer'

export function ProductExplorer({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0)
  const content = annotations[project.slug]
  const image = project.screenshots.find((item) => item.src === content.image)!
  const otherImages = project.screenshots.filter(
    (item) => item.src !== content.image,
  )
  const annotation = content.items[selected]
  return (
    <div className="product-explorer">
      <div className="explorer-heading">
        <p className="eyebrow">Read the interface</p>
        <h3>{content.title}</h3>
        <p className="capture-note">{content.note}</p>
      </div>
      <div className="explorer-layout">
        <figure className="annotated-capture">
          <ImageViewer image={image} className="capture-link">
            <span className="capture-image">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              <span
                className={`capture-highlight enhanced-only region-${annotation.region}`}
                aria-hidden="true"
              >
                <span>{String(selected + 1).padStart(2, '0')}</span>
              </span>
            </span>
            <span className="enlarge-label">
              <Expand size={14} aria-hidden="true" />
              Enlarge image
            </span>
          </ImageViewer>
          <figcaption>{image.caption}</figcaption>
        </figure>
        <div className="annotation-notes">
          <div
            className="annotation-controls enhanced-only"
            role="group"
            aria-label="Explore the screenshot"
          >
            {content.items.map((item, index) => (
              <button
                type="button"
                key={item.label}
                aria-pressed={selected === index}
                aria-controls="annotation-explanation"
                onClick={() => setSelected(index)}
              >
                <span className="node-number">0{index + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div
            className="annotation-explanation"
            id="annotation-explanation"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="node-number">
              0{selected + 1} / {annotation.label}
            </span>
            <h4>{annotation.title}</h4>
            <p>{annotation.text}</p>
          </div>
          <noscript>
            <div className="static-annotations">
              {content.items.slice(1).map((item) => (
                <div key={item.label}>
                  <h4>
                    {item.label}: {item.title}
                  </h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </noscript>
          <a className="text-link small" href="#engineering">
            Explore the engineering decisions →
          </a>
        </div>
      </div>
      <details className="additional-captures">
        <summary>
          More application captures{' '}
          <span className="small muted">({otherImages.length})</span>
        </summary>
        <div className={`screenshot-gallery ${project.slug}-gallery`}>
          {otherImages.map((screenshot) => (
            <figure key={screenshot.src}>
              <ImageViewer image={screenshot}>
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  loading="lazy"
                  decoding="async"
                />
              </ImageViewer>
              <figcaption>
                {screenshot.caption} <span>Enlarge image ↗</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </details>
    </div>
  )
}
