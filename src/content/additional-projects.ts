import { projectIndex } from './project-index'
import type { Project } from './projects'

// Sanitized descriptions only. Private source is not linked or bundled.
// Reported application checks are historical evidence, not portfolio QA runs.
export const additionalProjects: Project[] = [
  {
    ...projectIndex.focusloop,
    sourceRef: 'ac54d8d',
    focus: 'Session state · Platform permissions · Local persistence',
    ownership:
      'My work spans the native interface, session rules, Room storage, Android usage integration and device-test coverage.',
    problem:
      'For people trying to use their phone more intentionally, time spent in an app does not explain why it was used or whether a goal was met. Missing usage access must not prevent someone from starting a focus session.',
    solution:
      'I keep Android usage estimates, app-owned sessions and optional reflections separate. People can set an intention, pause or revise it, and finish without being forced to report a successful outcome. Manual focus works without Usage Access.',
    features: [
      {
        title: 'Plan',
        text: 'Set an intention and a duration; revise the session without erasing its original plan.',
      },
      {
        title: 'Focus',
        text: 'Start, pause, resume, extend and finish one active session.',
      },
      {
        title: 'Reflect',
        text: 'Record an optional outcome or skip it; inspect local session history.',
      },
    ],
    workflow: [
      {
        title: 'Set an intention',
        text: 'Choose a task and time; usage permission is optional.',
      },
      { title: 'Run the session', text: 'Pause, extend or revise as needed.' },
      {
        title: 'Close & reflect',
        text: 'Save the session and optionally record an outcome.',
      },
    ],
    system: [
      {
        boundary: 'Native interface',
        title: 'Compose + ViewModel',
        text: 'Home, Usage, Focus and Settings collect application state.',
      },
      {
        boundary: 'App-owned records',
        title: 'Session rules → Room',
        text: 'Intentions, revisions, session events and reflections persist locally.',
      },
      {
        boundary: 'Separate platform input',
        title: 'Android usage adapter',
        text: 'Optional permission; unavailable and incomplete results stay explicit.',
      },
    ],
    architectureNote:
      'Implemented boundaries, simplified. Session storage and Android usage are separate inputs to the interface, not successive processing stages. No backend or account is required.',
    decisions: [
      {
        title: 'Missing data is not zero usage',
        text: 'I preserve missing days and coverage warnings instead of filling charts with invented zeroes. That keeps an incomplete platform history from looking like an accurate behavior record.',
        evidence: {
          label: 'Usage aggregation and calendar-range rules',
          path: 'domain/Usage.kt',
        },
      },
      {
        title: 'Preserve the original intention',
        text: 'Revisions append to the session record instead of replacing the initial plan. Paused time and active time remain distinct so a later reflection has useful context.',
        evidence: {
          label: 'Session rules and additive Room migration',
          path: 'domain/Session.kt',
        },
      },
    ],
    account: {
      title: 'Recovering a timer without inventing progress',
      problem:
        'A process restart, reboot or clock change can make a wall-clock-only timer misleading.',
      implementation:
        'Session rules use monotonic timing and boot context. Uncertain recovery becomes an explicit state; it does not silently declare the session complete.',
      verification:
        'The 17 November repository report records 36 JVM and 26 device instrumentation tests, covering session rules, migration, storage, usage access and synthetic Compose flows.',
      limit:
        'These records were reviewed, not rerun for this portfolio update. Semantic UI tests do not establish physical taps, TalkBack, continuous folding or real reminder delivery.',
    },
    verification: {
      summary: 'Session, storage & device test records',
      scope: 'Repository report · 17 November 2026 · Reviewed 18 November',
    },
    result:
      'The native development build implements the main navigation, intention/session flow, usage views, settings and local history.',
    limitations:
      'Usage totals remain platform estimates. There is no claim of behavioral effectiveness or production release; manual accessibility and notification checks remain.',
    lessons:
      'Data provenance belongs in the interface. A recorded intention, a platform estimate and a personal reflection answer different questions and should not be presented as interchangeable evidence.',
    next: 'Complete manual accessibility, fold/resize and reminder-delivery checks before release preparation.',
    evidence: [],
    snapshot:
      'Private source snapshot ac54d8d, inspected 18 November 2026. Public content contains only reviewed summaries and synthetic application captures.',
  },
  {
    ...projectIndex.resolveops,
    sourceRef: '5195969',
    focus: 'Authorization · Concurrency · Transactional audit',
    ownership:
      'My work covers the React workspaces, NestJS API, persisted identity, ticket lifecycle, database integration and regression checks.',
    problem:
      'Requesters and support agents need a shared view of an incident, but they should not have the same permissions. Simultaneous changes must not silently overwrite assignments, status or resolution history.',
    solution:
      'I built a guarded incident workflow with server-issued sessions, organization/team/resource scope, manual assignment and version-aware mutations. The requester confirms resolution; the API enforces transitions independently of the interface.',
    features: [
      {
        title: 'Request',
        text: 'Create an incident or service request and inspect authorized tickets.',
      },
      {
        title: 'Coordinate',
        text: 'Assign an agent manually and separate public comments from internal notes.',
      },
      {
        title: 'Trace',
        text: 'Review persisted lifecycle and assignment history with version-conflict handling.',
      },
    ],
    workflow: [
      {
        title: 'Submit',
        text: 'A signed-in requester creates a scoped ticket.',
      },
      {
        title: 'Handle',
        text: 'Support assigns, comments and moves through allowed states.',
      },
      {
        title: 'Confirm',
        text: 'The requester confirms resolution; events retain the history.',
      },
    ],
    system: [
      {
        boundary: 'Browser',
        title: 'React + TypeScript',
        text: 'Authenticated queue, ticket controls and account/team management.',
      },
      {
        boundary: 'Server authority',
        title: 'NestJS modules',
        text: 'Sessions, resource scope, lifecycle guards and expected-version checks.',
      },
      {
        boundary: 'Persistence',
        title: 'Prisma → PostgreSQL',
        text: 'Ticket, history and outbox writes share a transaction. No delivery worker yet.',
      },
    ],
    architectureNote:
      'Implemented request path: browser → guarded API → database. The fictional preview is separate and grants no permissions. Durable outbox storage does not imply event delivery.',
    decisions: [
      {
        title: 'The API owns permissions',
        text: 'I enforce requester, team and organization scope on the server. Hiding a control is useful guidance, but cannot stop someone from issuing a direct request.',
        evidence: {
          label: 'Session guards and ticket resource scope',
          path: 'tickets/tickets.service.ts',
        },
      },
      {
        title: 'Commit history with the change',
        text: 'Ticket updates, their audit trail and outbox records commit together. The outbox prepares for future recoverable processing; without a worker it is not an automation system.',
        evidence: {
          label: 'Transactional ticket mutations',
          path: 'tickets/tickets.service.ts',
        },
      },
    ],
    account: {
      title: 'Two agents changing the same ticket',
      problem:
        'A stale interface can submit an action after another agent has changed the record.',
      implementation:
        'Mutations check an expected version and reject conflicting writes. Lifecycle rules and assignment constraints protect the database even when the browser is stale.',
      verification:
        'The repository records 10 unit/HTTP, 19 PostgreSQL integration and 24 Chromium tests. Checks include permissions, lifecycle conflicts, assignment consistency and browser workflows.',
      limit:
        'Reviewed historical results, not a new execution. The recorded hosted pipeline passed those checks but failed its dependency-audit gate; the overall pipeline was not green.',
    },
    verification: {
      summary: 'API, database & browser test records',
      scope: 'Repository status · 18 November 2026 · Audit gate unresolved',
    },
    result:
      'The first authenticated incident slice works locally. The broader fictional interface preview remains separate from the persisted workflow.',
    limitations:
      'No production deployment. Automated assignment, worker recovery, measured SLA reports, account recovery and the unified interface remain unfinished.',
    lessons:
      'A durable record and a delivered action are different guarantees. I keep that boundary explicit rather than presenting stored outbox events as completed automation.',
    next: 'Resolve dependency advisories, integrate the authenticated UI and implement recoverable workers with failure-path tests.',
    evidence: [],
    snapshot:
      'Private source snapshot 5195969, inspected 18 November 2026. Preview captures are explicitly labeled; no real tickets or private accounts are published.',
  },
  {
    ...projectIndex.procura,
    sourceRef: 'cf40460',
    focus: 'Business rules · Versioned transitions · Audit consistency',
    ownership:
      'My work connects the React request interface to Express policies, validated inputs, PostgreSQL transactions and authorization/concurrency tests.',
    problem:
      'Employees need to submit purchasing needs, managers need to decide them, and reviewers need an attributed history. Administrative access should not automatically mean approval authority.',
    solution:
      'I implemented the request-to-decision slice: multi-line drafts, submission, manager approval or rejection, scoped search and persisted history. The wider procurement workspace is a roadmap, not a completed receiving or inventory system.',
    features: [
      {
        title: 'Prepare',
        text: 'Create and edit owned drafts with validated line items.',
      },
      {
        title: 'Decide',
        text: 'Managers review submitted requests; self-approval and non-manager decisions are rejected.',
      },
      {
        title: 'Inspect',
        text: 'Search authorized records and inspect attributed status and approval history.',
      },
    ],
    workflow: [
      { title: 'Draft', text: 'The owner creates and edits request lines.' },
      {
        title: 'Submit',
        text: 'Validation and a version check protect the transition.',
      },
      {
        title: 'Review',
        text: 'A manager decides; the decision and event commit together.',
      },
    ],
    system: [
      {
        boundary: 'Browser',
        title: 'React + Vite',
        text: 'Draft forms, review queue, server search and request history.',
      },
      {
        boundary: 'Server authority',
        title: 'Express + Zod',
        text: 'Cookie sessions, object policies, validated commands and versions.',
      },
      {
        boundary: 'Persistence',
        title: 'Prisma → PostgreSQL',
        text: 'Business write and audit event share one transaction.',
      },
    ],
    architectureNote:
      'Implemented single-organization modular monolith. Development-only fictional roles cannot authenticate API calls. Receiving and inventory are outside this persisted path.',
    decisions: [
      {
        title: 'Separate administration from approval',
        text: 'I keep approval as an explicit manager policy, with a self-approval check. An administrator can maintain an owned request without gaining decision authority.',
        evidence: {
          label: 'Request policy and decision service',
          path: 'requests/policy.ts',
        },
      },
      {
        title: 'Reject stale decisions',
        text: 'Updates match the expected version and eligible state before changing anything. A stale edit or simultaneous decision returns a conflict instead of replacing newer work.',
        evidence: {
          label: 'Version-aware request transactions',
          path: 'requests/service.ts',
        },
      },
    ],
    account: {
      title: 'An approval without its audit event',
      problem:
        'If the request changes but history fails to save, a reviewer loses the explanation of who changed it.',
      implementation:
        'The decision, request version and audit insertion share a Prisma transaction. An audit-write failure rolls the business change back. Append-only controls protect ordinary event updates, not a privileged database owner.',
      verification:
        'The local report records 26 tests: 17 real PostgreSQL lifecycle tests and 9 unit/HTTP checks. Coverage includes simultaneous decisions, stale edits, self-approval denial and forced audit-failure rollback.',
      limit:
        'Reviewed 17 November results, not rerun here. This implementation is in an uncommitted local working tree ahead of the private GitHub baseline; no release or published-commit verification is claimed.',
    },
    verification: {
      summary: 'Authorization, race & rollback test records',
      scope:
        'Local development report · 17 November 2026 · Uncommitted snapshot',
    },
    result:
      'The request-to-approval workflow is persisted and connected to the interface. Captures show isolated database-backed browser tests.',
    limitations:
      'Suppliers, orders, receiving, the inventory ledger and full reporting need persisted implementation. Dependency advisories and deployment/identity operations remain open.',
    lessons:
      'A workflow is only as trustworthy as its denied actions and failed writes. I treat conflict handling and audit rollback as product behavior, not just database details.',
    next: 'Review dependency advisories and stabilize the local milestone, then implement suppliers/orders before transaction-safe receiving.',
    evidence: [],
    snapshot:
      'Private local working tree based on cf40460, inspected 18 November 2026. Source remains private and unchanged by the portfolio work.',
  },
  {
    ...projectIndex.freshkeep,
    sourceRef: '4677d1d',
    focus: 'Exact quantities · Atomic stock changes · Offline persistence',
    ownership:
      'My work covers the Compose interface, inventory rules, Room transactions, DataStore preferences and isolated device/UI tests.',
    problem:
      'A household may have the same product in different locations, with different dates or units. Combining everything into one quantity hides useful information and can make stock updates unreliable.',
    solution:
      'I separate product identity from individual batches. People can add, use or correct stock, inspect history and review recorded dates locally. Unknown dates stay unknown; a best-before label is not a food-safety guarantee.',
    features: [
      {
        title: 'Organize',
        text: 'Enter food manually, search inventory and filter by storage.',
      },
      {
        title: 'Track',
        text: 'Keep independent batch units, dates and quantities; record stock changes.',
      },
      {
        title: 'Review',
        text: 'Inspect date labels and chronological history without network access.',
      },
    ],
    workflow: [
      { title: 'Add food', text: 'Create a product and its first batch.' },
      {
        title: 'Manage stock',
        text: 'Add, use or correct a quantity in a specific batch.',
      },
      {
        title: 'Review',
        text: 'Inspect dates, storage and the saved event history.',
      },
    ],
    system: [
      {
        boundary: 'Native interface',
        title: 'Compose + ViewModel',
        text: 'Immutable UI state and lifecycle-aware collection of inventory flows.',
      },
      {
        boundary: 'Mutation boundary',
        title: 'Rules + repository',
        text: 'Exact quantities, validation and atomic stock/history commands.',
      },
      {
        boundary: 'On-device storage',
        title: 'Room + DataStore',
        text: 'Room holds inventory and events; DataStore holds preferences only.',
      },
    ],
    architectureNote:
      'Implemented on-device path. There is no backend, required account or Internet permission. Preferences are not the inventory database.',
    decisions: [
      {
        title: 'Represent quantities exactly',
        text: 'I store quantities as integer thousandths and reject excess precision rather than silently rounding. Totals keep incompatible units separate instead of assuming conversions.',
        evidence: {
          label: 'Quantity parsing and adjustment rules',
          path: 'domain/InventoryRules.kt',
        },
      },
      {
        title: 'Keep product and batch identity separate',
        text: 'Editing a product does not merge its batches. Different storage, units and recorded dates remain attached to the correct stock.',
        evidence: {
          label: 'Room schema and inventory repository',
          path: 'data/InventoryDatabase.kt',
        },
      },
    ],
    account: {
      title: 'Two actions consuming the same stock',
      problem:
        'Separate reads and writes can allow concurrent actions to consume more stock than exists.',
      implementation:
        'The repository re-reads a batch within a Room transaction, validates the change and writes stock plus history atomically. A failed event insertion rolls the update back.',
      verification:
        'The 17 November report records 4 JVM and 16 physical-device tests. They cover exact quantities, concurrent consumption, rollback, storage reassignment, reopen persistence and isolated Compose workflows.',
      limit:
        'Historical repository evidence reviewed for this case study, not freshly rerun. Synthetic screen-state captures alone do not prove persistence or all physical fold/accessibility behavior.',
    },
    verification: {
      summary: 'Inventory rules & device test records',
      scope: 'Repository report · 17 November 2026 · Reviewed 18 November',
    },
    result:
      'The offline-first MVP implements manual entry, independent batches, stock changes, date review, storage management and local history.',
    limitations:
      'No cloud sync or export/restore; uninstalling or losing the device can lose records. Barcode, OCR, reminders and AI suggestions are deferred. No store release is claimed.',
    lessons:
      'Local-first removes a network dependency, but makes data preservation especially important. Clear units, safe deletion and explicit backup limits matter as much as the inventory screen.',
    next: 'Complete broader accessibility/device checks and release preparation; evaluate backup/restore before expanding into convenience features.',
    evidence: [],
    snapshot:
      'Private source snapshot 4677d1d, inspected 18 November 2026. Published captures contain synthetic fixtures only.',
  },
]
