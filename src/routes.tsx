import { pageMeta } from './content/site'

const pages = {
  '/': () => import('./pages/Home').then((m) => m.Home),
  '/projects': () => import('./pages/Projects').then((m) => m.Projects),
  '/skills': () => import('./pages/Skills').then((m) => m.Skills),
  '/about': () => import('./pages/About').then((m) => m.About),
  '/achievements': () =>
    import('./pages/Achievements').then((m) => m.Achievements),
  '/certifications': () =>
    import('./pages/Certifications').then((m) => m.Certifications),
  '/resume': () => import('./pages/Resume').then((m) => m.Resume),
  '/contact': () => import('./pages/Contact').then((m) => m.Contact),
}

/** Resolve before rendering, with no loading fallback during hydration. */
export async function resolvePage(path: string) {
  const cleanPath = path.replace(/\/+$/, '') || '/'
  if (cleanPath.startsWith('/projects/') && pageMeta[cleanPath]) {
    const [{ CaseStudy }, { projects }] = await Promise.all([
      import('./components/CaseStudy'),
      import('./content/projects'),
    ])
    const project = projects.find((p) => cleanPath === `/projects/${p.slug}`)
    if (project) return <CaseStudy project={project} />
  }
  const load =
    pages[cleanPath as keyof typeof pages] ??
    (() => import('./pages/NotFound').then((m) => m.NotFound))
  const Page = await load()
  return <Page />
}
