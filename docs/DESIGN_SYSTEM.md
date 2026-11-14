# Design system

## Visual direction

White canvas, very light cool-gray sections, charcoal text, muted slate secondary text, navy action color. A restrained blue accent signals links and selected navigation. Straightforward editorial layout with fine rules and small corner radii. No portrait, decorative illustration, fake statistics, hero animation or gradients.

## Tokens

- Canvas `#ffffff`; surface `#f7f8fa`; ink `#202b39`; muted `#556272`.
- Accent `#234b80`; strong navy `#172e4d`; border `#dce2e9`.
- System sans-serif; mono for compact project labels. Avoid remote font requests.
- Body 16px / 1.7; small 13–14px / 1.5; h1 34–48px / 1.12; h2 26–32px; h3 19–22px.
- Space scale: 4, 8, 12, 16, 24, 32, 48, 64, 80px.
- Main container 1120px; prose 720px. Gutters 20px mobile, 32px tablet.
- Borders 1px; radii 4–8px. Shadow only for actual screenshot separation.
- Buttons minimum 44px high; underline textual links; visible 3px focus ring.

## Responsive behavior

- Under 768px: native disclosure navigation, stacked project/hero layouts, full-width readable screenshots, wrapped action groups.
- 768–1023px: two-column features where useful; navigation remains compact.
- From 1024px: horizontal navigation, case-study contents sidebar, two-column hero and project summaries.
- Test 360, 390, 768, 1024, 1440px. No fixed-width content exceeding its container.

Motion: short color transitions only, disabled under reduced-motion preference. Diagrams use semantic text and CSS layout, with explicit descriptions. Images carry meaningful alt text and descriptive captions identifying historical media.

## Behind the interface — interaction extension

- Preserve the original hero, palette, page order and primary actions.
- Fine rules and numbered nodes connect screenshot regions, explanations and source evidence.
- Architecture scenarios are user-triggered, explicitly illustrative and entirely local. Parallel paths stay parallel on mobile; dashed amber borders label an unavailable remote path, with text so color is not the sole signal.
- Scenario buttons switch foreground/background immediately to avoid low-contrast intermediate colors. Diagram border/background transitions take 180ms, disabled with reduced motion.
- Screenshot annotations use measured, named CSS regions on unchanged captures. No inline style exception is needed in CSP. Historical images remain explicitly historical.
- Native dialog provides image enlargement, a persistent close control, keyboard focus containment, Escape dismissal and focus return. Direct image links remain the no-JavaScript fallback.
- Case contents indicate the current section and move keyboard focus to its heading when activated. The untimed Barion challenge is optional, unscored, and has a direct-answer route.
- No autoplay, sound, particle backgrounds, custom cursor, fake errors, tracking or external runtime requests.
