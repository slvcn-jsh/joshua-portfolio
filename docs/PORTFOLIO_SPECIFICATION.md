# Portfolio specification

## Outcome

Recruiters can identify Joshua, his education, core stack, six selected projects, resume and contact without searching. Technical reviewers can inspect problem, architecture, decisions, tests, contributions and limitations.

## Routes

`/`: identity, role, concise introduction, primary stack and resume/contact actions,
followed by one six-project sliding showcase. PCOSina is selected initially; all six
projects are directly selectable. The static fallback shows the complete sequence.

`/projects`: six-project collection, PCOSina first, with platform filtering, purpose, status, stack and case studies. Public source links only for PCOSina/Barion; private-source labels for the other four.

`/projects/pcosina`, `/projects/barion`, `/projects/focusloop`, `/projects/resolveops`, `/projects/procura`, `/projects/freshkeep`: overview/context/users; features and real media; workflow; implementation architecture and decisions; challenges; testing and status; development work, lessons and next steps. Only public repositories receive source links. Historical test records and unfinished modules are explicitly labeled.

`/skills`: seven capability categories, with project-used versus studied distinctions and no ratings.

`/about`: education, engineering direction and learning practice.

`/achievements`: championship separate from participation.

`/resume`: approved PDF viewing/download, no rewritten resume.

`/contact`: email, copy email with fallback, GitHub and approved LinkedIn profile.

Unknown routes: clear 404 with navigation back to projects/home.

## Architecture

React + TypeScript + Vite + Tailwind CSS + Lucide. Static React rendering at build time produces each route's HTML with page-specific metadata; client hydration adds small interactions. Standard links preserve browser behavior and make navigation work without JS. No runtime server, database, auth, analytics, remote fonts or motion library.

System/light/dark preference uses an early same-origin script and semantic CSS
tokens. Browser storage is optional; no server preference or tracking is introduced.
The shared header exposes an accessible native theme selector on every hydrated page.
Showcase motion is user-triggered and disabled under reduced motion. See
`DESIGN_EVOLUTION.md` for this extension's interaction and acceptance details.

Content lives in typed modules; shared layout, project summary, section intro, architecture flow and case-study components own repeated presentation. Vercel serves static HTML with clean URLs, security headers and a proper 404. No SPA catch-all rewrite hiding missing assets.

Only approved images and resume enter `public/`. Structured project source evidence stays in `docs/`; no private source trees are bundled. Optional `SITE_URL` builds canonical metadata and sitemap for the chosen production hostname. Preview builds are noindex and do not claim a preview canonical URL.
