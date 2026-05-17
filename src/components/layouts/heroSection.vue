<template>
  <div class="hero">
    <NavBar />

    <div class="hero-body">
      <div class="hero-text">
        <h1 class="hero-name">
          <span class="name-first">{{ $t('hero.name.first') }}</span>
          <span class="name-last">{{ $t('hero.name.last') }}</span>
        </h1>

        <div class="hero-subtitle">
          <span class="chevron" aria-hidden="true">›</span>
          <TypewriterText :strings="roles" />
        </div>

        <p class="hero-description">{{ $t('hero.description') }}</p>

        <BaseButton glow class="hero-cta">
          {{ $t('hero.cta') }}
          <span class="cta-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
              <path
                d="M12 8v8M8 12l4 4 4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </BaseButton>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <span class="visual-label">Mesh / Animation / Items</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NavBar from '@/components/layouts/NavBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import TypewriterText from '@/components/ui/TypewriterText.vue'

const { tm } = useI18n()

const roles = computed(() => tm('hero.roles'))
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background-color: var(--color-bg);
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent calc(100% / 7 - 1px),
    var(--color-border-subtle) calc(100% / 7 - 1px),
    var(--color-border-subtle) calc(100% / 7)
  );
  color: var(--color-text);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-10);
}

/* ── Hero body ── */
.hero-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-12) 0 var(--space-16);
}

.hero-text {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* ── Name ── */
.hero-name {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: var(--font-extrabold);
  font-size: clamp(var(--text-8xl), 13vw, 10rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.name-first {
  color: var(--color-text);
}

/* Gradient: light lavender at top → primary purple at bottom, matching Figma */
.name-last {
  background: linear-gradient(180deg, #e0ccff 50%, var(--color-primary) 85%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Subtitle typewriter row ── */
.hero-subtitle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 1.75rem;
  margin-top: calc(-1 * var(--space-3));
}

.chevron {
  color: var(--color-primary);
  font-size: var(--text-xl);
  font-family: var(--font-mono);
}

/* ── Description ── */
.hero-description {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 520px;
}

/* ── CTA ── */
.hero-cta {
  align-self: flex-start;
  margin-top: var(--space-3);
}

.cta-icon {
  display: flex;
  align-items: center;
}

/* ── Visual placeholder ── */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 45%;
}

.visual-label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  letter-spacing: 0.05em;
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .hero {
    padding: 0 var(--space-5);
  }

  .hero-body {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-8) 0 var(--space-12);
    gap: var(--space-8);
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-visual {
    display: none;
  }

  .hero-cta {
    align-self: stretch;
    justify-content: center;
  }
}

/* ── Tablet ── */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero {
    padding: 0 var(--space-8);
  }
}
</style>
