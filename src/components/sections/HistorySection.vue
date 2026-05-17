<template>
  <section class="history-section" aria-labelledby="history-heading">
    <div class="container-site">

      <!-- Header row: SectionTitle left, headline right -->
      <div class="history-top">
        <div class="sidebar-top">
          <SectionTitle
            :label="$t('history.label')"
            :subtitle="$t('history.subtitle')"
          />
          <p class="history-period">{{ $t('history.period') }}</p>
        </div>
        <h2 id="history-heading" v-reveal class="history-headline">
          {{ $t('history.headline.p1') }}<span class="hl">{{ $t('history.headline.h1') }}</span>{{ $t('history.headline.p2') }}<span class="hl">{{ $t('history.headline.h2') }}</span>{{ $t('history.headline.p3') }}<span class="hl">{{ $t('history.headline.h3') }}</span>
        </h2>
      </div>

      <!--
        Each template iteration puts a .year-item (col 1) and a .timeline-event (col 2)
        into the same grid row, ensuring the year aligns with its title.
      -->
      <div class="history-events">
        <template v-for="event in events" :key="event.key">
          <div class="year-item">
            <span class="year-rule" aria-hidden="true" />
            <p class="year-value">{{ event.year }}</p>
            <p class="year-age">{{ event.age }}</p>
          </div>

          <div v-reveal class="timeline-event">
            <div class="timeline-dot" aria-hidden="true" />
            <div class="event-body">
              <h3 class="event-title">
                <span aria-hidden="true">{{ event.emoji }}&nbsp;</span>{{ $t(`history.events.${event.key}.title`) }}
              </h3>
              <p class="event-desc">{{ $t(`history.events.${event.key}.description`) }}</p>
              <div v-if="event.hasMedia" class="event-media" aria-hidden="true">
                <span>{{ $t('history.media_placeholder') }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>

    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'

const events = [
  { key: 'spark', year: '2020',      age: 'age 13',    emoji: '🚀', hasMedia: true  },
  { key: 'first', year: '2021–2022', age: 'age 14–15', emoji: '🔨', hasMedia: false },
  { key: 'pro',   year: '2022–2023', age: 'age 15–16', emoji: '💼', hasMedia: false },
  { key: 'nero',  year: '2023–Now',  age: 'age 16–17', emoji: '🤖', hasMedia: false }
]
</script>

<style scoped>
.history-section {
  padding-block: var(--space-20);
}

/* ── Shared grid columns ── */
.history-top,
.history-events {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: var(--space-8);
}

/* ── Header row ── */
.history-top {
  align-items: start;
  margin-bottom: var(--space-10);
}

.sidebar-top {
  display: flex;
  flex-direction: column;
}

.history-period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: var(--space-1) 0 0;
}

.history-headline {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  line-height: var(--leading-tight);
  margin: 0;
}

.hl {
  color: var(--color-primary);
}

/* ── Events grid ── */
.history-events {
  row-gap: var(--space-10);
  align-items: start;
  position: relative;
}

/* Timeline rail — runs down col 2, fades at the bottom */
.history-events::before {
  content: '';
  position: absolute;
  /* col1(200px) + gap(2rem) + 4px offset → rail center at col2.left + 5px */
  left: calc(200px + var(--space-8) + 4px);
  top: 6px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-primary) 0%,
    var(--color-primary) 80%,
    transparent 100%
  );
  opacity: 0.3;
  pointer-events: none;
}

/* ── Year column ── */
.year-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-top: 4px; /* align text baseline with event title */
}

.year-rule {
  display: block;
  width: var(--space-10);
  height: 1px;
  background: var(--color-border);
  margin-bottom: var(--space-2);
}

.year-value {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin: 0;
}

.year-age {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

/* ── Timeline event column ── */
.timeline-event {
  position: relative;
  /* dot is 14px, left: -2px → center at col2.left + 5px, matching rail */
  padding-left: var(--space-6);
}

.timeline-dot {
  position: absolute;
  left: -2px;
  top: 5px;
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-primary);
  background: var(--color-bg);
}

/* ── Event content ── */
.event-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.event-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0;
  line-height: var(--leading-tight);
}

.event-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 600px;
  margin: 0;
}

.event-media {
  height: 220px;
  max-width: 680px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: var(--text-base);
}

/* ── Tablet ── */
@media (min-width: 768px) and (max-width: 1023px) {
  .history-top,
  .history-events {
    grid-template-columns: 160px 1fr;
  }

  .history-events::before {
    left: calc(160px + var(--space-8) + 4px);
  }
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .history-section {
    padding-block: var(--space-12);
  }

  .history-top,
  .history-events {
    grid-template-columns: 1fr;
  }

  .history-top {
    gap: var(--space-6);
  }

  .history-events {
    row-gap: var(--space-8);
  }

  .history-events::before {
    left: 4px;
  }

  .year-item {
    display: none;
  }
}
</style>
