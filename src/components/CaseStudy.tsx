import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../content/projects'
import { projects } from '../content/projects'
import { ExternalLink } from './Layout'
import { ScenarioWalkthrough } from './ScenarioWalkthrough'
import { ProductExplorer } from './ProductExplorer'
import { CaseContents } from './CaseContents'
import { SystemMap } from './SystemMap'
import { ProjectRecording } from './ProjectRecording'
import { ProjectIdentity } from './ProjectIdentity'
import { ProjectGallery } from './ProjectGallery'
import { TechnologyList } from './TechnologyList'

export function CaseStudy({ project: p }: { project: Project }) {
  const other =
    projects[
      (projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length
    ]
  const interactive = p.slug === 'pcosina' || p.slug === 'barion'
  const scenario = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const openLinkedScenario = () => {
      if (window.location.hash === '#walkthrough' && scenario.current) {
        scenario.current.open = true
        document.getElementById('walkthrough')?.scrollIntoView()
      }
    }
    openLinkedScenario()
    window.addEventListener('hashchange', openLinkedScenario)
    return () => window.removeEventListener('hashchange', openLinkedScenario)
  }, [])
  return (
    <div className="container case-page">
      <header className="case-hero">
        <a className="back-link" href="/projects">
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </a>
        <p className="eyebrow">{p.category}</p>
        <h1>
          <ProjectIdentity project={p} />
          {p.name}
        </h1>
        <p className="case-summary">{p.summary}</p>
        <div className="project-brief" id="contributions">
          <div>
            <h2>{interactive ? 'Sole developer' : 'Development work'}</h2>
            <p>{p.ownership}</p>
            <p className="brief-assistance">
              Developed with AI coding assistance.
            </p>
          </div>
          <div>
            <h2>Current evidence</h2>
            <p>{p.verification.summary}</p>
            <p className="small muted">{p.verification.scope}</p>
            <a className="text-link" href="#validation">
              Scope & limitations <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="case-actions">
          <span className="status-label">{p.status}</span>
          {p.repository ? (
            <ExternalLink href={p.repository} className="text-link">
              <Code2 size={17} aria-hidden="true" />
              View source
            </ExternalLink>
          ) : (
            <span className="private-source-note">
              Source repository is private
            </span>
          )}
          <a className="text-link" href="#product">
            See application <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>
      <div className="case-layout">
        <aside className="case-aside">
          <CaseContents />
        </aside>
        <article className="case-body">
          <section id="overview" className="case-section">
            <h2>Problem & approach</h2>
            <p>{p.problem}</p>
            <p>{p.solution}</p>
            <ol className="compact-workflow" id="workflow">
              {p.workflow.map((step, i) => (
                <li key={step.title}>
                  <span className="mono">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section id="product" className="case-section">
            <h2>Inside the application</h2>
            {interactive ? (
              <ProductExplorer project={p} />
            ) : (
              <ProjectGallery project={p} />
            )}
            {p.video && <ProjectRecording video={p.video} />}
            <ul className="feature-summary">
              {p.features.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section id="architecture" className="case-section">
            <h2>System architecture</h2>
            <SystemMap project={p} />
            {interactive && (
              <details className="scenario-disclosure" ref={scenario}>
                <summary>Explore the failure path</summary>
                <ScenarioWalkthrough slug={p.slug} />
              </details>
            )}
            <TechnologyList items={p.stack} />
          </section>
          <section id="engineering" className="case-section">
            <h2>Engineering decisions</h2>
            <div className="decision-list">
              {p.decisions.map((d) => (
                <div key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  {p.repository ? (
                    <ExternalLink
                      className="text-link decision-evidence"
                      href={`${p.repository}/blob/${p.sourceRef}/${d.evidence.path}`}
                    >
                      Source: {d.evidence.label}
                    </ExternalLink>
                  ) : (
                    <p className="small muted decision-evidence">
                      Reviewed: {d.evidence.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="engineering-account">
              <p className="eyebrow">Implementation in focus</p>
              <h3>{p.account.title}</h3>
              <dl>
                <dt>Problem</dt>
                <dd>{p.account.problem}</dd>
                <dt>Implementation</dt>
                <dd>{p.account.implementation}</dd>
              </dl>
            </div>
          </section>
          <section id="validation" className="case-section">
            <h2>Verification & status</h2>
            <h3>{p.verification.summary}</h3>
            <p className="small muted">{p.verification.scope}</p>
            <p>{p.account.verification}</p>
            <p className="verification-limit">{p.account.limit}</p>
            {p.verification.record && (
              <a className="text-link" href={p.verification.record} download>
                Download verification record (JSON)
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            )}
            <div className="status-panel">
              <h3>{p.status}</h3>
              <p>{p.result}</p>
              <p className="muted">{p.limitations}</p>
            </div>
          </section>
          <section id="learnings" className="case-section">
            <h2>Lessons & next steps</h2>
            <p>{p.lessons}</p>
            <p>{p.next}</p>
            <div className="source-panel">
              <h3>
                {p.repository
                  ? 'Explore the implementation'
                  : 'Source & evidence access'}
              </h3>
              {!p.repository && (
                <p>
                  The repository remains private. This case study shares
                  reviewed implementation summaries and safe application
                  captures, not source code or operational records.
                </p>
              )}
              <div className="source-links">
                {p.repository &&
                  p.evidence.map((e) => (
                    <ExternalLink
                      key={e.path}
                      href={`${p.repository}/blob/${p.sourceRef}/${e.path}`}
                    >
                      {e.label}
                    </ExternalLink>
                  ))}
              </div>
              <p className="small muted">{p.snapshot}</p>
            </div>
          </section>
        </article>
      </div>
      <a className="next-project" href={`/projects/${other.slug}`}>
        <div>
          <span className="eyebrow">Another project</span>
          <h2>{other.name}</h2>
          <p>{other.category}</p>
        </div>
        <ArrowRight size={28} aria-hidden="true" />
      </a>
    </div>
  )
}
