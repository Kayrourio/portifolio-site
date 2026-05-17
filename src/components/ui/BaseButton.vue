<template>
  <button class="base-btn" :class="{ 'base-btn--glow': glow }" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  glow: { type: Boolean, default: false },
})
</script>

<style scoped>
.base-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--color-primary);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-5) var(--space-8);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    transform var(--transition-fast);
}

.base-btn:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.base-btn:active {
  transform: translateY(0);
}

/* Glow layer — invisible by default, appears on hover */
.base-btn--glow::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  filter: blur(18px);
  opacity: 0;
  z-index: -1;
  transition: opacity var(--transition-base);
}

.base-btn--glow:hover::before {
  opacity: 0.45;
}
</style>
