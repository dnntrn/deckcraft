# Design System Token Maps

Pre-extracted design tokens for popular design systems. No runtime scraping needed.
The AI reads this file and maps tokens onto a chosen theme template.

## How to use

1. User names a design system (e.g. "use Kumo")
2. AI reads the token map below
3. AI copies chosen theme template to `deck/theme/`
4. AI injects token values into `deck/theme/styles.css` CSS variables
5. AI generates slides against the themed template

For design systems not listed here, ask the user for explicit values:
- Primary/accent color + background preference + font preference

Never fetch a website at runtime to extract tokens.

---

## Kumo (Cloudflare)

Cloudflare's component library. Semantic tokens, accessible defaults, clean aesthetic.

| Token | Light value | Dark value |
|-------|-------------|------------|
| **Canvas (slide bg)** | `oklch(98.75% 0 0)` | `oklch(10% 0 0)` |
| **Base (card bg)** | `#ffffff` | `oklch(17% 0 0)` |
| **Foreground (text)** | `oklch(14.5% 0 0)` | `oklch(97% 0 0)` |
| **Muted (secondary text)** | `oklch(55.6% 0 0)` | `oklch(70.8% 0 0)` |
| **Brand / Accent** | `oklch(57.72% 0.2324 260)` | `oklch(57.72% 0.2324 260)` |
| **Brand hover** | `oklch(48.8% 0.243 264)` | `oklch(48.8% 0.243 264)` |
| **Hairline / Border** | `oklch(14.5% 0 0 / 0.1)` | `oklch(32% 0 0)` |
| **Success** | `oklch(43.2% 0.095 167)` | `oklch(90.5% 0.093 164)` |
| **Warning** | `oklch(47.6% 0.114 62)` | `oklch(85.2% 0.199 92)` |
| **Danger / Error** | `oklch(50.5% 0.213 27.5)` | `oklch(70.4% 0.191 22)` |
| **Info** | `oklch(42.4% 0.199 266)` | `oklch(70.7% 0.165 255)` |
| **Code background** | `oklch(96% 0 0)` | `oklch(22% 0 0)` |
| **Code foreground** | `oklch(14.5% 0 0)` | `oklch(94% 0 0)` |

| Property | Value |
|----------|-------|
| **Font family** | Inter, system-ui, -apple-system, sans-serif |
| **Code font** | JetBrains Mono, Fira Code, monospace |
| **Border radius** | 8px |
| **Style notes** | Clean, accessible, warm-accent on neutral canvas. Dark mode uses deep charcoals, never pure black. |

---

## Vercel (Geist)

Vercel's Geist design system. Minimal, geometric, Swiss-influenced.

| Token | Light value | Dark value |
|-------|-------------|------------|
| **Canvas (slide bg)** | `oklch(98.5% 0 0)` | `oklch(13% 0 0)` |
| **Base (card bg)** | `#ffffff` | `oklch(16% 0 0)` |
| **Foreground (text)** | `oklch(18% 0 0)` | `oklch(93% 0 0)` |
| **Muted (secondary text)** | `oklch(55% 0 0)` | `oklch(65% 0 0)` |
| **Accent** | `oklch(58% 0.24 260)` | `oklch(58% 0.24 260)` |
| **Accent hover** | `oklch(48% 0.24 260)` | `oklch(48% 0.24 260)` |
| **Border** | `oklch(90% 0 0)` | `oklch(25% 0 0)` |
| **Success** | `oklch(55% 0.18 155)` | `oklch(65% 0.18 155)` |
| **Warning** | `oklch(60% 0.17 80)` | `oklch(60% 0.17 80)` |
| **Danger / Error** | `oklch(50% 0.21 25)` | `oklch(55% 0.19 25)` |

| Property | Value |
|----------|-------|
| **Font family** | Geist Sans, system-ui, -apple-system, sans-serif |
| **Code font** | Geist Mono, JetBrains Mono, monospace |
| **Border radius** | 5px (subtle rounding, nearly sharp) |
| **Style notes** | Extremely minimal. Clean borders. Generous whitespace. Monochromatic with single accent. Never gradient backgrounds. |

---

## MUI (Material)

Google's Material Design through the MUI library. Dense, shadow-rich, component-driven.

| Token | Light value | Dark value |
|-------|-------------|------------|
| **Canvas (slide bg)** | `#ffffff` | `#121212` |
| **Surface** | `#ffffff` | `oklch(18% 0 0)` |
| **Foreground (text)** | `rgba(0, 0, 0, 0.87)` | `rgba(255, 255, 255, 0.87)` |
| **Muted (secondary text)** | `rgba(0, 0, 0, 0.6)` | `rgba(255, 255, 255, 0.6)` |
| **Primary / Accent** | `oklch(50% 0.22 260)` | `oklch(55% 0.22 260)` |
| **Secondary** | `oklch(55% 0.21 330)` | `oklch(60% 0.21 330)` |
| **Success** | `oklch(52% 0.17 155)` | `oklch(62% 0.17 155)` |
| **Warning** | `oklch(58% 0.18 80)` | `oklch(65% 0.18 80)` |
| **Error** | `oklch(48% 0.21 25)` | `oklch(55% 0.19 25)` |
| **Code background** | `oklch(97% 0 0)` | `oklch(24% 0 0)` |

| Property | Value |
|----------|-------|
| **Font family** | Roboto, system-ui, -apple-system, sans-serif |
| **Code font** | Roboto Mono, JetBrains Mono, monospace |
| **Border radius** | 4px |
| **Style notes** | Elevation shadows. Dense information works. Ripple/interaction metaphors can influence diagram styling. |

---

## Custom / User-Provided

When the user provides their own values instead of a named system:

```
"use our brand: primary=#1a1a2e, font=Inter, dark theme"
```

Derive the full palette from the given anchors:

1. **Primary** → `--slidev-accent`
2. **Canvas** → Dark: `oklch(15% 0.005 <primary-hue>)`, Light: `oklch(98% 0.001 <primary-hue>)`
3. **Foreground** → Dark: `oklch(94% 0 0)`, Light: `oklch(15% 0.005 <primary-hue>)`
4. **Muted** → Dark: `oklch(65% 0 0)`, Light: `oklch(50% 0 0)`
5. **Code background** → Dark: `oklch(22% 0.005 <primary-hue>)`, Light: `oklch(95% 0.002 <primary-hue>)`
6. **Semantic colors** → Standard hues, scaled to match primary chroma
7. **Font** → Use provided font, or system-ui as default

For a URL to a design system: ask for explicit values. Never fetch.
