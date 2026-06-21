# Gallery & Recipes

## Before & After

### Example 1: Dense Technical Content

**Before (user's outline):**
```
Slide 5: React Lifecycle
- Mounting
- Updating
- Unmounting
- useEffect
- Dependency array
- Cleanup
- Common pitfalls
```

**After (crafted):**
```markdown
---
layout: divider
---

# Part 2: The Three Phases

---
layout: content
---

# Mounting: Your Component is Born

Mounting happens exactly once—when the component first appears.

[Code block with step-by-step walkthrough]

[Presenter notes: Walk through each step...]

---
layout: content
---

# Updating: Your Component Reacts

An update happens whenever state or props change.

[Split layout: code left, explanation right]
```

**What changed:**
- Split single dense slide into 3 focused slides
- Added section divider for rhythm
- Used split layout for code + explanation
- Each slide has one clear idea

---

## Recipes

### Recipe 1: The Technical Deep Dive

**Best for:** Infrastructure, backend, security talks
**Theme:** Terminal
**Structure:**
1. Cover — Bold title, technical subtitle
2. Problem statement — Why this matters
3. Architecture diagram — Visual system overview
4-6. Deep dives — One concept per slide (code + explanation)
7. Pitfall slide — Common mistakes
8. Solution slide — The right way
9. Impact slide — Key metric or takeaway
10. Closing — Resources, next steps

**Layouts:**
- Cover (opening)
- Content (explanations)
- Impact (metrics)
- Divider (section breaks)

---

### Recipe 2: The Product Launch

**Best for:** Feature announcements, demos
**Theme:** System
**Structure:**
1. Cover — Product name, tagline
2. Hook — The problem you're solving
3. Solution — Feature overview (split: screenshot + bullets)
4. How it works — Architecture or flow diagram
5. Impact — Metrics, testimonials
6. Impact — Another metric (keep the rhythm)
7. Availability — Pricing, rollout plan
8. Closing — CTA

**Layouts:**
- Cover
- Content (features)
- Impact (metrics)
- Content (pricing)

---

### Recipe 3: The Workshop

**Best for:** Training, tutorials, onboarding
**Theme:** Blush
**Structure:**
1. Cover — Workshop title, duration
2. Agenda — What we'll cover
3-4. Concept introduction — Theory (generous whitespace)
5. Live demo — Step by step
6. Exercise — Try it yourself
7. Common mistakes — Pitfall sandwich
8. Advanced tip — Bonus for fast finishers
9. Recap — Key takeaways
10. Resources — Documentation, further reading

**Layouts:**
- Cover
- Content (theory)
- Content (exercises)
- Impact (key takeaways)

---

### Recipe 4: The Story

**Best for:** Personal narratives, company history, case studies
**Theme:** Editorial
**Structure:**
1. Cover — Title, subtitle
2. Hook — The inciting incident
3. Rising action — Complication 1
4. Rising action — Complication 2
5. Climax — The turning point
6. Falling action — Resolution begins
7. Impact — What changed
8. Reflection — Lessons learned
9. Closing — Call back to opening

**Layouts:**
- Cover
- Content (narrative)
- Impact (turning point)
- Divider (section breaks)

---

### Recipe 5: The Hybrid

**Best for:** Mixed audiences, complex topics
**Theme:** Mix System + Terminal
**Structure:**
1. Cover — System (clean, professional)
2. Context — System (business case)
3-5. Technical deep dive — Terminal (switch for technical content)
6. Bridge — System (back to business impact)
7. Impact — System
8. Closing — System

**Note:** Theme switching mid-deck creates visual rhythm. Use sparingly.

---

## Theme Personalities

### Terminal

**Backstory:** Born in server rooms and raised by logs. Terminal doesn't do small talk. It shows you the architecture, the stack trace, the truth.

**Visual:**
- JetBrains Mono for everything
- Dark canvas, bold accent
- Terminal window dots on code blocks
- Radial gradients

**Best for:**
- Infrastructure talks
- Security deep-dives
- API documentation
- Engineering onboarding

**This theme is for you if:** You want precision over poetry.

---

### System

**Backstory:** The invisible professional. System makes things work so well you forget it's there. Clean lines, generous whitespace, timeless restraint.

**Visual:**
- Inter sans-serif
- Light canvas, subtle borders
- Left-border accent stripes
- No decoration that doesn't serve

**Best for:**
- Business presentations
- Product launches
- Investor decks
- Universal applicability

**This theme is for you if:** You want polish without personality overshadowing content.

---

### Editorial

**Backstory:** Literary refinement. Editorial believes whitespace is content and silence speaks. Every element considered, every margin intentional.

**Visual:**
- Playfair Display serif
- Generous padding (72px)
- Left-border headings
- Italic subtitles

**Best for:**
- Long-form content
- Essays and narratives
- Design presentations
- When you need space to breathe

**This theme is for you if:** You value elegance and restraint.

---

### Blush

**Backstory:** Soft doesn't mean weak. Blush proves that the gentlest presentation can move mountains. Warm tones, rounded corners, human scale.

**Visual:**
- Cormorant Garamond serif
- Rose and peach tones
- 12px border-radius on everything
- Warm paper-like canvas

**Best for:**
- Creative workshops
- Wellness topics
- Design thinking
- Any story needing empathy

**This theme is for you if:** You want warmth without sacrificing sophistication.

---

## Anti-Pattern Gallery

### Don't: Wall of Text

❌ Slide with 12 bullet points, no hierarchy
✅ Split into 3 slides, one idea each, with diagrams

### Don't: Bullet Hell

❌ Nested bullets 3 levels deep
✅ Flat list of 4-5 items max, or convert to diagram

### Don't: Orphan Title

❌ Title + single bullet: "Features: many things"
✅ Merge into descriptive paragraph or expand with examples

### Don't: Code Without Walkthrough

❌ 40 lines of code, no highlights
✅ Use `{1-3|5|all}` highlighting, add presenter notes

---

## Export Formats

| Format | Best For | Command |
|--------|----------|---------|
| **PDF** | Sharing, printing, archival | `/deckcraft export pdf` |
| **PPTX** | PowerPoint compatibility | `/deckcraft export pptx` |
| **PNG** | Social media, thumbnails | `/deckcraft export png` |

---

*Crafted with < ✦ deckcraft />*
