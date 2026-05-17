<template>
  <div class="content-layout">
    <slot />
  </div>
</template>

<style>
.content-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 44px 52px 36px 52px;
  position: relative;
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
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 12px 0;
  color: var(--c-accent);
  padding-bottom: 10px;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, var(--c-accent), transparent 60%) 1;
}
.content-layout h2 {
  font-family: var(--c-mono);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 8px 0;
  color: var(--c-foreground);
}
.content-layout h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: var(--c-muted);
  font-family: var(--c-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.content-layout p { font-size: 17px; line-height: 1.5; margin: 0 0 8px 0; color: var(--c-foreground); }
.content-layout ul, .content-layout ol { font-size: 17px; line-height: 1.45; padding-left: 1.3em; margin: 0 0 8px 0; }
.content-layout li { margin-bottom: 4px; }
.content-layout li::marker { color: var(--c-accent); opacity: 0.6; }
.content-layout strong { font-weight: 600; }
.content-layout a { color: var(--c-accent); text-decoration: none; border-bottom: 1px solid var(--c-accent); opacity: 0.7; }
.content-layout small, .content-layout .text-sm { font-size: 14px; color: var(--c-muted); }
.content-layout pre {
  position: relative;
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 22px 20px 14px 20px !important;
  margin: 8px 0;
  font-family: var(--c-mono);
  font-size: 14px;
  line-height: 1.45;
  overflow: auto;
  max-height: 400px;
  box-shadow: 0 1px 0 oklch(100% 0 0 / 0.02) inset, 0 8px 24px oklch(0% 0 0 / 0.2);
}
.content-layout pre::before {
  content: '';
  display: block;
  position: absolute;
  top: 9px;
  left: 13px;
  width: 32px;
  height: 7px;
  background-image:
    radial-gradient(circle 3px, var(--c-code-dot-red) 100%, transparent 100%),
    radial-gradient(circle 3px, var(--c-code-dot-yellow) 100%, transparent 100%),
    radial-gradient(circle 3px, var(--c-code-dot-green) 100%, transparent 100%);
  background-position: 0 0, 11px 0, 22px 0;
  background-repeat: no-repeat;
  opacity: 0.5;
}
.content-layout pre code { background: transparent !important; color: var(--c-code-fg); padding: 0; font-size: 14px; }
.content-layout :not(pre) > code {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--c-mono);
  font-size: 0.88em;
  border: 1px solid var(--c-border);
}
.content-layout blockquote { border-left: 2px solid var(--c-accent); padding: 4px 0 4px 16px; margin: 8px 0; color: var(--c-muted); font-size: 17px; line-height: 1.5; }
.content-layout table { width: 100%; border-collapse: collapse; font-size: 15px; margin: 8px 0; }
.content-layout thead { border-bottom: 1px solid var(--c-accent); }
.content-layout th { text-align: left; font-weight: 600; color: var(--c-muted); padding: 7px 10px; font-family: var(--c-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
.content-layout td { padding: 6px 10px; border-bottom: 1px solid var(--c-border); }
.content-layout tr:last-child td { border-bottom: none; }
.content-layout .split { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; min-height: 0; }
.content-layout .split > * { overflow: hidden; min-width: 0; min-height: 0; }
.content-layout .split pre { max-height: 300px; font-size: 13px; }
.content-layout .split h1 { font-size: 26px; padding-bottom: 8px; }
</style>
