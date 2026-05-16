# Color for Slides

Projectors are not Retina displays. Colors that work on your laptop
wash out on a conference screen. Saturate more. Contrast more. Test on a wall.

## Dark Theme (Default for Technical Talks)

Dark backgrounds reduce eye strain in dark conference rooms and look native in
terminals and code editors. This is the recommended default for technical talks.

### Color palette

```
Surface (background):   Near-black with a slight hue tint, never pure #000
                        oklch(15-20% 0.005-0.02 <hue>)
                        Pure black crushes on projectors; use tinted near-black.

Foreground (text):      Near-white, slightly warm
                        oklch(92-96% 0 0) to oklch(92-96% 0.005 80)
                        Pure white causes glare and eye fatigue.

Accent:                 Design system primary, 1-2 uses per slide
                        oklch(55-75% 0.15-0.25 <hue>)
                        Headings, code highlight keywords, key UI elements.

Muted (secondary text): Lower opacity foreground
                        oklch(60-75% 0 0) — still ≥3:1 contrast.

Code background:        Slightly lighter than slide background
                        oklch(20-25% 0.005-0.01 <hue>)
                        Creates a subtle surface distinction.

Code text:              Full contrast foreground
                        Same as body text foreground.
```

### Example dark palette (neutral)

```css
--slidev-slide-background: oklch(16% 0.012 260);
--slidev-slide-foreground: oklch(94% 0 0);
--slidev-slide-muted: oklch(65% 0 0);
--slidev-accent: oklch(70% 0.2 350);
--slidev-accent-foreground: oklch(99% 0 0);
--slidev-code-background: oklch(22% 0.01 260);
--slidev-code-foreground: oklch(94% 0 0);
```

## Light Theme

Use for well-lit rooms, daytime talks, or when brand mandates a light background.

### Color palette

```
Surface (background):   Warm white, never pure #fff
                        oklch(97-99% 0.002-0.005 90)
                        Pure white on a projector = blinding.

Foreground (text):      Near-black with slight hue
                        oklch(12-18% 0.005-0.01 <hue>)

Accent:                 Higher chroma than dark theme (needs to pop on white)
                        oklch(50-65% 0.18-0.28 <hue>)

Muted:                  oklch(45-55% 0 0)

Code background:        Slightly darker than slide
                        oklch(90-94% 0.005 <hue>)
```

### Example light palette

```css
--slidev-slide-background: oklch(98% 0.002 90);
--slidev-slide-foreground: oklch(16% 0.008 260);
--slidev-slide-muted: oklch(50% 0 0);
--slidev-accent: oklch(58% 0.22 350);
--slidev-accent-foreground: oklch(99% 0 0);
--slidev-code-background: oklch(92% 0.005 260);
--slidev-code-foreground: oklch(16% 0.008 260);
```

## Semantic Colors

Use the same semantic colors in both dark and light themes.

```css
--slidev-success: oklch(60% 0.18 150);
--slidev-warning: oklch(65% 0.18 80);
--slidev-error: oklch(55% 0.22 20);
--slidev-info: oklch(60% 0.15 240);
```

Semantic colors are used for:
- Success checkmarks, "deployed" badges
- Warning callouts, "deprecated" labels
- Error states, "critical" indicators
- Info boxes, "note" callouts

All must meet WCAG AA (≥4.5:1) on the slide background. Verify with a contrast checker.

## Contrast Requirements

Projected slides need higher contrast than web pages:

| Element | Minimum ratio | Recommended |
|---------|--------------|-------------|
| Body text | 4.5:1 | ≥7:1 |
| Headings | 4.5:1 | ≥5:1 |
| Code text | 4.5:1 | ≥7:1 |
| Captions / labels | 3:1 | ≥4.5:1 |
| Diagrams (text inside) | 4.5:1 | ≥7:1 |

## Color Use on Slides

- Accent color on: headings, active nav, code keywords, key metrics, links
- Accent color never on: body text (reduces readability)
- Muted color for: secondary info, captions, timestamps, "and 3 more..."
- Semantic colors for: status badges, callout boxes, warnings

### Accent hierarchy
One accent per deck. Don't rotate through design system palettes.
If the design system has multiple colors, pick ONE as accent and use the rest
only in diagrams or charts where multi-color is required.

## Diagram Colors

When generating Mermaid or other diagrams:
- Use neutral/gray for structural elements (boxes, lines)
- Use the accent color for the key element or "hero" node
- Use semantic colors for status/result nodes
- Never use more than 4 distinct colors in a diagram
- All text inside diagram nodes must meet 4.5:1 contrast against the node fill

## Anti-Patterns

- Pure black (`#000`) or pure white (`#fff`) backgrounds
- Purple-to-blue gradients (the #1 AI slop tell)
- Gradient text (unreadable on projectors)
- Low-contrast gray-on-gray labels
- Accent color used as body text color
- More than 4 colors in a diagram
- Neon/high-chroma colors at full saturation (eye fatigue on projectors)
