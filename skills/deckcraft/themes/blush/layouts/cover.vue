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
  padding: 64px 80px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}
.cover-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 700px 400px at 30% 40%, var(--c-accent-glow) 0%, transparent 55%),
    radial-gradient(ellipse 300px 250px at 80% 55%, oklch(62% 0.12 15 / 0.04) 0%, transparent 70%);
  pointer-events: none;
}
.cover-layout h1 {
  font-family: var(--c-display);
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin: 0 0 14px 0;
  color: var(--c-accent);
  max-width: 860px;
}
.cover-layout p {
  font-size: 18px;
  line-height: 1.55;
  color: var(--c-muted);
  margin: 0 0 4px 0;
}
.cover-layout .author { margin-top: 32px; font-size: 14px; color: var(--c-muted); }
</style>
