<template>
  <div class="feature-grid-layout">
    <slot />
  </div>
</template>

<style>
.feature-grid-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.feature-grid-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0;
  color: var(--c-heading);
}
.feature-grid-layout h1 + p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.6;
  letter-spacing: 0.04em;
  margin: var(--c-space-5, 1.25rem) 0 var(--c-space-6, 1.5rem) 0 !important;
  color: var(--c-foreground);
}
.feature-grid-layout .grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--c-space-5, 1.25rem);
  margin-top: var(--c-space-5, 1.25rem);
}
.feature-grid-layout .grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--c-space-5, 1.25rem);
  margin-top: var(--c-space-5, 1.25rem);
}
.feature-grid-layout .grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: var(--c-space-4, 1rem);
  margin-top: var(--c-space-5, 1.25rem);
}
.feature-grid-layout .card {
  padding: var(--c-space-6, 1.5rem);
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  box-shadow: var(--c-glass-shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.feature-grid-layout .card:hover {
  box-shadow: var(--c-glass-shadow-hover);
  transform: translateY(-2px);
  border-color: var(--c-highlight);
}
.feature-grid-layout .card-icon {
  font-size: 28px;
  margin-bottom: var(--c-space-3, 0.75rem);
  color: var(--c-highlight);
}
.feature-grid-layout .card-title {
  font-family: var(--c-display);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-heading-weight, 400);
  color: var(--c-foreground);
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
  line-height: 1.3;
}
.feature-grid-layout .card-desc {
  font-family: var(--c-font);
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.5;
  color: var(--c-muted);
  margin: 0;
}
.feature-grid-layout .card-tag {
  display: inline-block;
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  font-weight: var(--c-weight-semibold, 600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--c-accent);
  background: var(--c-highlight-dim);
  padding: 3px 10px;
  border-radius: var(--c-radius-lg, 1rem);
  margin-bottom: var(--c-space-3, 0.75rem);
}
</style>