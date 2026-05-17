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
  padding: 56px 64px;
  overflow: hidden;
  background: var(--c-canvas);
}
.cover-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 800px 350px at 35% 40%, var(--c-accent-glow) 0%, transparent 60%),
    radial-gradient(ellipse 300px 200px at 75% 65%, oklch(63% 0.16 260 / 0.06) 0%, transparent 70%);
  opacity: 0.7;
  pointer-events: none;
}
.cover-layout h1 {
  font-family: var(--c-mono);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 10px 0;
  color: var(--c-accent);
  max-width: 900px;
}
.cover-layout p { font-size: 15px; line-height: 1.5; color: var(--c-muted); margin: 0 0 4px 0; }
.cover-layout .author { margin-top: 24px; font-size: 13px; color: var(--c-muted); font-family: var(--c-mono); letter-spacing: 0.02em; }
</style>
