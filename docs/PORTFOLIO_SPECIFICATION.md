# Portfolio specification

## Outcome

Recruiters can identify Joshua, his education, core stack, two selected projects, resume and contact without searching. Technical reviewers can inspect problem, architecture, decisions, tests, contributions and limitations.

## Routes

`/`: identity, role, concise introduction, primary stack, project and resume/contact actions, both featured projects, academic summary.

`/projects`: two complete project summaries, PCOSina first, with status, stack, case studies and sources.

`/projects/pcosina` and `/projects/barion`: overview/context/users; features and real media; workflow; implementation architecture and decisions; challenges; testing and status; contributions, lessons and next steps; source links. Group related topics to keep reading concise.

`/skills`: seven capability categories, with project-used versus studied distinctions and no ratings.

`/about`: education, engineering direction and learning practice.

`/achievements`: championship separate from participation.

`/resume`: approved PDF viewing/download, no rewritten resume.

`/contact`: email, copy email with fallback, GitHub.

Unknown routes: clear 404 with navigation back to projects/home.

## Architecture

React + TypeScript + Vite + Tailwind CSS + Lucide. Static React rendering at build time produces each route's HTML with page-specific metadata; client hydration adds small interactions. Standard links preserve browser behavior and make navigation work without JS. No runtime server, database, auth, analytics, remote fonts or motion library.

Content lives in typed modules; shared layout, project summary, section intro, architecture flow and case-study components own repeated presentation. Vercel serves static HTML with clean URLs, security headers and a proper 404. No SPA catch-all rewrite hiding missing assets.

Only approved images and resume enter `public/`. Structured project source evidence stays in `docs/`; no private source trees are bundled. Optional `SITE_URL` builds canonical metadata and sitemap for the chosen production hostname. Preview builds are noindex and do not claim a preview canonical URL.
