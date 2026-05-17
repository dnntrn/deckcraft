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
  padding: 40px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}
.impact-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 500px 300px at 50% 50%, var(--c-accent-glow) 0%, transparent 65%);
  pointer-events: none;
}
.impact-layout h1 {
  font-family: var(--c-mono);
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 8px 0;
  color: var(--c-accent);
}
.impact-layout p { font-size: 16px; color: var(--c-muted); margin: 0; }
.impact-layout .text-sm { display: block; margin-top: 8px; font-size: 13px; color: var(--c-muted); font-family: var(--c-mono); letter-spacing: 0.02em; }
</style>
