<template>
  <div class="big-code-layout">
    <slot />
  </div>
</template>

<style>
.big-code-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.big-code-layout .code-header {
  display: flex;
  align-items: center;
  gap: var(--c-space-2, 0.5rem);
  padding: var(--c-space-4, 1rem) var(--c-space-20, 5rem) 0 var(--c-space-20, 5rem);
  position: relative;
  z-index: 1;
}
.big-code-layout .code-dots {
  display: flex;
  gap: 6px;
  margin-right: var(--c-space-3, 0.75rem);
}
.big-code-layout .code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-highlight);
  opacity: 0.3;
}
.big-code-layout .code-dots span:first-child {
  background: var(--c-code-dot-red, oklch(55% 0.18 20));
  opacity: 0.7;
}
.big-code-layout .code-dots span:nth-child(2) {
  background: var(--c-code-dot-yellow, oklch(58% 0.16 85));
  opacity: 0.5;
}
.big-code-layout .code-dots span:last-child {
  background: var(--c-code-dot-green, oklch(52% 0.16 155));
  opacity: 0.5;
}
.big-code-layout .code-filename {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  color: var(--c-muted);
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  padding: 4px 12px;
  border-radius: var(--c-radius-sm, 0.375rem) var(--c-radius-sm, 0.375rem) 0 0;
  letter-spacing: 0.04em;
}
.big-code-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  margin: 0;
  padding: var(--c-space-3, 0.75rem) var(--c-space-20, 5rem) 0 var(--c-space-20, 5rem);
  color: var(--c-heading);
  position: relative;
  z-index: 1;
}
.big-code-layout pre {
  flex: 1;
  margin: var(--c-space-3, 0.75rem) var(--c-space-20, 5rem) var(--c-space-5, 1.25rem) var(--c-space-20, 5rem);
  padding: var(--c-space-6, 1.5rem) var(--c-space-7, 1.75rem) !important;
  background: var(--c-glass-bg) !important;
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-md, 0.75rem);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  overflow: auto;
  box-shadow: var(--c-glass-shadow);
  position: relative;
  z-index: 1;
}
.big-code-layout pre code {
  background: transparent !important;
  color: var(--c-code-fg);
  padding: 0;
  font-size: var(--c-text-base, 1rem);
}
.big-code-layout .text-sm {
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
  font-family: var(--c-tertiary, var(--c-font));
  letter-spacing: 0.04em;
  padding: 0 var(--c-space-20, 5rem) var(--c-space-4, 1rem) var(--c-space-20, 5rem);
  position: relative;
  z-index: 1;
}
</style>