# Slide Anti-Patterns

The slide equivalent of purple gradients and cardocalypse. These are the tells
that a human didn't design the deck. Run against every generated slide.

## P0 — Broken or Unreadable (fix before showing output)

These make slides literally unusable. Block output until fixed.

- [ ] **Wall of text** — More than 6 lines of body text, or lines exceed 65 characters.
  If a slide has this much text, split it into two slides or replace text with a diagram.
- [ ] **Bullet hell** — More than 6 bullets on one slide, or bullets nested more than
  2 levels deep. Restructure into categorized groups or split slides.
- [ ] **Tiny type** — Body text below 20px or code below 16px. Unreadable past the second row
  in any room larger than a conference table.
- [ ] **Code without language tag** — A fenced code block without a language identifier
  (` ```python`, not bare ` ``` `). No highlighting means no one reads it.
- [ ] **Missing presenter notes** — The `<!-- -->` HTML comment section is empty or absent.
  Every slide needs notes. Notes explain what to say, not what the slide already shows.
- [ ] **Empty slide** — A slide with only a title and no content below it.
  Either add content or merge with the next slide.

## P1 — Hurts Comprehension (strongly fix)

These make slides harder to understand. Fix before presenting.

- [ ] **Low contrast** — Text/background contrast ratio below 4.5:1.
  Projectors wash out colors. What looks fine on a laptop disappears on a screen.
  Check especially: captions, muted text, code comments, diagram label text.
- [ ] **Complex diagram** — A Mermaid diagram with more than 8 nodes, or text inside nodes
  that isn't readable at `{scale: 0.6}`. Split into two diagrams, simplify, or link to docs.
- [ ] **Orphan title** — An h1 with only a single bullet or one short sentence underneath.
  Merge with the next slide, or expand into a proper section.
- [ ] **Code without annotation** — A code block longer than 4 lines with no line highlighting,
  no click steps, and no explanation arrows/callouts. The audience won't read it.
  Add `{1-3|5|all}` highlighting and walk through it.
- [ ] **Stock photo filler** — A generic image (handshake, server rack, clouds, abstract shapes)
  that adds no information. If an image doesn't teach something, remove it.
- [ ] **Slide density imbalance** — One slide has 2 lines, the next has 20.
  Redistribute content evenly.
- [ ] **Title repeated verbatim** — The title on this slide is identical to the previous
  slide's title. Rename or merge slides.
- [ ] **Missing contrast in diagram** — Text inside Mermaid nodes doesn't contrast with
  the node fill color (below 4.5:1 ratio).
- [ ] **Code at wrong abstraction level** — Code is too verbose (full file dump) or too
  abstract (pseudocode that doesn't teach anything real). Show the essential lines.

## P2 — Weakens Impact (consider fixing)

These don't break the talk, but they make it less polished.

- [ ] **Missing section slide** — A major topic change without a `layout: section` transition slide.
  The audience loses orientation.
- [ ] **No call to action** — The final slide doesn't tell the audience what to do next.
  Always end with a CTA: a link, a command, a repo, a call for contributors.
- [ ] **Monotonous layout** — The same layout for more than 3 consecutive slides.
  Add variety: a diagram, a code slide, a centered stat, a section break.
- [ ] **Fade-in spam** — Every bullet, every code line, every diagram node animates in.
  All animation and no animation look the same. Use click steps only where they help pacing.
- [ ] **Missing concrete example** — Abstract concept with no real-world illustration.
  "This pattern scales well" → show the benchmark. "This API is simpler" → show the code.
- [ ] **Presenter notes are slide copy** — Notes repeat the slide content instead of telling
  you what to say. Rewrite as conversational cues.
- [ ] **Abrupt ending** — The last content slide cuts immediately to "Thank you" with no
  summary or CTA. Add a recap or next-steps slide.
- [ ] **Too many languages in code** — 4+ different programming languages across code blocks
  in one deck. Stick to 1-2 primary languages for consistency.
- [ ] **Gratuitous animation** — Slide transitions that differ from the deck default,
  or animations on elements that don't benefit from reveals.
- [ ] **Missing accessibility** — No `alt` text on any images. No semantic structure
  for screen readers (Slidev handles most of this, but check custom components).
- [ ] **Generic title** — Title is a single vague word ("Overview", "Architecture", "Results").
  Replace with a claim: "3.2x faster cold starts", "The scheduling loop in 5 steps".
- [ ] **Emoji in titles or body** — Emojis in slide content look unprofessional in technical
  presentations. Exceptions: conference talk title slides, community talks.
- [ ] **Hedging language** — "might", "perhaps", "could consider", "in some cases".
  Make claims. Stand behind them. The audience is here because you know this.
- [ ] **First slide has no hook** — The opening slide is a title page with a name and date
  but no reason to care. Open with a question, a stat, or a bold claim.
- [ ] **Too many slides for duration** — 50+ slides for a 30-minute talk.
  Each slide gets <36 seconds. Cut ruthlessly.

## How to Use This Checklist

After generating a complete deck, read every slide and check each box.
Fix P0s immediately. Fix P1s before presenting. P2s are polish — fix time permitting.

When iterating on a single slide, run the checklist against that slide only.
