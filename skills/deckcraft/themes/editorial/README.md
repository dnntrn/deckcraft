# Editorial

**Literary refinement. Space to breathe. Elegance in restraint.**

Editorial believes whitespace is content and silence speaks. Every margin is intentional. Every element considered. This is not minimalism for its own sake—it is the confidence to let ideas exist without competition.

## Character

Editorial trusts the reader. It doesn't shout; it invites. The generous padding creates room for thought. The serif headings carry weight without heaviness. The left-border accent stripe is the only ornament—and it is enough.

When Editorial presents an idea, it gives it space. The narrative unfolds without rush. Each slide is a paragraph in a larger story.

## When to Use

Editorial is for:

- **Long-form content** — Essays, think pieces, deep dives
- **Storytelling** — When the narrative arc matters
- **Design presentations** — Where aesthetics are the subject
- **Literary topics** — Writing, philosophy, art
- **When you need presence without aggression**

Choose Editorial when content deserves contemplation.

## Design Principles

- **Generous whitespace** — 80–96px padding creates breathing room
- **Playfair Display italic headings** — `--c-heading-style: italic`. Literary weight without stuffiness.
- **Inter body text** — Modern, readable counterpoint to the serif
- **Solid surfaces** — No glass effect. Warm cream cards with subtle borders.
- **Left-border accent stripe** — The blockquote accent bar is the only ornament
- **No decoration that doesn't serve** — Every element earns its place

## Best For

Stories. Essays. Design philosophy. Any topic where the journey matters as much as the destination.

## Not For

Dense technical documentation. When you need data density over narrative flow. Rapid-fire bullet points.

## Customization

All colors and typography are CSS custom properties defined in `styles.css`:

```css
--c-canvas        /* Warm paper-white or deep charcoal */
--c-foreground    /* Primary text */
--c-accent        /* Your brand color */
--c-display       /* Playfair Display (italic headings) */
--c-heading-style /* italic */
```

## Files

- `styles.css` — Theme tokens + `@import '../shared/base.css'` + dark mode overrides
- `examples.md` — Sample slides

## Shared Foundation

Editorial uses the shared design system in `themes/shared/` — 11 layouts, base CSS, and the 3-tier token contract. Theme personality (Playfair italic, generous spacing, solid surfaces) comes from token values.

---

*Editorial doesn't fill space. It composes it.*
