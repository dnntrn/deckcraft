# Nocturne Theme

Dark technical presentation theme. Terminal/editor aesthetic. Rich backgrounds, deliberate lighting.

## When to use

- Technical deep dives, infrastructure talks, backend/system presentations
- Dark conference rooms (most tech conferences)
- Kubernetes, databases, distributed systems, security talks
- When you want the slides to feel like a developer tool

## Design principles

- Very dark background with subtle radial vignette
- JetBrains Mono for code and body
- Accent colors glow against the dark canvas
- Code blocks styled like terminal windows (chrome dots included)
- Mermaid diagrams in dark mode with colored edges
- Section dividers with dramatic large type
- Subtle grid texture behind content (blueprint feel)

## Customization

All colors are CSS custom properties. Override `--slidev-accent`, `--slidev-canvas`, `--slidev-foreground`, `--nocturne-glow`, etc.

## Files

- `styles.css` — Full stylesheet for Slidev
- `setup.ts` — Font loading and Mermaid dark theme configuration
- `examples.md` — Sample slides showing each layout
