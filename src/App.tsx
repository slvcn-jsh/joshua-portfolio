import { Layout } from './components/Layout'
import { CaseStudy } from './components/CaseStudy'
import { projects } from './content/projects'
import { Home } from './pages/Home'
import { Certifications } from './pages/Certifications'
import {
  About,
  Achievements,
  Contact,
  NotFound,
  Projects,
  Resume,
  Skills,
} from './pages/Pages'

export function App({ path }: { path: string }) {
  const cleanPath = path.replace(/\/+$/, '') || '/'
  const project = projects.find((p) => cleanPath === `/projects/${p.slug}`)
  const pages = {
    '/': Home,
    '/projects': Projects,
    '/skills': Skills,
    '/about': About,
    '/achievements': Achievements,
    '/certifications': Certifications,
    '/resume': Resume,
    '/contact': Contact,
  }
  const Page = pages[cleanPath as keyof typeof pages] ?? NotFound
  return (
    <Layout path={cleanPath}>
      {project ? <CaseStudy project={project} /> : <Page />}
    </Layout>
  )
}
