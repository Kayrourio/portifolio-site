<template>
  <div class="section-title">
    <div class="section-title__bar" aria-hidden="true"></div>
    <p class="section-title__label">{{ label }}</p>
    <p class="section-title__sub">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  subtitle: { type: String, required: true }
})
</script>

<style scoped>
.section-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.section-title__bar {
  width: var(--space-10);
  height: 2px;
  background: var(--color-primary);
  margin-bottom: var(--space-2);
}

.section-title__label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin: 0;
  letter-spacing: 0.01em;
}

.section-title__sub {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}
</style>
