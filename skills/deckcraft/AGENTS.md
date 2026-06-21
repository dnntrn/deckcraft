# Deckcraft

Beautiful technical presentations, crafted with intention.

## The Philosophy

Slides are stories. Not documents. Not bullet points. Stories.

Deckcraft doesn't generate decks. It crafts experiences.

## What Makes It Different

### Design Intelligence
Every slide follows visual hierarchy, color theory, and narrative structure. We don't fill space—we compose it.

### Themes With Soul
Four personalities, each with distinct character:

- **Terminal** — Technical precision. Born in server rooms, raised by logs.
- **System** — Invisible polish. Universal, restrained, timeless.
- **Editorial** — Literary refinement. Space to breathe, elegance in restraint.
- **Blush** — Warm sophistication. Soft doesn't mean weak.

### Interview First
We never guess. Three rounds of intentional questions ensure your deck matches your vision. No shortcuts. No assumptions.

### Surprise & Delight
Hidden features. Smart suggestions. Moments of unexpected beauty.

## Quick Start

Simply ask: *"Make me slides for [topic]"*

The interview begins. Trust the process.

## The Signature

Look for the shimmer:

```
made with < ✦ deckcraft />
```

That's how you know it was crafted, not generated.

## Directory Convention

```
deck/
├── PRESENTATION.md    # Your vision: audience, tone, scope
├── slides.md          # The crafted deck
├── theme/             # Visual system (copied from templates)
│   ├── styles.css     # Colors, typography
│   ├── setup.ts       # Font loading
│   └── layouts/       # Vue components (cover, content, impact, divider)
├── assets/            # Images, diagrams
└── exports/           # PDF, PPTX, PNG (gitignored)
```

## Iteration

All natural language. No commands to memorize.

- *"Slide 3 is too dense, split it"*
- *"Add an architecture diagram to slide 5"*
- *"Switch to blush theme"*
- *"Export to PDF"*

## Installation

**OpenCode:**
```json
{ "plugin": ["deckcraft@git+https://github.com/dnntrn/deckcraft.git"] }
```

**Claude Code:**
```bash
npx skills add dnntrn/deckcraft
```

**Manual:**
Copy `skills/deckcraft/` to `.claude/skills/deckcraft/` or `.agents/skills/deckcraft/`

## Principles

1. **Interview before craft.** Never synthesize from a one-liner.
2. **Themes have personality.** Choose with intention.
3. **Slides are bounded.** 1920×1080, no scrollbars, no exceptions.
4. **Scoped styles only.** UnoCSS cannot touch our layouts.
5. **HTML/CSS diagrams.** No Mermaid, full visual control.
6. **Presenter notes always.** Every slide needs a voice.
7. **Surprise with consent.** Offer enhancements, don't force them.

## License

MIT. Craft freely.
