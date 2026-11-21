export const identity = {
  name: 'Joshua Escalicas Salvacion',
  shortName: 'Joshua Salvacion',
  role: 'Software Engineering Student',
  email: 'salvacion.jsh@gmail.com',
  github: 'https://github.com/slvcn-jsh',
  linkedin: 'https://www.linkedin.com/in/joshua-salvacion/',
  resume: '/Joshua-Salvacion-Resume.pdf',
}

export const navigation = [
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export const pageMeta: Record<string, { title: string; description: string }> =
  {
    '/': {
      title: 'Joshua Salvacion | Software Engineering Student',
      description:
        'Joshua Escalicas Salvacion, fourth-year Computer Science student at FEU Tech. Explore six mobile and web projects, engineering case studies, skills and resume.',
    },
    '/projects': {
      title: 'Selected Projects | Joshua Salvacion',
      description:
        'Six engineering case studies: PCOSina, Barion, FocusLoop, ResolveOps, Procura and FreshKeep. Native Android, cross-platform learning and transactional web workflows.',
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
    '/projects/focusloop': {
      title: 'FocusLoop — Digital Wellbeing Case Study | Joshua Salvacion',
      description:
        'Native Kotlin and Compose focus sessions, Room persistence, optional Android usage access and explicit recovery states.',
    },
    '/projects/resolveops': {
      title: 'ResolveOps — Service Desk Case Study | Joshua Salvacion',
      description:
        'A React and NestJS incident workflow with server-enforced permissions, versioned tickets and transactional PostgreSQL history.',
    },
    '/projects/procura': {
      title: 'Procura — Procurement Controls Case Study | Joshua Salvacion',
      description:
        'A React and Express request-to-approval workflow with Prisma, PostgreSQL, manager policies, stale-edit protection and atomic audit events.',
    },
    '/projects/freshkeep': {
      title: 'FreshKeep — Offline Inventory Case Study | Joshua Salvacion',
      description:
        'A Kotlin and Compose household inventory with Room transactions, exact quantities, independent batches and explicit date labels.',
    },
    '/skills': {
      title: 'Technical Skills | Joshua Salvacion',
      description:
        'Project-based experience in Kotlin, Python, TypeScript, mobile development, backend integration, local data and software testing.',
    },
    '/about': {
      title: 'About Me | Joshua Salvacion',
      description:
        'Meet Joshua Escalicas Salvacion, a fourth-year BS Computer Science student majoring in Software Engineering at FEU Institute of Technology.',
    },
    '/achievements': {
      title: 'Achievements & Activities | Joshua Salvacion',
      description:
        'FEU Tech Design Thinking champion, with event photos from HACKathon 2025 at UP Manila and BASE BUILD Global Buildathon 2025 at Adamson University.',
    },
    '/certifications': {
      title: 'Certifications | Joshua Salvacion',
      description:
        'View Joshua Salvacion’s IT Specialist Python and SAP Positioning the Autonomous Enterprise credentials, with original certificate PDF downloads.',
    },
    '/resume': {
      title: 'Resume | Joshua Salvacion',
      description:
        'View or download Joshua Escalicas Salvacion’s approved software engineering internship resume as a one-page PDF.',
    },
    '/contact': {
      title: 'Contact | Joshua Salvacion',
      description:
        'Contact Joshua Salvacion for software engineering internships and project conversations through email, GitHub or LinkedIn.',
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
      'Native Compose in PCOSina, FocusLoop and FreshKeep; React Native/Expo in Barion; React web interfaces in ResolveOps, Procura and this portfolio.',
  },
  {
    name: 'Backend development',
    used: [
      'FastAPI',
      'NestJS',
      'Express',
      'REST APIs',
      'Zod',
      'Firebase',
      'Supabase integration',
    ],
    context:
      'FastAPI planning/generation services; NestJS ticket and identity modules in ResolveOps; Express request policies and Zod validation in Procura. Firebase and Supabase are project integrations, not standalone backend implementations.',
  },
  {
    name: 'Databases & persistence',
    used: [
      'SQLite',
      'Expo SQLite',
      'PostgreSQL',
      'Room',
      'Prisma',
      'Jetpack DataStore',
    ],
    context:
      'SQLite for Barion; Room transactions for FocusLoop/FreshKeep; Prisma with PostgreSQL for ResolveOps/Procura. Room and Prisma are data-access tools; DataStore holds Android preferences.',
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
      'Docker',
      'Render configuration',
    ],
    context:
      'Version control, Android/web builds and Docker Compose for local PostgreSQL in the web projects. This portfolio is hosted on Vercel; application deployment is not implied.',
  },
  {
    name: 'Engineering practices',
    used: [
      'Unit testing',
      'Integration testing',
      'Browser testing',
      'CI checks',
      'Local-first design',
      'Kotlin coroutines',
      'Jest',
      'Vitest',
      'Playwright',
    ],
    context:
      'pytest and Jest in PCOSina/Barion; JUnit and device/Compose tests in FocusLoop/FreshKeep; Jest/PostgreSQL checks in ResolveOps and Vitest/Supertest in Procura. Work includes version conflicts, transaction rollback, permission boundaries and schema migrations.',
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
    photo: 'design-thinking-champion',
    photoWidth: 1600,
    photoHeight: 1200,
    photoAlt:
      'Group photo at the FEU Tech Design Thinking Summit and ITAM Design Jam championship event.',
  },
  {
    type: 'Participation',
    title: 'HACKathon 2025 — Tech Summit, UP Manila',
    date: 'May 10, 2025',
    description:
      'Student hackathon focused on solutions aligned with selected United Nations Sustainable Development Goals.',
    icon: 'code',
    photo: 'up-computer-science-hackathon',
    photoWidth: 1200,
    photoHeight: 1600,
    photoAlt:
      'Participants together at computer workstations during the UP Computer Science hackathon.',
  },
  {
    type: 'Participation',
    title: 'BASE BUILD Global Buildathon 2025 — Adamson University',
    date: 'May 2, 2025',
    description:
      'Buildathon and hands-on workshop covering Base, Solidity, smart contracts and decentralized applications.',
    icon: 'code',
    photo: 'base-build-adamson',
    photoWidth: 1600,
    photoHeight: 1200,
    photoAlt:
      'Group photo in a classroom at the BASE BUILD Global Buildathon at Adamson University.',
  },
]
