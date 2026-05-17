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
  padding: 56px 64px 48px 64px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.content-layout h1 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 14px 0;
  color: var(--c-accent);
}
.content-layout h2 {
  font-size: 24px;
  font-weight: 600;
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
  letter-spacing: 0.04em;
}
.content-layout p { font-size: 18px; line-height: 1.55; margin: 0 0 10px 0; color: var(--c-foreground); }
.content-layout ul, .content-layout ol { font-size: 18px; line-height: 1.5; padding-left: 1.3em; margin: 0 0 10px 0; }
.content-layout li { margin-bottom: 5px; }
.content-layout li::marker { color: var(--c-accent); opacity: 0.5; }
.content-layout strong { font-weight: 600; }
.content-layout a { color: var(--c-accent); text-decoration: none; border-bottom: 1px solid oklch(55% 0.22 260 / 0.3); }
.content-layout small, .content-layout .text-sm { font-size: 14px; color: var(--c-muted); }
.content-layout pre {
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 20px 22px !important;
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
  max-height: 420px;
}
.content-layout pre code { background: transparent !important; color: var(--c-code-fg); padding: 0; font-size: 14px; }
.content-layout :not(pre) > code {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 7px;
  border-radius: 4px;
  font-family: var(--c-mono);
  font-size: 0.88em;
  border: 1px solid var(--c-border);
}
.content-layout blockquote { border-left: 2px solid var(--c-accent); padding: 4px 0 4px 18px; margin: 10px 0; color: var(--c-muted); font-size: 17px; line-height: 1.5; }
.content-layout table { width: 100%; border-collapse: collapse; font-size: 16px; margin: 10px 0; }
.content-layout thead { border-bottom: 1px solid var(--c-accent); }
.content-layout th { text-align: left; font-weight: 600; color: var(--c-muted); padding: 8px 12px; font-family: var(--c-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
.content-layout td { padding: 7px 12px; border-bottom: 1px solid var(--c-border); }
.content-layout tr:last-child td { border-bottom: none; }
.content-layout .split { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; min-height: 0; }
.content-layout .split > * { overflow: hidden; min-width: 0; min-height: 0; }
.content-layout .split pre { max-height: 320px; font-size: 13px; }
.content-layout .split h1 { font-size: 28px; }
</style>
