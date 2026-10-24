<template>
  <div class="bento-grid-layout">
    <slot />
  </div>
</template>

<style>
.bento-grid-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.bento-grid-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0 0 var(--c-space-6, 1.5rem) 0;
  color: var(--c-heading);
}
.bento-grid-layout h1 + p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.6;
  margin: 0 0 var(--c-space-5, 1.25rem) 0;
  color: var(--c-foreground);
}
.bento-grid-layout .bento-grid {
  display: grid;
  grid-template-columns: var(--dc-bento-columns, 1.25fr 0.9fr 0.9fr);
  grid-auto-rows: minmax(140px, 1fr);
  gap: var(--c-space-5, 1.25rem);
  flex: 1;
  min-height: 0;
}
.bento-grid-layout .bento-item {
  padding: var(--c-space-6, 1.5rem);
  background: var(--c-card-bg);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  overflow: hidden;
  min-height: 0;
}
.bento-grid-layout .bento-wide { grid-column: span 2; }
.bento-grid-layout .bento-tall { grid-row: span 2; }
.bento-grid-layout .bento-item h2 {
  font-family: var(--c-display);
  font-size: var(--c-text-h2, 1.375rem);
  font-weight: var(--c-heading-weight, 400);
  line-height: 1.2;
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
  color: var(--c-foreground);
}
.bento-grid-layout .bento-item p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.55;
  margin: 0;
  color: var(--c-muted);
}
.bento-grid-layout .bento-item .card-tag {
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
.bento-grid-layout .bento-item .card-title {
  font-family: var(--c-display);
  font-size: var(--c-text-xl, 1.25rem);
  font-weight: var(--c-heading-weight, 400);
  color: var(--c-foreground);
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
}
.bento-grid-layout .bento-item .card-desc {
  font-family: var(--c-font);
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.45;
  color: var(--c-muted);
  margin: 0;
}
</style>
