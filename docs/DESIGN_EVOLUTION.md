# Theme and project showcase

## Current extension — November 21, 2026

Owner-requested changes supersede the earlier no-autoplay and text-only-header
decisions. The editorial typography, six projects and evidence remain in place.

- Fixed 240px desktop sidebar, 80px collapsed rail, optional saved preference,
  native mobile drawer, current-route state (including nested project routes),
  keyboard focus containment/Escape, and unchanged direct page URLs. Page transitions
  are a progressive browser enhancement, not a client-side routing dependency.
- Eight-second project rotation with consistent directional wrap from sixth to first.
  Selecting a project, keyboard focus or touching content stops rotation until explicit
  resume. Hover, offscreen content and background documents suspend rotation. Reduced
  motion disables autoplay. Visible pause/resume, direct selection, keyboard and swipe
  remain; previous/next arrow buttons are removed. Static/print expose all projects.
- A small day/night landscape button replaces the theme dropdown. A device button
  restores system mode. The existing pre-paint bootstrap, storage synchronization,
  self-only CSP and reduced-motion behavior are retained; View Transitions enhance
  the visual reveal where supported.
- Official FEU Tech logo on Home and About, aligned education details and an
  "About me" heading. Native-resolution lossless image, no artificial 4K upscale.
- Reuse the approved square portrait for sidebar/mobile identity as well as icons.
- Personal details now sit below the name. At 1280px and above, Selected Work sits
  alongside in the right column; narrower screens stack in reading order. Short
  580ms directional slide/crossfades preserve looping without a full-width jump.
- Skills categories and technology cells use aligned responsive grids. Home and
  project cards support temporary hold previews and accessible click/Enter dialogs,
  using existing captures and Barion's recording. No fabricated live-demo URLs.
- Owner selected private email feedback and then FormSubmit with inbox activation:
  an optional dialog submits inside the page, with optional reply email,
  timeout/error states and draft retention. No Copy message action or portfolio database,
  public chat or fake delivery status; external provider activation remains required.
- Resume uses an abstract blurred CSS silhouette with a download CTA. The readable
  image is no longer shipped; the approved public PDF is unchanged. This is a visual
  presentation choice, not privacy/access control for the downloadable document.
- Density follow-up: more separation between personal-info groups, unboxed primary
  language marks, a distinct selector/card gap, and a full-width visual above short
  copy in the desktop right-hand project stage. Home omits repeated headlines and
  engineering-focus paragraphs and shows only three key technologies; project pages
  retain full detail. Pagination reserves room for the fixed feedback launcher.
- Contact no longer duplicates the message composer. The global composer mounts
  its form only on first use and retains in-memory drafts across closes.

Follow-up: Home now states internship intent, identifies PCOSina and Barion as the
two starting case studies and retains all six projects. Case-study openings show
approved captures before the ownership/evidence brief. Responsive thumbnails and
small FEU variants replace oversized images in compact contexts; originals remain
available in galleries. Preview labels, feedback notes and several controls are
larger. The single desktop feedback launcher occupies the sidebar, not page text.

Styles now have explicit owners: `experience.css` for navigation/theme scene,
`showcase.css` for Home, `project-preview.css` for evidence dialogs/peek,
`feedback.css` for messaging, and the existing identity/collection/case-study files
for their surfaces. Page modules and project summary/full narratives are split
without changing the native URLs or static page fallback. Skills/About redesigns
remain deferred; their existing content is preserved.
`scripts/experience-qa.js` and `scripts/layout-preview-qa.js` own focused behavior
checks; existing regression suites are updated for the changed controls.
Implementation is local until a separate production release is recorded.

## Approved scope

Preserve the light editorial identity and verified project content. Add an equally
complete charcoal theme, a six-project sliding homepage showcase, selective frosted
controls and coordinated motion. Keep `/projects` a scannable overview.

## Acceptance

- System/light/dark preferences, persisted when storage is available; system changes
  and cross-tab changes respected. Pre-paint external initialization under existing CSP.
- All six projects directly selectable; directional slides, swipe, arrows and keyboard
  controls. No autoplay, scroll interception, hidden-only content or new runtime package.
- Actual unchanged application captures, explicit preview labels, accessible enlargement.
- Native static fallback exposes all projects; reduced motion removes displacement.
- Theme tokens cover reading surfaces, menus, controls, diagrams, captions and dialogs.
  Original screenshots, certificates and brand colors are not inverted.
- Verify 360/390/768/1024/1440px, both themes, dialogs, focus, reduced motion, blocked
  storage, no JavaScript and production CSP. Preserve approved PDFs and private sources.

## Sequence

1. Shared theme tokens and preference lifecycle.
2. Single data-driven homepage showcase replacing duplicate presentation sections.
3. Selective glass, bounded motion and consistent remaining-page surfaces.
4. Browser/visual review, regression suites and production verification.

## Non-goals

No framework or hosting migration, simulated app UI, WebGL refraction, autoplay,
new project claims, application source changes or resume edits. CSS frosted glass
is intentionally not described as Apple's real-time Liquid Glass renderer.

## Implementation outcome

All four steps implemented and locally verified. The full regression suite includes
light/dark route sweeps and dedicated showcase, storage, no-JS, reduced-motion and
browser touch checks. `QA_REPORT.md` records scope and limitations; `RELEASE_STATUS.md`
records the deployed revision. Shared semantic tokens and project data remain the
maintenance seams. No animation framework or hosting migration was needed.
