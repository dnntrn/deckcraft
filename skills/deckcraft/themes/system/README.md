# System

**Invisible polish. Universal. Timeless.**

System makes things work so well you forget it's there. It is the embodiment of restraint—never demanding attention, always earning trust. Clean lines. Generous whitespace. A design so considered it becomes invisible.

## Character

System believes the best design is no design at all. It removes friction. It creates clarity without calling attention to itself. The sans-serif typography speaks quietly. The subtle borders create structure without weight.

When System presents, the content shines. The theme steps back. This is professional confidence—not shouting, but being heard.

## When to Use

System is for:

- **Business presentations** — Investor decks, quarterly reviews
- **Product launches** — When the product is the star
- **Universal applicability** — Any brand, any audience
- **When you need polish without personality overshadowing content**
- **Mixed audiences** — Technical and non-technical

Choose System when you want credibility through restraint.

## Design Principles

- **Inter throughout** — Display, body, and tertiary all use Inter. Different weights create hierarchy.
- **Semibold headings** — `--c-heading-weight: 600`. Confident, not bold.
- **Solid surfaces** — No glass effect. Clean opaque cards.
- **Light canvas** — Neutral, adaptable, professional
- **Thin rules and borders** — Definition without weight
- **No flourish that doesn't serve** — Pure functionality

## Best For

Business. Product. Anything where the message matters more than the messenger.

## Not For

When you need character to be part of the story. When the theme itself should make a statement.

## Customization

All colors and typography are CSS custom properties defined in `styles.css`:

```css
--c-canvas        /* Light gray or deep slate */
--c-foreground    /* Near-black or near-white */
--c-accent        /* Your brand color */
--c-heading-weight /* 600 (semibold) */
```

## Files

- `styles.css` — Theme tokens + `@import '../shared/base.css'` + dark mode overrides

## Shared Foundation

System uses the shared design system in `themes/shared/` — 11 layouts, base CSS, and the 3-tier token contract. Theme personality (Inter throughout, semibold headings, solid surfaces) comes from token values.

---

*System doesn't demand attention. It earns trust.*
