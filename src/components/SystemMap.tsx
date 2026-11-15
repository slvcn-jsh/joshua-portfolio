import { ArrowDown, ArrowUp } from 'lucide-react'
import type { Project } from '../content/projects'

export function SystemMap({ project }: { project: Project }) {
  const planning = project.slug === 'pcosina'
  return (
    <figure className="system-map">
      <div className="system-client">
        <span className="eyebrow">On the device</span>
        <h3>
          {planning
            ? 'Kotlin / Compose application'
            : 'React Native / Expo application'}
        </h3>
        <p>
          {planning
            ? 'Preferences, weekly meals and groceries'
            : 'Source library, cards and review controls'}
        </p>
      </div>
      <div className="system-branches">
        <div className="system-branch">
          <p className="flow-label">
            <ArrowDown size={16} aria-hidden="true" />
            Read / write locally
          </p>
          <div className="system-node">
            <span className="eyebrow">Local boundary</span>
            <h3>
              {planning ? 'Repositories + DataStore' : 'SQLite + TS-FSRS'}
            </h3>
            <p>
              {planning
                ? 'Preferences and saved plan artifacts'
                : 'Sources, cards, ratings and scheduler state'}
            </p>
          </div>
          <p className="flow-label">
            <ArrowUp size={16} aria-hidden="true" />
            {planning ? 'Saved week & groceries' : 'Cards & next review'}
          </p>
        </div>
        <div className="system-branch">
          <p className="flow-label">
            <ArrowDown size={16} aria-hidden="true" />
            {planning
              ? 'Planning request over network'
              : 'Optional generation request'}
          </p>
          <div className="system-node remote-node">
            <span className="eyebrow">Backend boundary</span>
            <h3>Python / FastAPI</h3>
            <p>
              {planning
                ? 'Rule filtering → optional ranking → CP-SAT selection'
                : 'Retrieval → configured provider → validation'}
            </p>
          </div>
          <p className="flow-label">
            <ArrowUp size={16} aria-hidden="true" />
            {planning
              ? 'Plan or explicit failure'
              : 'Candidates with provenance'}
          </p>
        </div>
      </div>
      <figcaption>{project.architectureNote}</figcaption>
    </figure>
  )
}
