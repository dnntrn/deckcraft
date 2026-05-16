# Design Token Extraction

> Pre-extracted token maps are in `references/design-system-tokens.md`. Read that file first.
> This file covers methodology for custom systems and how tokens are mapped to themes.

## Never Scrape Websites at Runtime

Do NOT fetch websites to extract design tokens. All runtime scraping has been removed.
Reasons: network latency, enterprise firewall blocks, rate limiting, inconsistent results.

Instead:
1. Read `references/design-system-tokens.md` for Kumo, Vercel, MUI, etc.
2. For custom design systems, ask the user for explicit values
3. For user-provided values, derive a full palette from anchors (see below)

## User-Provided Values

When the user provides explicit values instead of a system name:

```
"use our brand: primary=#1a1a2e, font=Inter, dark theme"
"primary=#ff6b35, secondary=#004e64"
"match our site at example.com"
```

### Handling explicit colors

1. **Primary** → `--slidev-accent` and used for headings, code highlights, links
2. **Secondary** (if provided) → detail color, diagram accents, subtle backgrounds
3. **Derive full palette** from primary using OKLCH manipulation:
   - Surface: darken/lighten primary to <10% chroma for tinted neutral
   - Muted: lower opacity of foreground
   - Code background: surface with slight primary tint
   - Success/warning/error/info: standard semantic hues, scaled to match primary vibrancy

### Handling explicit fonts

1. **One font given** → use it for titles and body, pick matching mono for code
2. **Two fonts given** (display + body) → use as directed
3. **Font on a URL** → use system fallback for Slidev, note the font for export

### Handling a URL

If user says "match our site at example.com":
1. Do NOT fetch the URL (enterprise constraints, network latency)
2. Ask the user to paste relevant CSS custom properties or describe the palette
3. If they provide explicit values, derive from those instead

## Color Strategy for Slides

### Dark theme (default for technical talks)
- Background: near-black with slight hue tint from design system (e.g., `oklch(15% 0.01 270)`)
- Never pure black (`#000`). Projectors crush blacks; use tinted near-black.
- Foreground: near-white with slight warmth (e.g., `oklch(95% 0 0)`)
- Accent: the design system's primary color, used sparingly on headings and code
- Code background: slightly lighter than slide background, with accent-tinted selection

### Light theme
- Background: warm white, never pure `#fff` (glare on projectors)
- Foreground: near-black with slight hue tint
- Accent: same as dark theme but may need slightly higher chroma for light bg

### Semantic colors
- Success: green hue (~140-150), sufficient contrast on both dark and light
- Warning: amber/orange (~80-90)
- Error: red (~0-15)
- Info: blue (~220-240)
- All semantic colors must meet WCAG AA on the chosen background

## Edge Cases

- **Design system has no monospace font**: default to JetBrains Mono or Fira Code
- **Design system only has bright colors**: tone down for slide backgrounds, keep accents vibrant
- **User provides 1 color + no font**: derive palette from that color, use system-ui
- **Enterprise private design system**: use any token format user provides (CSS, JSON, YAML, prose description)
