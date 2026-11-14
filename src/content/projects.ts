export type Project = {
  slug: string
  name: string
  category: string
  status: string
  headline: string
  summary: string
  stack: string[]
  repository: string
  focus: string
  problem: string
  users: string
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
  architecture: { title: string; text: string }[]
  architectureNote: string
  decisions: { title: string; text: string }[]
  challenges: { title: string; text: string }[]
  testing: string[]
  result: string
  limitations: string
  contributions: string[]
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
    headline: 'Meal planning that starts with everyday constraints.',
    summary:
      'A Filipino-focused meal-planning application that brings food preferences, pantry ingredients and budget into a structured weekly plan.',
    stack: ['Kotlin', 'Jetpack Compose', 'Python', 'FastAPI', 'OR-Tools'],
    repository: 'https://github.com/slvcn-jsh/PCOSina',
    focus:
      'Android development · Backend integration · Constraint optimization',
    problem:
      'Planning meals means reconciling several needs at once: food exclusions, available ingredients, spending limits and nutritional targets. For Filipino individuals with PCOS, an application also needs to reflect familiar food and practical shopping routines.',
    users:
      'Filipino individuals with PCOS who want help organizing meals and groceries around their preferences and household constraints.',
    solution:
      'PCOSina connects a native Android interface to a rule-based and constraint-solving planner. Generated plans are saved locally so the user can return to their meals and grocery guidance when connectivity is limited. It is a wellness decision-support project, not a diagnostic or clinically validated treatment tool.',
    features: [
      {
        title: 'Profile-aware planning',
        text: 'Preferences, exclusions, pantry context and budget feed into candidate selection and plan generation.',
      },
      {
        title: 'Weekly plans & meal swaps',
        text: 'Review the week, inspect meals and request alternatives through the planning workflow.',
      },
      {
        title: 'Groceries & pantry',
        text: 'Use the plan’s ingredient requirements to organize shopping and see what is already available.',
      },
      {
        title: 'Local continuity',
        text: 'Keep saved plans, grocery guidance and local reflections accessible without a constant connection.',
      },
    ],
    screenshots: [
      {
        src: '/images/pcosina-plan.webp',
        alt: 'PCOSina weekly meal plan showing a selected day, three meals and estimated daily intake.',
        caption:
          'Weekly plan — meals and estimated intake in one view. Existing project presentation capture.',
        width: 784,
        height: 1745,
      },
      {
        src: '/images/pcosina-grocery.webp',
        alt: 'PCOSina grocery screen showing remaining shopping items and pantry-aware ingredient quantities.',
        caption:
          'Grocery guidance — quantities, pantry context and items still to buy. Existing project capture.',
        width: 784,
        height: 1745,
      },
    ],
    workflow: [
      {
        title: 'Set preferences',
        text: 'Enter food needs, budget and pantry context.',
      },
      {
        title: 'Generate a plan',
        text: 'Send a request to the backend planner.',
      },
      {
        title: 'Review & save',
        text: 'Inspect meals and retain the returned plan locally.',
      },
      {
        title: 'Shop & follow',
        text: 'Use saved meals and grocery guidance offline.',
      },
    ],
    architecture: [
      {
        title: 'Android client',
        text: 'Kotlin / Compose\nUI → repositories\nDataStore + local artifacts',
      },
      {
        title: 'Planning API',
        text: 'Python / FastAPI\nRequest validation\nQueue + worker path',
      },
      {
        title: 'Planning engine',
        text: 'Rule filtering\nOptional LightGBM ranking\nOR-Tools CP-SAT selection',
      },
      {
        title: 'Backend persistence',
        text: 'PostgreSQL target\nRedis queue\nSQLite for local development',
      },
    ],
    architectureNote:
      'Simplified implementation map. The client calls the API; the planner uses backend data and returns a plan for local saving. Firebase authentication and optional cloud sync sit alongside this path. New generation needs connectivity; viewing saved plans does not.',
    decisions: [
      {
        title: 'Keep hard rules authoritative',
        text: 'Allergy and exclusion filtering runs before optimization. Optional ML ranks candidates but cannot replace the final constraint checks. This keeps an uncertain ranking signal from deciding whether a food is allowed.',
      },
      {
        title: 'Separate local use from generation',
        text: 'Android repositories retain preferences and generated artifacts locally. Backend generation can fail without removing an existing plan, preserving the user’s access to their week.',
      },
      {
        title: 'Use a bounded candidate pool',
        text: 'Candidate shaping narrows the search before CP-SAT selects meals. The shortlist must still preserve viable options for constrained profiles; aggressive pruning can make a feasible request appear impossible.',
      },
    ],
    challenges: [
      {
        title: 'Conflicting planning constraints',
        text: 'Tight budgets and exclusions can leave no suitable plan. The planner includes infeasibility diagnostics and bounded retry paths so failures can be represented explicitly.',
      },
      {
        title: 'Ingredient and nutrition consistency',
        text: 'Catalog reconciliation and ingredient-safety logic address aliases, duplicate records and mismatched values. Unresolved nutrient mappings remain documented rather than treated as complete data.',
      },
    ],
    testing: [
      'Backend tests cover allergies, budget handling, pantry matching, repetition and infeasible requests.',
      'Android unit and instrumentation test infrastructure covers client behavior; release notes record tester distribution and device checks.',
      'This case study is based on source inspection. The application suites and live deployment were not rerun for this portfolio.',
    ],
    result:
      'The repository contains the Android application, planning backend, test suites and tester-distribution configuration. Development records document staging and catalog-validation work. This portfolio does not claim a public production release or clinical effectiveness.',
    limitations:
      'Current deployment health and release readiness need fresh verification. Some catalog mappings remain unresolved, and not every nutritional target is a hard constraint.',
    contributions: [
      'Application design and Kotlin/Compose implementation.',
      'Integration of the Android workflow with FastAPI planning and local persistence.',
      'Planner integration, debugging, catalog consistency work and validation.',
    ],
    lessons:
      'Reliability depends on the data and the failure path as much as the solver. A useful plan must remain understandable, and an unavailable plan must be explained without hiding the underlying constraint.',
    next: 'Resolve remaining food-data mappings, refresh device and deployment checks, and continue improving explanations for infeasible requests.',
    evidence: [
      { label: 'Planning engine', path: 'backend/services/meal_planner.py' },
      {
        label: 'Android repository',
        path: 'app/src/main/java/com/pcosina/app/data/repository/MealPlanRepository.kt',
      },
      { label: 'Planner tests', path: 'backend/tests/test_meal_planner.py' },
      { label: 'Architecture', path: 'ARCHITECTURE.md' },
    ],
    snapshot:
      'Audited November 2026 from the local working tree. Public source links reference the repository; later local changes may not yet be published.',
  },
  {
    slug: 'barion',
    name: 'Barion',
    category: 'Cross-platform · Learning application',
    status: 'In development',
    headline: 'A study loop with the source still in reach.',
    summary:
      'A local-first learning application that connects source material, flashcards and spaced repetition, with an optional AI-assisted generation path.',
    stack: ['TypeScript', 'React Native', 'Expo', 'SQLite', 'Python'],
    repository: 'https://github.com/slvcn-jsh/barion',
    focus: 'Cross-platform development · Local data · Learning workflows',
    problem:
      'Study material and review tools are often disconnected. A flashcard is more useful when learners can trace its answer to the original source and return to a review schedule without depending on a cloud account.',
    users:
      'Learners working with source-heavy study material, including the medical-study scenarios represented in the project.',
    solution:
      'Barion combines a local source library, evidence-linked cards and FSRS scheduling in an Expo application. Local extractive generation provides a baseline; an optional Python gateway supports cloud-generated candidates and retrieval. Generated material still needs careful review.',
    features: [
      {
        title: 'Source-linked cards',
        text: 'Connect card content to source segments so a learner can inspect the evidence behind an answer.',
      },
      {
        title: 'Spaced repetition',
        text: 'Use Again, Hard, Good and Easy ratings to update the next review through TS-FSRS.',
      },
      {
        title: 'Local study data',
        text: 'Store sources, decks, cards and review events in SQLite, with migration and backup support.',
      },
      {
        title: 'Optional AI assistance',
        text: 'Use a configured gateway for generation; preserve a local extractive fallback when it is unavailable.',
      },
    ],
    screenshots: [
      {
        src: '/images/barion-home.webp',
        alt: 'Historical MedStudy dashboard from the Barion repository, with due cards, decks and source links.',
        caption:
          'Historical desktop capture — the early MedStudy interface shows the source-linked review loop. It predates Barion’s current branding.',
        width: 1366,
        height: 900,
      },
      {
        src: '/images/barion-review.webp',
        alt: 'Historical mobile review screen with a flashcard prompt, source citation, Reveal and Skip controls.',
        caption:
          'Historical mobile capture — a review card retains a link to its sample source. Sample content is not medical advice.',
        width: 390,
        height: 844,
      },
    ],
    workflow: [
      {
        title: 'Add a source',
        text: 'Import supported text or a selectable-text PDF.',
      },
      {
        title: 'Create cards',
        text: 'Extract locally or request gateway assistance.',
      },
      {
        title: 'Inspect evidence',
        text: 'Review candidate content and its source links.',
      },
      {
        title: 'Study & rate',
        text: 'Reveal, rate and schedule the next review locally.',
      },
    ],
    architecture: [
      {
        title: 'Expo application',
        text: 'React Native / TypeScript\nSource and study screens\nShared application logic',
      },
      {
        title: 'Local study layer',
        text: 'SQLite repositories\nSource + review events\nTS-FSRS scheduling',
      },
      {
        title: 'Optional AI gateway',
        text: 'Python / FastAPI\nGeneration + validation\nProvider fallback',
      },
      {
        title: 'Retrieval & providers',
        text: 'BM25 / hybrid retrieval\nSource segments\nConfigured model provider',
      },
    ],
    architectureNote:
      'Simplified implementation map. Core study uses the local database and scheduler. Cloud generation branches through the optional gateway; it is not required for local review. Supabase authentication is configurable, while production sync remains unverified.',
    decisions: [
      {
        title: 'Make the study loop local',
        text: 'SQLite stores cards, sources and review events behind repository functions. A learner can continue reviewing without requiring authentication or a configured AI service.',
      },
      {
        title: 'Record reviews and replay state',
        text: 'The FSRS adapter serializes memory state and supports replaying ratings. Deterministic scheduling makes state changes easier to test and reason about.',
      },
      {
        title: 'Keep generation tied to evidence',
        text: 'Generation carries source-span provenance and validation. The gateway includes BM25 and hybrid retrieval implementations, while local extraction remains a separate, explicit fallback—not an on-device language model.',
      },
    ],
    challenges: [
      {
        title: 'Useful output when a provider fails',
        text: 'The generation path catches provider failures and returns locally extracted candidates with fallback provenance. The application can explain how the result was produced.',
      },
      {
        title: 'Generated content is not verified learning quality',
        text: 'Source grounding and automated checks reduce some failure modes but do not establish medical accuracy or educational benefit. Independent review and evaluator calibration remain open work.',
      },
    ],
    testing: [
      'Jest tests cover FSRS replay, generation fallback, source-span checks, backup formats and local storage behavior.',
      'Python tests cover gateway policy, retrieval and generation services. Playwright flows cover study, backup and AI fallback.',
      'Readiness notes distinguish local checks from unverified native releases and deployed services. This audit inspected tests without rerunning the application suites.',
    ],
    result:
      'An implemented learning application with local persistence, source-linked review, scheduling and optional AI services. It remains in development; native store releases, production service configuration and independent learning-quality validation are not established.',
    limitations:
      'Fresh Barion-branded screenshots are still needed. The images here are historical repository captures. Production cross-device sync and clinical learning claims are not presented as delivered features.',
    contributions: [
      'React Native/Expo application implementation and study-flow design.',
      'Local SQLite integration, scheduling and backend service integration.',
      'Generation fallback, debugging and automated quality-check workflows.',
    ],
    lessons:
      'A generation workflow needs both traceable evidence and a usable fallback. Keeping study state local separates everyday reliability from the availability of external services.',
    next: 'Refresh native device validation, complete independent content review and evaluator calibration, verify deployment configuration, and capture the current interface.',
    evidence: [
      { label: 'FSRS adapter', path: 'src/scheduler/fsrs.ts' },
      { label: 'SQLite schema', path: 'src/storage/database.ts' },
      { label: 'Generation fallback', path: 'src/ai/generate.ts' },
      {
        label: 'Retrieval implementation',
        path: 'services/ai_gateway/retrieval.py',
      },
    ],
    snapshot:
      'Audited November 2026 against public commit 7e83b70 and the local working tree. Screenshots represent an earlier development stage.',
  },
]
