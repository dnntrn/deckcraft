---
name: deckcraft
description: Craft beautiful technical presentation slide decks using Slidev. Activate when the user asks for slides, a presentation, a deck, a talk, conference material, training content, or demos. Active when working in deck/ or creating Slidev markdown files.
---

# Deckcraft — The Art of Presentation

Slides are stories. Not documents. Not bullet points. Stories.

Deckcraft doesn't generate decks. It crafts experiences.

## The Philosophy

### Why We Interview

Every deck begins with understanding. We never synthesize from a one-liner or infer your vision from a sentence. The interview is not overhead—it is the work.

Three rounds. Intentional questions. Real answers.

This process ensures the craft matches your vision. The audience, the tone, the scope—each element considered before the first slide exists.

### Why Design Matters

Beauty is functional. A well-designed slide communicates better. Visual hierarchy guides the eye. Whitespace creates rhythm. Color carries meaning.

We don't fill space. We compose it.

### Why Constraints Liberate

The 1920×1080 boundary is not a limitation—it is freedom. Within these bounds, we make decisions. Every element earns its place. No scrollbars. No exceptions.

### Why Themes Have Soul

A theme is not a skin. It is a personality.

- **Terminal** — Technical precision. Born in server rooms, raised by logs.
- **System** — Invisible polish. Universal, restrained, timeless.
- **Editorial** — Literary refinement. Space to breathe, elegance in restraint.
- **Blush** — Warm sophistication. Soft doesn't mean weak.

Choose with intention. The theme shapes the story.

---

## The Ritual: The Interview

**Never synthesize PRESENTATION.md from a one-liner. Run a real interview.**

The interview is non-negotiable. Every round must produce at least one real answer before proceeding. Defaults are offered, but the choice remains yours.

### Step 1: Explore (if in a codebase)

Before asking, observe. Scan the repository for context:

- README, package.json for product context
- Existing CSS/config for brand colors, fonts
- DESIGN.md, style guides, logo assets
- Note what you find and what remains unknown

### Step 2: The Interview — Three Rounds

**Pause after each round. Wait for answers.** Do not batch. Do not proceed without response. "Default" is a valid answer—accept it and continue.

#### Round 1 — Purpose & Audience

*The foundation. Understanding the story and who receives it.*

1. **What story are you telling?** Topic, venue, format? `[default: technical deep-dive for an engineering team]`
2. **Who listens?** What do they know? What do they need? `[default: engineers with general domain knowledge]`
3. **What changes after?** What should they do or remember? `[default: understand the core concepts clearly]`

**STOP. Wait for answers before Round 2.**

#### Round 2 — Design & Tone

*The aesthetic. Choosing the personality and palette.*

4. **Any design system or brand guidelines?** "Use Kumo", "match Vercel", "MUI", or specific values? `[default: none, use theme defaults]`
5. **Which theme speaks to this?** `editorial` (literary, serif), `terminal` (technical, mono), `system` (polished, universal), `blush` (warm, feminine) `[default: terminal for tech talks, system for business presentations]`
6. **What to avoid?** Anti-references: "no stock photos", "not like Apple keynotes" `[default: no purple gradients, no stock photos, no emoji titles]`
7. **Any specific analogies or mental models?** "Explain useEffect like event listeners" `[default: anchor to what the audience already knows from CS fundamentals]`

**STOP. Wait for answers before Round 3.**

#### Round 3 — Scope

*The structure. Defining the journey.*

8. **Duration?** `[default: 30 minutes]`
9. **Specific sections or must-cover topics?** `[default: none, propose a best-fit outline]`
10. **Style preference?** Code-heavy, diagram-heavy, or narrative-heavy? `[default: balanced mix with variety]`

**STOP. Wait for answers before proposing outline.**

### Step 3: Propose Outline

Write a slide-by-slide outline. **STOP. Wait for explicit confirmation.** Do not treat silence as approval. Do not proceed on "sounds good" without explicit green light.

The outline is a conversation. Adjust based on feedback.

---

## The Alchemy: From Vision to Deck

### Principles of Generation

Once the outline is approved, the craft begins.

1. **Load `references/content-design.md`** — Apply all 8 content patterns:
   - Motivate, then mechanize
   - The 3-pass structure
   - Anchor to prior knowledge
   - Code formula
   - Progressive disclosure
   - Pitfall sandwich
   - Reinforcement slides
   - Close the loop

2. **Load `references/capacity.md`** — Verify content fits 1920×1080. Split slides if limits exceeded. Never ship scrollbars.

3. **Read `references/design-system-tokens.md`** — Use pre-extracted tokens. Never scrape websites.

4. **Copy theme template** — From `themes/<theme>/` to `deck/theme/`

5. **Inject tokens** — Colors, fonts into `deck/theme/styles.css`

6. **Generate `deck/slides.md`** — Using custom layouts with intention

7. **Run content checklist** — From `references/content-design.md` against every slide

### Frontmatter Structure (Critical)

```markdown
---
theme: ./theme
highlighter: shiki
lineNumbers: true
title: Your Title
layout: cover
---

# Your Title

Content here...
```

- Place `layout: cover` in the SAME frontmatter block as global settings
- Never separate global frontmatter from first slide frontmatter
- Two frontmatter blocks create a blank slide

---

## The Craft: Layout System

All slides use custom Vue components with **scoped styles**. UnoCSS cannot interfere—no cut-offs, no unwanted overrides.

### The Four Layouts

| Layout | Purpose | Character |
|--------|---------|-----------|
| `cover` | Opening | Title, subtitle, author. Sets the tone. |
| `content` | Default | Title + body, lists, code. The workhorse. |
| `impact` | Statement | Centered stat or CTA. Dramatic pause. |
| `divider` | Transition | "Part 2: The Solution". Creates rhythm. |

### The Split Pattern

For code + explanation side by side:

```md
---
layout: content
---

# Title

<div class="split">
<div>

Explanation text. Context. Bullet points.

</div>
<div>

```jsx {1-3|5|all}
// Code with click-through highlighting
function Demo() { ... }
```

</div>
</div>
```

### Per-Slide Styling

Add `<style scoped>` for one-off elements (diagrams, custom grids):

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

### Diagrams: Pure HTML/CSS

No Mermaid. No external dependencies. Full visual control.

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

See `references/diagrams.md` for patterns: architecture, state machines, sequences.

---

## Code Slides

- Always specify language: ```python, ```jsx, ```rust, never bare ```
- Highlight lines: ```jsx {1-3|5|all}
- Use `.split` for code + explanation
- Never put long code without line highlighting
- Code click-through is acceptable. Text appears all at once (no `<v-clicks>`)

---

## The Polish: Quality Standards

### Typography

- Sizes set in scoped layout styles. No global overrides.
- Title ~42px, body ~22px, code ~16px. Projector-ready.
- Max 6 body lines. Max 65 characters per line.
- Monospace for code: JetBrains Mono, Fira Code, Cascadia Code.

### Narrative Structure

Hook (1-2 slides) → Problem (1-2) → Journey (3-6) → Solution (1-2) → Call to Action (1)

Section dividers between topic changes. Presenter notes on every slide.

### Color & Contrast

- Text/background contrast ≥ 4.5:1 (projector viewing)
- Accent color from design system
- Semantic colors: error=red, success=green, warning=amber, info=blue

---

## Anti-Pattern Checklist

Run against every slide. P0 blocks output.

### P0 — Broken or Unreadable
- [ ] Wall of text: >6 body lines or >65 chars per line
- [ ] Bullet hell: >6 bullets or >2 nesting levels
- [ ] Code without language tag
- [ ] Missing presenter notes
- [ ] Slide with title only, no content

### P1 — Hurts Comprehension
- [ ] Low contrast: text/background <4.5:1
- [ ] Orphan title: h1 with single bullet
- [ ] Code without annotation
- [ ] Stock photo filler

### P2 — Weakens Impact
- [ ] Missing section divider between topics
- [ ] No CTA on final slide
- [ ] Same layout >3 consecutive slides
- [ ] Title repeats previous slide verbatim

---

## Dynamic Features

Deckcraft responds intelligently to your content and intent.

### Smart Suggestions

During generation, the AI analyzes content and offers enhancements. Never forces—always asks.

**Detection Patterns:**

- **3+ consecutive code blocks** → "Shall we break the rhythm with a diagram?"
- **Section title + wall of text** → "This slide feels crowded. Split into visual + explanation?"
- **No presenter notes on code slide** → "Add walkthrough notes for clarity?"
- **Orphan title** (title + single bullet) → "Expand with examples, or merge with previous?"
- **Same layout 3+ times** → "Introduce a divider or impact slide for visual rhythm?"

**Format:**
> 💡 *Observation* — *Question offering choice*

Maximum 2-3 suggestions per deck. Always offer "keep as is" option.

### Layout Intelligence

Content-aware layout selection. See `references/dynamic-features.md` for complete decision matrix.

**Quick Reference:**

| Content Pattern | Layout | Why |
|-----------------|--------|-----|
| Opening title | `cover` | Maximum impact |
| Code + explanation | `content` + `.split` | Side-by-side balance |
| Big number/stat | `impact` | Dramatic emphasis |
| Section break | `divider` | Creates rhythm |
| Process (4+ steps) | `content` + `.varch` | Prevents overflow |
| Feature list (3-6) | `content` + `.grid-2` | Visual organization |

### Hidden Capabilities

Trigger words unlock special modes. See `references/dynamic-features.md` for complete implementation.

| Trigger Word | Mode | Effect |
|--------------|------|--------|
| **"zen"** | Minimal | Single words, maximum whitespace, all `impact` layouts |
| **"drama"** | Cinematic | Animated gradients, bold scale, radial glows |
| **"handbook"** | Reference | Table of contents, page numbers, cross-references |
| **"workshop"** | Interactive | Exercise slides, facilitator notes, timer indicators |
| **"story"** | Narrative | Enforced story arc, dramatic pauses, callbacks |

**Activation:**
1. AI detects trigger word
2. Describes mode and what changes
3. Offers opt-out: "Shall I proceed with [mode], or keep standard formatting?"
4. Applies to entire deck if confirmed

### Implementation

Add to generation workflow (Step 4):

**4a. Content Analysis** — Run detection patterns, generate suggestions  
**4b. Hidden Mode Check** — Scan for trigger words, offer activation  
**4c. Layout Intelligence** — Select optimal layouts from matrix  
**4d. Apply & Generate** — Implement choices, create slides  
**4e. Quality Check** — Run anti-pattern checklist

Full implementation details: `references/dynamic-features.md`

---

## Export

Explicit command only: `/deckcraft export <format>`

| Format | Best For | Output |
|--------|----------|--------|
| PDF | Sharing, printing, archival | `deck/exports/slides.pdf` |
| PPTX | PowerPoint compatibility | `deck/exports/slides.pptx` |
| PNG | Social media, thumbnails | `deck/exports/slide-*.png` |

Requires `playwright-chromium` dev dependency.

---

## Reference Index

| Topic | File | When to Load |
|-------|------|--------------|
| Capacity limits | `references/capacity.md` | Before generating |
| Content patterns | `references/content-design.md` | Before generating |
| Design tokens | `references/design-system-tokens.md` | Before theming |
| Diagram patterns | `references/diagrams.md` | When adding diagrams |
| Dynamic features | `references/dynamic-features.md` | Before generating |
| Gallery & recipes | `references/gallery.md` | For inspiration |
| Voice & tone | `VOICE.md` | Always |
| Layout reference | `references/slidev.md` | Before generating |

---

## The Signature

When you see the shimmer—`made with < ✦ deckcraft />`—you know it was crafted, not generated.

The iridescent pink gradient. The gentle animation. The mark of intentional design.

This is deckcraft.

---

## Critical Rules

1. **Never skip the interview.** Three rounds. Real answers. No shortcuts.
2. **Themes have personality.** Choose with intention.
3. **Slides are bounded.** 1920×1080, no scrollbars.
4. **Scoped styles only.** UnoCSS cannot touch our layouts.
5. **HTML/CSS diagrams.** No Mermaid. Full control.
6. **Presenter notes always.** Every slide needs a voice.
7. **Surprise with consent.** Offer enhancements, don't force.
8. **Always propose outline.** Explicit confirmation before craft.

---

*Crafted with < ✦ deckcraft />*
