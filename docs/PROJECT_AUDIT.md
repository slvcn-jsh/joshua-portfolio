# Project audit

**November 15–16 update:** the original source-only audit below is supplemented by
five passing PCOSina planner tests, seven passing Barion tests and an actual Barion
web recording. See [verification scope](PROJECT_VERIFICATION.md). These checks do
not establish full-suite, native-release, production or clinical readiness.

## Scope and method

Read README/architecture/readiness documents, dependency manifests, implementation, schema, test files, deployment configuration and recent Git history. This is source inspection, not a fresh execution of either application's test suite. Existing test counts and release notes are historical evidence and are not presented as current passes.

## PCOSina

Primary checkout: local `PCOSina`, HEAD `1840999` (2026-09-09). It has substantial later local changes, including October catalog reconciliation. The older `PCOSINA2` checkout ends at `0b3ff52` and is not the primary content source.

| Confirmed fact                                                               | Evidence path                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Android Kotlin / Jetpack Compose                                             | `app/build.gradle.kts`, `app/src/main/java/com/pcosina/app/ui/`                         |
| Profile and artifact persistence through DataStore; encrypted reflections    | `ARCHITECTURE.md`, `data/repository/UserPreferencesRepository.kt`, `ReflectionStore.kt` |
| New generation needs network; saved plans/groceries remain available offline | `data/repository/MealPlanRepository.kt`, especially offline error messaging             |
| Deterministic filtering then OR-Tools CP-SAT constraint solving              | `backend/services/meal_planner.py`: `cp_model.CpModel`, `cp_model.CpSolver`             |
| Optional LightGBM assistive ranking                                          | `backend/services/ml_ranker.py`, planner ranker readiness branches                      |
| FastAPI with PostgreSQL production target, SQLite development fallback       | `backend/main.py`, `backend/database.py`, `backend/requirements.txt`                    |
| Queue worker and Redis configured                                            | `render.yaml`, `backend/worker_plan_jobs.py`                                            |
| Allergy, budget, infeasibility, pantry tests present                         | `backend/tests/test_meal_planner.py`                                                    |
| Release/testing and catalog reconciliation evidence exists                   | `docs/roadmap/progress_ledger.md`                                                       |

Discrepancies: older instructions use “MILP”; actual implementation imports CP-SAT. Android local persistence is not Room or SQLite. “Offline-first” must not imply offline generation. Some nutrient limits are soft penalties; do not claim every nutritional target is hard. Clinical efficacy, full production readiness, current live deployment health and current test results are not established by this audit. Documentation records tester distribution/staging work, not a verified public release. Catalog review has unresolved mappings; no clinical or dietitian endorsement is claimed.

## Barion

Public repository: `https://github.com/slvcn-jsh/barion`, HEAD `7e83b70` (2026-09-30). The local Barion checkout has the same HEAD and later uncommitted changes. A temporary shallow clone outside the portfolio was used to distinguish public code from local updates.

| Confirmed fact                                                         | Evidence path                                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| React Native, Expo, TypeScript and Expo Router                         | `package.json`, `app/`                                                      |
| SQLite local database with migrations, WAL, foreign keys, search index | `src/storage/database.ts`                                                   |
| Deterministic FSRS scheduling; Again/Hard/Good/Easy; review replay     | `src/scheduler/fsrs.ts`, `src/scheduler/__tests__/fsrs.test.ts`             |
| Sources, decks, cards and review repositories                          | `src/storage/repositories/`                                                 |
| Source-linked generation and validation                                | `src/ai/generate.ts`, `src/ai/sourceSpan.ts`, `src/ai/publicationPolicy.ts` |
| Optional cloud generation and Python gateway                           | `src/ai/gatewayProvider.ts`, `services/ai_gateway/main.py`                  |
| BM25 and hybrid retrieval implementations                              | `services/ai_gateway/retrieval.py`                                          |
| Supabase client disabled gracefully when not configured                | `src/auth/supabaseClient.ts`                                                |
| Backup formats and browser-flow tests                                  | `src/backup/format.ts`, `tests/e2e/backup.spec.js`                          |
| Unit, Python and E2E tests, quality workflow                           | `src/**/__tests__/`, `services/**/tests/`, `.github/workflows/quality.yml`  |

Discrepancies: early `docs/product/v1-scope.md` excludes generative AI, but the implementation and later readiness report include a gateway. Local extraction is not an on-device LLM. Hybrid retrieval contains a deterministic mock embedding fallback, so it is not proof of deployed semantic search. Supabase integration is not proof of production cross-device sync. Current native release builds, deployed services, and independently reviewed medical learning quality remain unverified in readiness notes. Historical captures retain the MedStudy name and must be labeled accordingly.

## Ownership

The owner confirms personally developing both applications with AI coding assistance. Describe product direction, implementation, integration, debugging and validation ownership at that level. Repository authorship alone does not establish who independently wrote each line or individual competition responsibilities. Do not invent those distinctions.
