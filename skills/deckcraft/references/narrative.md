# Narrative Structure

A presentation is a story. Technical talks need story as much as keynotes do.
The audience forgets bullet points. They remember structure.

## The Arc

```
Hook ──→ Problem ──→ Journey ──→ Solution ──→ Call to Action
(1-2)     (1-2)      (3-6)       (1-2)        (1)
```

### Hook (1-2 slides)
Grab attention. Make them care in the first 30 seconds.
- A counter-intuitive stat: "99% of Kubernetes pods fail silently"
- A relatable pain: "How many times have you debugged a CrashLoopBackOff at 2am?"
- A bold promise: "By the end of this talk, you'll understand exactly what happens between `kubectl apply` and a running pod"

### Problem (1-2 slides)
Define the problem space. The current state. Why the status quo hurts.
- Scope the problem: who's affected, how often, what's the cost
- Don't solve it yet — build tension

### Journey (3-6 slides)
This is the bulk of the talk. The exploration, the learning, the implementation.
- Chronological or thematic, not a feature list
- Each slide advances the story. If a slide doesn't move the narrative forward, cut it
- Mix content types: code + diagram + data + explanation (not 6 dense text slides)

### Solution (1-2 slides)
The payoff. What you built, what you learned, what changed.
- One slide for the solution itself
- One slide for the impact (metrics, before/after)

### Call to Action (1 slide)
What should the audience do tomorrow?
- "Try this pattern in your own cluster"
- "Read the RFC at github.com/..."
- "Join our SIG meeting on Thursdays"

## Duration and Slide Count

| Format | Duration | Slides (approx) | Pace |
|--------|----------|-----------------|------|
| Lightning | 5 min | 8-12 | 30-40s per slide |
| Short talk | 15 min | 15-25 | 40-60s per slide |
| Standard talk | 30 min | 25-40 | 45-75s per slide |
| Deep dive | 45-60 min | 35-55 | 60-90s per slide |

Slides are a pacing tool, not a script. Aim for the lower end of the range.
Better to linger on a good slide than rush through 10 mediocre ones.

## Slide Transitions

Between major sections, add a section title slide:

```md
---
layout: section
---

# Part 2: Implementation
```

Section slides serve three purposes:
1. Mental reset for the audience
2. Late arrivals know what they missed
3. You can reference it: "in part 2 we covered..."

## Presenter Notes

Every slide gets presenter notes. Notes explain *what to say*, not *what's on the slide*.

```md
# My Slide

Slide content the audience sees.

<!--
Welcome back. In this section, we're going to look at how the scheduler
actually makes decisions. This is the part where most talks hand-wave —
we're going to walk through the actual code.

Key point to emphasize: the scheduler runs a continuous loop, not a
one-shot operation. This is why pods can be rescheduled after node failure.
-->
```

Good presenter notes:
- Tell you what to say, conversationally
- Include transitions between slides ("which brings us to...")
- Note timing ("spend 2 minutes here, this is the key slide")
- Flag tricky questions ("someone will ask about stateful pods — here's the answer")

Bad presenter notes:
- Repeat the slide content verbatim
- Are empty or contain only "talk about this"
- Are written in formal/prose style (notes should sound like you talking to yourself)

## The Title Test

For every slide, read the title and ask: "If someone walked in right now, would they know
what this slide is about?"

- Good: "The scheduler uses a priority queue" (specific, claim-based)
- Bad: "Scheduling" (vague, topic-based)
- Good: "Cold starts dropped 3.2x after lazy loading" (outcome-based)
- Bad: "Performance improvements" (generic)

Titles should make a claim, state an outcome, or pose a specific question.
Never use single-word titles except on `section` layout slides.

## Storytelling for Technical Content

- Use concrete examples, not abstractions ("a 500-node GKE cluster" not "a large deployment")
- Show the code, then explain it. Code is evidence, not decoration.
- Name things. "The scheduler loop" sounds real. "A scheduling mechanism" sounds like AI slop.
- Use "we" not "one" or "the developer" — you're telling your story, own it
- Prefer specific numbers: "3.2x faster" not "significantly faster"

## What to Cut

If the talk is running long, cut in this order:
1. Extra examples (keep the strongest one)
2. Background/context slides (audience can ask questions)
3. "Future work" slides (put in backup)
4. Detailed implementation slides (link to docs/code instead)

Never cut: the hook, the solution, or the call to action.
