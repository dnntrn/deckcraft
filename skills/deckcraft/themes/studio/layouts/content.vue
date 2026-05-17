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
  padding: 48px 60px 40px 60px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--c-canvas);
}

.content-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 600px 150px at 50% 2%, var(--c-accent-dim) 0%, transparent 70%);
  opacity: 0.4;
  pointer-events: none;
}

.content-layout h1 {
  font-size: clamp(28px, 3.8vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 14px 0;
  color: var(--c-foreground);
  padding-left: 20px;
  border-left: 3px solid var(--c-accent);
}

.content-layout h2 {
  font-size: clamp(22px, 2.8vw, 26px);
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 10px 0;
  color: var(--c-foreground);
}

.content-layout h3 {
  font-size: clamp(17px, 2.2vw, 20px);
  font-weight: 600;
  margin: 0 0 6px 0;
  color: var(--c-muted);
  font-family: var(--c-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.content-layout p {
  font-size: clamp(17px, 2.2vw, 20px);
  line-height: 1.55;
  margin: 0 0 10px 0;
  color: var(--c-foreground);
}

.content-layout ul,
.content-layout ol {
  font-size: clamp(17px, 2.2vw, 20px);
  line-height: 1.5;
  padding-left: 1.3em;
  margin: 0 0 10px 0;
}

.content-layout li {
  margin-bottom: 5px;
}

.content-layout li::marker {
  color: var(--c-accent);
  opacity: 0.5;
}

.content-layout strong {
  font-weight: 600;
}

.content-layout a {
  color: var(--c-accent);
  text-decoration: none;
  border-bottom: 1px solid oklch(58% 0.22 260 / 0.3);
}

.content-layout small,
.content-layout .text-sm {
  font-size: clamp(13px, 1.6vw, 15px);
  color: var(--c-muted);
}

.content-layout pre {
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 20px 22px !important;
  margin: 10px 0;
  font-size: clamp(13px, 1.6vw, 15px);
  line-height: 1.5;
  overflow: auto;
  max-height: 55vh;
  box-shadow: 0 1px 3px oklch(0% 0 0 / 0.04);
}

.content-layout pre code {
  background: transparent !important;
  color: var(--c-code-fg);
  padding: 0;
  font-size: inherit;
}

.content-layout :not(pre) > code {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 7px;
  border-radius: 4px;
  font-family: var(--c-mono);
  font-size: 0.88em;
  border: 1px solid var(--c-border);
}

.content-layout blockquote {
  border-left: 2px solid var(--c-accent);
  padding: 4px 0 4px 18px;
  margin: 10px 0;
  color: var(--c-muted);
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.5;
}

.content-layout table {
  width: 100%;
  border-collapse: collapse;
  font-size: clamp(14px, 1.8vw, 17px);
  margin: 10px 0;
}

.content-layout thead {
  border-bottom: 1px solid var(--c-accent);
}

.content-layout th {
  text-align: left;
  font-weight: 600;
  color: var(--c-muted);
  padding: 8px 12px;
  font-family: var(--c-mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.content-layout td {
  padding: 7px 12px;
  border-bottom: 1px solid var(--c-border);
}

.content-layout .split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  min-height: 0;
}

.content-layout .split > * {
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}

.content-layout .split pre {
  max-height: 45vh;
  font-size: clamp(12px, 1.5vw, 14px);
}

.content-layout .split h1 {
  font-size: clamp(24px, 3vw, 28px);
  padding-left: 0;
  border-left: none;
}
</style>
