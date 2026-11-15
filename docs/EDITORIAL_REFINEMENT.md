# Editorial refinement — 15 November 2026

## Approved scope

Improve first-glance clarity and visual authorship without invented personal stories,
new effects or changes to project evidence. Preserve the light appearance, routes,
resume, accessibility and useful case-study interactions. Owner approved implementation
of the discussed plan; existing permission covers publication after QA.

## Information ownership

- Home: identity, academic context, three primary languages, one PCOSina presentation
  and one supporting Barion presentation. No duplicate project index, About teaser
  or repeated contact banner. Navigation and footer remain practical shortcuts.
- Projects: comparative summaries, technologies, status and case-study/source access.
- Case studies: context, behavior, architecture, decisions, evidence and limitations.
- Skills: capability categories and their application; no repeated category numbering.
- About: direction and learning approach; academic facts live in the education panel.
- Achievements: event, outcome and date; remove prose that only repeats the event title.
- Resume/contact: direct access, with no slogans or repeated document-approval claims.

## Design decisions

- System Georgia for identity and page titles; existing sans-serif for technical content.
  No remote fonts, paid resources or additional dependencies.
- White canvas, charcoal ink, navy links; restrained warm-gray screenshot staging.
- Name-only wordmark; no generic initials badge. Icons remain from the existing family.
- Borders organize sections rather than enclosing every item. Plain technology lists.
- PCOSina leads alongside the introduction on desktop. On mobile, introduction and
  actions precede the feature. Its actual screenshot appears once on Home and loads eagerly.
- Barion uses a compact horizontal presentation with its historical capture clearly labeled.
- Keep source references, ownership disclosures, illustrative labels and all limitations.
- Keep the existing interactive components, keyboard behavior and reduced-motion support.

## Verification gates

Build, TypeScript, lint, static links, SEO modes, dependency audit; browser/axe checks
at 360, 390, 768, 1024 and 1440px; keyboard, screenshots, no-JavaScript, CSP and actual
resume download regression checks. Add assertions for single homepage project presentations,
unique images, clear page titles and desktop/mobile reading order. Inspect screenshots
before publishing. Record results in QA_REPORT.md, not as unmeasured design claims.
