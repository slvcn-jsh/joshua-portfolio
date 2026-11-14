export const identity = {
  name: 'Joshua Escalicas Salvacion',
  shortName: 'Joshua Salvacion',
  role: 'Software Engineering Student',
  email: 'salvacion.jsh@gmail.com',
  github: 'https://github.com/slvcn-jsh',
  resume: '/Joshua-Salvacion-Resume.pdf',
}

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/about', label: 'About' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export const pageMeta: Record<string, { title: string; description: string }> =
  {
    '/': {
      title: 'Joshua Salvacion | Software Engineering Student',
      description:
        'Joshua Escalicas Salvacion, fourth-year Computer Science student at FEU Tech. Explore Android and cross-platform projects, engineering case studies, skills and resume.',
    },
    '/projects': {
      title: 'Selected Projects | Joshua Salvacion',
      description:
        'PCOSina and Barion: software engineering case studies covering mobile applications, local data, backend integration and testing.',
    },
    '/projects/pcosina': {
      title: 'PCOSina — Meal Planning Case Study | Joshua Salvacion',
      description:
        'A Kotlin and Jetpack Compose meal-planning application with a FastAPI backend, constraint optimization and local access to saved plans.',
    },
    '/projects/barion': {
      title: 'Barion — Learning Application Case Study | Joshua Salvacion',
      description:
        'A React Native and Expo learning application with SQLite storage, FSRS scheduling, source-linked cards and an optional Python AI gateway.',
    },
    '/skills': {
      title: 'Technical Skills | Joshua Salvacion',
      description:
        'Project-based experience in Kotlin, Python, TypeScript, mobile development, backend integration, local data and software testing.',
    },
    '/about': {
      title: 'About | Joshua Salvacion',
      description:
        'Meet Joshua Escalicas Salvacion, a fourth-year BS Computer Science student majoring in Software Engineering at FEU Institute of Technology.',
    },
    '/achievements': {
      title: 'Achievements & Activities | Joshua Salvacion',
      description:
        'Design Thinking Summit and ITAM Design Jam champion, with participation in HACKathon 2025 and BASE BUILD Global Buildathon 2025.',
    },
    '/resume': {
      title: 'Resume | Joshua Salvacion',
      description:
        'View or download Joshua Escalicas Salvacion’s approved software engineering internship resume as a one-page PDF.',
    },
    '/contact': {
      title: 'Contact | Joshua Salvacion',
      description:
        'Contact Joshua Salvacion for software engineering internships and project conversations. Email and GitHub links.',
    },
    '/404': {
      title: 'Page Not Found | Joshua Salvacion',
      description:
        'Return to Joshua Salvacion’s portfolio or explore the selected software engineering projects.',
    },
  }

export const skills = [
  {
    name: 'Programming languages',
    used: ['Kotlin', 'Python', 'TypeScript', 'SQL'],
    context:
      'Android application code, Python services, cross-platform UI and database queries.',
    studied: ['Java — additional language listed in my resume'],
  },
  {
    name: 'Mobile & application development',
    used: ['Jetpack Compose', 'React Native', 'Expo', 'React'],
    context:
      'PCOSina’s native Android client, Barion’s shared application code, and this portfolio.',
  },
  {
    name: 'Backend development',
    used: ['FastAPI', 'REST APIs', 'Firebase', 'Supabase integration'],
    context:
      'Planning and AI gateway services, REST integration and configurable cloud authentication.',
  },
  {
    name: 'Databases',
    used: ['SQLite', 'Expo SQLite', 'PostgreSQL', 'Jetpack DataStore'],
    context:
      'Local study data, backend persistence and Android preferences. DataStore is a persistence tool, not a relational database.',
  },
  {
    name: 'AI, ML & optimization',
    used: [
      'LightGBM integration',
      'OR-Tools CP-SAT',
      'Source-grounded generation',
      'BM25 retrieval',
    ],
    context:
      'Assistive ranking and constraint optimization in PCOSina; source-grounded retrieval and generation with fallback paths in Barion.',
  },
  {
    name: 'Tools & platforms',
    used: [
      'Git',
      'GitHub',
      'Android Studio',
      'VS Code',
      'Vite',
      'Render configuration',
    ],
    context:
      'Version control, application builds and deployment configuration. This portfolio is prepared for Vercel.',
  },
  {
    name: 'Engineering practices',
    used: [
      'Unit testing',
      'Integration testing',
      'Browser testing',
      'CI checks',
      'Local-first design',
    ],
    context:
      'Project work with pytest, Jest, Android tests and Playwright, alongside debugging, fallback design, schema migration and validation.',
  },
]

export const achievements = [
  {
    type: 'Champion',
    title: 'FEU Tech Design Thinking Summit and ITAM Design Jam',
    date: 'March 22, 2025',
    description:
      'Championship recognition at FEU Institute of Technology’s design thinking event.',
    icon: 'award',
  },
  {
    type: 'Participation',
    title: 'HACKathon 2025',
    date: '2025',
    description:
      'Participated in the student hackathon held as part of Tech Summit 2025.',
    icon: 'code',
  },
  {
    type: 'Participation',
    title: 'BASE BUILD Global Buildathon 2025',
    date: '2025',
    description:
      'Participated in the buildathon and technical learning activities.',
    icon: 'code',
  },
]
