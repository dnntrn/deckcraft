<template>
  <div class="cover-layout">
    <slot />
  </div>
</template>

<style>
.cover-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 72px;
  overflow: hidden;
  background: var(--c-canvas);
}
.cover-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 700px 300px at 30% 45%, var(--c-accent-dim) 0%, transparent 60%);
  pointer-events: none;
}
.cover-layout h1 {
  font-size: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  margin: 0 0 12px 0;
  color: var(--c-accent);
  max-width: 860px;
}
.cover-layout p { font-size: 16px; line-height: 1.5; color: var(--c-muted); margin: 0 0 4px 0; }
.cover-layout .author { margin-top: 24px; font-size: 13px; color: var(--c-muted); }
</style>
