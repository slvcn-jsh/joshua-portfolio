# Final QA report

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
