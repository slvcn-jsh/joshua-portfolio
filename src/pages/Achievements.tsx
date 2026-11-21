import { Award, Code2, Expand, ArrowRight } from 'lucide-react'
import { achievements } from '../content/site'
import { PageIntro } from '../components/Layout'
import { ImageViewer } from '../components/ImageViewer'

export function Achievements() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Achievements & activities">
        <p>
          Recognition and participation in design thinking, hackathons and
          technical events.
        </p>
      </PageIntro>
      <div className="achievement-list">
        {achievements.map((a, i) => (
          <article
            className={`achievement ${i === 0 ? 'achievement-featured' : ''}`}
            key={a.title}
            data-reveal
          >
            <div className="achievement-icon">
              {i === 0 ? (
                <Award size={28} aria-hidden="true" />
              ) : (
                <Code2 size={24} aria-hidden="true" />
              )}
            </div>
            <div>
              <p className="eyebrow">{a.type}</p>
              <h2>{a.title}</h2>
              <p className="event-context">{a.description}</p>
            </div>
            <span className="achievement-date">{a.date}</span>
            <figure className="event-evidence">
              <ImageViewer
                className="event-image-link"
                label="Event photograph"
                image={{
                  src: `/images/events/${a.photo}.webp`,
                  width: a.photoWidth,
                  height: a.photoHeight,
                  alt: a.photoAlt,
                  caption: `${a.title} · ${a.type} · ${a.date}. Photo from my event collection.`,
                }}
              >
                <img
                  src={`/images/events/${a.photo}.webp`}
                  alt={a.photoAlt}
                  width={a.photoWidth}
                  height={a.photoHeight}
                  loading="lazy"
                />
                <span className="certificate-enlarge">
                  <Expand size={15} aria-hidden="true" /> Enlarge photo
                </span>
              </ImageViewer>
              <figcaption>From my event collection</figcaption>
            </figure>
          </article>
        ))}
      </div>
      <a className="text-link achievement-note" href="/certifications">
        View certification documents <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  )
}
