<template>
  <article
    class="project-card"
    tabindex="0"
    role="button"
    @click="$emit('open')"
    @keydown.enter="$emit('open')"
    @keydown.space.prevent="$emit('open')"
  >
    <!-- ── Image area ── -->
    <div class="card-media">
      <img v-if="images[0]" :src="images[0]" alt="" class="card-media-img" />
      <div v-else class="card-media-placeholder" aria-hidden="true">
        <span class="placeholder-letter">{{ title.charAt(0) }}</span>
        <div class="placeholder-grid" aria-hidden="true" />
      </div>

      <!-- Hover overlay -->
      <div class="card-overlay" aria-hidden="true">
        <span class="overlay-btn">{{ $t('projects.view_details') }}</span>
      </div>

      <!-- Badges -->
      <div class="card-badges">
        <span class="status-badge">
          <span class="status-dot" aria-hidden="true" />
          {{ statusLabel }}
        </span>
        <span v-if="award" class="award-badge" :title="awardTitle || awardLabel">
          {{ awardLabel }}
        </span>
      </div>
    </div>

    <!-- ── Info area ── -->
    <div class="card-info">
      <p class="card-meta">{{ company }} · {{ year }}</p>
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-desc">{{ description }}</p>

      <div class="card-tech">
        <SkillBadge
          v-for="t in tech"
          :key="t.name"
          :name="t.name"
          :icon="t.icon"
          :color="t.color"
        />
      </div>

      <div class="card-footer">
        <span class="card-visibility">
          {{ isPrivate ? $t('projects.label_private') : $t('projects.label_public') }}
        </span>
        <a
          v-if="!isPrivate && github"
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="card-link"
          @click.stop
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          {{ $t('projects.view') }}
        </a>
        <a
          v-else-if="!isPrivate && link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="card-link"
          @click.stop
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          {{ $t('projects.view') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SkillBadge from '@/components/ui/SkillBadge.vue'

const { t } = useI18n()

defineEmits(['open'])

const props = defineProps({
  title:       { type: String,  required: true },
  description: { type: String,  required: true },
  company:     { type: String,  required: true },
  year:        { type: String,  required: true },
  status:      { type: String,  required: true },
  isPrivate:   { type: Boolean, default: true  },
  github:      { type: String,  default: null  },
  link:        { type: String,  default: null  },
  award:       { type: String,  default: null  },
  awardTitle:  { type: String,  default: null  },
  images:      { type: Array,   default: () => [] },
  tech:        { type: Array,   default: () => [] }
})

const statusLabel = computed(() =>
  props.status === 'completed' ? t('projects.status_completed') : t('projects.status_wip')
)

const awardLabel = computed(() => (props.award ? t(props.award) : null))
</script>

<style scoped>
.project-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    transform var(--transition-slow),
    box-shadow var(--transition-slow);
}

.project-card:hover {
  border-color: var(--color-primary-muted);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.project-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Media ── */
.card-media {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--color-bg-deep);
  flex-shrink: 0;
}

.card-media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform var(--transition-slow);
}

.project-card:hover .card-media-img {
  transform: scale(1.04);
}

/* Placeholder for projects without images */
.card-media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-deep) 0%, var(--color-bg-elevated) 100%);
  position: relative;
  overflow: hidden;
}

.placeholder-letter {
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: var(--font-extrabold);
  color: var(--color-primary-muted);
  position: relative;
  z-index: 1;
  user-select: none;
  line-height: 1;
}

.placeholder-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
}

/* ── Hover overlay ── */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-slow);
  backdrop-filter: blur(2px);
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  transform: translateY(6px);
  transition: transform var(--transition-slow);
  white-space: nowrap;
}

.project-card:hover .overlay-btn {
  transform: translateY(0);
}

/* ── Badges (over image) ── */
.card-badges {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  z-index: 2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(33, 31, 31, 0.85);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  backdrop-filter: blur(4px);
}

.award-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(33, 31, 31, 0.85);
  border: 1px solid var(--color-warning);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-warning);
  backdrop-filter: blur(4px);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: v-bind("status === 'completed' ? 'var(--color-primary)' : 'var(--color-warning)'");
  flex-shrink: 0;
}

/* ── Info area ── */
.card-info {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.card-meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0;
  line-height: var(--leading-tight);
}

.card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

/* ── Footer ── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  margin-top: auto;
  border-top: 1px solid var(--color-border);
}

.card-visibility {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.card-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

.card-link:hover {
  color: var(--color-primary-hover);
}
</style>
