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
  padding: 48px;
  position: relative;
  overflow: hidden;
  background: var(--c-canvas);
}

.impact-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 500px 350px at 50% 50%,
      var(--c-accent-glow) 0%,
      transparent 65%),
    radial-gradient(ellipse 700px 150px at 50% 90%,
      oklch(63% 0.16 260 / 0.04) 0%,
      transparent 70%);
  pointer-events: none;
}

.impact-layout h1 {
  font-size: clamp(40px, 6vw, 56px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 10px 0;
  color: var(--c-foreground);
}

.impact-layout p {
  font-size: clamp(16px, 2vw, 19px);
  color: var(--c-muted);
  margin: 0;
}

.impact-layout .text-sm {
  display: block;
  margin-top: 10px;
  font-size: clamp(13px, 1.6vw, 15px);
  color: var(--c-muted);
  font-family: var(--c-mono);
  letter-spacing: 0.02em;
}
</style>
