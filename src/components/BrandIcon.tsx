import {
  BrainCircuit,
  CodeXml,
  Database,
  FileSearch,
  GitPullRequest,
  HardDrive,
  MonitorCheck,
  Network,
  Plug,
  TestTubeDiagonal,
  Workflow,
} from 'lucide-react'

const brands: Record<string, string> = {
  Kotlin: 'kotlin.svg',
  Python: 'python.svg',
  TypeScript: 'typescript.svg',
  'Jetpack Compose': 'jetpackcompose.svg',
  'React Native': 'react.svg',
  Expo: 'expo.svg',
  React: 'react.svg',
  FastAPI: 'fastapi.svg',
  Firebase: 'firebase.svg',
  'Supabase integration': 'supabase.svg',
  SQLite: 'sqlite.svg',
  'Expo SQLite': 'sqlite.svg',
  PostgreSQL: 'postgresql.svg',
  Git: 'git.svg',
  GitHub: 'github.svg',
  'Android Studio': 'androidstudio.svg',
  Vite: 'vite.svg',
  'Render configuration': 'render.svg',
  Gmail: 'gmail.svg',
  LinkedIn: 'linkedin.png',
  NestJS: 'nestjs.svg',
  Express: 'express.svg',
  Prisma: 'prisma.svg',
  Zod: 'zod.svg',
  Docker: 'docker.svg',
  Jest: 'jest.svg',
  Vitest: 'vitest.svg',
}
const concepts = {
  SQL: Database,
  Room: Database,
  'Kotlin coroutines': Workflow,
  Playwright: MonitorCheck,
  'Jetpack DataStore': HardDrive,
  'REST APIs': Network,
  'LightGBM integration': BrainCircuit,
  'OR-Tools CP-SAT': Workflow,
  'OR-Tools': Workflow,
  'Source-grounded generation': FileSearch,
  'BM25 retrieval': FileSearch,
  'VS Code': CodeXml,
  'Unit testing': TestTubeDiagonal,
  'Integration testing': Plug,
  'Browser testing': MonitorCheck,
  'CI checks': GitPullRequest,
  'Local-first design': HardDrive,
}

export function BrandIcon({ name }: { name: string }) {
  const asset = brands[name]
  if (asset)
    return (
      <img
        className="brand-icon"
        src={`/brands/${asset}`}
        alt=""
        aria-hidden="true"
        width="28"
        height="28"
        decoding="async"
      />
    )
  const Icon = concepts[name as keyof typeof concepts] ?? CodeXml
  return (
    <Icon
      className="brand-icon concept-icon"
      size={28}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  )
}
