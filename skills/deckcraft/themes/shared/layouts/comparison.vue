<template>
  <div class="comparison-layout">
    <slot />
  </div>
</template>

<style>
.comparison-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.comparison-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0 0 var(--c-space-6, 1.5rem) 0;
  color: var(--c-heading);
}
.comparison-layout .compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  flex: 1;
  min-height: 0;
  position: relative;
}
.comparison-layout .compare-col {
  padding: var(--c-space-6, 1.5rem) var(--c-space-8, 2rem);
  overflow-y: auto;
}
.comparison-layout .compare-col:first-child {
  border-right: 1px solid var(--c-border);
}
.comparison-layout .compare-label {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  font-weight: var(--c-weight-semibold, 600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--c-muted);
  margin: 0 0 var(--c-space-4, 1rem) 0;
}
.comparison-layout .compare-label.accent {
  color: var(--c-highlight);
}
.comparison-layout .compare-col h2 {
  font-family: var(--c-display);
  font-size: var(--c-text-h2, 1.375rem);
  font-weight: var(--c-heading-weight, 400);
  line-height: 1.25;
  margin: 0 0 var(--c-space-4, 1rem) 0;
  color: var(--c-foreground);
}
.comparison-layout .compare-col p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  color: var(--c-foreground);
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
}
.comparison-layout .compare-col ul {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
}
.comparison-layout .compare-col li { margin-bottom: var(--c-space-1.5, 0.375rem); }

.comparison-layout .compare-divider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: 50%;
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  font-weight: var(--c-weight-semibold, 600);
  color: var(--c-muted);
  z-index: 1;
}
</style>