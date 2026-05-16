# Slide Typography

Typography at projection distance is fundamentally different from web or print.
Projectors have lower resolution, lower contrast, and viewers sit farther away.
Size up. Simplify. Test at distance.

## Size Rules (at 1920x1080)

| Element | Size | Never below | Notes |
|---------|------|-------------|-------|
| h1 (slide title) | 48-72px | 40px | One per slide, short |
| h2 (section header) | 36-48px | 32px | Use only on `section` or `two-cols` slides |
| h3 (subsection) | 28-36px | 24px | Rarely needed; consider splitting slides |
| Body text | 24-32px | 20px | Primary reading size |
| Code blocks | 18-24px | 16px | Larger for short code, 18px is safe |
| Captions / labels | 14-18px | 14px | Only for secondary metadata |
| Presenter notes | (not projected) | — | Notes are for speaker view only |

## Line Length and Density

- Body text: max 65 characters per line. At 24px on a 1920px slide, this is roughly 2/3 of the slide width.
- Body text: max 6 lines on a slide. If content needs more, split into two slides or use a diagram.
- Bullet lists: max 6 items, max 2 levels of nesting. Prefer 3-5 items.
- Never center body text. Left-align for readability at distance. Center only for hero slides, single statistics, or calls to action.

## Font Selection

### Technical talks (one family)
Use one font family for the entire deck. `system-ui` or Inter. These are installed everywhere, render cleanly, and don't distract.

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Branded / editorial decks (two families max)
Display font for titles, body font for content:

```css
/* Title */
--slidev-font-display: 'Fraunces', serif;
/* Body + code */
--slidev-font-family: 'Inter', system-ui, sans-serif;
```

Pairing rule: serif display + sans-serif body, or sans-serif display + sans-serif body. Never serif + serif. Never more than two families.

### Monospace for code
Use an editor font. Users recognize their tools:
- JetBrains Mono (default, works everywhere)
- Cascadia Code (Windows-friendly)
- Fira Code (ligature support)
- IBM Plex Mono (corporate)
- SF Mono (macOS)

```css
--slidev-mono-family: 'JetBrains Mono', 'Fira Code', monospace;
```

## Weight Hierarchy

- h1: 700 (bold) or 800 (extrabold)
- h2: 600 (semibold)
- Body: 400 (regular)
- Emphasis in body: 600 (semibold), not italic
- Captions: 400, slightly smaller
- Code: 400 (regular weight for readability)

Never use:
- Weight 300 or below (disappears on projectors)
- Italic for body text (harder to read at distance; italic is for titles, quotes, or emphasis in small doses)
- All-caps for anything longer than 3 words

## Color and Contrast

- Body text: high contrast against background (≥4.5:1 ratio)
- Code text: full contrast, same as body
- Muted text: still ≥3:1 (for captions, metadata)
- Accent color: use on headings or key words, not body text
- Never use `text-shadow` or gradient text on slides (unreadable at distance)

## When to Break Rules

- Hero/cover slides: titles can go to 96px+, single statement slides can center text
- Lightning talks: body text can be slightly smaller (20-22px) since slides are supportive, not primary
- Statement slides: `layout: center` with one big number and one line of text — body rules don't apply
