## Presentation Decks (deckcraft)

This repo uses the `deck/` convention for AI-generated presentation decks:

```
deck/
├── PRESENTATION.md     # Context: audience, tone, design system, anti-references
├── slides.md           # The deck in Slidev markdown (sli.dev)
├── theme/              # Generated custom theme (CSS + Vue layouts)
├── assets/             # Images, diagrams, screenshots
└── exports/            # PDF/PPTX output (gitignored)
```

### Output format

Slidev (sli.dev) — Markdown with Vue. Code highlighting, Mermaid diagrams,
two-column layouts, presenter notes. Exportable to PDF/PPTX/static site.

### Design system theming

The AI extracts design tokens from any public design system (Kumo, Vercel, MUI,
Tailwind, shadcn, Carbon, etc.) or from user-provided values (primary color,
font family, etc.) and generates a custom Slidev theme in `deck/theme/`.

### Creating a deck

Just ask. "Make me slides for my Kubernetes talk." The AI will:
1. Ask about audience, tone, duration, and design system
2. Extract design tokens and write PRESENTATION.md
3. Propose an outline for approval
4. Generate all slides + theme

### Iterating

All natural language. No commands to memorize.
- "Slide 3 is too dense, split it"
- "Add a Mermaid diagram here"
- "Make the code slides cleaner"
- "Switch to dark theme"
- "Export to PDF"

### Export

`/deckcraft export pdf|pptx|png`

### Install the skill

The `deckcraft` skill teaches your AI slide design principles. Install via:

**OpenCode:** Add to `opencode.json`:
```json
{ "plugin": ["deckcraft@git+https://github.com/dnntrn/deckcraft.git"] }
```

**Claude Code:** `npx skills add dnntrn/deckcraft`

**Manual:** Copy `skills/deckcraft/` into `.claude/skills/deckcraft/` or `.agents/skills/deckcraft/`
