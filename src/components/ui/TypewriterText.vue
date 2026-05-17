<template>
  <span class="typewriter" aria-live="polite"
    >{{ displayed }}<span class="cursor" aria-hidden="true">|</span></span
  >
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  strings: { type: Array, required: true },
  typeSpeed: { type: Number, default: 80 },
  deleteSpeed: { type: Number, default: 40 },
  pauseTime: { type: Number, default: 2000 },
})

const displayed = ref('')
let stringIndex = 0
let charIndex = 0
let isDeleting = false
let timer = null

function tick() {
  const current = props.strings[stringIndex % props.strings.length]

  if (isDeleting) {
    charIndex--
    displayed.value = current.slice(0, charIndex)
  } else {
    charIndex++
    displayed.value = current.slice(0, charIndex)
  }

  let delay = isDeleting ? props.deleteSpeed : props.typeSpeed

  if (!isDeleting && charIndex === current.length) {
    delay = props.pauseTime
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    stringIndex++
    delay = 350
  }

  timer = setTimeout(tick, delay)
}

onMounted(() => {
  timer = setTimeout(tick, 600)
})
onUnmounted(() => clearTimeout(timer))

// Restart when strings change (language switch)
watch(
  () => props.strings,
  () => {
    clearTimeout(timer)
    displayed.value = ''
    stringIndex = 0
    charIndex = 0
    isDeleting = false
    timer = setTimeout(tick, 400)
  },
)
</script>

<style scoped>
.typewriter {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  width: 10px;
  animation: blink 1s step-end infinite;
  color: var(--color-primary);
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
