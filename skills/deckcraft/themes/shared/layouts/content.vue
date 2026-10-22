<template>
  <div class="content-layout">
    <slot />
  </div>
</template>

<style>
.content-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}

.content-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-h1, 2.25rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0 0 var(--c-space-7, 1.75rem) 0;
  color: var(--c-heading);
}

.content-layout h1 + p {
  font-family: var(--c-font);
  font-size: var(--c-text-lg, 1.125rem);
  font-weight: var(--c-weight-light, 300);
  line-height: 1.6;
  letter-spacing: 0.04em;
  margin: 0 0 var(--c-space-6, 1.5rem) 0 !important;
  color: var(--c-foreground);
}

.content-layout h2 {
  font-family: var(--c-display);
  font-size: var(--c-text-h2, 1.375rem);
  font-weight: var(--c-heading-weight, 400);
  line-height: 1.25;
  margin: var(--c-space-5, 1.25rem) 0 var(--c-space-2, 0.5rem) 0;
  color: var(--c-foreground);
}

.content-layout h3 {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-sm, 0.875rem);
  font-weight: var(--c-weight-semibold, 600);
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
  color: var(--c-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.content-layout p {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.6;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
  color: var(--c-foreground);
}

.content-layout ul,
.content-layout ol {
  font-family: var(--c-font);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.8;
  margin: 0 0 var(--c-space-2.5, 0.625rem) 0;
}

.content-layout li {
  margin-bottom: var(--c-space-2.5, 0.625rem);
}

.content-layout .content-card {
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  padding: var(--c-space-5, 1.25rem) var(--c-space-6, 1.5rem);
  box-shadow: var(--c-glass-shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.content-layout .content-card:hover {
  box-shadow: var(--c-glass-shadow-hover);
  transform: translateY(-1px);
}

.content-layout pre {
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: var(--c-radius-md, 0.75rem);
  padding: var(--c-space-4, 1rem) var(--c-space-5, 1.25rem) !important;
  margin: var(--c-space-3, 0.75rem) 0;
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.55;
  overflow: auto;
  max-height: 420px;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--c-accent) 4%, transparent), 0 1px 3px rgb(0 0 0 / 0.04);
}
.content-layout pre code {
  background: transparent !important;
  color: var(--c-code-fg);
  padding: 0;
  font-size: var(--c-text-sm, 0.875rem);
}
.content-layout :not(pre) > code {
  background: color-mix(in srgb, var(--c-accent) 6%, var(--c-code-bg));
  color: var(--c-accent);
  padding: 3px 10px;
  border-radius: var(--c-radius-sm, 0.375rem);
  font-family: var(--c-mono);
  font-size: 0.86em;
  border: 1px solid color-mix(in srgb, var(--c-accent) 15%, transparent);
}

.content-layout blockquote {
  border: none;
  padding: var(--c-space-4, 1rem) var(--c-space-6, 1.5rem);
  margin: var(--c-space-3, 0.75rem) 0;
  color: var(--c-foreground);
  font-family: var(--c-display);
  font-size: var(--c-text-base, 1rem);
  line-height: 1.5;
  font-style: var(--c-heading-style, normal);
  background: var(--c-card-bg);
  border-radius: var(--c-radius-lg, 1rem);
  position: relative;
}
.content-layout blockquote::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--c-space-3, 0.75rem);
  bottom: var(--c-space-3, 0.75rem);
  width: 3px;
  border-radius: 2px;
  background: var(--c-highlight);
}

.content-layout table {
  border-collapse: collapse;
  font-size: var(--c-text-base, 1rem);
  margin: var(--c-space-3, 0.75rem) 0;
}
.content-layout thead { border-bottom: 2px solid var(--c-highlight); }
.content-layout th {
  text-align: left;
  font-weight: var(--c-weight-semibold, 600);
  color: var(--c-muted);
  padding: var(--c-space-2, 0.5rem) var(--c-space-3, 0.75rem);
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.content-layout td {
  padding: var(--c-space-2, 0.5rem) var(--c-space-3, 0.75rem);
  border-bottom: 1px solid var(--c-border);
}
.content-layout tr:last-child td { border-bottom: none; }

.content-layout .split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--c-space-12, 3rem);
  min-height: 0;
}
.content-layout .split > * { overflow: hidden; min-width: 0; min-height: 0; }
.content-layout .split pre { max-height: 320px; font-size: var(--c-text-sm, 0.875rem); }
.content-layout .split h1 { font-size: var(--c-text-2xl, 1.5rem); }

.content-layout .grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--c-space-4, 1rem);
}
.content-layout .grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--c-space-4, 1rem);
}
.content-layout .card {
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  padding: var(--c-space-4, 1rem) var(--c-space-5, 1.25rem);
  border-radius: var(--c-radius-lg, 1rem);
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.4;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.content-layout .card:hover {
  box-shadow: var(--c-glass-shadow-hover);
  transform: translateY(-1px);
}
.content-layout .card-title {
  font-family: var(--c-display);
  font-weight: var(--c-heading-weight, 400);
  font-size: var(--c-text-base, 1rem);
  color: var(--c-foreground);
  margin-bottom: var(--c-space-1.5, 0.375rem);
}
.content-layout .card-desc {
  font-family: var(--c-font);
  font-size: var(--c-text-sm, 0.875rem);
  color: var(--c-muted);
}

.content-layout .vflow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--c-space-1.5, 0.375rem);
  margin: var(--c-space-4, 1rem) 0;
  max-height: 520px;
  overflow-y: auto;
}
.content-layout .vflow > .node {
  padding: var(--c-space-3, 0.75rem) var(--c-space-6, 1.5rem);
  background: var(--c-code-bg);
  border: 1px solid var(--c-border);
  border-radius: var(--c-radius-md, 0.75rem);
  font-family: var(--c-mono);
  font-size: var(--c-text-base, 1rem);
  color: var(--c-foreground);
  white-space: nowrap;
}
.content-layout .vflow > .node-accent {
  border-color: var(--c-highlight);
  background: var(--c-accent-dim);
  color: var(--c-accent);
  font-weight: var(--c-weight-semibold, 600);
}
.content-layout .vflow > .varr {
  color: var(--c-accent);
  font-size: var(--c-text-base, 1rem);
  line-height: 1;
  opacity: 0.5;
}
</style>