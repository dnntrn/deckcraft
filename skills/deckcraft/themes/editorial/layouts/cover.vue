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
  padding: 72px 80px;
  overflow: hidden;
  background: var(--c-canvas);
}
.cover-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 800px 400px at 25% 40%, var(--c-accent-dim) 0%, transparent 60%);
  pointer-events: none;
}
.cover-layout h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin: 0 0 14px 0;
  color: var(--c-foreground);
  max-width: 860px;
}
.cover-layout p {
  font-size: 18px;
  line-height: 1.55;
  color: var(--c-muted);
  margin: 0 0 5px 0;
  font-style: italic;
}
.cover-layout .author {
  margin-top: 32px;
  font-size: 14px;
  color: var(--c-muted);
  font-family: var(--c-mono);
  font-style: normal;
}
</style>
