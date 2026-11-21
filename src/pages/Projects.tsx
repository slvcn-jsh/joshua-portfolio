import { Code2 } from 'lucide-react'
import { PageIntro, ContactBand } from '../components/Layout'
import { ProjectCollection } from '../components/ProjectCollection'

export function Projects() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Selected projects">
        <p>
          Start with PCOSina and Barion for the clearest view of my application
          work, then explore four more Android and web projects. Each case study
          separates implemented behavior from remaining work.
        </p>
      </PageIntro>
      <ProjectCollection />
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
