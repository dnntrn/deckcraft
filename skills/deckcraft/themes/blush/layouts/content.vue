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
  padding: 60px 72px 68px 72px;
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.content-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 600px 140px at 50% 2%, var(--c-accent-dim) 0%, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}
.content-layout h1 {
  font-family: var(--c-display);
  font-size: 38px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0 0 12px 0;
  color: var(--c-accent);
  padding-bottom: 10px;
  border-bottom: 1px solid oklch(58% 0.14 15 / 0.25);
}
.content-layout h2 {
  font-family: var(--c-display);
  font-size: 26px;
  font-weight: 400;
  line-height: 1.25;
  margin: 0 0 10px 0;
  color: var(--c-foreground);
}
.content-layout h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: var(--c-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.content-layout p { font-size: 18px; line-height: 1.6; margin: 0 0 10px 0; color: var(--c-foreground); }
.content-layout ul, .content-layout ol { font-size: 18px; line-height: 1.55; padding-left: 1.3em; margin: 0 0 10px 0; }
.content-layout li { margin-bottom: 5px; }
.content-layout li::marker { color: var(--c-accent); opacity: 0.5; }
.content-layout strong { font-weight: 600; }
.content-layout a { color: var(--c-accent); text-decoration: none; border-bottom: 1px solid oklch(58% 0.14 15 / 0.3); }
.content-layout small, .content-layout .text-sm { font-size: 14px; color: var(--c-muted); }
.content-layout pre {
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 20px 22px !important;
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.55;
  overflow: auto;
  max-height: 420px;
  box-shadow: 0 2px 8px oklch(0% 0 0 / 0.03);
}
.content-layout pre code { background: transparent !important; color: var(--c-code-fg); padding: 0; font-size: 14px; }
.content-layout :not(pre) > code {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 8px;
  border-radius: 6px;
  font-family: var(--c-mono);
  font-size: 0.88em;
  border: 1px solid var(--c-border);
}
.content-layout blockquote {
  border-left: 2px solid var(--c-accent);
  padding: 4px 0 4px 18px;
  margin: 10px 0;
  color: var(--c-muted);
  font-family: var(--c-display);
  font-size: 19px;
  line-height: 1.55;
  font-style: italic;
}
.content-layout table { position: absolute;
  inset: 0; border-collapse: collapse; font-size: 16px; margin: 10px 0; }
.content-layout thead { border-bottom: 1px solid var(--c-accent); }
.content-layout th { text-align: left; font-weight: 600; color: var(--c-muted); padding: 8px 12px; font-family: var(--c-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
.content-layout td { padding: 7px 12px; border-bottom: 1px solid var(--c-border); }
.content-layout tr:last-child td { border-bottom: none; }
.content-layout .split { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; min-height: 0; }
.content-layout .split > * { overflow: hidden; min-width: 0; min-height: 0; }
.content-layout .split pre { max-height: 320px; font-size: 13px; }
.content-layout .split h1 { font-size: 28px; padding-bottom: 8px; }
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
