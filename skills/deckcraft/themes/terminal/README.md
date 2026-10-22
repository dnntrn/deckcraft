# Terminal

**Born in server rooms. Raised by logs.**

Terminal doesn't do small talk. It shows you the architecture, the stack trace, the truth. Every pixel serves function. Decoration is suspect. Clarity is everything.

## Character

Terminal believes precision is beauty. It strips away ornament until only signal remains. The dark canvas absorbs distraction. The monospace rhythm creates order from chaos.

When Terminal presents code, it doesn't just display—it reveals. Terminal window chrome on code blocks isn't decoration; it's context. This is where infrastructure lives.

## When to Use

Terminal is for:

- **Infrastructure talks** — Kubernetes, databases, distributed systems
- **Security deep-dives** — Where every detail matters
- **API documentation** — Precision over poetry
- **Engineering onboarding** — Teaching the systems that run the world
- **Dark conference rooms** — Where Terminal's contrast shines

Choose Terminal when you want credibility through technical authenticity.

## Design Principles

- **JetBrains Mono headings** — Bold weight, normal style. Technical rhythm.
- **Inter body text** — Clean, readable, modern
- **Solid surfaces** — No glass effect. Opaque cards with clean borders.
- **Terminal chrome on code** — Red/yellow/green dots frame every code block
- **Accent colors glow** — Against the dark, they become signal
- **Bold heading weight** — `--c-heading-weight: 700` for impactful titles

## Best For

Infrastructure. Backend. Security. Systems. Anything where "it works" isn't enough—you need to show *why* it works.

## Not For

Soft launches. Emotional narratives. When you need warmth over precision.

## Customization

All colors and typography are CSS custom properties defined in `styles.css`. Override any token to customize:

```css
--c-canvas        /* Dark background */
--c-foreground    /* Primary text */
--c-accent        /* Your brand color */
--c-display       /* Heading font (default: JetBrains Mono) */
--c-heading-weight /* Heading weight (default: 700) */
```

## Files

- `styles.css` — Theme tokens + `@import '../shared/base.css'` + dark mode overrides
- `examples.md` — Sample slides

## Shared Foundation

Terminal uses the shared design system in `themes/shared/` — 11 layouts, base CSS, and the 3-tier token contract. Theme personality (mono headings, solid surfaces, bold weight) comes from token values, not CSS overrides.

---

*Terminal doesn't ask for attention. It commands it.*
