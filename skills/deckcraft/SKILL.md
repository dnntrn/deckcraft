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
├── theme/              # Copied theme template
│   ├── styles.css      # CSS variables + reset (scoped layouts handle styling)
│   ├── setup.ts        # Font loading
│   └── layouts/        # Custom Vue layout components (cover, content, impact, divider)
├── assets/             # Generated or placed images, diagrams, screenshots
└── exports/            # PDF, PPTX, PNG output (gitignored)
```

## Before Generating: The Interview

**Never synthesize PRESENTATION.md from a one-liner. Run a real interview.**

The interview is non-negotiable. Do not fill in answers silently. Do not infer the full deck
from the user's opening sentence and ask for a blanket confirmation. Every round must produce
at least one real answer from the user before proceeding.

Always offer a **default answer** for each question so the user can say "default" and move on.
Skip any question whose answer is already clear from the user's prompt or previous answers.

### Step 1: Explore (if in a codebase)

If the user is in a project repo, quickly scan before asking:
- README, package.json for product context
- Existing CSS/config for brand colors, fonts
- Any DESIGN.md, style guide, or logo assets
- Note what you find and what's still unknown

### Step 2: Interview — 3 rounds, 2-3 questions each

**Pause after each round and wait for answers.** Do not batch all rounds at once.
Do not move to the next round until the user has responded. If the user says "default"
to every question in a round, that's a valid response — proceed to the next round.

Every question includes a `[default: ...]` option.

#### Round 1 — Purpose & Audience

1. **What's the talk about?** Topic, venue, format?
2. **Who's the audience?** What do they know? `[default: engineers with general knowledge]`
3. **What should they do or remember after?** `[default: understand the key concepts]`

**STOP. Wait for answers before Round 2.**

#### Round 2 — Design & Tone

4. **Design system or brand?** "Use Kumo", "match Vercel", "MUI", or provide values:
   "primary=#xxxxx, font=Inter" `[default: none, use theme defaults]`
5. **Theme?** `editorial` (literary, serif), `terminal` (technical, mono), `system` (polished, universal), or `blush` (warm, feminine) `[default: terminal for tech talks, system for business]`
6. **Anti-references?** What to avoid? "no stock photos", "not like Apple keynotes" `[default: no purple gradients, no stock photos, no emoji titles]`
7. **Any specific analogies or mental models?** e.g. "explain useEffect like event listeners" `[default: anchor to what the audience already knows from CS fundamentals]`

**STOP. Wait for answers before Round 3.**

#### Round 3 — Scope

8. **Duration?** `[default: 30 minutes]`
9. **Specific sections you want?** Any must-cover topics? `[default: none, propose a best-fit outline]`
10. **Style preference?** Code-heavy, diagram-heavy, or narrative-heavy? `[default: balanced mix]`

**STOP. Wait for answers before proposing outline.**

### Step 3: Propose outline

Write a slide-by-slide outline. **STOP. Wait for the user to confirm or adjust before writing any slides.** Do not treat silence or "sounds good" as implicit approval — wait for an explicit green light.

### Step 4: Generate the deck

1. **Load `references/content-design.md`** — Apply all 8 content patterns (motivate-then-mechanize, 3-pass structure, anchor to prior knowledge, code formula, progressive disclosure, pitfall sandwich, reinforcement slides, close the loop)
2. **Load `references/capacity.md`** — Check content fits at 1920×1080. Split slides if they exceed limits. Never ship scrollbars.
3. Read `references/design-system-tokens.md` for pre-extracted tokens (never scrape websites)
4. Copy chosen theme template from `themes/<theme>/` to `deck/theme/`
5. Inject design system tokens into `deck/theme/styles.css` CSS variables
6. Generate `deck/slides.md` using custom layouts (cover, content, impact, divider)
7. Run the Slide Content Checklist from `references/content-design.md` against every slide

### Step 5: Anti-pattern check

Run the P0 checklist against every slide before showing output.

## Layout System

All slides use custom Vue layout components with **scoped styles**.
UnoCSS cannot touch scoped styles — no interference, no cut-off content.

| Layout | Uses | Example |
|--------|------|---------|
| `cover` | Opening slide | `layout: cover` → Title, subtitle, author |
| `content` | Default slide | `layout: content` → Title + body, lists, code |
| `impact` | Big statement | `layout: impact` → Centered stat or CTA |
| `divider` | Section transition | `layout: divider` → "Part 2: The Solution" |

### Split code + text pattern

Use the `.split` CSS class inside a `content` layout:

```md
---
layout: content
---

# Title

<div class="split">
<div>

Explanation text here. Bullet points, context.

</div>
<div>

```jsx {1-3|5|all}
// Code with click-through highlighting
function Demo() { ... }
```

</div>
</div>
```

### Per-slide custom styling

Add `<style scoped>` blocks for one-off styles (diagrams, custom grids, spacing):

```md
---
layout: content
---

# My Slide

<div class="my-diagram">...</div>

<style scoped>
.my-diagram { display: flex; gap: 16px; }
</style>
```

## Diagrams: HTML/CSS Only

All diagrams are built with HTML + inline `<style scoped>`.
No Mermaid. No external rendering. Full visual control.

See `references/diagrams.md` for pre-built patterns (architecture, state machine, sequence).

### Architecture diagram pattern

```html
<div class="arch">
  <div class="node accent">API Server</div>
  <span class="arrow">→</span>
  <div class="node">Scheduler</div>
  <span class="arrow">→</span>
  <div class="node accent">Kubelet</div>
</div>

<style scoped>
.arch { display: flex; align-items: center; gap: 16px; justify-content: center; margin: 40px 0; }
.node { padding: 18px 28px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; font-family: var(--c-mono); font-size: 18px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); }
.arrow { color: var(--c-accent); font-size: 24px; font-weight: bold; }
</style>
```

## Code Slides

- Always specify the language: ```python, ```jsx, ```rust, not bare ```.
- Highlight key lines: ```jsx {1-3|5|all}.
- Use `.split` for code + explanation side by side.
- Never put a long code block on a slide without line highlighting.
- Code click-through is fine. Text should appear all at once (no `<v-clicks>` on text).

## Core Design Rules

### Typography (handled by layout components)
- All sizes are set in scoped layout styles. No global overrides needed.
- Title ~42px, body ~22px, code ~16px. Fits on any projector.
- Max 6 lines of body text. Max 65 characters per line.
- Monospace for code: JetBrains Mono, Fira Code, Cascadia Code.

### Narrative
- Hook (1-2 slides) → Problem (1-2) → Journey (3-6) → Solution (1-2) → Call to Action (1).
- Section title slides between major topic changes.
- Presenter notes on every slide. Use `<!-- -->` HTML comments.

### Color and Contrast
- Text/background contrast ≥ 4.5:1. Slides are viewed on projectors.
- Accent color from design system. Used on headings, code, and key UI.
- Semantic colors: error=red, success=green, warning=amber, info=blue.

## Anti-Pattern Checklist

Run against every generated slide. P0 issues block output.

**P0 — Broken or unreadable**
- [ ] Wall of text: >6 body lines or >65 chars per line
- [ ] Bullet hell: >6 bullets or >2 levels of nesting
- [ ] Code without language tag
- [ ] Missing presenter notes
- [ ] Slide with only a title and no content below

**P1 — Hurts comprehension**
- [ ] Low contrast: text/background <4.5:1
- [ ] Orphan title: h1 with single bullet (merge or expand)
- [ ] Code without annotation: no highlights or callouts on long blocks
- [ ] Stock photo filler: generic imagery with no meaning

**P2 — Weakens impact**
- [ ] Missing section title slide between topic changes
- [ ] No call to action on the final slide
- [ ] Same layout for >3 consecutive slides
- [ ] Title that repeats the previous slide's title verbatim

## Export

Only explicit command: `/deckcraft export <format>`.

| Format | Command | Output |
|--------|---------|--------|
| PDF | `/deckcraft export pdf` | `deck/exports/slides.pdf` |
| PPTX | `/deckcraft export pptx` | `deck/exports/slides.pptx` |
| PNG | `/deckcraft export png` | `deck/exports/slide-*.png` |

Requires `playwright-chromium` dev dependency.

## Reference Index

| Topic | Reference File | When to Load |
|-------|---------------|--------------|
| Slide capacity limits | `references/capacity.md` | Before generating slides |
| Content design patterns | `references/content-design.md` | Before generating slides |
| Design system tokens | `references/design-system-tokens.md` | Before generating theme |
| Design system methodology | `references/design-systems.md` | Custom design systems |
| HTML/CSS diagram patterns | `references/diagrams.md` | When adding diagrams |
| Slidev syntax + custom layouts | `references/slidev.md` | Before generating slides |
| Typography rules | `references/typography.md` | Reference for layout design |
| Color rules | `references/color.md` | When choosing palette |
| Code slides | `references/code.md` | When presenting code |
| Narrative structure | `references/narrative.md` | When organizing deck flow |
| Anti-patterns | `references/anti-patterns.md` | After generating any slide |
| Exporting | `references/export.md` | When exporting the deck |
| Theme templates | `themes/editorial/`, `themes/terminal/`, `themes/system/`, `themes/blush/` | Copy to `deck/theme/` before slides |

## Critical Rules

- Never skip the interview. Ask 2-3 questions per round, wait for answers.
- Always offer a `[default: ...]` for every question.
- Apply content-design patterns from `references/content-design.md` to every deck (motivate first, 3-pass structure, anchor to prior knowledge, pitfall sandwich).
- Never scrape websites for design tokens. Read `references/design-system-tokens.md`.
- Never use Mermaid. Use HTML/CSS diagrams with `<style scoped>`.
- Never use `<v-clicks>` or `<v-click>` on body text. Text appears all at once.
- Code click-through highlighting (`{1-3|5|all}`) is fine.
- All layouts are custom Vue components with scoped styles. Never use Slidev built-in layouts.
- Always propose an outline before generating slides.
- Use built-in `.grid-2` / `.grid-3` utilities for feature cards and grids. Never set custom `font-size` in grid scoped styles. Grid children use card-title (13px) and card-desc (12px).
- Flow/process diagrams with 4+ nodes: use vertical layout (`.varch`, `flex-direction: column`, `max-height: 520px`). Horizontal layout wraps and overflows at 1920px.
