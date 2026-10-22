<template>
  <div class="divider-layout">
    <slot />
  </div>
</template>

<style>
.divider-layout {
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
.divider-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-divider, 2.5rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.2;
  margin: 0 0 var(--c-space-3.5, 0.875rem) 0;
  color: var(--c-heading);
}
.divider-layout h1::after {
  content: '';
  display: block;
  width: 4rem;
  height: 3px;
  background: var(--c-highlight);
  margin: var(--c-space-4, 1rem) auto 0;
  border-radius: var(--c-radius-xs, 0.125rem);
}
.divider-layout h2 {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
  font-weight: var(--c-weight-medium, 500);
  color: var(--c-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: var(--c-space-2, 0.5rem) 0 0 0;
}
.divider-layout p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  color: var(--c-muted);
  letter-spacing: 0.02em;
  margin: var(--c-space-1, 0.25rem) 0 0 0;
}
</style>