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
  padding: 56px;
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
  font-size: 34px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 10px 0;
  color: var(--c-accent);
}
.divider-layout h1::after {
  content: '';
  display: block;
  width: 30px;
  height: 2px;
  background: var(--c-accent);
  margin: 12px auto 0;
}
.divider-layout h2 { font-size: 14px; font-weight: 400; color: var(--c-muted); margin: 0; }
.divider-layout p { font-size: 14px; color: var(--c-muted); margin: 3px 0 0 0; }
</style>
