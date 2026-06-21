<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, onMounted, onUnmounted } from 'vue'

const nav = useNav()

const counter = computed(() => {
  if (!nav || !nav.total) return ''
  return `${nav.currentPage} / ${nav.total}`
})

function handleKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.ctrlKey || e.metaKey || e.altKey) return

  if (e.key === 'g' || e.key === 'G') {
    e.preventDefault()
    nav.toggleOverview()
  }
  if (e.key === 's' || e.key === 'S') {
    e.preventDefault()
    // Try multiple selectors to find Slidev's search input
    const input = document.querySelector<HTMLInputElement>('input[placeholder*="earch"], #search-input input, [class*="search"] input')
    if (input) {
      input.focus()
      input.click()
    }
  }
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault()
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="deck-hints">
    <span class="hint-left">G Grid · S Search · F Fullscreen</span>
    <span class="hint-right" v-if="counter">{{ counter }}</span>
  </div>
</template>

<style scoped>
.deck-hints {
  position: fixed;
  bottom: 6px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 99;
  pointer-events: none;
  font-family: var(--c-mono, monospace);
  font-size: 10px;
  color: oklch(70% 0 0 / 0.35);
  transition: opacity 0.3s;
  user-select: none;
}
.deck-hints:hover {
  opacity: 0.12;
}
</style>
