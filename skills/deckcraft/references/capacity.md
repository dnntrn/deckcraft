# Slide Capacity Limits

Slides render at 1920×1080 (16:9). Content must fit without scrolling or clipping.
If content exceeds a limit, split the slide. Don't shrink text below minimums.
Don't add scrollbars. Don't reduce padding below theme defaults.

## General limits (full-width content layout)

| Content type | Max on one slide |
|---|---|
| Body text lines (title + body only) | 12 lines |
| Body text + bullet list | 8 items, or 6 items with 2-level nesting |
| Code lines (full width) | 20 lines (max-height: 420px at 14px font) |
| Code lines (in .split, each column) | 16 lines (max-height: 320px at 14px font) |
| Title + body + code | title + 5 body lines + 16 code lines |
| Title + body + diagram | title + 4 body lines + diagram |
| Table rows | 12 rows (at 14px font) |

## When content overflows

1. **Split the slide** — this is always the correct fix. Create two content slides from one.
2. **Use .split layout** — move code to one column, explanation to the other. This fits 40% more content per "slide."
3. **Reduce code padding** — from 20px to 16px (minor last-resort tweak).
4. **Never** reduce heading below 30px, body below 17px, or code below 13px.

## Theme-specific padding (top + bottom)

| Theme | Vertical padding used | Remaining for content |
|-------|----------------------|----------------------|
| editorial | 80px × 2 = 160px | 920px |
| terminal | 52px × 2 = 104px | 976px |
| system | 64px × 2 = 128px | 952px |
| blush | 72px × 2 = 144px | 936px |

## Code block overflow

Code blocks have `max-height` and `overflow: auto` — they scroll internally if too long.
But prefer splitting complex code across slides rather than relying on scroll.

## Diagram sizing

HTML/CSS diagrams should fit within the available content height.
Use `margin: 20px 0` (not 40-48px) for diagrams on content-dense slides.

## Testing for overflow

After generating, check: does any slide's content extend below 1080px at 1920px width?
If yes: split it. Never ship a slide that overflows.
