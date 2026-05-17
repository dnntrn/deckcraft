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
    radial-gradient(ellipse 800px 500px at 40% 50%, var(--c-accent-glow, oklch(68% 0.22 260 / 0.15)) 0%, transparent 60%),
    repeating-linear-gradient(0deg, transparent, transparent 39px, oklch(100% 0 0 / 0.012) 39px, oklch(100% 0 0 / 0.012) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, oklch(100% 0 0 / 0.012) 39px, oklch(100% 0 0 / 0.012) 40px);
}

.cover-layout :deep(h1) {
  font-size: 58px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 16px 0;
  color: var(--c-accent);
  text-shadow: 0 0 60px var(--c-accent-glow);
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

.cover-layout :deep(strong) {
  color: var(--c-foreground);
}
</style>
