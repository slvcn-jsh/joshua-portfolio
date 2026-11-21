import { ArrowRight } from 'lucide-react'
import { skills } from '../content/site'
import { PageIntro } from '../components/Layout'
import { TechnologyList } from '../components/TechnologyList'

export function Skills() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Technical skills">
        <p>
          Tools used across six application projects and this portfolio, with
          the work behind each category.
        </p>
      </PageIntro>
      <div className="skills-list">
        {skills.map((s) => (
          <section className="skill-row" key={s.name} data-reveal>
            <div className="skill-title">
              <h2>{s.name}</h2>
            </div>
            <div>
              <TechnologyList items={s.used} />
              <p className="muted">{s.context}</p>
              {s.studied && (
                <p className="study-note">
                  <strong>Additional background:</strong> {s.studied.join('; ')}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
      <div className="page-end-link">
        <a href="/projects" className="text-link">
          See these skills in practice{' '}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
        <a className="text-link" href="/certifications">
          View certifications <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
