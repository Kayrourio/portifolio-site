<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="project"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-title-${project.key}`"
        @click.self="$emit('close')"
      >
        <div class="modal-panel" ref="panelRef" tabindex="-1">

          <!-- Close -->
          <button
            class="modal-close"
            @click="$emit('close')"
            :aria-label="$t('projects.modal_close')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Media -->
          <div class="modal-media" aria-hidden="true">
            <div class="media-grid" aria-hidden="true">
              <span v-for="n in 48" :key="n" class="media-cell" />
            </div>
            <div class="media-glow" aria-hidden="true" />
          </div>

          <div class="modal-content">

            <!-- Header -->
            <header class="modal-header">
              <div class="modal-meta">
                <span class="status-badge">
                  <span class="status-dot" aria-hidden="true" />
                  {{ statusLabel }}
                </span>
                <span class="modal-company">{{ project.company }} • {{ project.year }}</span>
                <span class="modal-type-badge">{{ project.type }}</span>
              </div>
              <h2 :id="`modal-title-${project.key}`" class="modal-title">
                {{ $t(`projects.list.${project.key}.title`) }}
              </h2>
            </header>

            <!-- Overview -->
            <section class="modal-section" :aria-label="$t('projects.modal_overview')">
              <p class="section-label">{{ $t('projects.modal_overview') }}</p>
              <p class="overview-text">
                {{ $t(`projects.list.${project.key}.description`) }}
              </p>
            </section>

            <!-- Highlights -->
            <section class="modal-section" :aria-label="$t('projects.modal_highlights')">
              <p class="section-label">{{ $t('projects.modal_highlights') }}</p>
              <ul class="highlights-list">
                <li
                  v-for="(item, i) in highlights"
                  :key="i"
                  class="highlight-item"
                >
                  <span class="highlight-bullet" aria-hidden="true">→</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>

            <!-- Stack -->
            <section class="modal-section" :aria-label="$t('projects.modal_tech')">
              <p class="section-label">{{ $t('projects.modal_tech') }}</p>
              <div class="modal-tech">
                <SkillBadge
                  v-for="skill in project.tech"
                  :key="skill.name"
                  :name="skill.name"
                  :icon="skill.icon"
                  :color="skill.color"
                />
              </div>
            </section>

            <!-- Footer -->
            <footer class="modal-footer">
              <span class="modal-visibility">
                {{ project.isPrivate ? $t('projects.label_private') : $t('projects.label_public') }}
              </span>
              <div class="modal-links">
                <a
                  v-if="!project.isPrivate && project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="modal-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  {{ $t('projects.modal_view_github') }}
                </a>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SkillBadge from '@/components/ui/SkillBadge.vue'

const { t, tm } = useI18n()

const props = defineProps({
  project: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const panelRef = ref(null)

const statusLabel = computed(() =>
  props.project?.status === 'completed'
    ? t('projects.status_completed')
    : t('projects.status_wip')
)

const highlights = computed(() => {
  if (!props.project) return []
  const raw = tm(`projects.list.${props.project.key}.highlights`)
  return Array.isArray(raw) ? raw : []
})

function onKeyDown(e) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeyDown)
      setTimeout(() => panelRef.value?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
/* ── Backdrop ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

/* ── Panel ── */
.modal-panel {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  width: 100%;
  max-width: 720px;
  max-height: 92vh;
  overflow-y: auto;
  outline: none;
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(176, 137, 255, 0.06);
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

/* ── Close button ── */
.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 2;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    color var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.modal-close:hover {
  color: var(--color-text);
  border-color: var(--color-primary-muted);
  background: var(--color-surface-hover);
}

/* ── Media ── */
.modal-media {
  position: relative;
  height: 220px;
  background: var(--color-bg-deep);
  border-bottom: 1px solid var(--color-border-subtle);
  overflow: hidden;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
}

.media-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1px;
  opacity: 0.35;
}

.media-cell {
  background: var(--color-border);
  border-radius: 2px;
}

.media-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 50% 80%, rgba(176, 137, 255, 0.18) 0%, transparent 70%);
}

/* ── Content ── */
.modal-content {
  padding: var(--space-6) var(--space-8) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* ── Header ── */
.modal-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: v-bind("project?.status === 'completed' ? 'var(--color-primary)' : 'var(--color-warning)'");
  flex-shrink: 0;
}

.modal-company {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal-type-badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: var(--color-primary-muted);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal-title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0;
  line-height: var(--leading-tight);
}

/* ── Sections ── */
.modal-section {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.overview-text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* ── Highlights ── */
.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.highlight-item {
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.highlight-bullet {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Tech ── */
.modal-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* ── Footer ── */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-5);
}

.modal-visibility {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal-links {
  display: flex;
  gap: var(--space-4);
}

.modal-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

.modal-link:hover {
  color: var(--color-primary-hover);
}

/* ── Transitions ── */
.modal-enter-active {
  transition: opacity 0.22s ease;
}

.modal-leave-active {
  transition: opacity 0.18s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel {
  animation: panel-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active .modal-panel {
  animation: panel-out 0.18s ease forwards;
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes panel-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(10px) scale(0.98); }
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .modal-backdrop {
    align-items: flex-end;
    padding: 0;
  }

  .modal-panel {
    max-width: 100%;
    max-height: 88vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  }

  .modal-media {
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    height: 160px;
  }

  .modal-content {
    padding: var(--space-5) var(--space-5) var(--space-8);
    gap: var(--space-5);
  }

  .modal-enter-active .modal-panel {
    animation: panel-in-mobile 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .modal-leave-active .modal-panel {
    animation: panel-out-mobile 0.2s ease forwards;
  }

  @keyframes panel-in-mobile {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }

  @keyframes panel-out-mobile {
    from { transform: translateY(0); }
    to   { transform: translateY(100%); }
  }
}
</style>
