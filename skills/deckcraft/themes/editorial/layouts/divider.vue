<template>
  <div class="divider-layout">
    <slot />
  </div>
</template>

<style>
.divider-layout {
  position: absolute;
  inset: 0;
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
.divider-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 500px 200px at 50% 50%, var(--c-accent-dim) 0%, transparent 55%);
  pointer-events: none;
}
.divider-layout h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 44px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.2;
  margin: 0 0 12px 0;
  color: var(--c-foreground);
}
.divider-layout h1::after {
  content: '';
  display: block;
  width: 36px;
  height: 2px;
  background: var(--c-accent);
  margin: 16px auto 0;
}
.divider-layout h2 { font-size: 16px; font-weight: 400; color: var(--c-muted); margin: 0; }
.divider-layout p { font-size: 16px; color: var(--c-muted); margin: 4px 0 0 0; }
</style>
