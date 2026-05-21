<template>
  <nav class="navbar">
    <div class="nav-brand">
      <span class="diamond" aria-hidden="true">◆</span>
      <span class="brand-text">{{ t('hero.url') }}</span>
    </div>

    <div class="nav-right">
      <ul class="nav-links" role="list">
        <li v-if="isProjectsPage">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        </li>
        <li v-else>
          <RouterLink to="/projects">{{ t('nav.projects') }}</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/', hash: '#contact' }">{{ t('nav.contact') }}</RouterLink>
        </li>
      </ul>

      <span class="separator" aria-hidden="true">|</span>

      <div class="nav-icons">
        <a :href="links.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <a :href="links.email" aria-label="Email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
        <a :href="links.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
      </div>

      <span class="separator" aria-hidden="true">|</span>

      <div class="lang-switcher">
        <button :class="['lang-btn', { active: locale === 'en' }]" @click="setLocale('en')">
          en
        </button>
        <span class="lang-dot" aria-hidden="true">•</span>
        <button :class="['lang-btn', { active: locale === 'pt' }]" @click="setLocale('pt')">
          pt-br
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { links } from '@/config/links.js'

const { t, locale } = useI18n()
const route = useRoute()
const isProjectsPage = computed(() => route.path === '/projects')

function setLocale(lang) {
  locale.value = lang
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.diamond {
  color: var(--color-primary);
  font-size: var(--text-base);
}

.brand-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  letter-spacing: 0.01em;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav-links {
  display: flex;
  gap: var(--space-5);
}

.nav-links a {
  color: var(--color-primary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: opacity var(--transition-base);
}

.nav-links a:hover {
  opacity: 0.75;
}

.separator {
  color: var(--color-border);
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav-icons a {
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  transition: color var(--transition-base);
}

.nav-icons a:hover {
  color: var(--color-text);
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-1) var(--space-2);
}

.lang-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-base);
}

.lang-btn.active {
  color: var(--color-text);
  font-weight: var(--font-semibold);
}

.lang-btn:hover {
  color: var(--color-text);
}

.lang-dot {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

/* ── Mobile: hide links, separators e icons ── */
@media (max-width: 767px) {
  .nav-links,
  .separator,
  .nav-icons {
    display: none;
  }

  .nav-right {
    gap: var(--space-2);
  }
}
</style>
