# Blush

**Soft doesn't mean weak. Warmth without sacrificing sophistication.**

Blush proves that the gentlest presentation can move mountains. It wraps technical content in warmth. It makes space for empathy. The rounded corners aren't cute—they're human.

## Character

Blush believes approachability is strength. The warm tones invite without demanding. The generous curves create comfort. The serif headings carry elegance without coldness.

When Blush presents, it creates safety. The audience leans in, not back. This is femininity as power—softness that disarms resistance.

## When to Use

Blush is for:

- **Creative workshops** — Design thinking, brainstorming
- **Wellness topics** — Mental health, self-care, balance
- **Design thinking** — Human-centered approaches
- **Empathy-driven content** — User research, psychology
- **Any story needing warmth** — When the audience needs to feel safe

Choose Blush when humanity is part of the message.

## Design System

### Typography

| Token | Font | Role |
|-------|------|------|
| `--c-display` | DM Serif Display (italic) | Headings — warm, elegant serif |
| `--c-font` | Montserrat (300–700) | Body text, lists, paragraphs |
| `--c-tertiary` | Poppins (400–600) | Labels, captions, small text |
| `--c-mono` | JetBrains Mono | Code |

### Type Scale

| Layout | h1 Size | Style | Feeling |
|--------|---------|-------|---------|
| Cover | 56px | Italic, full color | Expansive, confident |
| Impact | 72px | Italic, full color + rose underline | Bold, arresting |
| Divider | 40px | Italic + rose bar | Breathing room |
| Content/Feature/Two-cols/Comparison/Big-code | 36px | Italic, heading color | Organized, working |
| Metrics | 32px | Italic, heading color | Numbers are the stars |
| Quote | 26px (blockquote) | Italic | Literary |

### Color Palette

**Light mode:**

| Token | Value | Role |
|-------|-------|------|
| `--c-canvas` | oklch(97% 0.005 20) | Warm paper background |
| `--c-foreground` | #66391A | Deep warm brown — body text |
| `--c-heading` | oklch(46% 0.035 30) | Soft brown — headings (no opacity!) |
| `--c-muted` | oklch(52% 0.01 20) | Muted brown — labels, captions |
| `--c-accent` | #66391A | Warm brown — strong text, emphasis |
| `--c-highlight` | #EB95A2 | Rose — decorative accents, active states |

**Dark mode:** Accent and highlight swap prominence. Rose (#EB95A2) becomes the primary accent against dark backgrounds. A warm tan (#DBA88E) becomes the highlight.

### Glass Effect

Blush is the only theme that uses frosted glass. Cards, metric boxes, and code blocks have translucent backgrounds with backdrop blur:

```css
--c-glass-bg: oklch(100% 0 0 / 0.55);
--c-glass-blur: blur(8px);
--c-glass-shadow: 0 2px 16px oklch(0% 0 0 / 0.04);
--c-card-border: oklch(88% 0.006 20 / 0.5);
```

Cards lift on hover with `--c-glass-shadow-hover` and `translateY(-2px)`. Other themes (terminal, system, editorial) use solid surfaces by overriding `--c-glass-bg` to opaque and `--c-glass-blur: none`.

### Border Radius Scale

| Token | Value | Used for |
|-------|-------|----------|
| `--c-radius-sm` | 8px | Inline code, filename tabs |
| `--c-radius-md` | 14px | Code blocks, flow nodes |
| `--c-radius-lg` | 20px | Cards, metrics, media placeholders |

## Best For

Creative work. Wellness. Design thinking. Any topic where the human element matters.

## Not For

Hard technical deep-dives. When you need stark precision over approachable warmth. Aggressive sales pitches.

## Customization

All colors and effects are CSS custom properties. Override in `styles.css` or inject tokens during generation.

## Files

- `styles.css` — Theme tokens + `@import '../shared/base.css'` + dark mode overrides
- `examples.md` — Sample slides
- `preview.html` — Visual theme preview (composes shared layouts + blush tokens)

## Shared Foundation

Blush uses the shared design system in `themes/shared/`:
- 11 Vue layouts in `shared/layouts/` (cover, content, divider, impact, metrics, feature-grid, comparison, two-cols, timeline, big-code, quote)
- `shared/base.css` — structural CSS with token fallbacks
- `shared/global-bottom.vue` — nav overlay (keyboard hints + page counter)
- `shared/tokens.md` — full 3-tier token contract

Theme personality comes entirely from token values in `styles.css` — no theme-specific CSS overrides needed.

---

*Blush doesn't apologize for being soft. It proves softness is strength.*