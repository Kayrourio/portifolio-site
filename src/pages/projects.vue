<template>
  <header :class="['nav-header', { 'nav-header--scrolled': scrolled }]">
    <div class="container-site">
      <NavBar />
    </div>
  </header>

  <main>
    <ProjectsSection />
  </main>

  <FooterSite />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/layouts/NavBar.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import FooterSite from '@/components/layouts/FooterSite.vue'

const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.nav-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg);
  transition: background var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  border-bottom: 1px solid transparent;
}

.nav-header--scrolled {
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-md);
  border-bottom-color: var(--color-border);
}
</style>
