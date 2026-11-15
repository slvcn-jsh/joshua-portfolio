import { ArrowLeft, ArrowRight, Code2, Check } from 'lucide-react'
import type { Project } from '../content/projects'
import { projects } from '../content/projects'
import { ExternalLink } from './Layout'
import { ScenarioWalkthrough } from './ScenarioWalkthrough'
import { ProductExplorer } from './ProductExplorer'
import { CaseContents } from './CaseContents'
import { DecisionChallenge } from './DecisionChallenge'

export function CaseStudy({ project: p }: { project: Project }) {
  const other = projects.find((x) => x.slug !== p.slug)!
  const isFirst = projects[0].slug === p.slug
  const decisionEvidence = p.slug === 'pcosina' ? [0, 1, 0] : [1, 0, 2]
  return (
    <div className="container">
      <div className="case-hero">
        <a className="back-link" href="/projects">
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </a>
        <p className="eyebrow">Engineering case study</p>
        <h1>
          {p.name}
          <span className="status-label">{p.status}</span>
        </h1>
        <p className="case-summary">{p.summary}</p>
        <div className="case-facts">
          <div>
            <span>Platform</span>
            <p>{p.category}</p>
          </div>
          <div>
            <span>Engineering focus</span>
            <p>{p.focus}</p>
          </div>
          <ExternalLink href={p.repository} className="button button-secondary">
            <Code2 size={17} aria-hidden="true" />
            View source
          </ExternalLink>
        </div>
      </div>
      <div className="case-layout">
        <aside className="case-aside">
          <CaseContents />
        </aside>
        <article className="case-body">
          <section id="overview" className="case-section">
            <h2>Problem & context</h2>
            <p>{p.problem}</p>
            <div className="user-callout">
              <h3>Who it’s for</h3>
              <p>{p.users}</p>
            </div>
            <h3>The approach</h3>
            <p>{p.solution}</p>
          </section>
          <section id="product" className="case-section">
            <h2>Features & application screens</h2>
            <div className="feature-grid">
              {p.features.map((f) => (
                <div key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
            <ProductExplorer project={p} />
          </section>
          <section id="workflow" className="case-section">
            <h2>User workflow</h2>
            <ol className="workflow">
              {p.workflow.map((step, i) => (
                <li key={step.title}>
                  <span className="step-number">{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section id="architecture" className="case-section">
            <h2>System architecture</h2>
            <figure className="architecture-figure">
              <div className="architecture-grid">
                {p.architecture.map((layer, i) => (
                  <div className="architecture-node" key={layer.title}>
                    <span className="mono">0{i + 1}</span>
                    <h3>{layer.title}</h3>
                    <p>{layer.text}</p>
                  </div>
                ))}
              </div>
              <figcaption>{p.architectureNote}</figcaption>
            </figure>
            <ScenarioWalkthrough slug={p.slug} />
            <h3>Core technology stack</h3>
            <ul className="tag-list stack-list">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section id="engineering" className="case-section">
            <h2>Engineering decisions</h2>
            <div className="decision-list">
              {p.decisions.map((d, index) => (
                <div key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  <ExternalLink
                    className="text-link decision-evidence"
                    href={`${p.repository}/blob/${p.slug === 'barion' ? '7e83b70' : '1840999'}/${p.evidence[decisionEvidence[index]].path}`}
                  >
                    Source: {p.evidence[decisionEvidence[index]].label}
                  </ExternalLink>
                </div>
              ))}
            </div>
            <h3 className="subsection-title">Challenges & responses</h3>
            {p.challenges.map((c) => (
              <div className="challenge" key={c.title}>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            ))}
            {p.slug === 'barion' && <DecisionChallenge />}
          </section>
          <section id="validation" className="case-section">
            <h2>Testing & project status</h2>
            <h3>Testing approach</h3>
            <ul className="evidence-list">
              {p.testing.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="status-panel">
              <p className="eyebrow">Current project status</p>
              <p>{p.result}</p>
              <p className="muted">{p.limitations}</p>
            </div>
          </section>
          <section id="contributions" className="case-section">
            <h2>My contributions</h2>
            <ul className="contribution-list">
              {p.contributions.map((c) => (
                <li key={c}>
                  <Check size={17} aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="ownership-note">
              I developed this application with assistance from AI coding tools.
              My work includes product direction, implementation, integration,
              debugging and verification; this is not a claim that every line
              was written without assistance.
            </p>
          </section>
          <section id="learnings" className="case-section">
            <h2>Lessons & next steps</h2>
            <p>{p.lessons}</p>
            <h3>Next improvements</h3>
            <p>{p.next}</p>
            <div className="source-panel">
              <h3>Explore the implementation</h3>
              <div className="source-links">
                {p.evidence.map((e) => (
                  <ExternalLink
                    key={e.path}
                    href={`${p.repository}/blob/${p.slug === 'barion' ? '7e83b70' : '1840999'}/${e.path}`}
                  >
                    {e.label}
                  </ExternalLink>
                ))}
              </div>
              <p className="small muted">{p.snapshot}</p>
              <p className="small muted">
                No verified public live demo is linked. Application captures and
                source code are available above.
              </p>
            </div>
          </section>
        </article>
      </div>
      <a className="next-project" href={`/projects/${other.slug}`}>
        <div>
          <span className="eyebrow">
            {isFirst ? 'Next project' : 'Previous project'}
          </span>
          <h2>{other.name}</h2>
          <p>{other.category}</p>
        </div>
        {isFirst ? (
          <ArrowRight size={28} aria-hidden="true" />
        ) : (
          <ArrowLeft size={28} aria-hidden="true" />
        )}
      </a>
    </div>
  )
}
