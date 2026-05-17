<template>
  <div class="cover-layout">
    <slot />
  </div>
</template>

<style>
.cover-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 72px;
  position: relative;
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
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  margin: 0 0 14px 0;
  color: var(--c-accent);
  max-width: 860px;
}
.cover-layout p { font-size: 18px; line-height: 1.5; color: var(--c-muted); margin: 0 0 4px 0; }
.cover-layout .author { margin-top: 32px; font-size: 14px; color: var(--c-muted); }
</style>
