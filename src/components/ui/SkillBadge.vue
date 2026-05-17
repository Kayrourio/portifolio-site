<template>
  <div class="badge-wrap">
    <div class="badge">
      <div class="icon" v-html="svgContent" aria-hidden="true" />
    </div>
    <span class="label">{{ name }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
})

const svgContent = ref('')

onMounted(async () => {
  try {
    const res = await fetch(props.icon)
    const text = await res.text()
    svgContent.value = text
      .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
      .replace(/fill:\s*(?!none)[^;}"]+/g, 'fill:currentColor')
  } catch {
    // badge shows empty — border + label still visible
  }
})
</script>

<style scoped>
.badge-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.badge {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid v-bind(color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background: transparent;
  transition:
    background var(--transition-base),
    transform var(--transition-base);
}

.badge::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  box-shadow: 0 0 0 0 v-bind(color);
  transition: box-shadow 250ms ease;
  pointer-events: none;
}

.badge:hover::after {
  box-shadow: 0 0 18px 5px v-bind(color + '60');
}

.badge:hover {
  background: v-bind(color + '1a');
  transform: scale(1.12);
}

.icon {
  width: 32px;
  height: 32px;
  color: v-bind(color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon :deep(svg) {
  width: 32px;
  height: 32px;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
</style>
