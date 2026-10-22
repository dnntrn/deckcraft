<template>
  <div class="quote-layout">
    <slot />
  </div>
</template>

<style>
.quote-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--c-space-20, 5rem) var(--c-space-20, 5rem) var(--c-space-20, 5rem) var(--c-space-20, 5rem);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.quote-layout .quote-mark {
  font-family: var(--c-display);
  font-size: 140px;
  line-height: 1;
  color: var(--c-highlight);
  opacity: 0.15;
  position: absolute;
  top: 50px;
  left: 70px;
  pointer-events: none;
}
.quote-layout blockquote {
  font-family: var(--c-display);
  font-size: var(--c-text-xl, 1.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: -0.01em;
  line-height: 1.5;
  color: var(--c-foreground);
  margin: 0 0 var(--c-space-8, 2rem) 0;
  max-width: 900px;
  position: relative;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 0;
}
.quote-layout blockquote::before {
  display: none;
}
.quote-layout .attribution {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--c-space-1, 0.25rem);
}
.quote-layout .attribution-line {
  width: 40px;
  height: 3px;
  background: var(--c-highlight);
  border-radius: 2px;
  margin-bottom: var(--c-space-2, 0.5rem);
}
.quote-layout .attribution-name {
  font-family: var(--c-display);
  font-size: var(--c-text-xl, 1.25rem);
  font-weight: var(--c-heading-weight, 400);
  color: var(--c-accent);
}
.quote-layout .attribution-role {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--c-muted);
}
</style>