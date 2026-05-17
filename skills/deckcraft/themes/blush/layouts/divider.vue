<template>
  <div class="divider-layout">
    <slot />
  </div>
</template>

<style>
.divider-layout {
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
.divider-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 500px 220px at 50% 50%, var(--c-accent-glow) 0%, transparent 55%),
    radial-gradient(circle 200px at 50% 50%, oklch(62% 0.10 15 / 0.03) 0%, transparent 100%);
  pointer-events: none;
}
.divider-layout h1 {
  font-family: var(--c-display);
  font-size: 42px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.2;
  margin: 0 0 12px 0;
  color: var(--c-accent);
}
.divider-layout h1::after {
  content: '';
  display: block;
  width: 32px;
  height: 2px;
  background: var(--c-accent);
  margin: 14px auto 0;
  border-radius: 1px;
}
.divider-layout h2 { font-size: 16px; font-weight: 400; color: var(--c-muted); margin: 0; }
.divider-layout p { font-size: 16px; color: var(--c-muted); margin: 4px 0 0 0; }
</style>
