---
name: Raphael Aviation
description: SACAA pilot-exam study app rendered as an aeronautical navigation chart — dark chart ground, metallic gold, wayfinding type.
colors:
  chart-ground: "#10171b"
  chart-ground-2: "#141e23"
  chart-line: "#243640"
  chart-line-2: "#2f4651"
  chart-ink: "#dfeef2"
  chart-ink-dim: "#9fc0cb"
  chart-ink-faint: "#6f909b"
  gold: "#e8c877"
  gold-deep: "#c8a44d"
  gold-ink: "#3a2e12"
  danger: "#e8775a"
  success: "#7fd6a2"
typography:
  display:
    fontFamily: "Spectral, ui-serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Overpass, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  mono:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.chart-ground-2}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  panel:
    backgroundColor: "{colors.chart-ground-2}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  nav-item-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

## Overview

Raphael Aviation is a SACAA theoretical-knowledge study app for student pilots (PPL → CPL → Instrument Rating). The visual world is an **aeronautical navigation chart**: a dark ink-teal ground carrying a faint cartographic graticule, a single metallic-gold accent, and a compass rose. The signature idea is that studying is a **planned flight** — subjects are waypoints, the exam is the destination, readiness is distance flown. The world lends type, palette, density, and one signature move (the route); it does not change the navigation model (a left rail on desktop, a drawer on mobile) or standard web controls.

Mode: **Operate** (a working study tool). Expression never obscures the task, state, or a familiar affordance. Brand equity preserved: the name "Raphael Aviation" and the gold wings-and-compass-star logo (`public/logo.png`), shown in the nav, login, and landing.

## Colors

Restrained strategy: neutrals tinted toward the chart's ink-teal, plus one gold accent that does real jobs (brand, the active route, "cleared" state, primary actions).

- `chart-ground` `#10171b` — the page/canvas. `chart-ground-2` `#141e23` — raised panels, rows, the nav rail.
- `chart-line` `#243640` — hairline graticule and dividers. `chart-line-2` `#2f4651` — stronger rules, inactive waypoint rings.
- `chart-ink` `#dfeef2` primary text · `chart-ink-dim` `#9fc0cb` secondary · `chart-ink-faint` `#6f909b` captions/chart labels. Secondary text is tinted from the ground hue, never neutral gray.
- `gold` `#e8c877` — the one accent. `gold-deep` `#c8a44d` for quieter gold (codes). `gold-ink` `#3a2e12` is the only text colour used on gold fills.
- Status colours sit **on top** of the world only where they carry meaning: `danger` `#e8775a` (fail, "behind"), `success` `#7fd6a2` (ready, "cleared"). Readiness dials/bars ramp danger → gold → success. Never decorative.

## Typography

Three faces, loaded via `next/font`:

- **Spectral** (serif) — display headings only, echoing the logo's wordmark. Weight 400–500, `.font-display`.
- **Overpass** (DOT-derived humanist grotesque) — all UI text. The wayfinding pedigree ties it to the chart world.
- **Overpass Mono** — chart labels, SACAA codes (`A.9`), leg labels, tabular readouts, status tags. Always uppercase with wide tracking (`0.14–0.2em`), `.mono`.

Hierarchy is scale + face: serif display for greetings/section titles, sans for body, mono for coded/instrument data. Numbers use `tabular-nums` and often the serif display face for stat readouts.

## Layout

- Desktop: fixed 256px left nav (`md:ml-64`), content in a measured column (max ~`4xl`).
- Mobile: nav collapses to an off-canvas drawer behind a fixed top bar (hamburger + logo + wordmark); content is full-width with `pt-14`. Designed desktop and mobile equally.
- Rhythm: tight groups, generous separation; more space above a heading than below. Dense coded data (codes, counts, percents) sits in mono rows.

## Elevation & Depth

Flat. Depth comes from the ground→panel step (`chart-ground` → `chart-ground-2`) and hairline borders (`chart-line`), not shadows or glass. The chart graticule (`.chart-grid`, 56px cells) is a backdrop at ~30–40% opacity **behind solid panels** — content never sits directly on the grid where it would reduce legibility. The compass rose is a faint (~13% opacity) decorative SVG, never interactive.

## Shapes

- Radius: `sm 8px` controls, `md 12px`, `lg 16px` cards/panels, `pill` for status tags and course toggles.
- Waypoints are small ring/disc dots on a dashed vertical track. Active nav items carry a 2px gold left bar (full-radius siblings keep their rounding; the bar is the only single-side accent and it is square-ended).
- Icons are **drawn** line glyphs (`Icon.tsx`), one 1.5 stroke, `currentColor` — never emoji. Subject marks, nav glyphs, and UI marks all share the set. Typographic marks (✓ ✗ → ←) are allowed as affordances.

## Components

- `button-primary` — gold fill, `gold-ink` text, `sm` radius, hover brightens. One primary action per view.
- `button-secondary` — `chart-ground-2` fill, hairline border, `chart-ink` text.
- `panel` — `chart-ground-2`, hairline border, `lg` radius.
- Nav item (active) — gold text on `gold/8` tint with a 2px gold left bar; inactive is `chart-ink-dim`, hover `chart-ink`.
- Route waypoint — a bordered `chart-ground-2` row on a dashed track; dot fill = gold when cleared, gold ring when en route, `chart-line-2` ring when planned; a thin gold progress bar and a mono status tag.
- Readiness dial — SVG ring, `chart-line` track, stroke ramps danger→gold→success by percent, serif percent label.

## Do's and Don'ts

- **Do** keep one gold accent doing real jobs; tint secondary text from the ground hue.
- **Do** draw icons from `Icon.tsx`; set coded/measured data in Overpass Mono, uppercase, wide-tracked.
- **Do** keep the graticule behind solid panels; lead surfaces with a Spectral serif heading.
- **Don't** use gradients, glass, or glow. **Don't** reintroduce emoji or rainbow per-subject colours.
- **Don't** let status colours (danger/success) become decoration — they mean fail/ready only.
- **Don't** put a kicker/eyebrow above a heading; let the serif heading carry its own weight.
