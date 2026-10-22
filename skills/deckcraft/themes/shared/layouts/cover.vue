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
  justify-content: flex-end;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
}
.cover-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-cover, 3.5rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.05;
  margin: 0 0 var(--c-space-6, 1.5rem) 0;
  color: var(--c-heading);
  max-width: 860px;
}
.cover-layout h1 + p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.6;
  letter-spacing: 0.04em;
  margin: 0;
  color: var(--c-foreground);
}
.cover-layout .author {
  margin-top: var(--c-space-8, 2rem);
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
  font-family: var(--c-tertiary, var(--c-font));
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
</style>