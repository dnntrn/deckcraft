import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    /* Dark theme designed for nocturne's near-black canvas */
    themeVariables: {
      /* Backgrounds — dark with cool undertone */
      primaryColor: 'var(--slidev-mermaid-node, oklch(20% 0.01 260))',
      primaryBorderColor: 'var(--slidev-mermaid-node-border, oklch(36% 0.015 260))',
      primaryTextColor: 'var(--slidev-mermaid-label, oklch(93% 0 0))',

      /* Secondary */
      secondaryColor: 'var(--slidev-mermaid-node, oklch(18% 0.008 260))',
      secondaryBorderColor: 'var(--slidev-mermaid-node-border, oklch(32% 0.01 260))',
      secondaryTextColor: 'var(--slidev-muted, oklch(60% 0 0))',

      /* Tertiary */
      tertiaryColor: 'var(--slidev-code-bg, oklch(18% 0.008 260))',
      tertiaryBorderColor: 'var(--slidev-code-border, oklch(32% 0.008 260))',
      tertiaryTextColor: 'var(--slidev-muted, oklch(60% 0 0))',

      /* Notes */
      noteBkgColor: 'var(--slidev-code-bg, oklch(18% 0.008 260))',
      noteTextColor: 'var(--slidev-muted, oklch(60% 0 0))',
      noteBorderColor: 'var(--slidev-border, oklch(26% 0.005 260))',

      /* Sequence diagram — dark theme actors */
      actorBkg: 'var(--slidev-mermaid-node, oklch(20% 0.01 260))',
      actorBorder: 'var(--slidev-accent, oklch(68% 0.22 260))',
      actorTextColor: 'var(--slidev-mermaid-label, oklch(93% 0 0))',
      actorLineColor: 'var(--slidev-mermaid-edge, oklch(50% 0.02 260))',
      signalColor: 'var(--slidev-accent, oklch(68% 0.22 260))',
      signalTextColor: 'var(--slidev-muted, oklch(60% 0 0))',

      /* Edges and labels */
      lineColor: 'var(--slidev-mermaid-edge, oklch(50% 0.02 260))',
      labelBoxBkgColor: 'var(--slidev-mermaid-node, oklch(20% 0.01 260))',
      labelBoxBorderColor: 'transparent',
      labelTextColor: 'var(--slidev-mermaid-label, oklch(93% 0 0))',
      loopTextColor: 'var(--slidev-mermaid-label, oklch(93% 0 0))',

      /* General */
      fontFamily: 'var(--slidev-font, system-ui, sans-serif)',
      fontSize: 'var(--slidev-mermaid-font, 15px)',
    }
  }
})
