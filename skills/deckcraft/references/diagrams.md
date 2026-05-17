# Diagrams — HTML/CSS Patterns

All diagrams are built with plain HTML + inline `<style scoped>` on each slide.
No Mermaid. No external rendering. Full visual control.

## Why HTML/CSS

- Zero dependency on Mermaid's theme system
- Scoped styles prevent UnoCSS interference
- Exact control over color, size, spacing, and typography
- Consistent with the deck's design system (uses `var(--c-*)` tokens)
- Diagrams stay readable at projection size

## Architecture / Flow Diagram

```html
<div class="arch">
  <div class="node accent">Client</div>
  <span class="arrow">→</span>
  <div class="node">API Gateway</div>
  <span class="arrow">→</span>
  <div class="node">Auth Service</div>
  <span class="arrow">→</span>
  <div class="node accent">Database</div>
</div>

<style scoped>
.arch {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin: 48px 0;
  flex-wrap: wrap;
}
.node {
  padding: 16px 24px;
  background: var(--c-code-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-family: var(--c-mono);
  font-size: 18px;
  color: var(--c-foreground);
  white-space: nowrap;
}
.accent {
  border-color: var(--c-accent);
  background: var(--c-accent-dim);
  color: var(--c-accent);
  font-weight: 600;
}
.arrow {
  color: var(--c-accent);
  font-size: 22px;
  font-weight: bold;
}
</style>
```

## Vertical Architecture (top-down)

```html
<div class="varch">
  <div class="node accent">Client</div>
  <span class="varrow">↓</span>
  <div class="node">API Gateway</div>
  <span class="varrow">↓</span>
  <div class="node">Service Layer</div>
  <span class="varrow">↓</span>
  <div class="node accent">Database</div>
</div>

<style scoped>
.varch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 32px 0;
}
.varrow {
  color: var(--c-accent);
  font-size: 20px;
  line-height: 1;
}
</style>
```

## State Machine / Lifecycle

```html
<div class="states">
  <div class="state">Pending</div>
  <span class="st-arrow">→ Scheduled →</span>
  <div class="state accent">Running</div>
  <span class="st-arrow">→ Complete →</span>
  <div class="state">Succeeded</div>
</div>

<div class="states" style="margin-top:12px">
  <span class="st-note">Can also transition:</span>
  <span class="st-arrow"></span>
  <div class="state danger">Failed</div>
</div>

<style scoped>
.states { display: flex; align-items: center; gap: 8px; justify-content: center; flex-wrap: wrap; }
.state {
  padding: 14px 24px;
  background: var(--c-code-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-family: var(--c-mono);
  font-size: 17px;
  color: var(--c-foreground);
}
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.danger { border-color: var(--c-danger); background: var(--c-accent-dim); color: var(--c-danger); }
.st-arrow { color: var(--c-accent); font-size: 14px; }
.st-note { font-size: 14px; color: var(--c-muted); font-style: italic; }
</style>
```

## Sequence Diagram

```html
<div class="seq">
  <div class="seq-row">
    <div class="seq-label">Client</div>
    <div class="seq-line"></div>
    <div class="seq-label">API</div>
    <div class="seq-line"></div>
    <div class="seq-label">DB</div>
  </div>
  <div class="seq-arrow" style="margin-left:0">
    POST /users →
  </div>
  <div class="seq-arrow" style="margin-left:50%">
    INSERT →
  </div>
  <div class="seq-arrow back" style="margin-left:50%">
    ← OK
  </div>
  <div class="seq-arrow back" style="margin-left:0">
    ← 201 Created
  </div>
</div>

<style scoped>
.seq { margin: 32px 0; font-family: var(--c-mono); }
.seq-row { display: flex; align-items: center; margin-bottom: 16px; }
.seq-label { padding: 8px 16px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 6px; font-size: 15px; color: var(--c-foreground); }
.seq-line { flex: 1; height: 1px; background: var(--c-border); margin: 0 8px; }
.seq-arrow { font-size: 14px; color: var(--c-accent); padding: 4px 0; }
.back { color: var(--c-muted); }
</style>
```

## Comparison / Before-After

```html
<div class="compare">
  <div class="cmp-box">
    <div class="cmp-label">Before</div>
    <div class="cmp-value">30s</div>
    <div class="cmp-desc">Serial pod creation</div>
  </div>
  <span class="cmp-arrow">→</span>
  <div class="cmp-box accent">
    <div class="cmp-label">After</div>
    <div class="cmp-value">2.1s</div>
    <div class="cmp-desc">Concurrent creation</div>
  </div>
</div>

<style scoped>
.compare { display: flex; align-items: center; gap: 20px; justify-content: center; margin: 36px 0; }
.cmp-box { padding: 24px 36px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 12px; text-align: center; }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); }
.cmp-label { font-size: 14px; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.cmp-value { font-size: 36px; font-weight: 800; color: var(--c-foreground); }
.accent .cmp-value { color: var(--c-accent); }
.cmp-desc { font-size: 15px; color: var(--c-muted); margin-top: 6px; }
.cmp-arrow { font-size: 28px; color: var(--c-accent); }
</style>
```

## Two-Column List / Feature Grid

```html
<div class="features">
  <div class="feat">
    <div class="feat-name">Horizontal scaling</div>
    <div class="feat-desc">Add nodes, not bigger nodes. Linear cost, linear capacity.</div>
  </div>
  <div class="feat">
    <div class="feat-name">Self-healing</div>
    <div class="feat-desc">Failed pods restart automatically. No manual intervention.</div>
  </div>
  <div class="feat">
    <div class="feat-name">Rolling updates</div>
    <div class="feat-desc">Zero-downtime deploys. Old pods drain, new pods start.</div>
  </div>
  <div class="feat">
    <div class="feat-name">Secret management</div>
    <div class="feat-desc">Env vars and files, encrypted at rest, mounted at runtime.</div>
  </div>
</div>

<style scoped>
.features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
.feat { padding: 16px 20px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; }
.feat-name { font-family: var(--c-mono); font-size: 16px; font-weight: 600; color: var(--c-accent); margin-bottom: 4px; }
.feat-desc { font-size: 16px; color: var(--c-muted); line-height: 1.4; }
</style>
```

## Sizing Rules

Patterns are built with `font-size` values that match the layout component's body size.
Never go below 14px for diagram text. Keep nodes to ≤6 per row to avoid wrapping at 1920px.

## When to Use a Diagram

Use a diagram when:
- Relationships between components matter (architecture)
- State transitions are key (lifecycles)
- Sequences need ordering (API flows)

Use text when:
- The concept is simple enough for a sentence
- The breakdown is hierarchical (use a bullet list)
- A diagram would have >8 nodes (split into two or simplify)
