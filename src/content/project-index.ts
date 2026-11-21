// Shared card metadata. Full engineering narratives load only on case-study pages.
export type ProjectSummary = {
  slug: string
  name: string
  category: string
  platform: 'Android' | 'Cross-platform' | 'Web'
  headline: string
  previewLabel: string
  status: string
  summary: string
  stack: string[]
  repository?: string
  demoUrl?: string
  screenshots: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }[]
  video?: { src: string; poster: string; caption: string; steps: string[] }
}

export const projectIndex = {
  pcosina: {
    slug: 'pcosina',
    name: 'PCOSina',
    category: 'Android · Wellness & meal planning',
    platform: 'Android',
    headline: 'Meal planning around real constraints.',
    previewLabel: 'Application capture · Sample meal plan',
    status: 'Tester-stage project',
    summary:
      'A Filipino-focused meal-planning application that brings food preferences, pantry ingredients and budget into a structured weekly plan.',
    stack: ['Kotlin', 'Jetpack Compose', 'Python', 'FastAPI', 'OR-Tools'],
    repository: 'https://github.com/slvcn-jsh/PCOSina',
    screenshots: [
      {
        src: '/images/pcosina-plan.webp',
        alt: 'PCOSina weekly plan showing a selected day, meals and estimated intake.',
        caption:
          'Weekly plan — existing project presentation capture. Displayed amounts are sample application data.',
        width: 784,
        height: 1745,
      },
      {
        src: '/images/pcosina-grocery.webp',
        alt: 'PCOSina grocery screen showing remaining items and pantry-aware quantities.',
        caption:
          'Grocery guidance — quantities and items still to buy. Existing project capture.',
        width: 784,
        height: 1745,
      },
    ],
  },
  barion: {
    slug: 'barion',
    name: 'Barion',
    category: 'Cross-platform · Learning application',
    platform: 'Cross-platform',
    headline: 'From source material to the next review.',
    previewLabel: 'Local web preview · Sample deck',
    status: 'In development',
    summary:
      'A local-first learning application that connects source material, flashcards and spaced repetition, with an optional AI-assisted generation path.',
    stack: ['TypeScript', 'React Native', 'Expo', 'SQLite', 'Python'],
    repository: 'https://github.com/slvcn-jsh/barion',
    screenshots: [
      {
        src: '/images/barion-current-home.webp',
        alt: 'Current Barion web dashboard showing a sample deck and a Study now action.',
        caption:
          'Local web preview, 16 November 2026 — built-in sample deck, not real learner activity.',
        width: 1366,
        height: 900,
      },
      {
        src: '/images/barion-current-source.webp',
        alt: 'Barion review answer with expanded sample-source provenance and Again, Hard, Good and Easy rating controls.',
        caption:
          'Current local web preview at mobile width. Built-in sample content is not medical advice.',
        width: 390,
        height: 844,
      },
    ],
    video: {
      src: '/videos/barion-review.webm',
      poster: '/images/barion-current-review.webp',
      caption:
        'Actual local web preview · 16 November 2026 · Silent recording · Built-in sample deck. This is not a native-release or medical-content validation.',
      steps: [
        'Open Study now from the dashboard.',
        'Attempt recall, then select Reveal.',
        'Expand Source to inspect the sample excerpt behind the answer.',
        'Select Good; the application advances to another review card.',
      ],
    },
  },
  focusloop: {
    slug: 'focusloop',
    name: 'FocusLoop',
    platform: 'Android',
    category: 'Android · Digital wellbeing',
    headline: 'A focus session that stays yours.',
    previewLabel: 'Native UI test · Synthetic data',
    status: 'Native development build',
    summary:
      'An Android digital wellbeing app that separates device usage estimates, personal intentions and self-reported reflections.',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Kotlin coroutines'],
    screenshots: [
      {
        src: '/images/projects/focusloop-home.webp',
        width: 945,
        height: 2176,
        alt: 'FocusLoop native Home with a synthetic usage estimate, coverage warning and intention action.',
        caption:
          'Native Compose capture, 17 November 2026. Injected synthetic data; the test banner is retained. No personal usage records.',
      },
      {
        src: '/images/projects/focusloop-session.webp',
        width: 945,
        height: 2176,
        alt: 'FocusLoop synthetic reading session with active time, pause, extend and finish controls.',
        caption:
          'Session controls in the native UI test host. This capture shows a test state, not a measured productivity outcome.',
      },
    ],
  },
  resolveops: {
    slug: 'resolveops',
    name: 'ResolveOps',
    platform: 'Web',
    category: 'Web · IT service desk',
    headline: 'Service requests with an accountable history.',
    previewLabel: 'Fictional UI preview · Not the live workspace',
    status: 'Incident workflow implemented',
    summary:
      'An internal service desk with server-enforced access, versioned ticket workflows and transactional history. Automation is a later milestone.',
    stack: ['TypeScript', 'React', 'NestJS', 'Prisma', 'PostgreSQL'],
    screenshots: [
      {
        src: '/images/projects/resolveops-queue.webp',
        width: 1440,
        height: 900,
        alt: 'ResolveOps team queue explicitly labeled fictional demonstration data and UI preview.',
        caption:
          'React UI preview with fictional tickets and illustrative SLA values. The authenticated incident workflow is separate; measured SLA reporting and automated assignment are not implemented.',
      },
    ],
  },
  procura: {
    slug: 'procura',
    name: 'Procura',
    platform: 'Web',
    category: 'Web · Procurement controls',
    headline: 'Approval is a policy, not just a button.',
    previewLabel: 'Persisted browser-test workflow · Synthetic records',
    status: 'Request & approval slice',
    summary:
      'A procurement workspace with owned drafts, manager decisions, stale-edit protection and transactionally recorded request history.',
    stack: ['TypeScript', 'React', 'Express', 'Prisma', 'PostgreSQL', 'Zod'],
    screenshots: [
      {
        src: '/images/projects/procura-approval.webp',
        width: 1440,
        height: 1590,
        alt: 'Procura approved test request with line items, manager approval and persisted status history.',
        caption:
          'Actual persisted approval flow from the 17 November browser test, using synthetic accounts and a dedicated test database. Order, receiving and inventory indicators represent future stages, not implemented modules.',
      },
      {
        src: '/images/projects/procura-mobile.webp',
        width: 390,
        height: 2222,
        alt: 'Mobile Procura test request with approval history and successive request versions.',
        caption:
          'The same isolated browser-test workflow at mobile width. Test records are not real procurement activity.',
      },
    ],
  },
  freshkeep: {
    slug: 'freshkeep',
    name: 'FreshKeep',
    platform: 'Android',
    category: 'Android · Household inventory',
    headline: 'One product. Separate batches. Honest quantities.',
    previewLabel: 'Native application · Synthetic inventory',
    status: 'Offline-first MVP',
    summary:
      'A device-local food inventory that keeps batches, quantities, storage locations and recorded date labels distinct—without an account or network.',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Jetpack DataStore'],
    screenshots: [
      {
        src: '/images/projects/freshkeep-inventory.webp',
        width: 720,
        height: 1600,
        alt: 'FreshKeep native inventory with storage filters and synthetic food items.',
        caption:
          'Native Compose capture, 17 November 2026, using isolated synthetic inventory. No household records are included.',
      },
      {
        src: '/images/projects/freshkeep-batches.webp',
        width: 720,
        height: 1600,
        alt: 'FreshKeep product details showing six pieces and two packs as separate batch quantities, locations and dates.',
        caption:
          'Independent batches keep incompatible units and recorded dates separate. Displayed date labels do not certify food safety.',
      },
    ],
  },
} satisfies Record<string, ProjectSummary>

export const projectSummaries: ProjectSummary[] = Object.values(projectIndex)
// Lead with the two public-source projects with inspectable application evidence.
export const featuredProjectSlugs: readonly string[] = ['pcosina', 'barion']
