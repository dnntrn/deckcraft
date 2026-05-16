# deckcraft

AI skill for generating beautiful technical presentation decks with [Slidev](https://sli.dev).

Talk to your AI naturally. Get slides that don't look like AI made them.

```
"make me slides for my Kubernetes pod lifecycle talk"
"use Cloudflare Kumo's design system, dark theme, 30 minutes"
"slide 4 is too dense, split it"
"add a Mermaid state diagram here"
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

### Design system theming

Pick any design system and deckcraft generates a matching theme:
- "Use Kumo" — Cloudflare's component library
- "Match Vercel" — Geist design system
- "Use our brand: primary=#1a1a2e, font=Inter"
- Tailwind, MUI, shadcn/ui, Carbon, GitHub Primer, and more

No bundled themes. The AI extracts tokens and generates a custom theme.

### Zero commands (almost)

Every interaction is natural language. One explicit command exists: `/deckcraft export pdf|pptx|png`.

## Privacy & Security

**Deckcraft is a read-only skill.** It consists entirely of Markdown files that teach
your AI design principles. It does not:

- Store, transmit, or process any user data
- Make network requests or API calls
- Include any tracking, telemetry, or analytics
- Train on or collect slide content
- Require an account, API key, or internet connection (beyond initial install)

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

## Inspired by

- [Impeccable](https://impeccable.style) — Design fluency for AI harnesses
- [slopdocs](https://slopdocs.dev) — Convention-first approach, no commands
- [Slidev](https://sli.dev) — The best slide format for developers

## License

MIT
