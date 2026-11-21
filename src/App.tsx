import type { ReactNode } from 'react'
import { Layout } from './components/Layout'

/** Server and browser share the same shell and resolved component tree. */
export function App({ path, children }: { path: string; children: ReactNode }) {
  return <Layout path={path}>{children}</Layout>
}
