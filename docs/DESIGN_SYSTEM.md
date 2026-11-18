# Design system

## Theme and sliding showcase — November 18, 2026

This extension supersedes the historical light-only and homepage layout notes below.
The editorial type, 1120px container and restrained palette remain. `src/theme.css`
is the authoritative semantic palette: off-white `#fcfcfa` / charcoal `#14171c`
canvas; white / `#1c2129` surfaces; charcoal / soft-white ink; muted blue accents.
Separate action-background and on-action tokens preserve contrast in both themes.
Reading surfaces stay solid. Original screenshots and documents remain unchanged;
brand artwork receives a neutral backing, never an inversion filter.

The homepage uses one six-project showcase. At desktop widths, text and real captures
share a stage; below 768px media sits above the project explanation. A 6-column
selector becomes 3 columns on mobile. Its frosted surface overlaps the stage edge;
full-opacity fallback applies without backdrop-filter. All projects are directly
selectable, with keyboard arrows/Home/End and previous/next controls. Directional
slides take 520ms; interactive feedback takes 180–260ms. No opacity animation on text,
autoplay or scroll hijacking. Reduced motion disables displacement; no-JS and print
show the complete project sequence. The project overview remains a filterable grid.

Theme changes switch text/surface colors together to avoid low-contrast crossfade
midpoints. Only the control icon animates briefly. The pre-paint script follows
system preference until overridden, supports cross-tab changes and tolerates blocked
storage. See `DESIGN_EVOLUTION.md` for acceptance and `QA_REPORT.md` for evidence.

## Six-project collection — November 18, 2026

`collection.css` owns the new collection, compact homepage project index and capture
gallery. Desktop uses two columns; below 768px cards stack. Filters wrap into a
two-column control group below 480px and have 44px minimum targets. The filter surface
uses subtle translucency with an opaque fallback; content surfaces remain solid.

All / Android / Cross-platform / Web are native toggle buttons with `aria-pressed`,
stable keyboard focus and a polite result count. Without JS all projects remain
visible and inactive filters are hidden. Content is never behind a card flip.
Motion is 260ms translation only (no text-opacity animation), with reduced-motion
overrides. Hover media movement is limited to fine-pointer devices; no autoplay.

Real images retain full content in accessible enlarge dialogs, with provenance
captions. Application favicons identify web projects; existing PCOSina/Barion marks
remain. Native project symbols are descriptive Lucide icons, not fabricated brands.

## Evidence-first refinement — November 16, 2026

Keep the approved white/navy editorial layout. Five primary links prioritize Projects,
Skills, About, Resume and Contact; credentials and achievements remain discoverable
from About and the footer. Case studies lead with sole development and scoped evidence.
Six contents entries replace eight; at <=1023px use a native collapsed disclosure.
Local/backend diagrams show request, response and storage boundaries. A separate
`case-study.css` owns these structures. The quiz and its CSS were removed. The actual
Barion recording uses native opt-in video, no autoplay, preload none and a text alternative.
Source data now owns evidence mappings and public commit refs explicitly.

## Visual direction

White canvas, very light cool-gray sections, charcoal text, muted slate secondary text, navy action color. A restrained blue accent signals links and selected navigation. Straightforward editorial layout with fine rules and small corner radii. No portrait, decorative illustration, fake statistics, hero animation or gradients.

## Tokens

- Canvas `#ffffff`; surface `#f7f8fa`; ink `#202b39`; muted `#556272`.
- Accent `#234b80`; strong navy `#172e4d`; border `#dce2e9`.
- Georgia serif for the name and page/case-study titles; system sans-serif for body, navigation and technical headings. Mono is reserved for diagram annotations. No remote font requests.
- Body 16px / 1.7; small 13–14px / 1.5; h1 34–48px / 1.12; h2 26–32px; h3 19–22px.
- Space scale: 4, 8, 12, 16, 24, 32, 48, 64, 80px.
- Main container 1120px; prose 720px. Gutters 20px mobile, 32px tablet.
- Borders 1px; radii 0–4px on editorial surfaces. Shadow only for actual screenshot separation. Warm paper `#f5f4f0` stages PCOSina captures.
- Buttons minimum 44px high; underline textual links; visible 3px focus ring.

## Responsive behavior

- Under 768px: native disclosure navigation, stacked project/hero layouts, full-width readable screenshots, wrapped action groups.
- 768–1023px: two-column features where useful; navigation remains compact.
- From 1024px: horizontal navigation, case-study contents sidebar, two-column hero and project summaries.
- Test 360, 390, 768, 1024, 1440px. No fixed-width content exceeding its container.

Motion: short color transitions only, disabled under reduced-motion preference. Diagrams use semantic text and CSS layout, with explicit descriptions. Images carry meaningful alt text and descriptive captions identifying historical media.

## Behind the interface — interaction extension

- Preserve the palette, page order and primary actions. The November 15 editorial pass supersedes the original hero composition.
- Fine rules and numbered nodes connect screenshot regions, explanations and source evidence.
- Architecture scenarios are user-triggered, explicitly illustrative and entirely local. Parallel paths stay parallel on mobile; dashed amber borders label an unavailable remote path, with text so color is not the sole signal.
- Scenario buttons switch foreground/background immediately to avoid low-contrast intermediate colors. Diagram border/background transitions take 180ms, disabled with reduced motion.
- Screenshot annotations use measured, named CSS regions on unchanged captures. No inline style exception is needed in CSP. Historical images remain explicitly historical.
- Native dialog provides image enlargement, a persistent close control, keyboard focus containment, Escape dismissal and focus return. Direct image links remain the no-JavaScript fallback.
- Case contents indicate the current section and move keyboard focus to its heading when activated. The untimed Barion challenge is optional, unscored, and has a direct-answer route.
- No autoplay, sound, particle backgrounds, custom cursor, fake errors, tracking or external runtime requests.

## Editorial refinement — 2026-11-15

`src/editorial.css` owns the shared editorial presentation after base and interaction
styles. Obsolete homepage/index/initials styles were removed from `styles.css`.
The Home introduction and PCOSina feature share a desktop row; Barion follows as a
supporting project. Under 768px, reading order is introduction, PCOSina, Barion.
Each project and screenshot appears once on Home. The featured image is eager/high
priority; subsequent captures stay lazy. Plain technology lists replace badges.
Heading sizes remain controlled (40–52px for the name, 36–48px for page titles).
Project summaries use meaningful metadata rather than decorative numbering; actual
workflow steps and case-study navigation keep their sequence numbers.

Content ownership and scope are recorded in `EDITORIAL_REFINEMENT.md`.

## Credential and identity refinements — 2026-11-15

`src/identity.css` follows editorial styles and owns evidence/brand presentation.
Technology lists now pair text with 26px brand marks or semantic Lucide icons, not
decorative badges. Home uses a compact three-language row linking to project evidence;
Skills uses a responsive grid with visible labels. Project headings use 48px original
marks (60px in case-study titles). Contact remains email-first with GitHub and LinkedIn.

Certificates pair metadata with a full-page preview on desktop and stack below 768px.
Event photos keep the entire frame, with a bounded preview height and image enlargement.
The shared dialog handles both media types; original PDFs have separate download links.
All evidence is on its dedicated page rather than duplicated on Home.

Entrance translation is 8px over 420ms, once per observed element. Home language marks
have a short 550ms entrance with 70ms stagger and a 3px hover/focus lift. No content is
hidden waiting for animation or JavaScript. Reduced-motion disables all animations and
transitions. No continuous loops, parallax or animation package is used.
