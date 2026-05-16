---
name: deckcraft
description: Generate and refine beautiful technical presentation slide decks using Slidev. Use when the user asks for slides, a presentation, a deck, a talk, conference material, training content, or demos. Active when working in deck/ or creating Slidev markdown files.
---

# Deckcraft — Beautiful Technical Presentations

Generate Slidev presentations with design intelligence. No commands to memorize.
The skill loads automatically when you work on slides. Talk naturally.

## Activation

This skill activates when:
- User asks for slides, a presentation, deck, talk, or training material
- User is working in a `deck/` directory or with Slidev markdown
- User mentions "slide" in a design or content context
- User asks to improve, restructure, or export existing slides

## The Deck Convention

All output follows the `deck/` convention at the project root:

```
deck/
├── PRESENTATION.md     # Context: audience, tone, design system, anti-references
├── slides.md           # The deck in Slidev markdown (sli.dev)
├── theme/              # Generated custom theme from design tokens
│   ├── styles.css      # CSS custom properties + base styles
│   └── layouts/        # Custom Vue layout components (if needed)
├── assets/             # Generated or placed images, diagrams, screenshots
└── exports/            # PDF, PPTX, PNG output (gitignored)
```

## Before Generating Any Slide

You must have context. If `deck/PRESENTATION.md` is missing or stale, ask:

1. **Audience** — Who is this for? What do they know? (SREs, frontend devs, execs, mixed)
2. **Tone** — Authoritative, playful, academic, clinical, inspirational? Name three words.
3. **Duration** — Lightning (5m), short (15m), standard (30m), deep dive (45-60m)
4. **Design system** — "Use Kumo", "match Vercel", "like workers.cloudflare.com", or user-provided:
   - URL to a design system page
   - CSS variables / design tokens
   - Explicit: "primary=#1a1a2e, secondary=#e94560, font=Inter"
5. **Theme mode** — Dark or light? Default: dark for technical talks.
6. **Anti-references** — What to avoid ("no stock photos", "no purple gradients", "no emoji titles")

Write answers to `deck/PRESENTATION.md`. Never generate slides without this context.

### Extracting Design Tokens

See `references/design-systems.md` for the full extraction methodology. Summary:

1. Identify the design system (by name or URL)
2. Extract: 6-10 color tokens, 3-5 typography steps, spacing scale
3. Map tokens to Slidev CSS custom properties
4. Generate `deck/theme/styles.css`

For known design systems the token locations are documented in the reference.
For unknown systems, fetch and inspect the page/CSS for custom properties, theme configs, or design token files.
For user-provided values, derive a full palette from the given anchors.

## Core Slide Design Rules

These apply to every slide. Deep knowledge is in the reference files.

### Typography
- Title: 48-72px. Body: 24-32px (never below 20px). Code: 18-24px (never below 16px).
- Max 6 lines of body text. Max 65 characters per line.
- One font family for technical talks (system-ui or Inter). Max 2 families for branded decks.
- Monospace for code. Match the editor: Cascadia Code, JetBrains Mono, Fira Code.
- All-caps only for eyebrow labels. No italic body text. No thin weights (≤300).

### Color
- Dark slides: tinted dark backgrounds (never #000). Light slides: warm white (never #fff).
- Text/background contrast ≥ 4.5:1. Slides are viewed on projectors, not Retina screens.
- Accent color from design system. Use it on headings, code highlights, and key UI.
- Semantic colors: error=red, success=green, warning=amber, info=blue.

### Layout
- One idea per slide. If you need two headings, split into two slides.
- Default layouts: `default` (title+content), `two-cols` (split), `center` (focused), `image-right`.
- Don't use the same layout for more than 3 consecutive slides.
- Left-align body text. Centered only for hero slides or single-stat impact slides.

### Code Slides
- Always specify the language: ```python, ```rust, ```typescript, not bare ```.
- Highlight key lines: ```ts {2-3|5|all}.
- Use `two-cols` layout: code left, explanation right. Or code with annotation arrows.
- Never put a long code block on a slide without line highlighting or callouts.
- For live demos, use the Monaco editor component (see `references/slidev.md`).

### Diagrams
- Use Mermaid for architecture, sequence, state, and flow diagrams.
- Keep diagrams to ≤8 nodes for projection readability.
- Mermaid renders at `{scale: 0.7}` by default on slides. Adjust if too dense.
- Never dump a complex diagram without walking through it with build steps (`|` in Mermaid).

### Narrative
- Hook (1-2 slides) → Problem (1-2) → Journey (3-6) → Solution (1-2) → Call to Action (1).
- Section title slides between major topic changes. Keeps the audience oriented.
- Presenter notes on every slide. Use `<!-- -->` HTML comments. Notes explain what to say, not what's on the slide.

## Anti-Pattern Checklist

After generating any slide, run this checklist. P0 issues block output.

**P0 — Broken or unreadable (fix before showing)**
- [ ] Wall of text: >6 body lines or >65 chars per line
- [ ] Bullet hell: >6 bullets or >2 levels of nesting
- [ ] Tiny type: body <20px, code <16px
- [ ] Code without language tag
- [ ] Missing presenter notes
- [ ] Slide with only a title and no content below

**P1 — Hurts comprehension (strongly fix)**
- [ ] Low contrast: text/background <4.5:1
- [ ] Complex diagram: >8 nodes or unreadable at 1920x1080
- [ ] Orphan title: h1 with a single bullet underneath (merge or expand)
- [ ] Code without annotation: no highlights, arrows, or callouts on long blocks
- [ ] Stock photo filler: generic imagery that adds no meaning

**P2 — Weakens impact (consider fixing)**
- [ ] Missing section title slide between topic changes
- [ ] No call to action on the final slide
- [ ] Same layout for >3 consecutive slides
- [ ] Fade-in animation on every element (use selectively)
- [ ] Title that repeats the previous slide's title verbatim

## Export

Only explicit command: `/deckcraft export <format>`.

| Format | Command | Output |
|--------|---------|--------|
| PDF | `/deckcraft export pdf` | `deck/exports/slides.pdf` |
| PPTX | `/deckcraft export pptx` | `deck/exports/slides.pptx` |
| PNG | `/deckcraft export png` | `deck/exports/slide-*.png` |

Requires `playwright-chromium` dev dependency. Slides exported as rendered images (PPTX exports are image-based; text is not selectable).

## Reference Index

| Topic | Reference File | When to Load |
|-------|---------------|--------------|
| Design system extraction | `references/design-systems.md` | Before generating theme |
| Slidev syntax & features | `references/slidev.md` | Before generating slides |
| Typography | `references/typography.md` | When typesetting slides |
| Color | `references/color.md` | When choosing palette |
| Layout patterns | `references/layout.md` | When structuring slides |
| Code slides | `references/code.md` | When presenting code |
| Diagrams | `references/diagrams.md` | When adding diagrams |
| Narrative structure | `references/narrative.md` | When organizing deck flow |
| Anti-patterns | `references/anti-patterns.md` | After generating any slide |
| Exporting | `references/export.md` | When exporting the deck |

## Critical Rules

- Never generate a slide with body text smaller than 20px.
- Never generate a code block without a language tag.
- Never skip presenter notes. Every slide gets them.
- Never use the same layout for more than 3 slides in a row.
- Never show output without running the P0 anti-pattern checklist.
- Always extract or confirm design tokens before generating the theme.
- Always propose an outline and get user approval before generating the full deck.
