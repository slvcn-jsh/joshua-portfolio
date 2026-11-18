# Release status

## November 18 candidate — six projects

Implementation and local functional QA are complete; four new source repositories
remain private. Owner approved publication with the unpatched development-tool audit
exception documented in `QA_REPORT.md`. The full audit gate has not been disabled.
Deployment identity and public verification will be recorded after publication.

Previous housekeeping CI run `43797517914` for `8865b07` was rechecked during this
task and concluded successfully. The production runtime below remains unchanged
until the new candidate is deployed and anonymously verified.

## Current production release — November 16, 2026

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
