<template>
  <div class="content-layout">
    <slot />
  </div>
</template>

<style scoped>
.content-layout {
  width: 100%;
  height: 100%;
  padding: 56px 56px 48px 56px;
  overflow: hidden;
}

.content-layout :deep(h1) {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 16px 0;
  color: var(--c-accent);
}

.content-layout :deep(h2) {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 12px 0;
  color: var(--c-foreground);
}

.content-layout :deep(h3) {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--c-muted);
}

.content-layout :deep(p) {
  font-size: 22px;
  line-height: 1.5;
  margin: 0 0 12px 0;
  color: var(--c-foreground);
}

.content-layout :deep(ul),
.content-layout :deep(ol) {
  font-size: 22px;
  line-height: 1.5;
  padding-left: 1.4em;
  margin: 0 0 12px 0;
}

.content-layout :deep(li) {
  margin-bottom: 6px;
  color: var(--c-foreground);
}

.content-layout :deep(li::marker) {
  color: var(--c-accent);
}

.content-layout :deep(strong) {
  font-weight: 600;
  color: var(--c-foreground);
}

.content-layout :deep(a) {
  color: var(--c-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.content-layout :deep(small),
.content-layout :deep(.text-sm) {
  font-size: 16px;
  color: var(--c-muted);
}

.content-layout :deep(code) {
  font-family: var(--c-mono);
  font-size: 0.9em;
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--c-border);
}

.content-layout :deep(pre) {
  position: relative;
  background: var(--c-code-bg) !important;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 24px 20px 18px 20px !important;
  margin: 12px 0;
  font-size: 16px;
  line-height: 1.45;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
  box-shadow: 0 4px 24px oklch(0% 0 0 / 0.4);
}

/* Terminal chrome dots */
.content-layout :deep(pre::before) {
  content: '';
  display: block;
  position: absolute;
  top: 10px;
  left: 14px;
  width: 42px;
  height: 10px;
  background-image:
    radial-gradient(circle 4px, var(--c-code-dot-red, oklch(55% 0.19 20)) 100%, transparent 100%),
    radial-gradient(circle 4px, var(--c-code-dot-yellow, oklch(60% 0.17 85)) 100%, transparent 100%),
    radial-gradient(circle 4px, var(--c-code-dot-green, oklch(55% 0.16 150)) 100%, transparent 100%);
  background-position: 0 0, 14px 0, 28px 0;
  background-repeat: no-repeat;
  opacity: 0.6;
}

.content-layout :deep(pre code) {
  background: transparent !important;
  color: var(--c-code-fg);
  padding: 0;
  font-size: 16px;
}

.content-layout :deep(blockquote) {
  border-left: 3px solid var(--c-accent);
  padding-left: 20px;
  margin: 16px 0;
  color: var(--c-muted);
  font-style: italic;
  font-size: 20px;
}

.content-layout :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  margin: 12px 0;
}

.content-layout :deep(thead) {
  border-bottom: 2px solid var(--c-accent);
}

.content-layout :deep(th) {
  text-align: left;
  font-weight: 600;
  color: var(--c-muted);
  padding: 10px 14px;
  font-family: var(--c-mono);
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.content-layout :deep(td) {
  padding: 8px 14px;
  border-bottom: 1px solid var(--c-border);
}

.content-layout :deep(tr:last-child td) {
  border-bottom: none;
}

/* Split grid utility */
.content-layout :deep(.split) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  height: 100%;
}

.content-layout :deep(.split > *) {
  overflow: hidden;
  min-width: 0;
}

.content-layout :deep(.split pre) {
  max-height: 340px;
  font-size: 14px;
}

.content-layout :deep(.split h1) {
  font-size: 32px;
  margin-bottom: 12px;
}

/* Inline code in content */
.content-layout :deep(:not(pre) > code) {
  background: var(--c-code-bg);
  color: var(--c-accent);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--c-border);
  font-size: 0.9em;
}
</style>
