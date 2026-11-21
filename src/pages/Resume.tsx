import { ArrowRight, Download, FileText, LockKeyhole } from 'lucide-react'
import { identity } from '../content/site'
import { PageIntro } from '../components/Layout'

export function Resume() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Resume">
        <p>
          Education, technical skills, selected projects and activities.
          Download the one-page PDF to read the full document.
        </p>
      </PageIntro>
      <div className="resume-layout">
        <div className="resume-preview resume-obscured">
          <div className="resume-silhouette" aria-hidden="true">
            <div className="resume-silhouette-title" />
            <div className="resume-silhouette-subtitle" />
            {Array.from({ length: 4 }, (_, section) => (
              <div className="resume-silhouette-section" key={section}>
                <span />
                {Array.from({ length: 4 }, (_, line) => (
                  <i key={line} />
                ))}
              </div>
            ))}
          </div>
          <div className="resume-download-cover">
            <LockKeyhole size={26} aria-hidden="true" />
            <p>Take a closer look.</p>
            <span>Download the PDF to read my resume.</span>
            <a
              className="button button-primary"
              href={identity.resume}
              download
            >
              Download resume <Download size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="resume-info">
          <div className="file-icon">
            <FileText size={28} aria-hidden="true" />
          </div>
          <h2>Joshua Escalicas Salvacion</h2>
          <p>Software Engineering Student</p>
          <p className="small muted">PDF document · 1 page · 62 KB</p>
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
