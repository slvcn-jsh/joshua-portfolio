# Application repository handoff

Prepared November 16, 2026. These changes are **not applied**: the portfolio brief
keeps application repositories independent and read-only, and both checkouts contain
uncommitted work. Do not stage/push that work as part of a portfolio update.

## Barion

The public default branch is `master`, base revision `7e83b70`. A root README and
GitHub About description/website are missing in the inspected public state.

Suggested About description:

> Local-first study application built with Expo, TypeScript, SQLite and FSRS, with source-linked cards and optional AI-assisted generation.

Suggested website: `https://joshua-portfolio-phi-lemon.vercel.app/projects/barion`

Suggested README opening (owner-review draft):

> # Barion
>
> Barion connects source material, flashcards and spaced repetition in a local-first
> Expo application. I developed the software independently with AI coding assistance.
> Sources, cards and review events are stored in SQLite; TS-FSRS schedules reviews.
> An optional Python gateway adds generation and retrieval. Extractive fallback is
> separate from AI output. Generated study material requires review.
>
> Status: in development. Native store release, production synchronization and
> independent learning-quality validation are not claimed.
>
> [Case study and actual local-web recording](https://joshua-portfolio-phi-lemon.vercel.app/projects/barion)

Before publishing a complete README, reproduce setup in a clean checkout. The public
package defines `npm run web:expo`, `npm run typecheck`, `npm test` and
`npm run test:e2e`. Do not promise a clean install based solely on the existing local
environment. Document the SQLite web proxy, environment variables without values,
optional gateway prerequisites, sample-data limitations and native tooling separately.
Useful code entry points: `app/`, `src/storage/database.ts`, `src/scheduler/fsrs.ts`,
`src/ai/generate.ts`, `services/ai_gateway/`.

## PCOSina

Keep the existing README's wellness disclaimer. Replace its machine-specific
architecture link with `[ARCHITECTURE.md](ARCHITECTURE.md)` in a dedicated application
documentation change. Add the case-study link, accurate tester-stage status and a
short generate/save/offline-view boundary. Do not imply new plans generate offline.

Suggested About description:

> Kotlin/Compose meal-planning application with a FastAPI constraint planner, pantry-aware groceries and local access to saved plans.

Suggested website: `https://joshua-portfolio-phi-lemon.vercel.app/projects/pcosina`

## Resume and personal voice

The approved PDF was not rewritten. Event dates in the site now follow it:
UP Manila Tech Summit HACKathon, May 10, 2025; BASE BUILD at Adamson, May 2, 2025.
The SAP document is attributed to its actual issuer on the certificate page rather
than silently changing the PDF. Review issuer wording in a future approved resume.
Add a genuine personal debugging account when the owner has time to review the
source-backed first-person draft; do not retroactively invent a story.

## Deployment automation

The portfolio's browser checks now run in GitHub Actions. Automatic Vercel deployment
from GitHub is still not established. Direct authorized CLI deployment remains the
documented release path. Connecting GitHub through Vercel settings is an owner action;
no account settings or hidden deployment credentials were added to the workflow.
