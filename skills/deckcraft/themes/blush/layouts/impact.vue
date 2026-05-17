<template>
  <div class="impact-layout">
    <slot />
  </div>
</template>

<style>
.impact-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 56px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}
.impact-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 500px 300px at 50% 50%, var(--c-accent-glow) 0%, transparent 60%),
    radial-gradient(ellipse 600px 120px at 50% 85%, oklch(62% 0.12 15 / 0.04) 0%, transparent 70%);
  pointer-events: none;
}
.impact-layout h1 {
  font-family: var(--c-display);
  font-size: 54px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0 0 10px 0;
  color: var(--c-accent);
}
.impact-layout p { font-size: 18px; color: var(--c-muted); margin: 0; }
.impact-layout .text-sm { display: block; margin-top: 10px; font-size: 14px; color: var(--c-muted); }
</style>
