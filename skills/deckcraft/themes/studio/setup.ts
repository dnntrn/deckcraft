import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    themeVariables: {
      /* Backgrounds */
      primaryColor: 'var(--slidev-mermaid-node, oklch(97% 0.001 260))',
      primaryBorderColor: 'var(--slidev-mermaid-node-border, oklch(84% 0.003 260))',
      primaryTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',
      lineColor: 'var(--slidev-mermaid-edge, oklch(55% 0 0))',

      /* Secondary nodes */
      secondaryColor: 'var(--slidev-mermaid-node, oklch(97% 0.001 260))',
      secondaryBorderColor: 'var(--slidev-mermaid-node-border, oklch(84% 0.003 260))',
      secondaryTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',

      /* Tertiary */
      tertiaryColor: 'var(--slidev-mermaid-node, oklch(95% 0.001 260))',
      tertiaryBorderColor: 'var(--slidev-mermaid-node-border, oklch(84% 0.003 260))',
      tertiaryTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',

      /* Notes / special */
      noteBkgColor: 'var(--slidev-code-bg, oklch(95% 0.002 260))',
      noteTextColor: 'var(--slidev-muted, oklch(48% 0 0))',
      noteBorderColor: 'var(--slidev-border, oklch(88% 0 0))',

      /* Sequence diagram */
      actorBkg: 'var(--slidev-mermaid-node, oklch(97% 0.001 260))',
      actorBorder: 'var(--slidev-accent, oklch(58% 0.22 260))',
      actorTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',
      actorLineColor: 'var(--slidev-mermaid-edge, oklch(55% 0 0))',
      signalColor: 'var(--slidev-mermaid-edge, oklch(55% 0 0))',
      signalTextColor: 'var(--slidev-muted, oklch(48% 0 0))',

      /* General */
      fontFamily: 'var(--slidev-font, system-ui, sans-serif)',
      fontSize: 'var(--slidev-mermaid-font, 15px)',
      labelBoxBkgColor: 'var(--slidev-mermaid-node, oklch(97% 0.001 260))',
      labelBoxBorderColor: 'transparent',
      labelTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',
      loopTextColor: 'var(--slidev-mermaid-label, oklch(15% 0.005 260))',
    }
  }
})
