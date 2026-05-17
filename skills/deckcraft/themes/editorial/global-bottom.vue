<script setup lang="ts">
import { useNav } from '@slidev/client'
const nav = useNav()
</script>

<template>
  <div class="deck-hints">
    <span class="hint-left">G Grid · S Search · F Fullscreen</span>
    <span class="hint-right">{{ nav.currentPage + 1 }} / {{ nav.total }}</span>
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
