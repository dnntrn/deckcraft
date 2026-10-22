<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const els = document.querySelectorAll('.metric-value')
  els.forEach((el) => {
    const text = el.textContent?.trim() ?? ''
    const match = text.match(/^([^0-9-]*)([0-9,]+(?:\.\d+)?)(.*)$/)
    if (!match) return
    const [, prefix, numStr, suffix] = match
    const hasCommas = numStr.includes(',')
    const decimals = (numStr.split('.')[1] ?? '').length
    const target = parseFloat(numStr.replace(/,/g, ''))
    if (isNaN(target)) return

    const duration = 1200
    const start = performance.now()
    let raf = 0

    const format = (v: number) => {
      const fixed = v.toFixed(decimals)
      return hasCommas
        ? parseFloat(fixed).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed
    }

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      el.textContent = prefix + format(target * eased) + suffix
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  })
})
</script>

<template>
  <div class="metrics-layout">
    <slot />
  </div>
</template>

<style>
.metrics-layout {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--c-pad-slide);
  overflow: hidden;
  background: var(--c-canvas);
  box-sizing: border-box;
}
.metrics-layout h1 {
  font-family: var(--c-display);
  font-size: var(--c-text-metric-h1, 2rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  letter-spacing: var(--c-heading-tracking, -0.03em);
  line-height: 1.1;
  margin: 0 0 var(--c-space-10, 2.5rem) 0;
  color: var(--c-heading);
  text-align: center;
}
.metrics-layout .metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--c-space-6, 1.5rem);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}
.metrics-layout .metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--c-space-7, 1.75rem) var(--c-space-6, 1.5rem);
  background: var(--c-glass-bg);
  backdrop-filter: var(--c-glass-blur);
  -webkit-backdrop-filter: var(--c-glass-blur);
  border: 1px solid var(--c-card-border);
  border-radius: var(--c-radius-lg, 1rem);
  box-shadow: var(--c-glass-shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.metrics-layout .metric:hover {
  box-shadow: var(--c-glass-shadow-hover);
  transform: translateY(-2px);
}
.metrics-layout .metric-value {
  font-family: var(--c-display);
  font-size: var(--c-text-metric-value, 2.75rem);
  font-weight: var(--c-heading-weight, 400);
  font-style: var(--c-heading-style, normal);
  line-height: 1;
  letter-spacing: var(--c-heading-tracking, -0.03em);
  color: var(--c-accent);
  margin: 0 0 var(--c-space-2, 0.5rem) 0;
}
.metrics-layout .metric-label {
  font-family: var(--c-tertiary, var(--c-font));
  font-size: var(--c-text-xs, 0.75rem);
  font-weight: var(--c-weight-semibold, 600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--c-muted);
  text-align: center;
}
.metrics-layout .metric-desc {
  font-family: var(--c-font);
  font-size: var(--c-text-sm, 0.875rem);
  line-height: 1.45;
  color: var(--c-muted);
  text-align: center;
  margin-top: var(--c-space-1.5, 0.375rem);
}
</style>