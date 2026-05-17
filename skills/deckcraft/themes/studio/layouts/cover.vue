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
    radial-gradient(ellipse 800px 400px at 25% 40%, var(--c-accent-dim) 0%, transparent 60%),
    radial-gradient(ellipse 300px 250px at 80% 60%, oklch(58% 0.22 260 / 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.cover-layout h1 {
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 16px 0;
  color: var(--c-foreground);
  max-width: 860px;
}

.cover-layout p {
  font-size: clamp(16px, 1.9vw, 19px);
  line-height: 1.5;
  color: var(--c-muted);
  margin: 0 0 5px 0;
}

.cover-layout .author {
  margin-top: 36px;
  font-size: 15px;
  color: var(--c-muted);
  font-family: var(--c-mono);
}
</style>
