# Final QA report

## Verified custom-domain cutover — November 21, 2026

`https://joshuasalvacion.dev` is now the primary public portfolio address. The
owner saved Name.com DNS; Vercel's project-scoped check confirms both root A
records and correct assignment to `joshua-portfolio`. The managed certificate is
issued with automatic renewal; a normal anonymous Chromium connection verifies
the hostname and TLS 1.3 without bypassing certificate validation.

Production `SITE_URL` was updated only after the domain served the latest site
over valid HTTPS. Deployment `dpl_9uJkjeKJSfkFUcveTkc3GaGtnCGr` from `ad13d78` is
READY. Its application JS/CSS hashes match the earlier verified checkpoint; no
component, design, media or dependency change was made during the domain cutover.
Fresh lint/typecheck/build/static validation, SEO fixtures and repository formatting
pass. A separate explicit formatter invocation on `.env.example` reported no parser
(unsupported format); the normal repository formatting check passes.

Anonymous production checks against `.dev` pass fourteen routes, configured headers,
canonical URLs, sitemap/robots, actual 404s, approved PDF/media hashes, evidence
records, exact theme bootstrap and immutable caching. Extra checks confirm OG URL
and social-image origin. The live suite passes 28 route/viewport states with theme,
evidence, filtering, scenarios, actual recording playback, mobile navigation and
downloads; no browser/policy errors. Additional 390/1440px theme/feedback checks
pass one/docked launcher, draft retention, removal of Copy message, focus return and
intercepted submission acknowledgments. No actual email was sent or receipt verified.

After those checks passed, the old public Vercel host was configured with a 308
project-domain redirect to `.dev`. Root, case-study and resume paths, a query string
and a missing-route path preserve their destinations. Following an old project link
returns the matching `.dev` page with status 200, without a redirect loop. Existing
backups are preserved; no registrar credentials or receipt/order IDs were committed.

## Domain assignment checkpoint — November 21, 2026

After owner-confirmed domain registration, `joshuasalvacion.dev` was explicitly
attached to the existing `joshua-portfolio` Vercel project (not another project).
Project-scoped verification confirms attachment/ownership but reports invalid DNS:
the Name.com-hosted root A record remains `91.195.240.94` (parking). The returned
recommended root A values are `216.198.79.1` and `64.29.17.1`. Registrar DNS edits
require the owner's signed-in account. No DNS, primary-host, `SITE_URL`, redirect
or application source change was made at this checkpoint. A working `.dev` TLS
connection and route checks are not yet claimed. See `RELEASE_STATUS.md` for the
exact pending action and project identity. No order/account receipt was committed.

## Authorized backup and production release — November 21, 2026

Runtime checkpoint `d5142c7` is pushed to GitHub with annotated tag
`portfolio-checkpoint-2026-11-21`; the complete-history local Git bundle verifies.
Fresh build/lint/typecheck/static checks, SEO fixtures and formatting pass before
deployment. The production build is READY as `dpl_GhjkVGLiyf9r2hBmrUh9izQUsxH4` at
https://joshua-portfolio-phi-lemon.vercel.app. This supersedes the local-only status
of the earlier implementation notes below; no application code changed after that
checkpoint during this release.

Anonymous `check-deployment.mjs` passes fourteen routes, security headers, canonical
URLs, sitemap/robots, genuine 404s, approved PDF/media hashes, evidence records,
theme initializer and immutable caching. The live Chromium suite passes 28
route/viewport states plus themes, image dialogs/focus, filters, scenarios, actual
Barion recording playback, mobile navigation and downloads, with no console or
policy errors. Requests do not use Vercel authentication. No real feedback/email was
submitted, and inbox receipt remains unverified. The domain has not been registered
or connected yet; `SITE_URL` continues to use the verified public Vercel origin.
Additional public interaction checks at 390/1440px pass actual theme controls,
single/docked feedback launchers, removal of Copy message, draft retention, focus
return and mocked send acknowledgments. The production self-only script policy
correctly blocks inline axe injection; it was not weakened or bypassed. Feedback
axe results remain the local three-engine evidence below, not a new live axe claim.
Fresh GitHub Actions run `44879578661` succeeds on Linux: clean install,
lint/typecheck/build/static validation, SEO fixtures, all fourteen Chromium suites,
Firefox/WebKit compatibility checks, artifact upload and audit. The documentation-
only release record does not alter the deployed runtime checkpoint.

## Selected-plan implementation and verification — November 21, 2026

This local follow-up implements the owner's selected subset of the critique below.
It does not publish the site, modify application repositories, invent live demos,
rewrite the resume, or implement the deferred Skills/About redesigns. The older
critique is retained as historical evidence, not as a claim that every finding
still applies after this work.

### Implemented

- Home now states Android/web focus and software-engineering internship intent.
  PCOSina and Barion are identified as the two starting case studies; all six
  selectors, collection cards, filters and direct case URLs remain available.
- Every case study starts with approved application evidence before its ownership
  brief. At 390px, the first two cases' ownership heading follows the capture at
  y=820; at 1440px it is at y=530. Role, AI-assistance disclosure, verification
  records and limitations are retained. ResolveOps remains a fictional preview.
- Responsive capture derivatives and 64/128px FEU variants replace oversized compact
  images. Original captures, verification hashes and the public PDF are unchanged.
  Home's standard-density FEU image is 2970 bytes, versus the 205812-byte source.
  The source and derivative manifest and rendered srcset paths are statically checked.
- Preview captions/controls, selectors, feedback notes and selected supporting text
  are larger. Preview and rotation controls have 44px minimum height. There is one
  feedback launcher: sidebar-docked on desktop, compact/floating on mobile. Mobile
  home pagination retains reserved space. This does not claim that a floating mobile
  launcher can never overlap content at every possible scroll position.
- Copy message is removed from all form states. Sending remains in-page; validation,
  optional reply address, duplicate-request guard, timeout, private-provider notice,
  failure recovery and in-memory draft retention remain. Contact's Copy email is a
  separate contact action and remains. Provider acknowledgment is not inbox-delivery
  proof. No real messages were sent during testing.
- Async route resolution splits page modules and full narratives from summary data,
  preserving prerendered HTML and native URLs. A blocked Contact page chunk leaves
  the static heading and native email path usable. Contact does not fetch Home,
  ProjectPreview, project-index or full case chunks; Home omits full case narratives.
- CSS rules were moved to their owning feature files and 96 verified obsolete
  selector rules removed. Unused ProjectCard/MoreProjects were removed. Sidebar
  icons are keyed by destination rather than parallel-array position. No framework,
  router, animation library or runtime dependency was added.
- Firefox/WebKit compatibility tests and CI setup are now checked in. A Windows
  WebKit load stall was isolated to the video in a closed disclosure (also reproduced
  without JavaScript; removing the initial video removed the stall). The enhanced
  player now mounts on first opening and pauses on closing. The native no-JavaScript
  video, recording download and textual alternative are preserved. This does not
  prove WebM playback on physical Safari/iOS.

### Preservation and measured results

- Before intentional presentation changes, all 15 prerendered HTML bodies and all
  six full project records were compared exactly across the route/data extraction.
  Sixteen page/viewport snapshots also matched across the mechanical CSS ownership
  move. These intermediate checks bracket the refactor; final feature screenshots
  are intentionally different. The lean-build and safe-refactor workflows kept the
  changes on existing components, assets and static hosting.
- `npm run check`: lint/typecheck/build/static checks pass; 15 HTML pages and 754
  local references. Shared entry: 258.14 KB decoded / 81.69 KB gzip, down from
  343.21 KB / 104.23 KB. CSS: 94.97 KB / 18.73 KB gzip, down from 99.11 / 19.52 KB.
  Dynamic route chunks are additional, not included in the entry measurement.
- Actual fresh initial-load resources in Chromium: Contact 262574 decoded JavaScript
  bytes across three resources; Home 283602 across ten. These are local transfer/
  decoded measurements, not field performance, interaction latency or a Lighthouse
  score. Full output is 5153 KB because derivatives are added while originals remain;
  output directory size is not per-visit payload. No result claims an SEO speed win.
- `npm run check:seo`: isolated production, preview and unconfigured fixtures pass.
  `npm run format:check` passes. Fresh `npm audit --audit-level=moderate`: zero
  reported vulnerabilities. CI edits are local; no GitHub Actions execution is claimed.
- `npm run test:cross-browser -- --reuse-preview`: Firefox and WebKit both pass,
  56 route/theme/width states each and four interaction states each. Covers all
  fourteen content routes at 390/1440px in both themes, enhanced rendering, headings,
  overflow, carousel wrapping/reduced motion, preview Escape, single launcher,
  sidebar docking, draft retention, mocked submission, focus return, early case
  evidence, and axe checks on the open feedback dialog. No browser console errors.

- `npm run test:browser -- --reuse-preview`: all fourteen suites pass in the final
  run completed `2026-11-21T06:53:47.515Z`. The light/dark route sweeps cover 150
  page/width states without axe violations, document overflow or runtime errors.
  Additional suites cover disclosures, credentials/downloads, native no-JavaScript
  video, CSP simulation, filters, image dialogs, real timed carousel wrapping,
  pause/resume, swipe/touch/keyboard, theme/storage behavior, sidebar persistence,
  seven layout widths, hold previews, one lazy composer, mocked send success/five
  failure modes, initial chunk/asset budgets, blocked-chunk static fallback, and
  recording mount-on-open/pause-on-close. Reports/screenshots remain ignored local
  artifacts under `output/playwright/`; no test counts are field UX measurements.

### Remaining limits and deliberate deferrals

FormSubmit inbox activation and an actual receipt check from the eventual public
origin still require the owner. No browser test proves delivery. The approved PDF
remains public; its obscured cover is not access control. No application has acquired
a live demo through this portfolio work. Actual project functionality, Skills
evidence hierarchy and owner-authored supporting-page stories remain future work.
Automated WebKit is not physical Safari/iOS; screen-reader reading order, human
comprehension and field performance remain unverified. Domain research recommends
student `.dev` registration with existing Vercel hosting, not a hosting migration;
terms, risks and an authorized future cutover checklist are in `RELEASE_STATUS.md`.

Only verified dead code/selectors were removed in this turn; those tracked sources
are recoverable from Git history. Original media are preserved. No commit, push,
deployment, domain redemption or DNS/account change was performed.

## Density correction and full portfolio review — November 21, 2026

The owner requested implementation first, then a read-only critique. Implementation
is local and unreleased; recommendations below are not automatically implemented.

### Requested changes and proof

- Kept the desktop identity-left/project-right arrangement, but removed the nested
  two-column card inside the right column. The project visual sits above short copy.
  Home shows a summary and three key technologies rather than a repeated headline,
  full stack and engineering-focus paragraph. Full details remain on project pages.
- Increased personal-info grouping space, separated the selector from the card,
  removed primary-language tile borders and reserved room beside home pagination
  for the fixed feedback launcher. No new dependency or service was introduced.
- Removed the duplicate Contact composer and its unused panel styles. The single
  global form now mounts on first opening and retains in-memory drafts across closes.
  Email/social links remain accessible without JavaScript. Sending, error recovery,
  copy fallback and the existing FormSubmit configuration remain intact.
- Build/lint/typecheck/static validation, formatting and isolated SEO fixtures pass.
  Output: 15 HTML files, 741 local references, about 104.23 KB gzip JavaScript and
  19.52 KB gzip CSS; 4388 KB total static output. This is not per-page transfer size.
- All 13 browser suites pass in one final run, completed
  `2026-11-21T02:56:34.102Z`. Existing route sweeps cover 150 light/dark page/width
  combinations. Focused checks additionally assert selector/card separation, absence
  of nested desktop columns, three-technology maximum, one lazy composer and draft
  retention. Provider requests are intercepted; no real messages were sent.
- Additional read-only audit: all 14 content routes at 1366x768, plus 56 narrow/short
  viewport states (320x568, 640x360, 844x390, 1024x600). No horizontal document overflow
  was found. These extra states are layout checks, not additional axe conformance tests.
- Fresh `npm audit --json`: zero reported vulnerabilities. Historical development
  package exceptions elsewhere in this document are not current audit findings.
- Fourteen GitHub/source/credential destination HEAD requests returned HTTP 200.
  This verifies reachability, not independent certification validity or app behavior.
- Public resume rendered with the existing local PDF utility (Poppler unavailable),
  inspected visually and extracted with pypdf. It remains an unchanged one-page,
  text-extractable document. No PDF edit or public asset replacement was performed.

Screenshots and raw diagnostics are ignored local artifacts under
`output/playwright/`; the supplemental diagnostic report is `deep-audit.json`.
The audit did not change application repositories, submit email, commit or deploy.

### Prioritized critique and proposed next work

1. **Release readiness: local and public are different products right now.** The
   public origin still returns the old non-sidebar markup and self-only connection
   policy. Its robots file allows indexing with a sitemap. Local noindex behavior
   without SITE_URL is deliberate, not a new SEO defect. Publish only after owner
   approval, then verify the deployed routes, security policy and actual email flow.

2. **Messaging delivery is not proven by UI tests.** Simulated success/error paths
   pass; activation and inbox delivery have not been verified. Confirm activation
   and perform a genuine submission from the eventual published origin. Preserve
   draft retention and the distinction between submitted and delivered. Keep this
   a private form, not a purported live chat or unsupported response-time promise.

3. **The resume cover is not privacy protection.** The download still contains a
   mobile number. If that is unwanted exposure, the useful fix is a separately
   owner-approved public resume, not stronger CSS blur. The PDF links to GitHub and
   the two public project repositories but not the portfolio. Propose adding the
   portfolio URL and reconciling its project/skill emphasis with the site. Do not
   silently rewrite the approved resume or imply old published copies are removed.

4. **The first screen needs a hiring proposition, not just an identity label.**
   Home says software engineering student and names languages; internship intent
   and the most useful engineering strengths are clearer deeper in About. Consider
   one specific, factual positioning sentence and a small availability note. Do not
   invent dates, job experience, user counts or seniority. The remaining tradeoff
   is a taller right-hand card: at 1366x768 its project name starts near y=666, so
   the summary and CTA require scrolling. Whitespace is preferable to shrinking
   type to force everything above the fold; decide the first-screen priority.

5. **Application proof appears too late on case studies.** At 1366x768 the first
   application section starts around y=919 to y=987 across the six cases. The hero
   emphasizes ownership, test records and scope/limitations before the actual UI.
   Move one authentic visual or short workflow near the top, followed by role,
   engineering decision, demonstrated result and honest scope. Preserve AI-assistance
   disclosure and limitations; improve hierarchy rather than hiding qualifications.

6. **Breadth is winning over editorial selection.** The six projects currently have
   equal selector weight, while evidence strength differs. Lead with the best two
   or three stories and keep all six discoverable. Android applications do not need
   fabricated browser demos: short genuine device recordings are more useful than
   another preview animation. A screenshot preview is not an interactive live app;
   keep the ResolveOps fictional-preview label and other evidence boundaries clear.
   Never substitute unmeasured impact claims for missing user research or benchmarks.

7. **The FEU logo is disproportionate network cost.** The 1313x1600 lossless WebP is
   205812 bytes and appears at 26px in Home's education badge. In the captured
   throttled visit it transferred 206112 bytes including overhead, about 36% of
   576947 total resource-transfer bytes. Serve small high-DPI variants for badges,
   retaining the approved original as source material. The native app captures can
   likewise use smaller thumbnails while image dialogs retain the full originals.

8. **The JavaScript is shared more broadly than necessary.** App imports every page,
   case-study component and project content into the same approximately 343 KB
   decoded script. On initial Contact load, roughly 66% of source characters fell
   in unexecuted V8 ranges. This is not dead-code proof: later interactions need some
   of it. Investigate route/data splitting while preserving static HTML and ordinary
   links. The new feedback mounting change saves initial DOM, not the whole form's
   code download. A framework rewrite is not justified by these measurements alone.

9. **Some labels are too small despite passing contrast checks.** Home's preview
   label/control text is around 10.4px at the desktop audit size; several status
   labels are 10-11px. Enlarge useful controls/metadata instead of making everything
   miniature. Treat a comfortable touch target as a design goal; do not claim an
   automatic WCAG failure solely from font size. The floating launcher can still
   cover text at some scroll positions (including the Skills grid); the homepage
   pagination safeguard is not a sitewide collision solution. Consider a desktop
   sidebar launcher or another reserved location without adding duplicate composers.

10. **The Skills page is organized, but still reads as a badge inventory.** Its 41
    entries mix languages, tools, frameworks, practices and concepts. Prioritize
    capabilities such as Android persistence, typed web workflows and backend/data
    correctness, with direct links to the corresponding engineering evidence.
    Keep secondary tools subordinate. Do not add arbitrary proficiency percentages.

11. **Code maintenance now needs consolidation.** Ten CSS files total roughly 5800
    lines, with layout rules layered through base, editorial, showcase, experience
    and preview styles. This is not itself a browser-performance failure, but it
    makes visual changes fragile. ProjectCard and MoreProjects have no consumers;
    theme-select rules and obsolete showcase-headline styles remain. Consolidate
    component ownership and remove verified dead presentation code in a separate,
    behavior-preserving refactor. Sidebar icon selection also depends on parallel
    array order; co-locate icon/label/href when navigation next changes.

12. **Automated Chromium success is not complete UX or accessibility validation.**
    Firefox and WebKit executables are not installed here. Physical-device keyboard,
    Safari/iOS, screen-reader reading order, real mobile text scaling and interruption
    behavior remain unverified. Add those to release checks. Keep the existing pause,
    focus/hover stop, reduced-motion and keyboard alternatives; do not remove them
    for a visually cleaner carousel. Browser test counts do not measure recruiter
    comprehension or hiring effectiveness.

13. **Supporting pages should contribute a story, not repeat a list.** About largely
    repeats project domains; add one genuine decision or lesson in the owner's own
    words. For the championship, add the problem, personal role and learned outcome
    only when confirmed. Keep participation distinct from winning and the enterprise
    positioning certificate distinct from developer certification, as currently done.
    These pages should support the work, not outrank it.

### Measurement boundaries and recommendation order

Local performance probes used Chromium, 390x844, approximately 200000 B/s download,
100ms latency and 4x CPU throttling, with coverage instrumentation. One run per route
showed LCP around 0.80-1.19s and small/no observed layout shifts. These are local lab
samples, not Lighthouse scores, production field Core Web Vitals or INP measurements;
they do not establish a sitewide performance pass. Green paint timings can coexist
with a later-loading project image or weak first-screen hierarchy.

Recommended order: (1) verify delivery and approve a public-resume policy, (2) clarify
positioning and move authentic project proof earlier, (3) optimize logo/thumbnails,
(4) consolidate CSS and evaluate measured route splitting, (5) add cross-engine and
human usability checks before adding more interaction. Keep the editorial identity,
static routes, real evidence, accessible dialogs and honest project boundaries.

Reference guidance: [WAI carousel animation controls](https://www.w3.org/WAI/tutorials/carousels/animations/),
[Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals),
[FormSubmit activation help](https://formsubmit.co/help), and
[Playwright coverage format](https://github.com/microsoft/playwright/blob/main/docs/src/api/class-coverage.md).

## Earlier iteration: layout, evidence previews and direct messages — November 21, 2026

Local follow-up to the sidebar iteration below; no commit, push, deployment or live
inbox activation is claimed. The owner chose FormSubmit with inbox activation and
confirmed that public application demo URLs are not available yet.

- `npm run check`, formatting and isolated SEO fixtures pass. Current output: 15
  generated HTML files, 741 local references, approximately 104.27 KB gzip JavaScript
  and 19.52 KB gzip CSS. Original resume/certificate/capture hashes are unchanged.
  Static validation now rejects the former readable resume image in build output.
- Final combined `npm run test:browser -- --reuse-preview` passes all 13 suites:
  browser, enhanced, identity, interaction, editorial, nojs, csp, refinement,
  expansion, design, portrait, experience and layout-preview. Report completed
  `2026-11-21T02:28:34.773Z` in ignored `output/playwright/browser-report.json`.
  Coverage includes 150 light/dark route/width states, 60 selected-project states,
  24 showcase image dialogs and the new interaction checks described below.
- Focused layout/preview checks pass at 360, 390, 768, 1024, 1280, 1440 and 1920px.
  Personal details follow the name; Selected Work is alongside from 1280px upward,
  and below on smaller screens. Skills categories and technology cells use grids.
- Hold/release, quick-click and keyboard previews pass on Home and the collection.
  Native Chromium touch input verifies hold/release and tap-to-open on mobile.
  The preview dialog passes axe checks and restores focus. Barion's actual recording
  advances while held and unmounts on release; reduced motion leaves it paused.
  No unverified Live demo link is rendered. Existing evidence labels are retained.
- Seven intercepted message submissions cover affirmative acknowledgment, service
  failure, malformed response, offline connection, rate limiting and activation
  responses, plus the floating dialog with no reply email. Errors retain drafts;
  success stays on the current page. **No real test messages were sent.** The CSP
  suite verifies mocked submission under the updated production policy with zero
  violations. Native Contact POST remains available without JavaScript.
- The 580ms transitions use short directional movement and crossfade; manual choice,
  keyboard/swipe wrapping, actual timed rotation, reading pause and reduced motion
  pass focused regression. The readable resume image is backed up locally at ignored
  `output/resume-preview-original.webp`, not shipped. Its replacement is an abstract
  CSS silhouette with a real download link; removing blur cannot reveal resume text.
- Desktop/mobile Home, Skills, Resume, direct feedback, dark Contact and collection
  hold previews were visually reviewed. A clipped collection preview found during
  review was corrected with a body-level portal, verified inside the viewport.

Delivery remains an external dependency: the owner must submit a genuine message,
confirm FormSubmit's activation email in `salvacion.jsh@gmail.com` (including spam),
then verify a subsequent message arrives. A provider acknowledgment is not proof of
inbox delivery. The approved PDF is still publicly downloadable; the cover is not
access control and does not remove previously published/cached copies. Tests use
Chromium, not physical devices or a full assistive-technology audit. No dependency,
backend, public discussion feed or application deployment was added. Existing
dependency-audit exception is unchanged.

## Earlier local iteration: sidebar and email composer — November 21, 2026

Local implementation; no publication or new CI run is claimed. The owner selected
private email feedback rather than a public discussion. The lean-build approach
kept existing project data, native page URLs and static hosting, with no dependency
or service added.

- ESLint, TypeScript, production build and static checks pass: 15 generated HTML
  files, 733 local references, approximately 102.07 KB gzip JavaScript and 17.85 KB
  gzip CSS. SEO production/preview/unconfigured fixtures and formatting pass.
- Existing browser, enhanced, identity, interaction, editorial, nojs, csp, refinement,
  expansion, design and portrait suites passed. The light/dark route sweeps cover
  150 page/width combinations; design coverage includes 60 showcase states and 24
  image dialogs. Existing filters, scenarios, recordings, certificates, resume,
  keyboard focus, native no-JS menus and static six-project content remain usable.
- The focused experience suite checks actual eight-second advancement, manual
  selection staying paused across a full interval, keyboard and automatic six-to-one
  wrap, hover reading pause, persisted/fixed sidebar, real theme buttons, ten width/theme
  states, feedback accessibility/copy/focus/scroll restoration and reduced motion.
  Dedicated final-build deep-link checks verify that education is visible below
  the header on fresh visits at 390, 768 and 1024px, including hydration.
- Automatic project rotation respects reduced motion, document visibility and
  viewport intersection. Project selection/focus/touch stops rotation; explicit
  resume is available. Direct selection and keyboard/swipe remain without the old
  arrow controls. Image dialogs preserve focus return and remain separate from swipes.
- The strict existing CSP passes on five local pages, including actual theme-button
  interaction and feedback composition. No inline script exception or third-party
  request is introduced. Theme pre-paint, storage blocking, cross-tab changes and
  system updates pass the existing design suite.
- Legacy menu checks now wait for drawer visibility; feedback accessibility scans
  wait for entrance/control animations to settle and report detailed failures.
  Settled feedback states pass both themes at all five widths.
- Desktop light/dark, mobile drawer/feedback and the About education layout were
  visually reviewed. Sidebar collapse and mobile navigation reuse the approved square
  portrait. The official FEU image retains all original pixels in a lossless WebP;
  source and output hashes are in `ASSET_PROVENANCE.md`.

Latest focused results and screenshots are ignored local artifacts under
`output/playwright/`. The broader suites and focused reruns are separate executions;
this is not a claim that a newly published CI pipeline is green. Verification is in
Chromium; physical devices, Safari/Firefox and a full assistive-technology audit were
not performed. Feedback prepares an email or copies text; actual mail-client delivery
is outside these checks. Existing application evidence and dependency-audit exception
are unchanged.

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
