---
version: 1
slug: "src-app-dashboard-page-tsx"
primary_target: "src/app/dashboard/page.tsx"
related_targets: ["src/app/globals.css","src/app/layout.tsx"]
---

## Direction contract

THESIS: The study app is a planned cross-country flight — subjects are waypoints, the exam is the destination, progress is distance flown. It refuses the SaaS dashboard of same-size coloured gradient cards; readiness is read as position along a route, not as a grid of tiles.

OWN-WORLD: Dark aeronautical-chart ground (deep ink-teal #10171b) with a faint cartographic grid, compass rose, and airspace-ring linework in muted slate. One metallic gold accent (#e8c877) carries the brand, the active route line (dashed, like a planned track), and "cleared" state. Wayfinding type: Overpass (DOT-derived) for UI, Overpass Mono for chart labels/codes, Spectral serif for display headings echoing the Raphael wordmark. Hairline strokes, no gradients, no glass. Icons are drawn chart symbols (waypoint dots, compass ticks), never emoji.

STORY: A student lands and immediately sees where they are on the route to their exam — days remaining, overall readiness, which subject is "cleared", "en route", or "planned", and the next leg to fly. They pick up study where the route continues.

FIRST VIEWPORT: Thin top bar — gold serif wordmark left, text nav right (Chart / Study / Exams / Logbook / Progress). Below, a chart canvas filling the viewport: faint grid + compass rose top-right, a gold dashed route curving across it, subject waypoints as labelled dots (name + SACAA code + status). A quiet leg-label line ("CPL ROUTE · 42 DAYS TO EXAM · 68%") sits above a serif greeting. Primary action = resume the next leg.

FORM: Aeronautical navigation chart. #1 of 7 grounded directions (the IMPECCABLE'S PICK candidate; user-chosen over the assigned #5). seed:89858386 (reference unavailable in full form; recorded as rolled).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
