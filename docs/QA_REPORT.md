# Final QA report

## Text-only header correction — November 18, 2026

Owner clarified that the portrait belongs only in the browser icon, not beside
the header name. Removed the header image and its styling, restored the previous
mobile name size, and updated the focused branding regression to require a
text-only header while retaining both portrait icon checks.

Build, lint, typecheck, formatting and static checks passed. Focused browser QA
passed ten width/theme combinations locally and again on the public deployment,
with no header accessibility violations or runtime errors. Mobile layout visually
reviewed. Browser and Apple touch icons still return valid PNG responses.

## Approved portrait branding — November 18, 2026

- Replaced the JS favicon with the owner-supplied portrait; added an Apple touch
  icon and a compact square header portrait beside the existing name/home link.
- Original file hash unchanged. Metadata stripped from generated assets; header
  WebP is 4,738 bytes. No new dependencies or project content changes.
- ESLint, TypeScript, production build and static validation passed (15 pages,
  669 local references). Focused `portrait` browser suite passed at 360, 390, 768,
  1024 and 1440px in both themes: no overflow or branding/control overlap, decoded
  images, working mobile navigation/home link, PNG icon responses, no header axe
  violations and zero runtime errors. Mobile/light and desktop/dark screenshots
  were visually reviewed. This is focused regression QA, not a rerun of all suites.
- Existing development-tool security exception is unchanged; no dependency changes.
- Anonymous production verification repeated all ten width/theme combinations
  successfully, including header axe checks and image/icon loading. Axe uses
  browser initialization instrumentation; the production CSP remains unchanged.

## Light/dark theme and sliding showcase — November 18, 2026

### Implemented

- Light, dark and system modes on all routes. Same-origin pre-paint initialization,
  optional local storage, system updates and cross-tab synchronization. No inline
  script or CSP relaxation. Screenshot/certificate/photo colors remain unchanged.
- One six-project homepage showcase replaces the two featured cards and additional
  project index. Direct project selection, previous/next, keyboard arrows/Home/End,
  touch swipe, status announcement and native image enlargement. Inactive slides
  are inert. No autoplay or intercepted vertical scrolling.
- Responsive media/text composition, restrained project-tinted stages, overlapping
  frosted selector and solid-surface fallback. Coordinated 520ms directional slides;
  reduced motion removes displacement. No-JS and print retain the full sequence.
- Original type hierarchy, project overview, case studies and evidence preserved.
  No new runtime dependency, image asset or project/content claim.

### Local evidence

- TypeScript, ESLint, production build, formatting and static validation passed:
  15 HTML files, 624 local references, unchanged approved PDFs and media hashes.
- Production/preview/unconfigured SEO checks passed in isolated fixtures.
- Full ten-suite browser regression passed. Light and dark route sweeps cover 150
  page/width combinations at 360, 390, 768, 1024 and 1440px; zero detected WCAG A/AA
  axe violations or horizontal page overflow.
- New design suite: 60 project/theme/width states, 24 image-dialog checks, keyboard
  selection and focus return, rapid selection, boundaries and live announcements.
  Real Chromium touch dispatch over a screenshot advances the project without
  opening its dialog; vertical gesture handling does not change the selection.
- Stored preference survives navigation; tabs synchronize; system-mode changes
  update immediately. Blocked storage remains usable. The correct dark background
  renders with the hydration bundle blocked, and with JavaScript disabled.
- Existing walkthroughs, gallery dialogs, certificate/resume downloads, video,
  mobile navigation and contact fallbacks pass. The expanded CSP suite covers five
  pages, including theme selection and the new showcase, with zero policy violations.
- Visual inspection: light/dark desktop homepage, mobile dark homepage, native/web
  showcase layouts, dark skills and PCOSina case study. Removed the introductory
  entrance shift; surface/text colors switch together to avoid low-contrast
  intermediate theme colors. Focus outlines are intentional and retained.
- Output: CSS 73.48 KB / 14.95 KB gzip; JavaScript 323.44 KB / 98.93 KB gzip.
  No runtime package or dependency-lock changes.

Report: `output/playwright/browser-report.json`; captures are ignored local QA
artifacts. This verifies Chromium browser behavior and an Edge visual review, not
physical-device, Safari/Firefox or assistive-technology certification.

`npm audit --omit=dev` remains clean. Full audit still reports the same 11 high
development-package findings covered by the owner's approved exception below.
The audit gate is unchanged.

### Production verification

Runtime `2f3fd6e` is deployed to the existing public Vercel address. Anonymous checks
passed for fourteen routes, security headers, metadata, real 404s, unchanged PDF/media
hashes and the exact reviewed theme initializer. Live browser verification passed
28 route/viewport combinations at 390px/1440px, including all six showcase choices
and image dialogs in both themes (24 states), original interactions, video and PDF
downloads. Zero browser/policy errors. All four private source repositories were
rechecked and remain private. `RELEASE_STATUS.md` records deployment and hosted CI
identity; local and live success do not imply a green full dependency-audit pipeline.

## Six-project expansion — November 18, 2026

This section supersedes prior portfolio page counts. Application test records are
historical, attributed evidence; no new application suite was run in this task.

### Implemented and checked

- Four audited case studies, bringing the collection to six projects and fourteen
  content routes plus 404. Private repositories remain private; no inaccessible links.
- All/Android/Cross-platform/Web filters, a compact homepage index, bounded motion,
  and project-backed skills including Room, NestJS, Express, Prisma, Zod and Docker.
- Seven reviewed application captures. FocusLoop/FreshKeep use synthetic native
  fixtures; ResolveOps is labeled fictional UI preview; Procura uses an isolated
  persisted test workflow. No credentials, real usage records or business data copied.
- TypeScript, ESLint, production build and static-link/image/metadata checks passed.
  Fifteen HTML pages and 601 local references validated. Approved PDF hashes unchanged.
- SEO checks passed for production, preview and unconfigured builds.
- Browser sweep: 75 route/width combinations at 360/390/768/1024/1440px, zero detected
  WCAG A/AA axe violations, page overflows or JavaScript errors.
- New features: 20 case-study/width combinations, 20 keyboard filter checks and 35
  image-dialog checks; focus return, reduced motion and all six homepage entries pass.
- Existing walkthroughs, video, contact controls, certificate/event dialogs and PDF
  downloads pass. All fourteen content routes work without JavaScript.
- Visual review: desktop/mobile home, collection, project briefs and media. Initial
  card-opacity animation reduced transient contrast; removed opacity animation rather
  than masking the failure in tests. Large web captures use a readable viewport preview
  with access to the complete image instead of an illegible full-page thumbnail.

### Production verification and review

Published runtime `1446c95` to the existing Vercel alias after owner approval.
Anonymous deployment checks passed for fourteen routes, security headers, real 404s,
canonical/sitemap/robots, new reviewed asset hashes, original PDFs and existing
video/evidence files. Live browser checks passed 28 route/viewport combinations at
390px and 1440px, including filters, enlarged captures, original interactions and
downloads; zero browser/policy errors. Details are in `RELEASE_STATUS.md`.

- Recruiter review: identity and education stay first; original featured projects
  remain prominent; the other four are reachable through a compact index.
- Technical review: each project exposes its actual purpose, stack, implementation
  decisions, test provenance and limitations without a hover-only reveal.
- Engineering review: separate data authority, concurrency and failure handling are
  explained. Fictional UI, historical tests and uncommitted implementation are not
  represented as production evidence. The approved resume remains unchanged.

### Approved build-tool security exception

`npm audit --omit=dev`: zero findings. Full `npm audit`: 11 high affected-package
findings rooted in development dependency `picomatch` 4.0.7. GitHub advisory
[GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)
lists no patched version, and the registry's latest version is 4.0.7 as checked
18 November. It concerns attacker-supplied glob patterns and Node event-loop denial
of service. This project has no public Node backend or user-controlled build-glob
input; the dependency is build/lint tooling, not browser runtime. This is a scoped
risk assessment, not a clean full-audit result.

The owner explicitly approved publication of the static portfolio with this
documented exception on 18 November. No force downgrade, unsupported local dependency
patch or audit suppression was applied. CI's full audit gate is retained. Runtime
workflow [44233761853](https://github.com/slvcn-jsh/joshua-portfolio/actions/runs/44233761853)
passed clean install, build/static checks, SEO and browser suites; only the full
dependency audit failed. Recheck upstream releases and remove the exception
after a compatible patched dependency can pass a fresh full audit.

Automated accessibility checks are not a formal conformance certification. Broader
screen-reader and real-device browser coverage remains useful follow-up work.

## Evidence-first release — November 16, 2026

This section supersedes earlier portfolio snapshots below. Application verification
is separately scoped in `PROJECT_VERIFICATION.md`; it is not portfolio QA or release
certification of either application.

### Implemented

- Sole-developer responsibility and AI assistance are visible in each case-study opening.
- Explicit decision/evidence mapping and pinned source revisions replace positional mappings.
- Six-section case studies, compact native mobile contents, optional failure-path walkthroughs,
  relationship diagrams and a concrete implementation account replace repeated prose/quiz.
- Five primary navigation links; About/footer retain achievements and certifications.
- Event names/dates reconciled with the unchanged approved resume.
- Downloadable scoped records for five PCOSina and seven Barion tests.
- Current Barion images and genuine 14.4-second sample review recording, with native controls,
  no autoplay, preload none, written alternative and download. No synthetic UI or narration.
- Browser and accessibility regression workflows now run in CI; Playwright is development-only.

### Verified locally

Lint, TypeScript, production build, 11 static HTML pages / 391 local references,
production/preview/unconfigured SEO modes, dependency audit and formatting passed.
The approved resume hash matches the supplied original; both certificate hashes and
new media hashes are enforced by the static validator. No private application data,
environment files or credentials were copied into public assets.

The browser runner checks 55 page/width combinations at 360, 390, 768, 1024 and 1440px.
The executed sweep found no overflow, broken images, page errors or axe WCAG A/AA
violations. Additional executed suites cover keyboard menus/skip links, clipboard and
its failure fallback, real PDF downloads, both case-study interactions, 25 credential/event
dialog states, reduced motion, ten no-JS routes, local CSP behavior and scenario deep links.
The recording was played and downloaded at mobile and desktop widths; its open state
was scanned for accessibility. Automated checks do not replace screen-reader/user testing.

Visual inspection included the 390px case-study opening, actual current Barion screenshots,
recording, 1440px architecture diagram and desktop homepage. Clean hierarchy, image aspect
ratios and the existing editorial identity are preserved.

Measured with disclosures initially closed at 390px: ownership begins at y=361px on both
projects; total page heights are 6597px (PCOSina) and 6638px (Barion). Main case-study text
is 657 and 664 words respectively. These are website measurements, not application outcomes.

### Remaining boundaries

Public deployment checks and the 20-case live browser sweep subsequently passed on
`bc638ae` / `dpl_9LPYeRmmTqw7E9XfT812dwcWYeJ9`. New capture hashes and both evidence
records were checked anonymously against local approved assets. The first Linux CI
run exposed a preview-readiness parser issue caused by ANSI coloring, not an application
failure. The runner was narrowed to normalize terminal control characters; a forced-color
local rerun and the GitHub workflow provide regression verification.

No connected Android device was available for a fresh PCOSina video. Barion capture proves
one local web path, not native or deployed readiness. Application repository README/About
changes are prepared but not applied (`REPOSITORY_HANDOFF.md`). Owner review of personal
wording and independent learning/health-content review remain open. Automatic GitHub-to-
Vercel deployment is not connected. See `RELEASE_STATUS.md` for the actual published revision.

### Review by audience

- HR: identity, education, projects, approved resume and contact stay direct; background proof
  remains available without competing for every primary navigation slot.
- Technical recruiter: ownership, project status and specific verification are now immediate.
- Engineer: source-pinned decisions, local/network boundaries and test limitations can be inspected;
  there is no unsupported production-readiness or performance claim.

## Earlier release records

Audit started: 2026-11-13. Final verification: 2026-11-14. Scope: the portfolio, not a new release certification of PCOSina or Barion.

## Delivery

Implemented all nine requested routes and a 404 page. Both project case studies include context, users, solution, features, application media, workflow, architecture, implementation decisions, challenges, testing approach, status, contributions and lessons. Public repository and source-file links are verified. The approved resume is available as an unchanged PDF with a rendered preview.

## Automated checks

A clean `npm ci` completed successfully before the final lint, typecheck, build, static-site validation, SEO checks and dependency audit. A Windows file lock during the first reinstall was resolved by stopping this portfolio's preview process; no project source or unrelated process was changed.

| Check                                | Result                                                                                                                            |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript strict checks             | Pass                                                                                                                              |
| ESLint, zero warnings                | Pass                                                                                                                              |
| Vite production build and prerender  | Pass; 10 HTML documents                                                                                                           |
| Generated-site validator             | Pass; 261 local references, image attributes, unique titles, headings and fragment destinations                                   |
| npm dependency audit                 | Zero reported vulnerabilities after the lint-tool dependency override                                                             |
| Responsive browser matrix            | 50 page/viewport combinations pass: ten routes at 360, 390, 768, 1024 and 1440px                                                  |
| Automated accessibility              | Zero axe-core WCAG 2/2.1 A/AA violations across the matrix                                                                        |
| Horizontal overflow / missing images | None detected in the matrix; screenshot capture explicitly decoded images                                                         |
| Browser runtime errors               | None in the passing final sweep                                                                                                   |
| JavaScript disabled                  | All nine pages readable; native mobile menu and navigation work                                                                   |
| Metadata modes                       | Production canonical/OG URL and nine-entry sitemap verified in isolated fixtures; previews and unconfigured builds remain noindex |
| Public asset inspection              | Only reviewed screenshots, approved resume, preview, favicon and social card; no application source trees or datasets             |
| Secret-pattern scan                  | No private-key, AWS access-key, GitHub-token or OpenAI-key patterns found in source/public/build output                           |

## Interaction checks

Passed: first keyboard focus on the skip link; skip to main; keyboard menu opening; Escape closing with focus return; mobile project navigation; browser back; actual PDF download; clipboard email copying; clipboard-denied fallback; correct mailto destination; case-study contents anchors; reduced-motion styling.

Original resume, served public PDF and browser-downloaded PDF share SHA-256 `1854a1d13980b57337470da29ddea30eadd2ddb8a242bb2ebbbb47481cb4211c`.

External links: GitHub account and both public repositories were resolved through the GitHub API. All eight linked implementation files were verified at the referenced commits. No unverified LinkedIn or demonstration URLs are rendered. Opening the operating-system email app and delivering an email were not tested; the mailto target was verified.

## Visual and editorial review

Desktop and mobile captures are in ignored `output/playwright/`. Reviewed home, both case studies, skills, about, achievements, resume and contact at 1440px and/or 390px. Browser automation covers the intermediate sizes. Screenshots retain their aspect ratios, mobile actions wrap, page headings remain readable, and long case studies have a desktop contents sidebar and a mobile section index.

- HR reading path: identity, education, internship direction, both project links and resume/contact actions are direct. The championship is distinct from participation.
- Technical recruiter reading path: project summaries identify stack, purpose and current status; the case studies link to implementation evidence.
- Engineer reading path: local/remote boundaries, optional AI, solver authority, failure behavior and testing limitations are explicit. No invented usage or performance metrics.

The lean-build guidance influenced the architecture: reusable components and typed content, static HTML and native navigation, with no CMS, auth, analytics or runtime service. PDF review preserved the approved document and produced only a web preview.

## Corrections during QA

- Darkened project-number labels to meet contrast requirements.
- Matched accessible link labels to their visible wording.
- Corrected a Tailwind container-class conflict to enforce the specified 1120px layout.
- Guarded hydration against a different prerendered route, preventing an unknown-URL rendering mismatch in local preview.
- Put both named project links directly below the home actions for earlier mobile discovery.
- Corrected the projects listing heading hierarchy.
- Updated the vulnerable minimatch dependency used by lint tooling, then reran lint/build checks.

## Performance and deployment scope

After the interaction extension, the production JavaScript bundle is approximately 88.0 KB gzip; CSS approximately 8.74 KB gzip. The entire generated output, including all HTML, screenshots and PDF, is approximately 950 KB. These are build sizes, not claimed field performance or Lighthouse scores. Fonts are local system fonts; appropriate media lazy-loads; the production application makes no third-party service requests. No runtime dependencies were added for the extension.

Vercel build configuration, clean URLs, CSP and other security headers are prepared. Production canonical URLs and sitemap require an approved `SITE_URL`. The owner explicitly approved public GitHub and Vercel publication after QA on 2026-11-14. Actual release state is maintained in `RELEASE_STATUS.md`. Verify response headers, direct routes and real 404 status on the final hosting environment; local security-header simulation does not prove hosting behavior. Vite preview's unknown-route HTTP 200 fallback is not a production 404 verification.

## Behind the interface — additional verification

- PCOSina connection-loss and Barion AI-unavailability walkthroughs: select and reset with keyboard/mouse; illustrative labels persist; no external service is contacted.
- Three annotations per case: keyboard selection updates the measured highlight and explanation. Historical media notices remain visible.
- Native image dialog: open from image link, Tab/Shift+Tab containment, Escape and close button, return focus, body scroll restoration and original-image fallback.
- Case contents: active section updates; links set the URL fragment and move keyboard focus to the destination heading. Previous/next project destinations verified.
- Barion challenge: all three choices, direct-answer action and explanatory feedback; no timers, scores or stored answers.
- Ten project/viewport combinations, with 35 axe accessibility scans across changed states, passed at 360, 390, 768, 1024 and 1440px.
- JavaScript-disabled scenario explanations, screenshot annotations, image links and challenge answer passed alongside the original nine-route navigation checks.
- Both case studies passed with the exact configured CSP applied to local responses: no policy violations; highlights, dialog and scenario controls worked.
- Original resume SHA-256 is unchanged. Dependency audit: zero reported vulnerabilities. Formatting, lint, TypeScript, prerender, static references and SEO mode checks pass.

Corrections made during this extension: removed redundant screenshot ARIA labels; added modal focus wrapping and destination-heading focus; prevented low-contrast intermediate button colors; moved highlight coordinates from inline styles to external CSS; kept mobile diagram branches visually independent. The lean-build workflow kept enhancements in reusable components and structured content without a service or animation-library dependency.

## Remaining evidence limits

- Barion's images are historical MedStudy captures, explicitly labeled; current branded screenshots remain an optional content refresh.
- No verified public live demos or LinkedIn URL were available.
- App test suites were inspected, not rerun; application production readiness is not certified by this portfolio QA.
- Browser automation ran in local Chromium. Safari/Firefox and physical-device testing remain unperformed.
- Automated accessibility checks and keyboard review are not a complete assistive-technology audit.

Maintenance, local commands, asset replacement and deployment instructions: `README.md`. Content evidence and missing items: `PROJECT_AUDIT.md`, `MISSING_ASSETS.md`, `ASSET_PROVENANCE.md`.

## Production release checks — 2026-11-14

Public origin: https://joshua-portfolio-phi-lemon.vercel.app. Public source: https://github.com/slvcn-jsh/joshua-portfolio.

- `node scripts/check-deployment.mjs <origin>`: nine direct routes return 200 anonymously; canonical URLs, robots and nine-entry sitemap match the origin; configured CSP/security headers match `vercel.json`; missing route and missing asset return 404; hashed JavaScript is immutable; four project images load; downloaded PDF hash matches the approved original.
- `scripts/live-qa.js`: 18 route/viewport checks on the live site at 390/1440px, with working scenario selection, screenshot highlights, native dialog, Escape/focus return, optional challenge, mobile navigation and PDF download. No browser errors, CSP errors or unexpected external requests.
- GitHub Actions run `43558145913`: clean installation, lint, TypeScript/build/static validation, SEO fixtures and dependency audit passed on Ubuntu/Node 22.
- Direct CLI deployment is verified. Automatic deployment from GitHub is not yet established; this limitation affects future updates, not availability of the published site.

Production screenshots and local test artifacts remain in ignored `output/playwright/`, not in the published source or deployment payload. The original app repositories and approved PDF were not modified.

## Editorial refinement checks — 2026-11-15

Scope: work-led homepage, typography and shared layout, content de-duplication and
direct page/section headings. Personal anecdotes and additional interactive features
were intentionally deferred. The lean-build skill kept this pass on existing components
and local fonts, without adding dependencies or services.

- `npm run check`: ESLint, TypeScript, production build, 10 prerendered documents and 249 local references passed.
- `npm run check:seo`: production/preview/unconfigured fixtures passed; `npm run format:check` passed; `npm audit --audit-level=moderate` reported zero vulnerabilities.
- `browser-qa.js`: 50 page/width combinations at 360, 390, 768, 1024 and 1440px; zero axe WCAG 2/2.1 A/AA violations, horizontal overflows, broken-image findings or page errors.
- `enhanced-qa.js`: 10 project/width combinations, 35 interactive accessibility scans; all walkthrough, annotation, image-dialog, focus, challenge, contents and reduced-motion checks passed.
- `interaction-qa.js`: all 11 original checks passed, including keyboard menu, actual PDF download, clipboard success/failure and mailto target.
- `nojs-qa.js`: nine static pages, native mobile navigation and case-study fallback explanations passed.
- `csp-qa.js`: both cases passed under the configured strict policy, with zero policy violations.
- `editorial-qa.js`: single project presentations, unique homepage images, one education introduction, responsive reading order, image aspect ratios, actual case-study navigation at all five widths and six direct page titles passed.
- Desktop/mobile screenshots were captured for visual review. Screenshot QA now scrolls visible images into view before decoding, avoiding waits on intentionally unloaded images in closed disclosures. Image link accessible names include their visible captions.
- Build sizes: JS 86.95 KB gzip, CSS 9.26 KB gzip, approximately 937 KB total static output. These are build measurements, not field performance or a Lighthouse score.

No project implementation claims were expanded, no source application repositories
were changed, and the approved PDF and screenshots remain unchanged. Physical devices,
Safari/Firefox, assistive-technology audits and new first-impression user testing remain
outside the performed checks.

### Production verification

- Published implementation `6cf5636` to GitHub main and production deployment `dpl_6s7CtDXVqU8BpDKQaZJwsa1ytH1h` to the existing public alias.
- `check-deployment.mjs`: nine routes, canonical/OG/sitemap, security headers, immutable assets and four project images passed; missing route/asset returned 404.
- Approved resume SHA-256 remains `1854a1d13980b57337470da29ddea30eadd2ddb8a242bb2ebbbb47481cb4211c`.
- `live-qa.js`: 18 live route/viewport combinations, scenario/annotation/dialog/challenge interactions, mobile navigation and actual PDF download passed; zero browser/policy errors or unexpected external requests.
- GitHub Actions run `43679890548` passed clean installation, lint, TypeScript/build, static checks, SEO fixtures and dependency audit.
- Public origin remains https://joshua-portfolio-phi-lemon.vercel.app. Updated anonymous production screenshots were inspected. Automatic Git integration was not changed; direct deployment remains the documented update workflow.

## Credentials, logos and original event evidence — 2026-11-15

Scope: two certificate documents, three owner-supplied event photographs, specific
UP Computer Science/Adamson event wording, genuine project and technology marks,
LinkedIn and restrained motion. Reused the existing accessible image viewer and
content architecture. Simple Icons is development-only; no animation library,
remote media dependency or new external service was introduced.

- Lint, TypeScript, production build and static validation passed: 11 HTML documents
  (ten content routes and 404), 429 local references and both certificate SHA-256 hashes.
- Production/preview/unconfigured SEO fixtures passed; npm audit reported zero vulnerabilities.
- `browser-qa.js`: 55 route/width combinations across 360, 390, 768, 1024 and 1440px;
  zero axe WCAG A/AA violations, horizontal overflow or browser errors.
- `identity-qa.js`: all five new evidence dialogs at every width (25 dialog accessibility
  scans), image decoding, Escape/focus return, icon coverage, both PDF downloads,
  supplied LinkedIn destination, reduced motion and no-JS certificate fallback passed.
- `enhanced-qa.js`: ten project/width combinations and 35 interactive accessibility
  scans passed. `interaction-qa.js`: all 11 prior keyboard, download, copy and link checks passed.
- `editorial-qa.js`: project presentation deduplication, reading order, screenshot
  proportions and case-study navigation passed at all five widths.
- `nojs-qa.js`: ten static pages and existing native fallbacks passed.
- `csp-qa.js`: both project cases plus certificates and event-photo dialogs passed
  with zero security-policy violations.
- Desktop/mobile screenshots captured and visually inspected for home, skills,
  certificates, achievements and contact. Photos preserve their full frame; portrait
  images are contained rather than cropped. Certificates remain readable through
  enlargement and original PDFs. Event photo dates are not redundantly repeated.
- Build measurement: approximately 90 KB JS gzip, 10 KB CSS gzip and 2.5 MB total
  static output including all PDF/image assets; not a measured field-performance score.

Original resume and certificate files remain unchanged. Credential information is
transcribed from owner-approved documents, not an independent issuer-status check.
Event association and university context are owner-confirmed. No individual people
were identified from photographs. Chromium testing does not replace physical-device,
Safari/Firefox or screen-reader audits; those remain unperformed.

### Credential update: production verification

- Implementation `a783e18` published to GitHub main. GitHub Actions run `43708912668`
  passed clean install, lint, typecheck/build/static validation, SEO fixtures and audit.
- Production deployment `dpl_5CVPoohBEByvPykUyWBfNxcNimZc` reached READY after a
  network/upload retry. Existing public alias is unchanged.
- `check-deployment.mjs` passed ten direct public routes, sitemap/canonicals, security
  headers, 404 behavior, immutable assets, all three event photos, four project images,
  and byte-identical public downloads of the resume and both certificates.
- `live-qa.js` passed 20 production page/viewport combinations, all five evidence
  dialogs at mobile/desktop widths, both certificate downloads, resume download,
  existing project interactions and mobile navigation. No browser/CSP errors or
  unexpected external requests were observed.
