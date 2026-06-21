# Dynamic Features Implementation

## Smart Suggestions Engine

During generation, analyze content and offer enhancements. Never force—always ask.

### Detection Patterns

```typescript
// Pattern 1: Code Rhythm
if (consecutiveCodeBlocks >= 3) {
  suggest("💡 This section has three consecutive code slides. Shall we break the rhythm with a diagram or architecture visualization?")
}

// Pattern 2: Density Check  
if (slide.bodyLines > 6 || slide.charCount > 300) {
  suggest("💡 This slide feels crowded. Shall we split it into two focused slides, or convert the list to a visual diagram?")
}

// Pattern 3: Missing Context
if (slide.hasCode && !slide.hasPresenterNotes) {
  suggest("💡 This code slide lacks presenter notes. Shall I add walkthrough annotations?")
}

// Pattern 4: Orphan Content
if (slide.hasTitle && slide.bulletCount === 1) {
  suggest("💡 This slide has a title with a single bullet. Shall we expand with examples, or merge with the previous slide?")
}

// Pattern 5: Layout Variety
if (sameLayoutCount >= 3) {
  suggest("💡 We've used the same layout for three consecutive slides. Shall we introduce a divider or impact slide for visual rhythm?")
}

// Pattern 6: Narrative Opportunity
if (slide.isConceptExplanation && !slide.hasAnalogy) {
  suggest("💡 This concept could benefit from an analogy. Shall I suggest one that anchors to prior knowledge?")
}
```

### Implementation in SKILL.md

Add to Step 4 (Generate the deck):

```markdown
### 4a. Content Analysis & Suggestions

After generating each slide, run detection patterns. If triggered, pause and present the suggestion:

**Format:**
> 💡 *Observation* — *Question offering choice*

**Example Suggestions:**

- "💡 I notice this section has five consecutive code slides. Shall we break the rhythm with a diagram, or does the density serve your purpose?"

- "💡 Slide 7 feels crowded with 8 bullet points. Shall we split it into two focused slides, or convert to a visual grid?"

- "💡 This architecture explanation lacks a diagram. Shall I create an HTML/CSS visualization?"

**Rules:**
- Maximum 2-3 suggestions per deck (don't overwhelm)
- Always offer a "keep as is" option
- Frame as collaboration, not correction
- Use sophisticated voice (no "Hey!" or "Oops!")
```

## Layout Intelligence

Content-aware layout selection.

### Decision Matrix

```markdown
| Content Pattern | Recommended Layout | Rationale |
|-----------------|-------------------|-----------|
| Opening title + subtitle | `cover` | Sets tone, maximum impact |
| Section transition | `divider` | Creates rhythm, breathing room |
| Code (20+ lines) + explanation | `content` with `.split` | Side-by-side balance |
| Single big number/stat | `impact` | Dramatic emphasis |
| Process/architecture (4+ steps) | `content` with `.varch` | Vertical flow prevents overflow |
| Feature list (3-6 items) | `content` with `.grid-2` | Visual organization |
| Before/after comparison | `content` with `.split` | Parallel structure |
| Quote/testimonial | `impact` | Centered, authoritative |
| Closing CTA | `impact` or `cover` | Memorable finish |
```

### Auto-Selection Logic

```markdown
### 4b. Layout Selection

Analyze slide content and recommend optimal layout:

**Step 1: Identify content type**
- Opening slide? → `cover`
- Section header? → `divider`  
- Single metric/quote? → `impact`
- Code + text mix? → `content` with `.split`

**Step 2: Check capacity**
- >40 lines of code? → Suggest splitting or using `.varch`
- >6 bullet points? → Suggest `.grid-2` or `.grid-3`
- Complex diagram? → Ensure 60px+ padding in layout

**Step 3: Apply content-design patterns**
- Motivate-then-mechanize → Use `.split` (motivation left, code right)
- Pitfall sandwich → Use `.split` (wrong code left, right code right)
- Architecture diagram → Use `.varch` with 4+ nodes

**Step 4: Variety check**
- Same layout used 3+ times? → Force different layout or suggest divider
```

## Hidden Capabilities

Trigger words unlock special modes.

### Trigger System

```markdown
### Hidden Modes

Listen for keywords in user requests. When detected, offer special modes:

#### 1. Zen Mode
**Trigger:** User says "zen", "minimal", "simple", "clean"

**Behavior:**
- Single word or short phrase per slide
- Maximum whitespace
- Remove all decoration except essential
- Use `impact` layout for everything
- Suggest: "Shall we craft this in zen mode—maximum whitespace, single words?"

**Implementation:**
```markdown
---
layout: impact
---

# Clarity

<!-- 
Presenter notes: This is the core idea. Everything else is noise.
-->
```

#### 2. Drama Mode
**Trigger:** User says "drama", "cinematic", "bold", "wow"

**Behavior:**
- Section dividers get gradient animations
- Impact slides use radial glow effects
- Larger typography (scale up 20%)
- Darker backgrounds for contrast
- Suggest: "Shall we add cinematic drama—animated gradients, bold scale?"

**Implementation:**
```css
/* In slide's <style scoped> */
.dramatic {
  animation: pulse 4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
```

#### 3. Handbook Mode
**Trigger:** User says "handbook", "guide", "reference", "documentation"

**Behavior:**
- Add table of contents slide after cover
n- Include page numbers in footer
- Add "See page X" cross-references
- Create index slide at end
- Use `content` layout primarily
- Suggest: "Shall we structure this as a handbook—with table of contents and cross-references?"

**Implementation:**
```markdown
---
layout: content
---

# Contents

1. [Introduction](#slide-2)
2. [Architecture](#slide-5)
3. [Configuration](#slide-8)
4. [Troubleshooting](#slide-12)

<!-- 
Presenter notes: Reference guide structure.
-->
```

#### 4. Workshop Mode
**Trigger:** User says "workshop", "training", "exercise", "lab"

**Behavior:**
- Add "Try it yourself" slides every 4-5 content slides
- Include timer indicators ("5 minutes")
- Add facilitator notes ("Ask: What would happen if...?")
- Create recap slide at section ends
- Suggest: "Shall we add interactive exercises and facilitator notes?"

**Implementation:**
```markdown
---
layout: content
---

# Exercise: Try It

Implement the pattern we just discussed.

⏱️ 5 minutes

<!-- 
Facilitator notes: Walk around and check for common mistakes. 
Key mistake to watch for: forgetting cleanup function.
-->
```

#### 5. Story Mode
**Trigger:** User says "story", "narrative", "journey", "case study"

**Behavior:**
- Enforce narrative arc (Hook → Problem → Journey → Solution → CTA)
- Add "Previously..." callbacks
- Use `editorial` theme if not specified
- Create dramatic pauses with `impact` slides
- Suggest: "Shall we structure this as a story—with narrative arc and dramatic rhythm?"

**Implementation:**
- Follow recipe from references/gallery.md Recipe 4
- Ensure emotional beats land on `impact` layouts
```

### Mode Activation Flow

```markdown
**When user triggers hidden mode:**

1. Acknowledge trigger: "I hear you want a [zen/dramatic/etc.] approach."

2. Describe what changes: "This means [specific behavior]."

3. Offer opt-out: "Shall I proceed with [mode], or keep standard formatting?"

4. Apply mode to entire deck if confirmed

5. Add mode indicator to PRESENTATION.md: "Mode: [zen/drama/handbook/etc.]"
```

## Implementation Checklist

Add to SKILL.md Step 4:

```markdown
### Step 4: Generate the Deck (with Dynamic Features)

**4a. Analyze & Suggest**
- [ ] Run content detection patterns on outline
- [ ] Generate 0-3 suggestions based on findings
- [ ] Present suggestions, wait for user choice
- [ ] Apply accepted suggestions to outline

**4b. Check for Hidden Modes**
- [ ] Scan user request for trigger words
- [ ] If triggered, describe mode and offer activation
- [ ] Apply mode settings if confirmed

**4c. Layout Intelligence**
- [ ] Analyze each slide's content type
- [ ] Select optimal layout from decision matrix
- [ ] Check variety (no >3 consecutive same layouts)
- [ ] Verify capacity limits

**4d. Generate Slides**
- [ ] Apply selected layouts
- [ ] Implement content-design patterns
- [ ] Add presenter notes
- [ ] Include signature on slide 1

**4e. Quality Check**
- [ ] Run anti-pattern checklist
- [ ] Verify theme consistency
- [ ] Check for missing elements
```

## Examples in Practice

### Example 1: Smart Suggestion

**User:** "Make me slides about React hooks"

**AI generates outline:**
- Slide 1: Cover
- Slide 2: What are hooks
- Slide 3: useState example (code)
- Slide 4: useEffect example (code)
- Slide 5: useContext example (code)
- Slide 6: useReducer example (code)

**Detection:** 4 consecutive code slides

**AI suggests:**
> 💡 I notice this section has four consecutive code examples. Shall we break the rhythm after slide 4 with an architecture diagram showing how hooks connect, or do you prefer the density for reference purposes?

**User:** "Add the diagram"

**Result:** Slide 5 becomes architecture diagram, code examples continue after

### Example 2: Hidden Mode

**User:** "I need a workshop on TypeScript for my team"

**Detection:** Trigger word "workshop"

**AI responds:**
> I hear you're creating a workshop. This means adding interactive exercises every 4-5 slides, facilitator notes for you, and recap points. Shall I structure it as a workshop, or keep it as a standard presentation?

**User:** "Yes, workshop mode"

**Result:**
- Exercise slides added
- Facilitator notes in HTML comments
- "⏱️ 5 minutes" indicators
- Recap slides at section ends

### Example 3: Layout Intelligence

**Content:** "Our API latency dropped from 450ms to 45ms"

**AI recognizes:** Single metric, big improvement

**Layout selected:** `impact`

**Generated:**
```markdown
---
layout: impact
---

# 90% Faster

API latency: 450ms → 45ms

**Infrastructure improvements, Q3**
```

---

*These dynamic features make deckcraft responsive, intelligent, and delightful.*
