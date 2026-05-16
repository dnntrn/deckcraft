# Exporting Slides

Export via the `/deckcraft export` command or directly with the Slidev CLI.

## Formats

| Command | Output | Notes |
|---------|--------|-------|
| `/deckcraft export pdf` | `deck/exports/slides.pdf` | Selectable text, presenter notes in PDF |
| `/deckcraft export pptx` | `deck/exports/slides.pptx` | Slides as images, presenter notes included |
| `/deckcraft export png` | `deck/exports/slide-*.png` | One PNG per slide |
| `/deckcraft export md` | `deck/exports/slides.md` | Compiled markdown with PNG images |

## Prerequisites

Exporting requires `playwright-chromium`:

```bash
npm install -D playwright-chromium
npx playwright install chromium
```

Or with pnpm:
```bash
pnpm add -D playwright-chromium
npx playwright install chromium
```

## Export Options

| Option | Description |
|--------|-------------|
| `--with-clicks` | Export each click step as a separate page (enabled by default for PPTX) |
| `--dark` | Export using dark theme variant |
| `--output <name>` | Custom output filename (without extension) |
| `--range 1,3-5,8` | Export specific slides only |
| `--timeout 60000` | Increase timeout for complex slides (default: 30000ms) |
| `--wait 1000` | Extra wait time before capturing each slide (ms) |
| `--with-toc` | Include table of contents in PDF outline |

## Exporting commands to run

### PDF
```bash
npx slidev export deck/slides.md --format pdf --output deck/exports/slides --with-clicks
```

### PPTX
```bash
npx slidev export deck/slides.md --format pptx --output deck/exports/slides
```

Note: PPTX exports each slide as an image. Text is not selectable. Presenter notes
are embedded per-slide.

### PNG
```bash
npx slidev export deck/slides.md --format png --output deck/exports/slide
```

This produces `deck/exports/slide-001.png`, `deck/exports/slide-002.png`, etc.

### PNG without background (transparent)
```bash
npx slidev export deck/slides.md --format png --output deck/exports/slide --omit-background
```

## Hosting as a Website

Alternative to file export: build a static site and host it anywhere.

```bash
npx slidev build deck/slides.md --out deck/exports/site
```

The output is a static SPA in `deck/exports/site/`. Deploy to:
- GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static host
- An internal server (all assets are self-contained)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Missing emojis in PDF | Install Noto Emoji font on the system |
| Content not rendering before export | Add `--wait 2000` to give animations time |
| Timeout on large decks | Add `--timeout 120000` |
| Dark theme not applying | Pass `--dark` flag explicitly |
| Playwright can't find browser | Run `npx playwright install chromium` |
| Export hangs on a specific slide | Export with `--range` to isolate the problem slide |
