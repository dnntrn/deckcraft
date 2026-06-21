# Dynamic Features — Quick Reference

## Smart Suggestions

The AI analyzes your content and offers enhancements. Never forces—always asks.

### When Suggestions Appear

| Pattern | Trigger | Suggestion |
|---------|---------|------------|
| **Code Rhythm** | 3+ consecutive code slides | "Shall we break the rhythm with a diagram?" |
| **Density** | >6 bullet points or >300 chars | "This slide feels crowded. Split or visualize?" |
| **Missing Context** | Code without presenter notes | "Add walkthrough notes for clarity?" |
| **Orphan Content** | Title + single bullet | "Expand with examples or merge slides?" |
| **Layout Monotony** | Same layout 3+ times | "Add variety with divider or impact slide?" |

### Suggestion Format

> 💡 *Observation* — *Question offering choice*

Maximum 2-3 suggestions per deck. Always optional.

---

## Layout Intelligence

Content-aware layout selection.

### Decision Matrix

| Content | Layout | Why |
|---------|--------|-----|
| Opening title | `cover` | Maximum impact |
| Section header | `divider` | Creates rhythm |
| Code + explanation | `content` + `.split` | Side-by-side balance |
| Big number/stat | `impact` | Dramatic emphasis |
| Process (4+ steps) | `content` + `.varch` | Prevents overflow |
| Feature list (3-6) | `content` + `.grid-2` | Visual organization |
| Before/after | `content` + `.split` | Parallel comparison |
| Quote/testimonial | `impact` | Centered authority |
| Closing CTA | `impact` or `cover` | Memorable finish |

---

## Hidden Capabilities

Trigger words unlock special modes.

### The Five Modes

#### 1. Zen Mode
**Trigger:** "zen", "minimal", "simple", "clean"

**Effect:**
- Single word or short phrase per slide
- Maximum whitespace
- All `impact` layouts
- Remove all decoration

**Example:**
```markdown
---
layout: impact
---

# Clarity
```

#### 2. Drama Mode
**Trigger:** "drama", "cinematic", "bold", "wow"

**Effect:**
- Animated gradient dividers
- 20% larger typography
- Radial glow effects
- Darker backgrounds

**Example:**
```css
.dramatic {
  animation: pulse 4s ease-in-out infinite;
}
```

#### 3. Handbook Mode
**Trigger:** "handbook", "guide", "reference"

**Effect:**
- Table of contents slide
- Page numbers in footer
- Cross-references ("See page 8")
- Index slide at end

**Example:**
```markdown
# Contents
1. [Introduction](#slide-2)
2. [Architecture](#slide-5)
3. [Configuration](#slide-8)
```

#### 4. Workshop Mode
**Trigger:** "workshop", "training", "exercise"

**Effect:**
- "Try it yourself" slides every 4-5 slides
- Timer indicators ("⏱️ 5 minutes")
- Facilitator notes
- Section recaps

**Example:**
```markdown
# Exercise: Try It

Implement the pattern.

⏱️ 5 minutes

<!-- Facilitator: Watch for missing cleanup -->
```

#### 5. Story Mode
**Trigger:** "story", "narrative", "journey"

**Effect:**
- Enforced narrative arc
- "Previously..." callbacks
- Dramatic pauses on impact slides
- Editorial theme default

**Arc:** Hook → Problem → Journey → Solution → CTA

---

## Activation Flow

**How it works:**

1. **Detect** — AI spots trigger word or pattern
2. **Describe** — "I hear you want [mode]. This means [effect]."
3. **Offer** — "Shall I proceed with [mode], or keep standard?"
4. **Apply** — If confirmed, applies to entire deck
5. **Indicate** — Adds "Mode: [zen/drama/etc.]" to PRESENTATION.md

---

## Testing

### Test Smart Suggestions
```
"Make slides about JavaScript with 5 code examples"
→ Expect suggestion to add diagram
```

### Test Layout Intelligence
```
"Slide showing our growth: 10x revenue increase"
→ Expect impact layout selected
```

### Test Hidden Modes
```
"Zen presentation about mindfulness"
→ Expect zen mode offered

"Workshop on React hooks for beginners"
→ Expect workshop mode offered

"Dramatic pitch deck for investors"
→ Expect drama mode offered
```

---

*These features make deckcraft responsive, intelligent, and delightful.*

*Full implementation: `references/dynamic-features.md`*
