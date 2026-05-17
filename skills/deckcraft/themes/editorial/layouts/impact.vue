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
  padding: 64px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}
.impact-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 500px 300px at 50% 50%, var(--c-accent-dim) 0%, transparent 65%);
  pointer-events: none;
}
.impact-layout h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0 0 10px 0;
  color: var(--c-accent);
}
.impact-layout p { font-size: 18px; color: var(--c-muted); margin: 0; }
.impact-layout .text-sm { display: block; margin-top: 10px; font-size: 14px; color: var(--c-muted); }
</style>
