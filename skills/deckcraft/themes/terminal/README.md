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

- **Dark canvas with radial vignette** — Absorbs light, focuses attention
- **JetBrains Mono everywhere** — Even prose feels technical
- **Accent colors glow** — Against the dark, they become signal
- **Terminal chrome on code** — Red/yellow/green dots frame every block
- **Subtle grid texture** — The blueprint feel of systems design
- **Dramatic section dividers** — Mono headings at scale

## Best For

Infrastructure. Backend. Security. Systems. Anything where "it works" isn't enough—you need to show *why* it works.

## Not For

Soft launches. Emotional narratives. When you need warmth over precision.

## Customization

All colors are CSS custom properties:

```css
--c-canvas        /* Dark background */
--c-foreground    /* Primary text */
--c-accent        /* Your brand color */
--c-code-bg       /* Terminal window chrome */
```

Override in `styles.css` or inject tokens during generation.

## Files

- `styles.css` — CSS variables and reset
- `setup.ts` — Font loading configuration
- `layouts/` — Vue components (cover, content, impact, divider)
- `examples.md` — Sample slides

---

*Terminal doesn't ask for attention. It commands it.*
