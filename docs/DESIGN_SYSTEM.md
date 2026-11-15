# Design system

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
