# Release status

## Local extension — November 21, 2026 (not published)

Latest selected-plan implementation: earlier authentic case captures, explicit
internship positioning, two featured starting projects with all six retained,
responsive preview assets, larger metadata/controls, one sidebar-docked desktop
feedback launcher, removal of Copy message, page/content code splitting, CSS
ownership cleanup and Firefox/WebKit compatibility gates. Skills redesign,
supporting-page storytelling and application/live-demo development remain deferred.
No resume content was changed. See the newest QA section for measured results.

### Domain decision — researched, not configured

Recommendation: obtain an eligible student `.dev` domain, but **keep Vercel as the
host**. A domain is an address, not a hosting provider; receiving it through GitHub
Education does not require deploying on GitHub Pages. No domain was purchased,
registered or transferred, and no DNS or production settings were changed.

The current [GitHub Student Developer Pack](https://education.github.com/pack)
lists a Name.com offer including selected `.dev` names. This is separate from
Namecheap's `.me` offer. [Name.com's own benefit description](https://github.com/namedotcom/student-pack)
says the first registration year is free, not lifetime registration. Student
eligibility, redemption status, name availability, premium-name exclusions and the
actual renewal/auto-renew terms must be checked in the owner's account/checkout;
none can be confirmed from the repository. Do not commit to an unverified price.

[Vercel supports attaching an existing custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
The registrar can remain Name.com. Use the DNS records shown for this project in
Vercel, not an assumed universal IP address. The address change alone does not
alter the deployed HTML, CSS, layout or features. It gives a portable branded
address, not an automatic speed or search-ranking improvement. Risks are renewal
cost, losing the name through expiry, and DNS/certificate mistakes during cutover.
Google Registry confirms that [.dev requires HTTPS and a certificate](https://www.registry.google/domains/dev/)
before browsers will load it; verify TLS before redirecting existing traffic.

[GitHub Pages is static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
and [also accepts custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).
This prerendered site could be adapted to it, but there is no need to migrate to
claim the domain. A migration would require a deployment workflow, verification of
extensionless nested URLs/404 handling and root-relative assets (especially on a
repository-path URL). The current `vercel.json` headers/redirect configuration
would not configure Pages. Both choices still depend on FormSubmit for the present
email feature; the domain itself provides neither an inbox nor a backend. Future
application backends would need their own hosting; Pages does not run them.
Moving now adds setup and regression risk without a demonstrated benefit for this
site. Keeping the current Vercel build, previews and configuration is the lower-risk
option; this recommendation is an assessment of this repository, not a universal
claim that Vercel is faster or always cheaper.

After separate authorization and a domain choice: redeem the benefit, check renewal
terms, attach the domain in Vercel, configure the displayed DNS records, verify TLS
and all direct routes, set the intended primary-host redirect, rebuild with the
approved production `SITE_URL`, and verify canonical/OG/sitemap plus real FormSubmit
delivery from the new origin. Retain the existing host until those checks pass.

### Earlier local implementation details

Implemented the owner-requested fixed/collapsible sidebar, automatic looping project
showcase, day/night scene control, education/logo refinement, portrait navigation
identity and private email feedback. Local validation is recorded in `QA_REPORT.md`.
The follow-up adds a two-column desktop introduction/project layout, smoother
project transitions, aligned technology grids, evidence-only hold/click previews,
an obscured resume cover and in-page FormSubmit messaging. No live-demo URLs are
configured. Inbox activation and a real delivery check are owner actions still
required; automated tests use intercepted responses and send no email. The PDF
remains public; obscuring the page preview is not access control.
The latest density follow-up simplifies the homepage project card, opens its spacing
and removes Contact's duplicate form. The global feedback form mounts on first use.
Fresh local `npm audit --json` reports zero known findings on November 21; older
release audit exceptions below are historical, not the current local audit result.
No commit, push or production deployment was performed for this extension. The
production release below remains the last published version.

## Current production release — text-only header, November 18, 2026

- Revision: `5651750`; deployment: `dpl_Ctpb27j3wemSq9M8PGPF1TgYq1Ar`, READY.
- Public address: https://joshua-portfolio-phi-lemon.vercel.app.
- Per owner clarification, header shows only the name. Photo remains in browser
  and saved-site icons. Build/static checks and ten local plus ten anonymous
  production width/theme branding checks passed, including header accessibility,
  mobile navigation and icon loading. Existing security exception unchanged.

## Previous production release — portrait branding, November 18, 2026

- Runtime change: `7fc2518`; deployed revision: `c2a940f` (QA formatting follow-up).
- Production deployment: `dpl_7HVAVuGiFRejt6L2LxeRjZkeVmRo`, READY.
- Public address: https://joshua-portfolio-phi-lemon.vercel.app.
- Owner-approved portrait replaces the JS browser icon and accompanies the header
  name; includes an Apple touch icon. Original file untouched; no new dependencies.
- Build, lint, typecheck and static checks passed. Focused local and anonymous
  production browser checks each passed ten width/theme combinations, including
  header accessibility, menu/home navigation and icon responses. No runtime errors.
- Existing build-tool audit exception remains unchanged. Test/release-note commits
  after deployment do not change runtime assets. Git integration remains unconnected.

## Previous production release — themes and showcase, November 18, 2026

- Runtime revision: `2f3fd6e`, pushed to the public portfolio repository.
- Production deployment: `dpl_6cQjr3h9hsQbAsVDWum3wTunBYVm`, READY.
- Public address: https://joshua-portfolio-phi-lemon.vercel.app.
- Unique deployment: https://joshua-portfolio-ox4lfd4do-joshua-salvacions-projects.vercel.app.
- System/light/dark themes, six-project sliding homepage showcase, direct selection,
  touch/keyboard navigation, selective glass and reduced-motion/static fallbacks.
- Anonymous deployment checks passed for all fourteen routes, unchanged security
  headers, canonical/sitemap/robots, genuine missing-route/asset 404s, reviewed
  captures, approved PDF hashes, existing recordings and immutable asset caching.
  The published pre-paint theme initializer matches the reviewed source.
- Full local ten-suite browser report completed at 09:08:12 UTC on 18 November.
  Includes 150 light/dark route/width checks, 60 showcase states, 24 image-dialog
  checks and actual Chromium touch input. See `QA_REPORT.md` for limitations.
- Live browser verification passed 28 route/width combinations at 390px and 1440px.
  All six projects were selected and enlarged in both themes at both widths (24
  showcase/dialog states). Theme changes, focus return, old/new galleries, original
  scenarios, video playback, mobile navigation and PDF downloads passed with zero
  browser or policy errors.
- Runtime CI: https://github.com/slvcn-jsh/joshua-portfolio/actions/runs/44273267763.
  Hosted clean install, build/static checks and SEO passed; browser tests were still
  running at release-note preparation. The full audit gate remains enabled, with
  the owner's existing exception for 11 high development-package findings. Runtime
  dependency audit remains clean; this is not a claim of a green full pipeline.
- All four newer application repositories were rechecked and remain private.
  No application source, screenshot, certificate, resume or dependency was changed.
- Direct authorized Vercel publication; Git integration remains unconnected.
  Later release-note commits do not change deployed application assets.

## Previous six-project release — November 18, 2026

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
