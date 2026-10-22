## Presentation Decks (deckcraft)

This repo uses the `deck/` convention for AI-generated presentation decks:

```
deck/
├── PRESENTATION.md     # Context: audience, tone, design system, anti-references
├── STYLE.md            # Imported style guide (optional, from tools/style-import.mjs)
├── slides.md           # The deck in Slidev markdown (sli.dev)
├── theme/              # Composed theme (shared foundation + chosen theme tokens)
│   ├── styles.css      # @import base.css + theme tokens + dark mode overrides
│   ├── base.css        # Shared structural CSS (from themes/shared/)
│   ├── global-bottom.vue  # Nav overlay (from themes/shared/)
│   └── layouts/        # 11 Vue layout components (from themes/shared/layouts/)
├── assets/             # Images, diagrams, screenshots
└── exports/            # PDF/PPTX output (gitignored)
```

### Output format

Slidev (sli.dev) — Markdown with Vue. Code highlighting (Shiki), custom Vue layouts,
presenter notes. Exportable to PDF/PPTX/static site.

### Layout system

Custom Vue components with scoped styles. UnoCSS cannot interfere.
Eleven layouts:

| Layout | Purpose | Key Elements |
|--------|---------|--------------|
| `cover` | Opening slide | h1, p, .author |
| `content` | Default workhorse | h1–h3, p, ul, pre, blockquote, .split, .grid-2/.grid-3 |
| `impact` | Big statement | h1 (big number), p, .text-sm |
| `divider` | Section break | h1, h2/p |
| `metrics` | KPIs, traction, stats | .metrics-grid > .metric > .metric-value + .metric-label + .metric-desc |
| `feature-grid` | Cards (2/3/4-up) | .grid-2/.grid-3/.grid-4 > .card > .card-icon/.card-title/.card-desc/.card-tag |
| `comparison` | Side-by-side | .compare > .compare-col × 2, .compare-label |
| `two-cols` | Image + text | .cols > .col-text + .col-media |
| `timeline` | Process/steps | .timeline-steps > .step > .step-dot + .step-title + .step-desc |
| `big-code` | Full-bleed code | .code-header, pre/code, .text-sm |
| `quote` | Testimonial | blockquote, .attribution > .attribution-name + .attribution-role |

Per-slide `<style scoped>` for one-off styles and diagrams.

### Diagrams

Pure HTML/CSS with inline `<style scoped>`. No Mermaid.
Full visual control. Pre-built patterns for architecture, state machines,
sequence diagrams, and before/after comparisons.

### Theme templates

Four bundled themes in `skills/deckcraft/themes/`, all support light and dark mode:
- **editorial** — Literary, refined. Playfair Display italic headings. Generous whitespace.
- **terminal** — Technical, dense. JetBrains Mono bold headings. Solid surfaces.
- **system** — Polished, invisible. Inter semibold headings. All-purpose.
- **blush** — Warm, feminine, sophisticated. DM Serif Display italic headings. Montserrat body. Frosted glass cards. Rose accents.

All themes share a single structural foundation (`themes/shared/`): 11 Vue layouts, base CSS, global-bottom nav overlay, and a 3-tier token contract (`themes/shared/tokens.md`). Each theme's `styles.css` defines only its personality tokens (colors, fonts, heading style, glass vs solid surfaces, spacing).

### Design system tokens

Pre-extracted in `skills/deckcraft/references/design-system-tokens.md`
for Kumo, Vercel, and MUI. No runtime scraping during normal generation.
For an explicit “match this URL” request, use the opt-in style import tool:
`npm run style -- <url> --out ./style` (see `skills/deckcraft/references/style-import.md`).
Theme token contract: `skills/deckcraft/themes/shared/tokens.md`.

### Interview flow (never synthesize from one-liner)

The AI conducts a 3-round interview with 2-3 questions each.
Every question offers a `[default: ...]`. User can say "default" to accept.
Round 1: Purpose & Audience. Round 2: Design & Tone. Round 3: Scope.
Outline proposed and confirmed before any slides are generated.

### Creating a deck

Just ask. "Make me slides for my React lifecycle talk." The AI will:
1. Run the interview (3 rounds, defaults available)
2. Extract design tokens from pre-built maps
3. Propose outline → confirm
4. Compose theme directory: copy `shared/` (base.css, layouts/, global-bottom.vue) + chosen theme's `styles.css` into `deck/theme/`. Rewrite `@import '../shared/base.css'` → `@import './base.css'`.
   If `deck/STYLE.md` exists, keep the installed `deck/theme/` and follow the imported style instead of choosing a bundled theme.
5. Generate slides with custom layouts + HTML/CSS diagrams

### Iterating

All natural language. No commands.
- "Slide 3 is too dense, split it"
- "Add an architecture diagram to slide 5"
- "Make the code slides cleaner"
- "Switch to blush theme"
- "Export to PDF"

### Export

`/deckcraft export pdf|pptx|png`

### Install the skill

**OpenCode:** Add to `opencode.json`:
```json
{ "plugin": ["deckcraft@git+https://github.com/dnntrn/deckcraft.git"] }
```

**Claude Code:** `npx skills add dnntrn/deckcraft`

**Manual:** Copy `skills/deckcraft/` into `.claude/skills/deckcraft/` or `.agents/skills/deckcraft/`
