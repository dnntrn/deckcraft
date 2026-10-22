# Deckcraft Design Tokens

The token contract that all themes follow. Every layout component references these tokens via `var(--c-*)`. Themes define values for each token; layouts consume them.

---

## Token Tiers

### Tier 1 — Required

Every theme **must** define these. Layouts will not function correctly without them.

| Token | Purpose | Type |
|---|---|---|
| `--c-canvas` | Slide background color | Color |
| `--c-foreground` | Primary text color | Color |
| `--c-muted` | Secondary/label text color | Color |
| `--c-border` | Borders, dividers, subtle separators | Color |
| `--c-accent` | Primary accent — links, strong emphasis, active states | Color |
| `--c-font` | Body text font family | Font |
| `--c-mono` | Code font family | Font |

Dark mode variants of all color tokens are also required if the theme supports dark mode.

### Tier 2 — Extended (with defaults)

Themes may override these. If not defined, `base.css` provides sensible defaults so layouts still work.

| Token | Purpose | Default | Type |
|---|---|---|---|
| `--c-display` | Heading display font | `var(--c-font)` | Font |
| `--c-heading` | Heading text color | `var(--c-foreground)` | Color |
| `--c-highlight` | Secondary accent color | `var(--c-accent)` | Color |
| `--c-tertiary` | Label/caption font | `var(--c-font)` | Font |
| `--c-accent-dim` | Subtle accent background | `color-mix(in srgb, var(--c-accent) 8%, transparent)` | Color |
| `--c-accent-glow` | Accent glow/shadow | `color-mix(in srgb, var(--c-accent) 18%, transparent)` | Color |
| `--c-code-bg` | Code block background | `oklch(94% 0 0)` | Color |
| `--c-code-fg` | Code block text | `oklch(18% 0 0)` | Color |

### Tier 3 — Theme-specific (no defaults)

Optional tokens for themes that need special effects. If undefined, features that reference them degrade gracefully.

| Token | Purpose | Used by |
|---|---|---|
| `--c-highlight-dim` | Subtle highlight background | Feature cards, tags |
| `--c-highlight-glow` | Highlight glow/shadow | Active timeline dots |
| `--c-card-bg` | Card background (e.g., frosted glass) | Content cards, metric cards |
| `--c-card-border` | Card border color | Content cards, metric cards |
| `--c-glass-bg` | Glass overlay background | Glass effects |
| `--c-glass-blur` | Glass blur value | Glass effects |
| `--c-glass-shadow` | Card shadow (default) | Cards |
| `--c-glass-shadow-hover` | Card shadow (hover) | Cards on hover |
| `--c-pad-slide` | Standard slide padding | All layouts |
| `--c-pad-centered` | Centered slide padding | Impact, divider |
| `--c-code-dot-red` | Red code window dot | Big-code window chrome |
| `--c-code-dot-yellow` | Yellow code window dot | Big-code window chrome |
| `--c-code-dot-green` | Green code window dot | Big-code window chrome |

---

## Typography Scale

Derived from the Tailwind font-size scale. All sizes in `rem` for scalability, with `px` equivalents for reference.

| Token | Size | px | Line-height | Use |
|---|---|---|---|---|
| `--c-text-xs` | 0.75rem | 12px | calc(1 / 0.75) | Labels, captions, code metadata |
| `--c-text-sm` | 0.875rem | 14px | calc(1.25 / 0.875) | Small body text, descriptions |
| `--c-text-base` | 1rem | 16px | 1.5 | Default body text, list items |
| `--c-text-lg` | 1.125rem | 18px | calc(1.75 / 1.125) | Subtitles, body emphasis |
| `--c-text-xl` | 1.25rem | 20px | calc(1.75 / 1.25) | h3, attribution names |
| `--c-text-2xl` | 1.5rem | 24px | calc(2 / 1.5) | h2, quote blockquote |
| `--c-text-3xl` | 1.875rem | 30px | calc(2.25 / 1.875) | h1 small (metrics) |
| `--c-text-4xl` | 2.25rem | 36px | calc(2.5 / 2.25) | h1 medium (content, feature-grid) |
| `--c-text-5xl` | 3rem | 48px | 1 | h1 large (cover) |
| `--c-text-7xl` | 4.5rem | 72px | 1 | h1 impact |

Font weight tokens:

| Token | Value | Use |
|---|---|---|
| `--c-weight-light` | 300 | Subtitles, body emphasis |
| `--c-weight-regular` | 400 | Body text, headings (serif) |
| `--c-weight-medium` | 500 | Labels, captions |
| `--c-weight-semibold` | 600 | Strong text, labels |
| `--c-weight-bold` | 700 | Emphasis, accent text |

Letter-spacing tokens:

| Token | Value | Use |
|---|---|---|
| `--c-tracking-tight` | -0.03em | Large headings |
| `--c-tracking-normal` | 0 | Body text |
| `--c-tracking-wide` | 0.04em | Subtitles |
| `--c-tracking-wideplus` | 0.06em | Small labels |
| `--c-tracking-uppercase` | 0.08-0.1em | Uppercase labels |

---

## Spacing Scale

Derived from Tailwind's spacing scale (base unit: 0.25rem = 4px).

| Token | Value | px | Use |
|---|---|---|---|
| `--c-space-0.5` | 0.125rem | 2px | Micro gaps |
| `--c-space-1` | 0.25rem | 4px | Tight gaps |
| `--c-space-1.5` | 0.375rem | 6px | Small gaps |
| `--c-space-2` | 0.5rem | 8px | Standard small |
| `--c-space-3` | 0.75rem | 12px | Compact padding |
| `--c-space-4` | 1rem | 16px | Base padding |
| `--c-space-5` | 1.25rem | 20px | Card padding (compact) |
| `--c-space-6` | 1.5rem | 24px | Card padding, standard gaps |
| `--c-space-7` | 1.75rem | 28px | Metric padding |
| `--c-space-8` | 2rem | 32px | Large gaps, section margins |
| `--c-space-10` | 2.5rem | 40px | Between sections |
| `--c-space-12` | 3rem | 48px | Column gaps |
| `--c-space-14` | 3.5rem | 56px | Centered slide padding |
| `--c-space-16` | 4rem | 64px | Division spacing |
| `--c-space-18` | 4.5rem | 72px | Top slide padding |
| `--c-space-20` | 5rem | 80px | Horizontal slide padding |

Slide padding is composed from these: `--c-pad-slide: var(--c-space-18) var(--c-space-20) var(--c-space-20) 5.5rem`.

---

## Border Radius Scale

Derived from Tailwind's radius scale.

| Token | Value | Use |
|---|---|---|
| `--c-radius-xs` | 0.125rem (2px) | Small decorative lines (accent bars) |
| `--c-radius-sm` | 0.375rem (6px) | Inline code, small badges |
| `--c-radius-md` | 0.75rem (12px) | Code blocks, medium containers |
| `--c-radius-lg` | 1rem (16px) | Cards, metric boxes, major containers |
| `--c-radius-xl` | 1.5rem (24px) | Large feature cards |
| `--c-radius-2xl` | 2rem (32px) | Full-bleed containers |
| `--c-radius-full` | 9999px | Pills, circles, dots |

---

## Shadow Scale

Derived from Tailwind's shadow scale.

| Token | Value | Use |
|---|---|---|
| `--c-shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `--c-shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Cards (default) |
| `--c-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Cards (hover) |
| `--c-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Elevated modals |
| `--c-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Maximum elevation |

---

## Color Scales

### Reference: Tailwind v4 Taupe Scale

Warm brown with subtle warmth. Primary neutral scale for blush.

```
taupe-50:   oklch(98.6% 0.002 67.8)
taupe-100:  oklch(96%   0.002 17.2)
taupe-200:  oklch(92.2% 0.005 34.3)
taupe-300:  oklch(86.8% 0.007 39.5)
taupe-400:  oklch(71.4% 0.014 41.2)
taupe-500:  oklch(54.7% 0.021 43.1)
taupe-600:  oklch(43.8% 0.017 39.3)
taupe-700:  oklch(36.7% 0.016 35.7)
taupe-800:  oklch(26.8% 0.011 36.5)
taupe-900:  oklch(21.4% 0.009 43.1)
taupe-950:  oklch(14.7% 0.004 49.3)
```

### Reference: Tailwind v4 Rose Scale

Warm pink. Secondary accent scale for blush.

```
rose-50:    oklch(96.9% 0.015 12.4)
rose-100:   oklch(94.1% 0.03  12.6)
rose-200:   oklch(89.2% 0.058 10.0)
rose-300:   oklch(81%   0.117 11.6)
rose-400:   oklch(71.2% 0.194 13.4)
rose-500:   oklch(64.5% 0.246 16.4)
rose-600:   oklch(58.6% 0.253 17.6)
rose-700:   oklch(51.4% 0.222 16.9)
rose-800:   oklch(45.5% 0.188 13.7)
rose-900:   oklch(41%   0.159 10.3)
rose-950:   oklch(27.1% 0.105 12.1)
```

### Reference: Tailwind v4 Stone Scale

Neutral warm gray. For terminal, system, editorial themes.

```
stone-50:   oklch(98.5% 0.001 106.4)
stone-100:  oklch(97%   0.001 106.4)
stone-200:  oklch(92.3% 0.003 48.7)
stone-300:  oklch(86.9% 0.005 56.4)
stone-400:  oklch(70.9% 0.01  56.3)
stone-500:  oklch(55.3% 0.013 58.1)
stone-600:  oklch(44.4% 0.011 73.6)
stone-700:  oklch(37.4% 0.01  67.6)
stone-800:  oklch(26.8% 0.007 34.3)
stone-900:  oklch(21.6% 0.006 56.0)
stone-950:  oklch(14.7% 0.004 49.3)
```

### Theme Token Mapping

For each theme, the token values map to scale positions:

**Blush (taupe + rose):**

| Token | Light | Dark | Scale source |
|---|---|---|---|
| `--c-canvas` | taupe-50 | taupe-950 | Background |
| `--c-foreground` | taupe-800 | taupe-200 | Body text |
| `--c-heading` | taupe-900 | taupe-100 | Heading text |
| `--c-muted` | taupe-500 | taupe-400 | Labels |
| `--c-border` | taupe-200 | taupe-700 | Dividers |
| `--c-accent` | taupe-800 | rose-300 | Strong emphasis |
| `--c-highlight` | rose-300 | taupe-400 | Decorative accent |
| `--c-code-bg` | taupe-100 | taupe-900 | Code background |
| `--c-code-fg` | taupe-800 | taupe-200 | Code text |

**Terminal (stone + violet):**

| Token | Light | Dark | Scale source |
|---|---|---|---|
| `--c-canvas` | stone-50 | stone-950 | |
| `--c-foreground` | stone-800 | stone-200 | |
| `--c-accent` | violet-600 | violet-400 | |
| ... | ... | ... | |

**System (neutral + blue):**

| Token | Light | Dark | Scale source |
|---|---|---|---|
| `--c-canvas` | neutral-50 | neutral-950 | |
| `--c-foreground` | neutral-800 | neutral-200 | |
| `--c-accent` | blue-600 | blue-400 | |
| ... | ... | ... | |

**Editorial (stone + indigo, serif headings):**

| Token | Light | Dark | Scale source |
|---|---|---|---|
| `--c-canvas` | stone-50 | stone-950 | |
| `--c-foreground` | stone-800 | stone-200 | |
| `--c-accent` | indigo-600 | indigo-400 | |
| ... | ... | ... | |

### Semantic Color Tokens

These map to scale positions but have meaningful names:

| Token | Purpose | Blush Light | Terminal Light |
|---|---|---|---|
| `--c-success` | Positive states | emerald-600 | emerald-600 |
| `--c-warning` | Caution states | amber-600 | amber-600 |
| `--c-danger` | Error states | red-600 | red-600 |

---

## Dark Mode Strategy

All color tokens have light and dark variants. Dark mode is triggered via `@media (prefers-color-scheme: dark)`.

**Key principle**: In dark mode, accent and highlight may swap prominence. Blush shifts from brown-primary to rose-primary because dark brown is invisible on dark backgrounds.

**Other key adjustments in dark mode:**
- Canvas shifts to the darkest scale position (950)
- Foreground shifts to the lightest positions (100-200)
- Muted shifts to mid-light positions (300-400)
- Border shifts to dark positions (700-800)
- Card backgrounds become very light overlays (`oklch(100% 0 0 / 0.08)`)
- Shadows become more opaque (higher alpha on dark surfaces)

---

## Using Tokens in Layouts

### Principle: Layouts consume tokens, themes define them

Layout components in `shared/layouts/` use `var(--c-*)` exclusively. They never hardcode colors, sizes, or fonts. This means a layout like `metrics.vue` works in any theme — the theme's `styles.css` determines the visual personality.

### Fallback pattern for Tier 2 tokens

```css
/* In base.css — works even if theme only defines Tier 1 */
.metrics-layout .metric-label {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs);
  color: var(--c-muted);
}

/* In blush/styles.css — overrides the default */
:root {
  --c-tertiary: 'Poppins', system-ui, sans-serif;
}
```

### Overriding specific layout styles

Themes can add overrides in their `styles.css` without creating separate Vue files:

```css
/* blush/styles.css — Blush-specific card style */
.metrics-layout .metric {
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  box-shadow: var(--c-glass-shadow, var(--c-shadow-sm));
}
```

---

## File Structure

```
themes/shared/
├── tokens.md          ← This file
├── base.css           ← Structural CSS (all themes share)
├── global-bottom.vue  ← Navigation overlay (single copy)
└── layouts/           ← Base layout implementations
    ├── cover.vue
    ├── content.vue
    ├── divider.vue
    ├── impact.vue
    ├── metrics.vue
    ├── feature-grid.vue
    ├── comparison.vue
    ├── two-cols.vue
    ├── timeline.vue
    ├── big-code.vue
    └── quote.vue
```

Each theme directory becomes thin:

```
themes/blush/
├── styles.css         ← @import base.css + tokens + overrides
├── README.md
└── examples.md
```

At generation time, `shared/` + `themes/<chosen>/` are composed into `deck/theme/` as a flat, self-contained Slidev theme directory.