# deckcraft

AI skill for generating beautiful technical presentation decks with [Slidev](https://sli.dev).

Talk to your AI naturally. Get slides that don't look like AI made them.

```
"make me slides for my Kubernetes pod lifecycle talk"
"use Cloudflare Kumo's design system, dark theme, 30 minutes"
"slide 4 is too dense, split it"
"add a state diagram here"
"export to PDF"
```

## New here? Start with this

Deckcraft does two things:

1. It teaches an AI coding agent how to make a presentation deck.
2. It can copy the visual style of a website into that deck.

You do not need to understand Slidev, CSS, or design systems to use it. The deck is
stored as a plain text file (Markdown), and the AI handles the design decisions.

### What you need

- Node.js 22 or newer
- Google Chrome or Chromium
- An AI assistant that can edit files in your project, such as Claude Code, Cursor, or OpenCode
- Slidev to view the slides. You can run it with `npx`, so you do not need to install
  anything globally.

### 1. Get the Deckcraft repo

```bash
git clone https://github.com/dnntrn/deckcraft.git
cd deckcraft
```

If you only want the AI skill, install it with the commands in [Install](#install).
The URL style importer lives in this repo, so the steps below assume you are inside
`deckcraft`.

### 2. Install the AI skill

Pick your agent:

**OpenCode** — add this to `opencode.json`:

```json
{
  "plugin": ["deckcraft@git+https://github.com/dnntrn/deckcraft.git"]
}
```

**Claude Code or Cursor**:

```bash
npx skills add dnntrn/deckcraft
```

Restart your agent after installing.

### 3. Make a folder for your deck

From the Deckcraft repo:

```bash
mkdir -p deck
```

This folder will hold your slides and the imported style. You can put it anywhere;
`deck/` is just the convention.

### 4. Import a style from a website

Pick a website you like and run:

```bash
npm run style -- https://astro.build \
  --out ./style \
  --deck ./deck
```

This creates:

```text
deck/
├── STYLE.md          # how to use this style
└── theme/            # colors, type, motifs, motion, layout recipes
```

If the site uses a commercial font, Deckcraft swaps in a free alternative and records
the substitution in `STYLE.md`.

It does **not** create `slides.md`. That file is your content.

If you only want to look at the style first, add `--directions` and run one of the
sample decks:

```bash
npm run style -- https://astro.build \
  --out ./style \
  --directions \
  --screenshots

npx @slidev/cli ./style/sample/faithful.md
```

The three directions are:

- `faithful.md` — closest to the website
- `translated.md` — adapted for a projector
- `inspired.md` — keeps the colors and type, but uses Deckcraft's default layout

### 5. Create `deck/slides.md`

Make a file called `deck/slides.md`:

```markdown
---
theme: ./theme
highlighter: shiki
lineNumbers: true
title: My Talk
layout: cover
colorSchema: dark
---

# My Talk

One sentence about the talk.

<p class="author">Your Name · Event</p>

---
layout: content
---

# The first claim

- Evidence
- More evidence
- The point
```

Set `colorSchema` to `dark` or `light` to match the style you imported.

### 6. Ask the AI to write the deck

Open the Deckcraft repo in Claude Code, Cursor, or OpenCode and say:

```text
Read deck/STYLE.md and make me a 15-minute deck about our migration story.
```

The AI should keep the imported theme and follow the layout recipes, motifs, and
motion guidance in `STYLE.md`. If it starts choosing a different theme, tell it:

```text
Use the installed theme. Follow deck/STYLE.md.
```

### 7. View the deck

```bash
npx @slidev/cli ./deck/slides.md
```

Open the URL Slidev prints. Use the arrow keys to move between slides.

### 8. If something goes wrong

**`Cannot find module .../style-import.mjs`**

You are in the wrong folder. Run `cd deckcraft` first.

**`No Chrome/Chromium found`**

Install Google Chrome, or tell Deckcraft where it is:

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npm run style -- https://astro.build --out ./style --deck ./deck
```

**Slidev asks to create an entry file**

`slides.md` does not exist yet. Create it using the example above. The style import
only installs the theme and `STYLE.md`.

**The deck is blank or looks unstyled**

Check that `deck/slides.md` starts with `theme: ./theme`, and that
`deck/theme/styles.css` exists.

**`npx @slidev/cli` is not available**

Run:

```bash
npx @slidev/cli@latest ./deck/slides.md
```

---

## What it does

Deckcraft teaches your AI coding agent how to design beautiful technical slides.
It loads reference files about typography, color, layout, code presentation,
diagrams, and narrative structure. Your AI applies these principles automatically —
no commands to memorize, no design vocabulary required.

### Anti-pattern detection

25+ slide "slop" patterns it catches before you present:
- Wall-of-text slides
- Code without language highlighting
- Low contrast (projectors wash out color)
- Complex diagrams with unreadable text
- Missing presenter notes
- Bullet hell
- Generic stock photo filler
- ...and more

### Design system theming + rich theme templates

Pick any design system and a theme template — deckcraft generates the full slide theme:
- **blush** — Warm sophistication. DM Serif Display italic headings, Montserrat body, frosted glass cards, rose accents.
- **terminal** — Technical precision. JetBrains Mono bold headings, solid surfaces, code-focused.
- **editorial** — Literary refinement. Playfair Display italic headings, generous whitespace.
- **system** — Invisible polish. Inter semibold headings, clean surfaces, all-purpose.

All four themes share a single structural foundation (11 layouts + base CSS + token contract). Each theme defines only its personality tokens.

Token maps pre-extracted for:
- "Use Kumo" — Cloudflare's component library
- "Match Vercel" — Geist design system
- "Use MUI" — Material Design
- "Use our brand: primary=#1a1a2e, font=Inter"

### Import a style from a URL

Paste a reference site and extract its visual language into a Deckcraft theme:

```bash
npm run style -- https://stripe.com --out ./style --preview --screenshots
# or generate all three directions:
npm run style -- https://stripe.com --out ./style --directions --screenshots
# or apply the style directly to an existing deck:
npm run style -- https://stripe.com --out ./style --deck ./deck
```

Output:

```text
style/
├── style.json        # tokens, fonts, motifs, motion, layouts, DOM geometry
├── style-brief.md    # human-readable style card
├── theme/
│   ├── styles.css    # generated tokens + imports
│   ├── motifs.css    # reusable motif classes
│   ├── motion.css    # reusable motion classes
│   ├── recipes.css   # reusable layout recipe classes
│   └── README.md
├── reference/        # with --screenshots
│   ├── viewport.png
│   └── full-page.png
└── sample/           # with --preview or --directions
    ├── slides.md
    ├── faithful.md   # with --directions
    ├── translated.md
    └── inspired.md
```

This version reads the rendered CSSOM and DOM geometry. It captures palette,
typography, **font substitutions**, surfaces, density, **motifs, motion, and page-layout archetypes**,
then normalizes them for projection. Add `--screenshots` for reference images and
`--preview` for a sample Slidev deck. Add `--directions` for three variants:
faithful, translated, and inspired. The style card also includes layout recipes
that map detected page archetypes to concrete slide compositions. The generated
theme preserves the captured color mode; use `--light` or `--dark` to choose.
Use `--deck ./deck` to install the generated theme and style kit, and write
`deck/STYLE.md` with layout recipes, motifs, motion guidance, and generation rules.
Requires Node 22+ and Chrome/Chromium (`CHROME_PATH` supported).

Style import is opt-in. Deckcraft's normal generation flow still uses bundled
themes and never fetches a website unless you explicitly run this tool.

### Zero commands (almost)

Every interaction is natural language. Explicit commands exist only for export
(`/deckcraft export pdf|pptx|png`) and opting into a URL style import (`npm run style`).

## Privacy & Security

**Deckcraft is a read-only skill.** Its normal generation flow consists entirely of
local Markdown reference files. It does not:

- Store, transmit, or process your slide content
- Include any tracking, telemetry, or analytics
- Train on or collect slide content
- Require an account or API key

The optional `style-import` tool is the one exception: it opens the URL you explicitly
provide in a local headless browser and writes the extracted style card to your disk.
It does not upload your deck or use a third-party service.

Your slides, design tokens, and presentation context live in your repository's `deck/`
directory. They never leave your machine. The AI reads the skill's reference files
locally and applies the knowledge to your content — the same way a `.cursorrules` or
`CLAUDE.md` file works.

**Enterprise-ready.** No third-party services. No data exfiltration risk. Use with
proprietary code, internal architectures, and confidential talk content.

## Install

### OpenCode

Add to `opencode.json`:

```json
{
  "plugin": ["deckcraft@git+https://github.com/dnntrn/deckcraft.git"]
}
```

Restart OpenCode. The skill loads automatically when you work on slides.

### Claude Code

```bash
npx skills add dnntrn/deckcraft
```

### Cursor

```bash
npx skills add dnntrn/deckcraft
```

### Manual (any harness)

```bash
mkdir -p .agents/skills/deckcraft
cp -r skills/deckcraft/* .agents/skills/deckcraft/
```

Or copy the AGENTS.md block into your existing AGENTS.md / CLAUDE.md.

## Usage

No commands to memorize. Just talk naturally about your presentation.

### Creating a new deck

```
"Make me slides for a 30-minute talk on WebAssembly performance"
```

The AI will ask about audience, tone, and design system, propose an outline, then generate
the full deck.

### Iterating

```
"Slide 3 is too dense, split it into two slides"
"Add a Mermaid architecture diagram to slide 5"
"Make the code slides use JetBrains Mono"
"Switch to a dark theme"
"The ending is too abrupt, add a call to action"
```

### Exporting

```
/ deckcraft export pdf
/ deckcraft export pptx
```

## The deck/ convention

All output follows this structure at your project root:

```
deck/
├── PRESENTATION.md     # Context: audience, tone, design system
├── STYLE.md            # Imported style guide (optional, from --deck)
├── slides.md           # The deck in Slidev markdown
├── theme/              # Generated custom theme
├── assets/             # Images, diagrams
└── exports/            # PDF/PPTX output (gitignored)
```

## Requirements

- A supported AI harness with skill support:
  - OpenCode, Claude Code, Cursor, Codex CLI, Gemini CLI, GitHub Copilot
- [Slidev](https://sli.dev) installed in your project (`npm install @slidev/cli`)
- For export: `playwright-chromium` (`npm install -D playwright-chromium`)
- For URL style import: Node 22+ and Chrome/Chromium

## Inspired by

- [Impeccable](https://impeccable.style) — Design fluency for AI harnesses
- [slopdocs](https://slopdocs.dev) — Convention-first approach, no commands
- [Slidev](https://sli.dev) — The best slide format for developers

## License

MIT
