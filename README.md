# Joshua Salvacion — portfolio

A light, responsive software engineering portfolio built with React, TypeScript, Vite, Tailwind CSS and Lucide icons. Fourteen pages are prerendered to static HTML, plus a 404 page. Six application case studies; no runtime backend, account system, analytics or external font requests.

[Live portfolio](https://joshua-portfolio-phi-lemon.vercel.app) · [Source repository](https://github.com/slvcn-jsh/joshua-portfolio)

## Run locally

Requires Node.js 22.12 or newer (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

Vite prints the local address. To inspect the production build:

```sh
npm run check
npm run preview
```

## Quality checks

```sh
npm run typecheck
npm run lint
npm run build
npm run check:site
npm run check:seo
npm audit
npx playwright install chromium
npm run test:browser
```

`npm run check` runs lint, typecheck, production build and generated-page validation. The static validator checks all local links/assets, fragment targets, headings, page metadata, image attributes, the PDF signature and unwanted public file types.

`npm run test:browser` starts its own preview on port 4173, runs the checked-in
browser workflows, and closes its server. CI runs the same command and retains
screenshots/reports for seven days. With an existing preview, pass `-- --reuse-preview`.

For interactive browser inspection, start a production preview on port 4173, then run:

```sh
npx playwright-cli open http://127.0.0.1:4173
npx playwright-cli run-code --filename=scripts/browser-qa.js
npx playwright-cli run-code --filename=scripts/interaction-qa.js
npx playwright-cli run-code --filename=scripts/enhanced-qa.js
npx playwright-cli run-code --filename=scripts/nojs-qa.js
npx playwright-cli run-code --filename=scripts/csp-qa.js
npx playwright-cli run-code --filename=scripts/identity-qa.js
```

The browser sweep checks every page and a missing route at 360, 390, 768, 1024 and 1440px, using axe-core for WCAG A/AA checks. Browser screenshots are saved under ignored `output/playwright/`. The script uses the standalone CLI, not a production dependency. Use the CLI's `install-browser` command if its browser is missing. Manual keyboard and interaction checks remain part of release QA.

## Content and structure

```text
src/content/           Identity, skills, achievements and typed project case studies
src/components/        Shared shell, project summaries and case-study presentation
src/pages/             Home and supporting pages
src/styles.css         Design tokens and responsive component styles
src/interactions.css   Scenario, annotation and dialog styles
src/case-study.css     Ownership brief, data-flow maps and compact case-study structure
src/collection.css     Six-project filters, responsive collection and capture galleries
public/                Approved PDF, optimized screenshots, preview and social card
scripts/prerender.tsx  Static HTML, metadata, robots and optional sitemap generation
docs/                  Content evidence, specification, asset provenance and QA
```

Standard links navigate between generated pages. React hydrates small interactions such as copy-email and menu Escape handling. Content and native disclosure navigation remain accessible without JavaScript. Unknown paths render a useful not-found page; Vercel serves `404.html` with a 404 status. Vite's local preview uses its standard fallback behavior and can return HTTP 200 for unknown URLs, so its status is not a deployment test.

Source-based scenario walkthroughs and annotations explain implementation; they are
not live demos. The redundant quiz was removed. Barion now also has a genuine
14.4-second silent local-web recording using its built-in sample deck, with native
controls, a written alternative and a download. Essential content works without JS.

### Update content

Edit `src/content/site.ts` for profile information, navigation, route metadata and skills. Edit `src/content/projects.ts` for case studies. Validate new claims against the project repository and add their evidence to `docs/PROJECT_AUDIT.md`.

The four private-source case studies live in `src/content/additional-projects.ts`
and are assembled into the same typed project list. Their `repository` field is
intentionally absent: never add inaccessible source links. `platform` drives filters;
`system` describes actual architecture boundaries; optional verification downloads
are only used when a publishable record exists. Update route metadata, route-count
checks and browser coverage together when adding a project.

`ProjectCollection` renders all six projects without JavaScript and progressively
enhances platform filters. `MoreProjects` keeps the homepage selective. Existing
scenario walkthroughs apply only to PCOSina/Barion; new pages use `ProjectGallery`
with the shared keyboard-accessible image dialog. Reduced motion is respected.

New image provenance and hashes are in `docs/project-expansion-media.json`. Optional
`scripts/import-project-media.mjs` imports only explicitly reviewed assets from two
provided source parent directories; it is not part of builds or deployment. Never
copy entire private repositories. Preserve synthetic-data captions and the distinction
between ResolveOps' preview and authenticated workflow. Procura's evidence is from
a disclosed uncommitted local snapshot. See `docs/SIX_PROJECT_EXPANSION.md`.

Edit `src/content/interactions.ts` for walkthrough text and screenshot explanations.
Remeasure named CSS annotation regions when replacing screenshots. Scenario controls
must not make remote calls or imply live failure testing. `Project.sourceRef` pins
source links, and each decision owns its evidence mapping. `SystemMap` separates local
and backend data paths. `ProjectRecording` presents the optional actual recording.

Do not convert historical tests into current results. The focused November 15 checks
have downloadable records in `public/evidence/`; these local working-tree results are
not clean-public-commit or release certifications. Barion media is a November 16 local
web capture; PCOSina retains existing presentation captures. Keep sole development and
AI assistance explicit. First-person implementation text is not a personal debugging history.

### Replace the resume

Use only a newly approved PDF. Copy it unchanged to `public/Joshua-Salvacion-Resume.pdf`, update the page count/file size in the Resume page and regenerate the preview if necessary. The original file is never edited by the portfolio.

The optional `scripts/preview-resume.py` requires PyMuPDF and renders one page into `output/pdf/`. `sharp` can convert that PNG into the web preview. Python is not needed for normal development, builds or deployment; all production assets are committed.

### Replace screenshots

For current Barion assets, follow `docs/PROJECT_VERIFICATION.md`: run
`scripts/capture-barion.mjs` against the isolated no-dotenv preview, inspect the
captures, then run `scripts/prepare-current-barion.mjs`. The latter imports assets
and writes their hashes to `docs/barion-capture-manifest.json`. Recheck annotation
regions, dimensions, recording file-size label and captions after every refresh.

Review screenshots for private information first. Optimize them to WebP, update dimensions and captions in `src/content/projects.ts`, and record their provenance. `scripts/prepare-media.mjs` documents the initial asset-import process; do not run it against another person's repositories without reviewing the sources and approved resume argument. Keep original project repositories independent.

## Vercel preparation

`vercel.json` supplies the Vite build, `dist` output, clean URLs and security headers. The owner approved public GitHub and Vercel publication after QA on 2026-11-14. See `docs/RELEASE_STATUS.md` for the actual release state; configuration alone is not a deployment.

- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Node: 22.x or a compatible newer LTS release
- Production environment variable: `SITE_URL` set to the approved HTTPS origin, with no path.

Until `SITE_URL` is set, builds intentionally omit canonical URLs and sitemap and disable indexing. With an approved origin, production builds generate correct canonical/OG URLs and `sitemap.xml`. Preview environments remain noindex and omit canonical URLs, even if the production origin is available. Do not add a catch-all SPA rewrite: each page is a real HTML file, and missing resources should remain missing.

After deployment authorization, verify direct links to both case studies, the PDF, `robots.txt`, sitemap, security headers, and a genuine 404 response on the deployed host. A configured build does not by itself prove hosting behavior.

The initial production release has passed those checks. The GitHub integration is not yet connected: until it is confirmed, a GitHub push alone does not update the website. Use the authenticated direct-deployment command in [release status](docs/RELEASE_STATUS.md).

```sh
node scripts/check-deployment.mjs https://joshua-portfolio-phi-lemon.vercel.app
npm run test:browser -- --live
```

## Visual maintenance

The current theme/showcase extension is specified in [design evolution](docs/DESIGN_EVOLUTION.md).
`src/theme.css` owns paired semantic light/dark colors; `public/theme-init.js` applies
the saved or system preference before paint under the existing self-only CSP.
`ThemeControl` subscribes to that browser state without changing server-rendered HTML.
Keep the bootstrap script in the document head and do not add inline script exceptions.

`ProjectShowcase` and `src/showcase.css` own the single homepage presentation. They
read the same project data as the collection and case studies. Selectors, previous/next
buttons and swipe change the same active index; inactive slides are inert. Without
JavaScript all projects remain readable; reduced motion switches without sliding.
Do not add autoplay, duplicate homepage project sections or image inversion in dark mode.

The full browser runner includes `scripts/design-qa.js`: both-theme showcase states,
dark routes, storage/system synchronization, pre-hydration and no-JS behavior.
For a focused local run: `node scripts/browser-smoke.mjs --suite=design`.

The current work-led editorial layout is specified in [editorial refinement](docs/EDITORIAL_REFINEMENT.md)
and [design system](docs/DESIGN_SYSTEM.md). `src/editorial.css` owns presentation refinements;
`src/interactions.css` owns the walkthroughs, annotations and dialogs. Typography uses
local system fonts, including Georgia for identity/page titles. No font subscription or
external font service is needed. Keep each homepage project presentation unique; do not
reintroduce the old project index or duplicate About/contact blocks.

Run the additional content/layout regression with the local preview running:

```sh
npx playwright-cli run-code --filename=scripts/editorial-qa.js
```

## Dependencies

### Certificates, brand assets and event photos

Edit `src/content/certificates.ts` for credentials. Only publish owner-approved PDFs,
unchanged. `scripts/prepare-credentials.py` renders them with PyMuPDF; the optional
`scripts/prepare-brand-assets.mjs` converts previews and reviewed project logos using
Sharp and exports selected Simple Icons SVGs. These are development-only tools, not
client imports or deployment requirements. Review the source arguments before running.
Certificate hashes and icon sources are in `docs/brand-asset-manifest.json`.

`scripts/prepare-event-photos.mjs` takes three owner-approved photo paths in the order
championship, UP hackathon, Adamson buildathon. It preserves the full frame, strips
metadata and records source hashes/dimensions in `docs/event-media-manifest.json`.
Update `src/content/site.ts` if event media or wording changes. Never infer individual
identities, team roles or competition results from a group photograph.

`src/identity.css` owns brand/evidence presentation and brief one-time motion.
`MotionEnhancements` never hides content before JavaScript loads. Reduced-motion
preferences disable animations. Keep visible text alongside decorative brand marks,
and use semantic Lucide symbols where a technology has no sourced brand asset.
See [asset provenance](docs/ASSET_PROVENANCE.md) for sources and trademark limitations.

The lockfile is committed. A temporary `minimatch` override selects a patched v11 release for lint tooling. It addresses [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249); remove the override once upstream packages use an unaffected version and the checks still pass. No vulnerable runtime packages were reported at handoff.

Implementation references: [Vite static deployment](https://vite.dev/guide/static-deploy.html), [Vite rendering guidance](https://vite.dev/guide/ssr.html), [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite), [Vercel configuration](https://vercel.com/docs/project-configuration).

Read [the project audit](docs/PROJECT_AUDIT.md), [missing assets](docs/MISSING_ASSETS.md) and [QA report](docs/QA_REPORT.md) before publishing content updates.
