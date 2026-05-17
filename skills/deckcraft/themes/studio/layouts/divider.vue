<template>
  <div class="divider-layout">
    <slot />
  </div>
</template>

<style scoped>
.divider-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 56px;
}

.divider-layout :deep(h1) {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 52px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.2;
  margin: 0 0 20px 0;
  color: var(--c-foreground);
  position: relative;
}

.divider-layout :deep(h1::after) {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background: var(--c-accent);
  margin: 16px auto 0;
}

.divider-layout :deep(h2) {
  font-size: 18px;
  font-weight: 400;
  color: var(--c-muted);
  margin: 0;
}

.divider-layout :deep(p) {
  font-size: 18px;
  color: var(--c-muted);
  margin: 0;
}
</style>
