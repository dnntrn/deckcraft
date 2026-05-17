<template>
  <div class="impact-layout">
    <slot />
  </div>
</template>

<style scoped>
.impact-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 56px;
  background:
    radial-gradient(ellipse 600px 300px at 50% 50%, var(--c-accent-dim, oklch(68% 0.22 260 / 0.08)) 0%, transparent 70%);
}

.impact-layout :deep(h1) {
  font-size: 72px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 12px 0;
  color: var(--c-accent);
}

.impact-layout :deep(p) {
  font-size: 22px;
  color: var(--c-muted);
  margin: 0;
  max-width: 48ch;
}

.impact-layout :deep(.text-sm) {
  font-size: 16px;
  color: var(--c-muted);
  margin-top: 8px;
  font-family: var(--c-mono);
}
</style>
