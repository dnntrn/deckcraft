## Presentation Decks (deckcraft)

This repo uses the `deck/` convention for AI-generated presentation decks:

```
deck/
├── PRESENTATION.md     # Context: audience, tone, design system, anti-references
├── slides.md           # The deck in Slidev markdown (sli.dev)
├── theme/              # Copied theme template
│   ├── styles.css      # CSS variables + reset only
│   ├── setup.ts        # Font loading
│   └── layouts/        # Custom Vue layout components (scoped styles)
├── assets/             # Images, diagrams, screenshots
└── exports/            # PDF/PPTX output (gitignored)
```

### Output format

Slidev (sli.dev) — Markdown with Vue. Code highlighting (Shiki), custom Vue layouts,
presenter notes. Exportable to PDF/PPTX/static site.

### Layout system

Custom Vue components with scoped styles. UnoCSS cannot interfere.
Four layouts: `cover`, `content`, `impact`, `divider`.
Split code+text pattern via `.split` CSS class in `content` layout.
Per-slide `<style scoped>` for one-off styles and diagrams.

### Diagrams

Pure HTML/CSS with inline `<style scoped>`. No Mermaid.
Full visual control. Pre-built patterns for architecture, state machines,
sequence diagrams, and before/after comparisons.

### Theme templates

Two bundled themes in `skills/deckcraft/themes/`:
- **studio** — Clean, universal. Swiss design. Light/dark.
- **nocturne** — Dark technical. Terminal aesthetic. Code-focused.

### Design system tokens

Pre-extracted in `skills/deckcraft/references/design-system-tokens.md`
for Kumo, Vercel, and MUI. No runtime scraping. Never fetch websites.

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
4. Copy theme template, inject tokens
5. Generate slides with custom layouts + HTML/CSS diagrams

### Iterating

All natural language. No commands.
- "Slide 3 is too dense, split it"
- "Add an architecture diagram to slide 5"
- "Make the code slides cleaner"
- "Switch to nocturne theme"
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
