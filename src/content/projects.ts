export type Project = {
  slug: string
  name: string
  category: string
  status: string
  summary: string
  stack: string[]
  repository: string
  sourceRef: string
  focus: string
  ownership: string
  problem: string
  solution: string
  features: { title: string; text: string }[]
  screenshots: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }[]
  workflow: { title: string; text: string }[]
  video?: { src: string; poster: string; caption: string; steps: string[] }
  architectureNote: string
  decisions: {
    title: string
    text: string
    evidence: { label: string; path: string }
  }[]
  account: {
    title: string
    problem: string
    implementation: string
    verification: string
    limit: string
  }
  verification: { summary: string; scope: string; record: string }
  result: string
  limitations: string
  lessons: string
  next: string
  evidence: { label: string; path: string }[]
  snapshot: string
}

export const projects: Project[] = [
  {
    slug: 'pcosina',
    name: 'PCOSina',
    category: 'Android · Wellness & meal planning',
    status: 'Tester-stage project',
    summary:
      'A Filipino-focused meal-planning application that brings food preferences, pantry ingredients and budget into a structured weekly plan.',
    stack: ['Kotlin', 'Jetpack Compose', 'Python', 'FastAPI', 'OR-Tools'],
    repository: 'https://github.com/slvcn-jsh/PCOSina',
    sourceRef: '1840999',
    focus:
      'Android development · Backend integration · Constraint optimization',
    ownership:
      'I built the Android interface, integrated the planning backend and local persistence, and handled debugging and validation.',
    problem:
      'For Filipino individuals with PCOS, planning meals means reconciling familiar food, exclusions, pantry ingredients and spending limits. These needs can conflict: a cheaper meal is not useful if it contains an excluded ingredient.',
    solution:
      'I connected a Kotlin/Compose client to a rule-based and constraint-solving planner, then saved returned plans locally for everyday access. PCOSina is a wellness decision-support project, not a diagnostic or clinically validated treatment tool.',
    features: [
      {
        title: 'Plan',
        text: 'Build a week around preferences, exclusions, pantry context and budget.',
      },
      {
        title: 'Adjust',
        text: 'Inspect meals and request alternatives through the planning workflow.',
      },
      {
        title: 'Shop',
        text: 'Use ingredient quantities and pantry context to organize groceries.',
      },
    ],
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
    workflow: [
      { title: 'Set preferences', text: 'Food needs, pantry and budget.' },
      { title: 'Request a plan', text: 'Backend filters and selects meals.' },
      {
        title: 'Review & save',
        text: 'Keep meals and grocery guidance locally.',
      },
    ],
    architectureNote:
      'Simplified implemented data flow. The API returns a plan for local saving; Firebase authentication and optional sync sit alongside this path. New generation needs connectivity. Saved plans do not.',
    decisions: [
      {
        title: 'Apply exclusions before ranking',
        text: 'I keep exclusion filtering ahead of optimization. Optional ML ranks candidates; it does not decide whether an excluded ingredient is allowed.',
        evidence: {
          label: 'Planning engine',
          path: 'backend/services/meal_planner.py',
        },
      },
      {
        title: 'Preserve viable choices in the shortlist',
        text: 'I narrow the candidate pool before solving. Excessive pruning can remove feasible choices, so candidate shaping must preserve useful nutrition and variety options.',
        evidence: {
          label: 'Candidate shaping',
          path: 'backend/services/meal_planner.py',
        },
      },
    ],
    account: {
      title: 'When no suitable plan exists',
      problem:
        'Exclusions and nutritional bounds can leave no feasible plan. Returning a successful-looking result would hide that conflict.',
      implementation:
        'The planner uses filtering, bounded solver paths and explicit infeasibility results. A failed generation request is separate from an already saved week.',
      verification:
        'Five selected tests passed: custom allergy exclusion, filtering before pricing, nutrition-anchor preservation, a basic seven-day plan and an infeasible nutrition request.',
      limit:
        'These checks used a locally modified working tree. They do not certify the full food catalog, Android workflow or clinical suitability.',
    },
    verification: {
      summary: '5 focused planner tests passed',
      scope: '15 November 2026 · Python tests · Local working tree',
      record: '/evidence/pcosina-verification.json',
    },
    result:
      'The Android application, planning backend and tester-distribution configuration are implemented. Current end-to-end device behavior and deployment health still need fresh verification.',
    limitations:
      'Some catalog mappings remain unresolved, and not every nutritional target is a hard constraint. No public production release or clinical effectiveness is claimed.',
    lessons:
      'I treat catalog consistency and explicit failure handling as part of the product, not just backend maintenance. A plan needs understandable inputs and an honest explanation when it cannot be produced.',
    next: 'Resolve remaining food-data mappings, verify the generate-and-save workflow on a device, and record that workflow for this case study.',
    evidence: [
      {
        label: 'Android persistence',
        path: 'app/src/main/java/com/pcosina/app/data/repository/MealPlanRepository.kt',
      },
      {
        label: 'Public planner tests',
        path: 'backend/tests/test_meal_planner.py',
      },
      { label: 'Architecture notes', path: 'ARCHITECTURE.md' },
    ],
    snapshot:
      'Source links are pinned to public commit 1840999. The November local test snapshot differs; its file hashes and scope are recorded in the verification download.',
  },
  {
    slug: 'barion',
    name: 'Barion',
    category: 'Cross-platform · Learning application',
    status: 'In development',
    summary:
      'A local-first learning application that connects source material, flashcards and spaced repetition, with an optional AI-assisted generation path.',
    stack: ['TypeScript', 'React Native', 'Expo', 'SQLite', 'Python'],
    repository: 'https://github.com/slvcn-jsh/barion',
    sourceRef: '7e83b70',
    focus: 'Cross-platform development · Local data · Learning workflows',
    ownership:
      'I built the Expo application, connected SQLite and the review scheduler, and integrated the optional Python generation service.',
    problem:
      'Learners working with source-heavy material need to check where an answer came from and return to a review schedule. Neither action should depend on a cloud account or an available AI provider.',
    solution:
      'I combined a local source library, evidence-linked cards and FSRS scheduling. Local extraction provides baseline candidates; an optional Python gateway adds AI-assisted generation and retrieval. Candidates still need human review.',
    features: [
      {
        title: 'Trace',
        text: 'Follow a card’s source segments to inspect the evidence behind it.',
      },
      {
        title: 'Review',
        text: 'Rate an answer to update its next review through TS-FSRS.',
      },
      {
        title: 'Retain',
        text: 'Keep sources, cards and review events in local SQLite storage.',
      },
    ],
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
    workflow: [
      { title: 'Add a source', text: 'Text or a selectable-text PDF.' },
      { title: 'Inspect candidates', text: 'Review content and source links.' },
      { title: 'Study & rate', text: 'Reveal, rate and schedule locally.' },
    ],
    architectureNote:
      'Simplified implemented data flow. Local review uses SQLite and the scheduler; generation branches through an optional gateway. Configurable Supabase authentication is separate. Production cross-device sync is unverified.',
    decisions: [
      {
        title: 'Keep the source attached',
        text: 'I carry source-span provenance into generation so a learner can inspect the underlying material. A citation explains origin; it does not prove the answer is correct.',
        evidence: {
          label: 'Generation and provenance',
          path: 'src/ai/generate.ts',
        },
      },
      {
        title: 'Make scheduling replayable',
        text: 'I serialize scheduler state and retain review ratings. Replaying the same history can reproduce the next state, making scheduling behavior testable.',
        evidence: { label: 'FSRS adapter', path: 'src/scheduler/fsrs.ts' },
      },
    ],
    account: {
      title: 'Keep fallback output distinguishable',
      problem:
        'A provider failure must not turn locally extracted cards into apparently successful AI output.',
      implementation:
        'The generation path returns fallback provenance with locally extracted candidates. This is an explicit alternative path, not an on-device language model.',
      verification:
        'Seven tests passed across two suites covering scheduling, deterministic replay, generation contracts and fallback provenance. Provider behavior was stubbed; these were not live AI-service checks.',
      limit:
        'The tested adapter files match the public revision, but their working-tree dependencies may differ. These checks do not establish native-release readiness or learning quality.',
    },
    verification: {
      summary: '7 scheduling and generation tests passed',
      scope: '15 November 2026 · 2 Jest suites · Local working tree',
      record: '/evidence/barion-verification.json',
    },
    result:
      'Local persistence, source-linked review, scheduling and optional generation services are implemented. The application remains in development; native store releases and production services are not established here.',
    limitations:
      'The recording demonstrates one local web review path, not a native release. Independent content review, evaluator calibration and native-device checks remain open.',
    lessons:
      'I separate everyday review from generation availability, and traceable provenance from content quality. Keeping those boundaries explicit makes failures easier to explain without overstating what the system verifies.',
    next: 'Validate backup and study on a native device, review generated material independently, and verify production service configuration.',
    evidence: [
      {
        label: 'Scheduler tests',
        path: 'src/scheduler/__tests__/fsrs.test.ts',
      },
      { label: 'Generation tests', path: 'src/ai/__tests__/generate.test.ts' },
      { label: 'SQLite schema', path: 'src/storage/database.ts' },
    ],
    snapshot:
      'Source links are pinned to public commit 7e83b70. Tests and media use a newer local working tree; neither is presented as a clean-public-commit release check.',
  },
]
