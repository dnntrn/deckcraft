<template>
  <div class="content-layout">
    <slot />
  </div>
</template>

<style>
.content-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 36px 48px 32px 48px;
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.content-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 600px 120px at 50% 2%, var(--c-accent-dim) 0%, transparent 70%);
  opacity: 0.4;
  pointer-events: none;
}
.content-layout h1 {
  font-family: var(--c-mono);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 10px 0;
  color: var(--c-accent);
  padding-bottom: 8px;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, var(--c-accent), transparent 60%) 1;
}
.content-layout h2 {
  font-family: var(--c-mono);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 6px 0;
  color: var(--c-foreground);
}
.content-layout h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--c-muted);
  font-family: var(--c-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.content-layout p { font-size: 16px; line-height: 1.45; margin: 0 0 7px 0; color: var(--c-foreground); }
.content-layout ul, .content-layout ol { font-size: 16px; line-height: 1.4; padding-left: 1.2em; margin: 0 0 7px 0; }
.content-layout li { margin-bottom: 3px; }
.content-layout li::marker { color: var(--c-accent); opacity: 0.6; }
.content-layout strong { font-weight: 600; }
.content-layout a { color: var(--c-accent); text-decoration: none; border-bottom: 1px solid var(--c-accent); opacity: 0.7; }
.content-layout small, .content-layout .text-sm { font-size: 13px; color: var(--c-muted); }
.content-layout pre {
  position: relative;
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 20px 18px 12px 18px !important;
  margin: 8px 0;
  font-family: var(--c-mono);
  font-size: 13px;
  line-height: 1.4;
  overflow: auto;
  max-height: 380px;
  box-shadow: 0 1px 0 oklch(100% 0 0 / 0.01) inset, 0 6px 20px oklch(0% 0 0 / 0.15);
}
.content-layout pre::before {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  left: 12px;
  width: 28px;
  height: 6px;
  background-image:
    radial-gradient(circle 2.5px, var(--c-code-dot-red) 100%, transparent 100%),
    radial-gradient(circle 2.5px, var(--c-code-dot-yellow) 100%, transparent 100%),
    radial-gradient(circle 2.5px, var(--c-code-dot-green) 100%, transparent 100%);
  background-position: 0 0, 10px 0, 20px 0;
  background-repeat: no-repeat;
  opacity: 0.45;
}
.content-layout pre code { background: transparent !important; color: var(--c-code-fg); padding: 0; font-size: 13px; }
.content-layout :not(pre) > code {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: var(--c-mono);
  font-size: 0.88em;
  border: 1px solid var(--c-border);
}
.content-layout blockquote { border-left: 2px solid var(--c-accent); padding: 3px 0 3px 14px; margin: 8px 0; color: var(--c-muted); font-size: 15px; line-height: 1.4; }
.content-layout table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 8px 0; }
.content-layout thead { border-bottom: 1px solid var(--c-accent); }
.content-layout th { text-align: left; font-weight: 600; color: var(--c-muted); padding: 6px 10px; font-family: var(--c-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
.content-layout td { padding: 5px 10px; border-bottom: 1px solid var(--c-border); }
.content-layout tr:last-child td { border-bottom: none; }
.content-layout .split { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; min-height: 0; }
.content-layout .split > * { overflow: hidden; min-width: 0; min-height: 0; }
.content-layout .split pre { max-height: 280px; font-size: 12px; }
.content-layout .split h1 { font-size: 22px; padding-bottom: 6px; }
</style>

/* Built-in grid utilities — use these, don't set custom font sizes in scoped styles */

.content-layout .grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.content-layout .grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
.content-layout .grid-2 > .card,
.content-layout .grid-3 > .card {
  padding: 8px 12px;
  background: var(--c-code-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.35;
}
.content-layout .card-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--c-foreground);
  margin-bottom: 2px;
}
.content-layout .card-desc {
  font-size: 12px;
  color: var(--c-muted);
}
