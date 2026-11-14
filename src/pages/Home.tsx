import {
  ArrowRight,
  ArrowUpRight,
  Download,
  GraduationCap,
  Code2,
  Layers3,
} from 'lucide-react'
import { identity } from '../content/site'
import { projects } from '../content/projects'
import { ProjectCard } from '../components/ProjectCard'
import { ContactBand } from '../components/Layout'

export function Home() {
  return (
    <div className="container">
      <section className="home-hero">
        <div className="hero-main">
          <p className="eyebrow">
            <span className="tiny-rule" />
            Software engineering portfolio
          </p>
          <h1>
            Joshua Escalicas
            <br />
            Salvacion<span className="accent">.</span>
          </h1>
          <p className="hero-role">Software Engineering Student</p>
          <p className="hero-description">
            I build mobile applications and the systems behind them. Fourth-year
            Computer Science student at FEU Institute of Technology, focused on
            practical, reliable software.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/projects">
              View projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href={identity.resume}
              download
            >
              Download resume <Download size={16} aria-hidden="true" />
            </a>
            <a className="hero-contact text-link" href="/contact">
              Contact <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-project-index">
            <span className="small-label">Explore the work</span>
            <a href="/projects/pcosina">
              PCOSina <span>Android meal planning</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="/projects/barion">
              Barion <span>Cross-platform learning</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="hero-details" aria-label="Background and core skills">
          <div className="detail-block">
            <GraduationCap size={19} aria-hidden="true" />
            <div>
              <span className="detail-label">Education</span>
              <p>BS Computer Science</p>
              <span className="small muted">
                Major in Software Engineering
                <br />
                FEU Institute of Technology
              </span>
            </div>
          </div>
          <div className="detail-block">
            <Code2 size={19} aria-hidden="true" />
            <div>
              <span className="detail-label">Primary languages</span>
              <p>Kotlin · Python · TypeScript</p>
              <span className="small muted">Also on my resume: Java</span>
            </div>
          </div>
          <div className="detail-block">
            <Layers3 size={19} aria-hidden="true" />
            <div>
              <span className="detail-label">Working across</span>
              <p>Mobile · Backend · Local data</p>
              <span className="small muted">
                Compose, React Native, Expo & FastAPI
              </span>
            </div>
          </div>
          <a className="text-link small" href="/skills">
            Explore technical skills <ArrowRight size={15} aria-hidden="true" />
          </a>
        </aside>
      </section>
      <section className="selected-work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Two projects. Real engineering decisions.</h2>
          </div>
          <a className="text-link" href="/projects">
            All projects <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="project-list">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="home-about">
        <div>
          <p className="eyebrow">Beyond the code</p>
          <h2>
            Learning by building,
            <br />
            testing and refining.
          </h2>
        </div>
        <div>
          <p>
            My work brings together interface development, backend integration
            and careful handling of local data. I’m interested in how these
            parts become an application someone can depend on.
          </p>
          <p>
            Alongside my coursework, I’ve participated in hackathons and earned
            championship recognition at the FEU Tech Design Thinking Summit and
            ITAM Design Jam.
          </p>
          <div className="inline-links">
            <a className="text-link" href="/about">
              More about me <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href="/achievements">
              Achievements <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <ContactBand />
    </div>
  )
}
