<template>
  <div class="asymmetric-split-layout">
    <slot />
  </div>
</template>

<style>
.asymmetric-split-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.asymmetric-split-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0;
  color: var(--c-heading);
}
.asymmetric-split-layout h1 + p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.6;
  letter-spacing: 0.04em;
  margin: var(--c-space-5, 1.25rem) 0 0 0;
  color: var(--c-foreground);
}
.asymmetric-split-layout h2 {
  font-family: var(--c-display);
  font-size: var(--c-text-h2, 1.375rem);
  font-weight: var(--c-heading-weight, 400);
  line-height: 1.25;
  margin: var(--c-space-5, 1.25rem) 0 var(--c-space-2, 0.5rem) 0;
  color: var(--c-foreground);
}
.asymmetric-split-layout p,
.asymmetric-split-layout ul,
.asymmetric-split-layout ol {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.65;
  margin: 0 0 var(--c-space-3, 0.75rem) 0;
  color: var(--c-foreground);
}
.asymmetric-split-layout li { margin-bottom: var(--c-space-2, 0.5rem); }
.asymmetric-split-layout .split {
  display: grid;
  grid-template-columns: var(--dc-split-columns, 45fr 55fr);
  gap: var(--c-space-12, 3rem);
  flex: 1;
  min-height: 0;
  margin-top: var(--c-space-6, 1.5rem);
}
.asymmetric-split-layout .split > * {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.asymmetric-split-layout .split > :first-child {
  align-self: center;
}
.asymmetric-split-layout .split > :last-child {
  align-self: stretch;
}
.asymmetric-split-layout .placeholder,
.asymmetric-split-layout .card {
  height: 100%;
  min-height: 240px;
}
.asymmetric-split-layout .placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  color: var(--c-muted);
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
}
</style>
