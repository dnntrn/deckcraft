# Style Import from a URL

Use this when the user says things like:

- “Make the deck feel like this site: https://example.com”
- “Use our marketing site’s design system”
- “Match this reference”
- “Paste this URL and build slides in that style”

This is an explicit, opt-in step. Normal deck generation still uses bundled themes and
does not fetch websites.

---

## What it does

The v0 extractor opens the URL in a local headless Chrome, reads the **rendered CSSOM**
and **DOM geometry**, and writes:

```text
style/
├── style.json        # full style card + raw computed samples
├── style-brief.md    # human/agent-readable summary
└── theme/
    ├── styles.css    # Deckcraft token overrides
    └── README.md
```

It does **not** take screenshots yet. It captures:

- palette (canvas, ink, muted, border, accent, card, code)
- font families and heading treatment
- type sizes and density
- surfaces: radius, shadow, glass, borders
- composition: content width, grid/flex count, media count
- signature moves (oversized type, hairline rules, rounded cards, dark canvas, etc.)
- caveats (gradient backgrounds, licensed fonts, single-page sampling)

---

## Run it

From the Deckcraft repo:

```bash
npm run style -- https://example.com --out ./style
```

If Deckcraft is installed as a skill, run the script directly from the skill directory:

```bash
node .claude/skills/deckcraft/tools/style-import.mjs https://example.com --out ./style
```

Options:

```text
--out <dir>         Output directory (default: ./style)
--viewport <WxH>    Capture viewport (default: 1440x900)
--dark              Emulate prefers-color-scheme: dark
--light             Emulate prefers-color-scheme: light
--timeout <ms>      Page load timeout (default: 30000)
--wait <ms>         Extra wait after load for client-rendered pages (default: 800)
```

Requires Node 22+ and Chrome/Chromium. Set `CHROME_PATH` if the browser is not in a
standard location.

---

## Use the result

1. Read `style-brief.md` first. It is the design intent.
2. Copy `style/theme/styles.css` into the deck’s `theme/` directory.
3. Copy the shared foundation alongside it:
   - `skills/deckcraft/themes/shared/base.css` → `deck/theme/base.css`
   - `skills/deckcraft/themes/shared/layouts/*.vue` → `deck/theme/layouts/`
   - `skills/deckcraft/themes/shared/global-bottom.vue` → `deck/theme/global-bottom.vue`
4. Keep `@import './base.css';` at the top of the generated `styles.css`.
5. Set `theme: ./theme` in `deck/slides.md`.
6. Read `style.json` when you need exact values or provenance.

---

## How to translate the style card into slides

- **Canvas + ink** are the foundation. Do not introduce a second background color.
- **Accent** is the only accent. Use it for emphasis, rules, links, and one data series.
- **Display font** is for statements and covers. **Body font** is for evidence and prose.
- **Density** tells you how much to put on a slide. A dense reference should still be
  normalized for projection; do not copy tiny type.
- **Surface** decides the visual language:
  - `flat` → rules, color fields, generous margins, no cards
  - `soft elevation` → restrained shadows, fewer borders
  - `rounded cards` → use cards only when the content is genuinely card-shaped
  - `glass` → use translucency sparingly; never on text-heavy slides
- **Signature moves** are the things that make it recognizable. Keep 2–3, not all of them.
- **Caveats** are real. Gradient backgrounds are approximated; licensed fonts need
  substitution or a license check; one page is not a full design system.

---

## Guardrails

- Do not copy logos, trademarks, proprietary illustrations, or site copy.
- Do not imply affiliation with the reference brand.
- Verify font licenses. Recognized open-source fonts are added as Google Fonts imports;
  commercial or custom faces must be installed or substituted.
- Respect robots/ToS when running against third-party sites.
- Normalize contrast and minimum type sizes for a projector. A reference can be
  beautiful on a laptop and unreadable from row 20.
- Treat the output as a **style card**, not a pixel-perfect clone.

---

## What v1 should add

- Screenshot capture and a vision-based brief for composition/mood
- Multi-page sampling (home, product, docs, blog)
- A rendered deck preview
- A screenshot critic that compares the generated deck to the reference
- Font substitution suggestions with open alternatives
