<template>
  <div class="timeline-layout">
    <slot />
  </div>
</template>

<style>
.timeline-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.timeline-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0 0 var(--c-space-3, 0.75rem) 0;
  color: var(--c-heading);
}
.timeline-layout p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
  color: var(--c-foreground);
}
.timeline-layout .timeline-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin: auto 0;
  width: 100%;
  position: relative;
}
.timeline-layout .step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 240px;
  position: relative;
}
.timeline-layout .step-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 2px solid var(--c-border);
  margin-bottom: var(--c-space-3, 0.75rem);
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.timeline-layout .step.active .step-dot,
.timeline-layout .step-dot.active {
  background: var(--c-highlight);
  border-color: var(--c-highlight);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--c-highlight) 25%, transparent);
}
.timeline-layout .step-line {
  position: absolute;
  top: 7px;
  left: calc(50% + 7px);
  width: calc(100% - 14px);
  height: 2px;
  background: var(--c-border);
}
.timeline-layout .step.active + .step .step-line,
.timeline-layout .step.active .step-line {
  background: var(--c-highlight);
}
.timeline-layout .step-title {
  font-family: var(--c-display);
  font-size: var(--c-text-base, 1rem);
  font-weight: var(--c-heading-weight, 400);
  color: var(--c-foreground);
  text-align: center;
  margin: 0 0 var(--c-space-1, 0.25rem) 0;
  line-height: 1.3;
}
.timeline-layout .step.active .step-title {
  color: var(--c-accent);
}
.timeline-layout .step-desc {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.4;
  color: var(--c-muted);
  text-align: center;
  margin: 0;
  max-width: 180px;
}
.timeline-layout .text-sm {
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
  font-family: var(--c-tertiary, var(--c-font));
  letter-spacing: 0.04em;
}
</style>