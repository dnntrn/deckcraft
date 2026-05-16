# Extracting Design Tokens for Theme Generation

## Method: Extract from any design system

When the user names a design system (e.g. "use Kumo", "match Vercel"), extract its design tokens
and map them to Slidev CSS custom properties in `deck/theme/styles.css`.

### Extraction process

1. **Identify the source** — URL, package name, or explicit user values
2. **Extract tokens** — colors (6-10 tokens), typography (3-5 size steps), spacing scale, radius
3. **Map to Slidev theme** — CSS custom properties in a standard format (see below)
4. **Generate `deck/theme/styles.css`** — Write the file with extracted tokens
5. **Reference in slides.md** — `theme: ./theme/styles.css` in frontmatter, or `@import`

### Slidev theme format

Generate `deck/theme/styles.css` with these custom properties:

```css
:root {
  /* Surface colors */
  --slidev-slide-background: /* surface color */;
  --slidev-slide-foreground: /* text primary */;
  --slidev-slide-muted: /* text secondary */;

  /* Accent */
  --slidev-accent: /* primary brand color */;
  --slidev-accent-foreground: /* text on accent */;

  /* Semantic */
  --slidev-success: /* green */;
  --slidev-warning: /* amber */;
  --slidev-error: /* red */;
  --slidev-info: /* blue */;

  /* Typography */
  --slidev-font-family: /* body font */;
  --slidev-mono-family: /* code font */;
  --slidev-font-size-base: 24px;
  --slidev-font-size-code: 18px;
  --slidev-line-height: 1.5;

  /* Code blocks */
  --slidev-code-background: /* slightly muted */;
  --slidev-code-foreground: /* code text */;

  /* Layout */
  --slidev-spacing-unit: 8px;
  --slidev-content-padding: 64px;

  /* Misc */
  --slidev-radius: /* border radius */;
}
```

## Known Design System Shortcuts

| System | Where to find tokens | Notes |
|--------|---------------------|-------|
| Kumo (Cloudflare) | `@cloudflare/kumo` package CSS custom properties, docs at kumo-ui.com/colors | Semantic color tokens, accessible defaults |
| Vercel | Geist design system, vercel.com/design | Geist font family, monochrome + accent pattern |
| MUI (Material) | `theme.palette`, `theme.typography` in MUI theme config | 13+ color tokens, 10+ typography variants |
| Tailwind | User's `tailwind.config.js` or default config | Extract `colors`, `fontFamily`, `fontSize`, `spacing` |
| shadcn/ui | CSS custom properties: `--background`, `--foreground`, `--primary`, etc. | Typically in `globals.css` or `app.css` |
| Carbon (IBM) | `@carbon/themes` package, `@carbon/colors` | Enterprise-grade, accessible defaults |
| GitHub Primer | `@primer/primitives` package | GitHub's design tokens |
| Ant Design | `antd/es/theme` token system | Extensive token set |
| Chakra UI | `extendTheme` config or default theme | Simple token structure |

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
1. Note that you cannot fetch arbitrary URLs in all environments (enterprise constraints)
2. Ask the user to paste relevant CSS custom properties or describe the palette
3. If they provide a public design system URL (like vercel.com/design), use that

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
