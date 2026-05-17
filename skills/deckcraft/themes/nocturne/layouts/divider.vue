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
  padding: 48px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}

.divider-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 500px 250px at 50% 50%,
      var(--c-accent-glow) 0%,
      transparent 55%);
  pointer-events: none;
}

.divider-layout h1 {
  font-family: var(--c-mono);
  font-size: clamp(32px, 4.5vw, 42px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 14px 0;
  color: var(--c-accent);
}

.divider-layout h1::after {
  content: '';
  display: block;
  width: 40px;
  height: 2px;
  background: var(--c-accent);
  margin: 16px auto 0;
  opacity: 0.5;
}

.divider-layout h2 {
  font-size: clamp(14px, 1.8vw, 17px);
  font-weight: 400;
  color: var(--c-muted);
  margin: 0;
}

.divider-layout p {
  font-size: clamp(14px, 1.8vw, 17px);
  color: var(--c-muted);
  margin: 4px 0 0 0;
}
</style>
