# Release status

## Current production release — November 18, 2026

- Runtime revision: `1446c95`, pushed to the public portfolio repository.
- Production deployment: `dpl_GzFoG3d7wkXmuAqCVKD4xwzL2w1i`, READY.
- Public address: https://joshua-portfolio-phi-lemon.vercel.app.
- Unique deployment: https://joshua-portfolio-b7ixh37qz-joshua-salvacions-projects.vercel.app.
- Six case studies, fourteen content routes plus 404, new platform filters and
  skills, seven reviewed captures, unchanged approved PDFs.
- Anonymous production checks passed for all fourteen routes, canonical/sitemap/
  robots, configured headers, real missing-route/asset 404s, original PDF hashes,
  new media hashes, existing recordings/evidence records and immutable asset caching.
- Live browser verification passed 28 page/width combinations at 390px and 1440px:
  filters, new/old dialogs, keyboard focus, mobile navigation, certificate/resume
  downloads and actual video playback. Zero browser or policy errors.
- FocusLoop, ResolveOps, Procura and FreshKeep repository visibility was rechecked:
  all remain private. No application repository was edited, committed or pushed.
- Owner explicitly approved the documented unpatched build-tool audit exception.
  Runtime audit has zero findings; full audit retains 11 high affected-package
  findings. The full CI audit gate remains intact; see `QA_REPORT.md`.
- Runtime CI: https://github.com/slvcn-jsh/joshua-portfolio/actions/runs/44233761853.
  Completed: clean install, build/static checks, SEO and browser suites passed.
  The only failed step was the full dependency audit covered by the approved
  exception. The pipeline is not green.
- Automatic GitHub-to-Vercel deployment remains unconnected; this was an authorized
  direct deployment. No account settings or deployment secrets were changed.

Local reports: `output/playwright/browser-report.json` (03:53:59 UTC) and
`output/playwright/live-report.json` (03:56:40 UTC), 18 November 2026. Reports and
screenshots are ignored local QA artifacts. Subsequent release-note edits do not
alter the deployed application assets.

Previous housekeeping CI run `43797517914` for `8865b07` was rechecked and concluded
successfully. The older production snapshot below is retained as release history.

## Previous production release — November 16, 2026

- Runtime revision: `bc638ae` (sole ownership, concise evidence-first case studies,
  current Barion screenshots and actual recording, compact navigation, automated browser QA).
- Production deployment: `dpl_9LPYeRmmTqw7E9XfT812dwcWYeJ9`, READY.
- Public address: https://joshua-portfolio-phi-lemon.vercel.app — anonymous access verified.
- Unique deployment: https://joshua-portfolio-pcjru1jow-joshua-salvacions-projects.vercel.app.
- Public verification passed: ten routes, sitemap/canonical/robots, configured security
  headers, real missing-page/asset 404s, immutable assets, unchanged resume and certificates,
  four current capture assets with SHA-256 checks and both downloadable test records.
- Live browser sweep passed 20 page/width combinations, scenario/annotation interactions,
  evidence dialogs, PDF downloads, keyboard focus, mobile navigation and real video playback;
  no browser or policy errors were reported.
- The first new CI browser run (`43737842076`) failed before browser checks because ANSI
  formatting split the preview URL. The runner now strips terminal formatting before
  readiness matching. This is test infrastructure only; deployed application code is unchanged.
- Current clean-environment status: [Portfolio quality workflow](https://github.com/slvcn-jsh/joshua-portfolio/actions/workflows/quality.yml).
- Automatic GitHub-to-Vercel deployment remains unconnected. Direct deployment is the
  authorized release path; no account settings or deployment secrets were changed.

The application repositories were inspected and exercised but not edited, committed
or pushed. PCOSina video capture remains pending a connected Android device.
`PROJECT_VERIFICATION.md` distinguishes application evidence from portfolio QA;
`REPOSITORY_HANDOFF.md` contains unapplied README/About recommendations.

## Earlier production records

Owner authorization: public GitHub repository and Vercel deployment after QA,
explicitly confirmed on 2026-11-14.

- Local implementation: complete, including the Behind the interface interactions, editorial refinement, credentials, original event photos, brand marks and restrained motion.
- GitHub: public repository at https://github.com/slvcn-jsh/joshua-portfolio, default branch `main`.
- Vercel: production deployment is READY in the owner's `joshua-salvacions-projects` scope.
- Public website: https://joshua-portfolio-phi-lemon.vercel.app (anonymous access verified).
- Production `SITE_URL`: persisted as a production-only Vercel Config variable using the public origin above. Production indexing and sitemap are enabled; preview builds remain noindex.
- Live checks: ten routes, canonical URLs, ten-entry sitemap, robots, all configured security headers, genuine 404 responses, immutable assets, unchanged resume and both certificate SHA-256 hashes passed.
- Live browser checks: 20 page/viewport combinations (390 and 1440px), both walkthroughs, annotations, modal/Escape/focus, Barion challenge, all five new evidence dialogs, mobile navigation and real PDF downloads passed with no browser/CSP errors.
- GitHub Actions: the initial quality workflow passed clean install, lint/build/static checks, SEO mode checks and dependency audit.
- Automatic GitHub-to-Vercel deployment: not established. Both CLI connection attempts failed; the owner was asked to connect the repository through the project's Git settings. Direct authenticated CLI deployment works and was used for this release.

Latest production deployment verified (2026-11-15): `dpl_5CVPoohBEByvPykUyWBfNxcNimZc`.
Application implementation commit: `a783e18` (credentials, original event evidence, brand details and motion).
The original release was `255409b` / `dpl_7hcFMmTvxXMRmVfJmJEAbDUoZFWU`.
All ten public routes and 20 production browser/viewport combinations passed after
the credential and event update, including security headers, metadata, real 404s,
all three PDF files' integrity and interactive behavior. GitHub Actions run
`43708912668` passed for `a783e18`. An initial network failure and stalled upload
were followed by a successful retry; the verified production state is READY.

## Updating the live site

Until the Git integration is confirmed, pushing to GitHub does **not** update Vercel automatically. After reviewing and passing `npm run check` and `npm run check:seo`, push the commit and run:

```sh
npx vercel deploy --prod --yes --scope joshua-salvacions-projects
node scripts/check-deployment.mjs https://joshua-portfolio-phi-lemon.vercel.app
```

The local `.vercel/` link and `.env.local` credential file are ignored by Git; `.vercelignore` excludes local environment files, browser artifacts and build caches from upload. Do not publish or copy their credentials.

No application repository was modified. No domains were purchased, and no account
plan or unrelated account settings were changed.
