import { useState } from 'react'
import { ArrowDown, Check, Unplug } from 'lucide-react'
import { walkthroughs } from '../content/interactions'

export function ScenarioWalkthrough({ slug }: { slug: string }) {
  const [interrupted, setInterrupted] = useState(false)
  const scenario = walkthroughs[slug]
  const result = scenario.results[interrupted ? 1 : 0]
  return (
    <section
      className="scenario-panel"
      aria-labelledby="scenario-title"
      id="walkthrough"
    >
      <div className="scenario-heading">
        <p className="eyebrow">Behind the interface / {scenario.number}</p>
        <span className="illustration-label">Illustrative walkthrough</span>
      </div>
      <h3 id="scenario-title">{scenario.title}</h3>
      <p className="scenario-intro">{scenario.intro}</p>
      <div
        className="scenario-controls enhanced-only"
        role="group"
        aria-label="Choose an illustrative scenario"
      >
        <button
          type="button"
          aria-pressed={!interrupted}
          onClick={() => setInterrupted(false)}
        >
          {scenario.controls[0]}
        </button>
        <button
          type="button"
          aria-pressed={interrupted}
          onClick={() => setInterrupted(true)}
        >
          <Unplug size={15} aria-hidden="true" />
          {scenario.controls[1]}
        </button>
      </div>
      <div className="scenario-map" data-interrupted={interrupted}>
        <div className="scenario-origin">
          <span className="node-number">01</span>
          <strong>{scenario.origin}</strong>
          <span className="small muted">Two independent paths</span>
        </div>
        <div className="scenario-branches">
          <div className="scenario-path">
            <span className="path-connector" aria-hidden="true">
              <ArrowDown size={16} />
            </span>
            <span className="node-number">02 / On the device</span>
            <h4>{scenario.local.title}</h4>
            <p>{scenario.local.text}</p>
            <span className="path-status">
              <Check size={15} aria-hidden="true" />
              Available locally
            </span>
          </div>
          <div
            className={`scenario-path remote-path ${interrupted ? 'path-interrupted' : ''}`}
          >
            <span className="path-connector" aria-hidden="true">
              <ArrowDown size={16} />
            </span>
            <span className="node-number">03 / Through the API</span>
            <h4>{scenario.remote.title}</h4>
            <p>{scenario.remote.text}</p>
            <span className="path-status">
              {scenario.remote.states[interrupted ? 1 : 0]}
            </span>
          </div>
        </div>
      </div>
      <p
        className="scenario-result"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <strong>{result.title}</strong> {result.text}
      </p>
      <details className="scenario-notes">
        <summary>Read the scenario & implementation limits</summary>
        <p>{scenario.limits}</p>
        <p>
          This source-based illustration makes no network calls, does not change
          your connection and is not a live test or guarantee of release
          readiness. Public source snapshots may precede the audited local
          changes.
        </p>
      </details>
      <a
        className="text-link small"
        href={scenario.evidence.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {scenario.evidence.label} ↗
      </a>
    </section>
  )
}
