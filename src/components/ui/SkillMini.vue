<template>
  <div class="skill-mini" :title="name">
    <div class="mini-icon" v-html="svgContent" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  name:  { type: String, required: true },
  icon:  { type: String, required: true },
  color: { type: String, required: true }
})

const svgContent = ref('')

onMounted(async () => {
  try {
    const res = await fetch(props.icon)
    const text = await res.text()
    svgContent.value = text
      .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
      .replace(/fill:\s*(?!none)[^;}"]+/g, 'fill:currentColor')
  } catch {}
})
</script>

<style scoped>
.skill-mini {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  border: 1.5px solid v-bind(color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--transition-base), background var(--transition-base);
}

.skill-mini:hover {
  background: v-bind(color + '1a');
  transform: scale(1.15);
}

.mini-icon {
  width: 16px;
  height: 16px;
  color: v-bind(color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-icon :deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
