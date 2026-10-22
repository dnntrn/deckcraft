<template>
  <div class="impact-layout">
    <slot />
  </div>
</template>

<style>
.impact-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--c-pad-centered, 3.5rem);
  overflow: hidden;
  background: var(--c-canvas);
}
.impact-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-impact, 4.5rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.04em);
  line-height: 1.05;
  margin: 0 0 var(--c-space-3, 0.75rem) 0;
  color: var(--c-heading);
}
.impact-layout h1::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  background: var(--c-highlight);
  border-radius: 2px;
  margin: var(--c-space-4, 1rem) auto 0;
}
.impact-layout p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.55;
  letter-spacing: 0.02em;
  color: var(--c-foreground);
  margin: 0;
  max-width: 700px;
}
.impact-layout .text-sm {
  display: block;
  margin-top: var(--c-space-3, 0.75rem);
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
  font-family: var(--c-tertiary, var(--c-font));
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
</style>