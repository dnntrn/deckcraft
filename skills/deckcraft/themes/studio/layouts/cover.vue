<template>
  <div class="cover-layout">
    <slot />
  </div>
</template>

<style scoped>
.cover-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  background:
    radial-gradient(ellipse 800px 500px at 30% 50%, var(--c-accent-dim, oklch(58% 0.22 260 / 0.08)) 0%, transparent 70%);
}

.cover-layout :deep(h1) {
  font-size: 58px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 16px 0;
  color: var(--c-foreground);
}

.cover-layout :deep(p) {
  font-size: 22px;
  color: var(--c-muted);
  margin: 0 0 8px 0;
  max-width: 56ch;
}

.cover-layout :deep(.author) {
  margin-top: 40px;
  font-size: 18px;
  color: var(--c-muted);
}
</style>
