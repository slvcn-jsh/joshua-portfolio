import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Download,
  FileText,
  Expand,
  Code2,
  GraduationCap,
} from 'lucide-react'
import { identity, skills, achievements } from '../content/site'
import { projects } from '../content/projects'
import { PageIntro, ExternalLink, ContactBand } from '../components/Layout'
import { ProjectCard } from '../components/ProjectCard'
import { TechnologyList } from '../components/TechnologyList'
import { BrandIcon } from '../components/BrandIcon'
import { ImageViewer } from '../components/ImageViewer'

export function Projects() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Selected projects">
        <p>
          Two applications, from interface to implementation. Explore the
          decisions, tradeoffs and development work behind each one.
        </p>
      </PageIntro>
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} headingAs="h2" />
        ))}
      </div>
      <div className="editorial-note">
        <Code2 size={20} aria-hidden="true" />
        <p>
          Developed with AI coding assistance. Each case study describes my
          implementation and integration work, supported by source code and
          clear project-status notes.
        </p>
      </div>
      <ContactBand />
    </div>
  )
}

export function Skills() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Technical skills">
        <p>The tools I’ve used to build PCOSina, Barion and this portfolio.</p>
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

export function About() {
  return (
    <div className="container page-bottom">
      <PageIntro title="About Joshua">
        <p>
          My development interests span mobile applications, backend services
          and local data. I’m working toward a career in software engineering.
        </p>
      </PageIntro>
      <div className="about-layout">
        <div className="about-prose">
          <section>
            <h2>Application development</h2>
            <p>
              PCOSina and Barion have given me practical work across native
              Android and cross-platform development. Both projects require
              thinking beyond individual screens—about how data moves, what
              happens offline and how failures should be handled.
            </p>
          </section>
          <section>
            <h2>How I learn</h2>
            <p>
              I learn through implementation, inspection and iteration. I use
              documentation, tests and debugging to check whether an approach
              works, and I use AI coding tools as part of that process.
            </p>
            <p>
              My responsibility is to understand the design, integrate the
              pieces and verify the behavior. I value clear limitations and
              reproducible checks as much as a working feature.
            </p>
          </section>
          <section>
            <h2>What’s next</h2>
            <p>
              I’m pursuing software engineering internship opportunities where I
              can contribute to application development, learn from an
              experienced team and strengthen my engineering practice.
            </p>
            <a className="text-link" href="/contact">
              Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>
        </div>
        <aside className="education-panel">
          <GraduationCap size={26} aria-hidden="true" />
          <p className="eyebrow">Education</p>
          <h2>
            FEU Institute
            <br />
            of Technology
          </h2>
          <p>
            Bachelor of Science
            <br />
            in Computer Science
          </p>
          <p className="muted">
            Major in Software Engineering
            <br />
            Fourth-year student
          </p>
          <div className="panel-rule" />
          <p className="small muted">August 2023 – Present</p>
          <a className="text-link" href="/resume">
            View resume <ArrowRight size={16} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </div>
  )
}

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

export function Resume() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Resume">
        <p>
          Education, technical skills, selected projects and activities.
          Download the one-page PDF or open it in your browser.
        </p>
      </PageIntro>
      <div className="resume-layout">
        <div className="resume-preview">
          <a
            href={identity.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Joshua Salvacion’s resume PDF in a new tab"
          >
            <img
              src="/images/resume-preview.webp"
              alt="Preview of Joshua Escalicas Salvacion’s approved one-page resume. The original PDF is available using the download and open links."
              width="850"
              height="1100"
            />
          </a>
        </div>
        <div className="resume-info">
          <div className="file-icon">
            <FileText size={28} aria-hidden="true" />
          </div>
          <h2>Joshua Escalicas Salvacion</h2>
          <p>Software Engineering Student</p>
          <p className="small muted">PDF document · 1 page · 62 KB</p>
          <a className="button button-primary" href={identity.resume} download>
            Download resume <Download size={17} aria-hidden="true" />
          </a>
          <ExternalLink
            href={identity.resume}
            className="button button-secondary"
          >
            Open PDF
          </ExternalLink>
          <div className="panel-rule" />
          <p>Looking for more context on the projects?</p>
          <a className="text-link" href="/projects">
            Read the case studies <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }
  return (
    <div className="container page-bottom contact-page">
      <PageIntro title="Contact">
        <p>
          For software engineering internships, project conversations or
          questions about my work, email is the best way to reach me.
        </p>
      </PageIntro>
      <div className="contact-grid">
        <section className="contact-card" data-reveal>
          <BrandIcon name="Gmail" />
          <p className="eyebrow">Email</p>
          <h2>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </h2>
          <p>Send a message directly from your email app.</p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${identity.email}`}
            >
              Send email <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button className="button button-secondary" onClick={copyEmail}>
              {copyState === 'copied' ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              {copyState === 'copied' ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <p className="copy-status small" role="status" aria-live="polite">
            {copyState === 'copied'
              ? 'Email address copied to your clipboard.'
              : copyState === 'failed'
                ? 'Copy is unavailable. Select the email address above or use Send email.'
                : ''}
          </p>
        </section>
        <section className="contact-card github-card" data-reveal>
          <BrandIcon name="GitHub" />
          <p className="eyebrow">GitHub</p>
          <h2>slvcn-jsh</h2>
          <p>
            Explore the repositories behind the projects and follow my
            development work.
          </p>
          <ExternalLink href={identity.github}>
            Visit GitHub profile
          </ExternalLink>
        </section>
        <section className="contact-card linkedin-card" data-reveal>
          <a
            className="contact-brand-link"
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Joshua Salvacion on LinkedIn (opens in a new tab)"
          >
            <BrandIcon name="LinkedIn" />
          </a>
          <p className="eyebrow">LinkedIn</p>
          <h2>Joshua Salvacion</h2>
          <p>
            Connect with me professionally and continue the conversation about
            software engineering.
          </p>
          <ExternalLink href={identity.linkedin}>
            Visit LinkedIn profile
          </ExternalLink>
        </section>
      </div>
      <div className="contact-extra">
        <p>Prefer a quick overview of my background?</p>
        <a className="text-link" href="/resume">
          View my resume <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="container not-found">
      <PageIntro title="404 — Page not found">
        <p>
          The address may have changed. You can return home or explore the
          selected projects.
        </p>
      </PageIntro>
      <div className="inline-links">
        <a className="button button-primary" href="/">
          Back to home <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a className="button button-secondary" href="/projects">
          View projects
        </a>
      </div>
    </div>
  )
}
