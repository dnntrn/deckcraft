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
```

Output:

```text
style/
├── style.json        # tokens, motifs, motion, layouts, DOM geometry
├── style-brief.md    # human-readable style card
├── theme/
│   ├── styles.css    # generated Deckcraft theme tokens
│   └── README.md
├── reference/        # with --screenshots
│   ├── viewport.png
│   └── full-page.png
└── sample/           # with --preview
    └── slides.md
```

This v0.6 reads the rendered CSSOM and DOM geometry. It captures palette,
typography, surfaces, density, **motifs, motion, and page-layout archetypes**,
then normalizes them for projection. Add `--screenshots` for reference images and
`--preview` for a sample Slidev deck. The generated theme preserves the captured
color mode; use `--light` or `--dark` to choose. Requires Node 22+ and
Chrome/Chromium (`CHROME_PATH` supported).

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
