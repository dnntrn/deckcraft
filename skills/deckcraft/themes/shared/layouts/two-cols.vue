<template>
  <div class="two-cols-layout">
    <slot />
  </div>
</template>

<style>
.two-cols-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.two-cols-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0;
  color: var(--c-heading);
}
.two-cols-layout .cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--c-space-12, 3rem);
  flex: 1;
  min-height: 0;
  margin-top: var(--c-space-6, 1.5rem);
}
.two-cols-layout .cols > * { overflow: hidden; min-width: 0; min-height: 0; }
.two-cols-layout .col-text { display: flex; flex-direction: column; justify-content: center; }
.two-cols-layout .col-media {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--c-radius-lg, 1rem);
  overflow: hidden;
}
.two-cols-layout .col-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--c-radius-lg, 1rem);
}
.two-cols-layout .col-media .placeholder {
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
}
.two-cols-layout h3 {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  font-weight: var(--c-weight-semibold, 600);
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
  color: var(--c-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.two-cols-layout p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
  color: var(--c-foreground);
}
.two-cols-layout ul, .two-cols-layout ol {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.8;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
}
.two-cols-layout li { margin-bottom: var(--c-space-1.5, 0.375rem); }
</style>