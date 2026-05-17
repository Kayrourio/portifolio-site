<template>
  <section class="about-section" id="about" aria-labelledby="about-heading">
    <div class="container-site">
      <!-- Header row: label + headline -->
      <div v-reveal class="about-header">
        <SectionTitle :label="$t('about.label')" :subtitle="$t('about.subtitle')" />
        <h2 id="about-heading" class="about-headline">
          {{ $t('about.headline.p1') }}<span class="highlight">{{ $t('about.headline.loc1') }}</span
          >{{ $t('about.headline.p2')
          }}<span class="highlight">{{ $t('about.headline.loc2') }}</span
          >{{ $t('about.headline.p3') }}
        </h2>
      </div>

      <!-- Bio row: photo + text -->
      <div v-reveal="{ delay: '0.15s' }" class="about-bio">
        <div class="about-photo-wrap">
          <img
            :src="profileImg"
            :alt="$t('about.photo_alt')"
            class="about-photo"
            width="320"
            height="320"
          />
        </div>

        <div class="about-text">
          <p class="bio-drop">{{ $t('about.bio_1') }}</p>
          <p class="bio-regular">{{ $t('about.bio_2') }}</p>
          <blockquote class="about-quote">{{ $t('about.quote') }}</blockquote>
        </div>
      </div>

      <!-- Areas row -->
      <div v-reveal="{ delay: '0.3s' }" class="about-areas">
        <article v-for="area in areas" :key="area.key" class="area-card">
          <span class="area-card__label">{{ $t('about.area_label') }}</span>
          <h3 class="area-card__title">{{ $t(`about.areas.${area.key}`) }}</h3>
          <div class="area-card__skills">
            <SkillBadge
              v-for="skill in area.skills"
              :key="skill.name"
              :name="skill.name"
              :icon="skill.icon"
              :color="skill.color"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import profileImg from '@/assets/images/pfp.jpeg'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SkillBadge from '@/components/ui/SkillBadge.vue'

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const areas = [
  {
    key: 'fullstack',
    skills: [
      { name: 'Python',     icon: `${DI}/python/python-original.svg`,           color: '#3776AB' },
      { name: 'Go',         icon: `${DI}/go/go-original-wordmark.svg`,           color: '#00ADD8' },
      { name: 'JavaScript', icon: `${DI}/javascript/javascript-original.svg`,    color: '#F7DF1E' },
      { name: 'Vue.js',     icon: `${DI}/vuejs/vuejs-original.svg`,              color: '#42B883' },
      { name: 'Django',     icon: `${DI}/django/django-plain.svg`,               color: '#44B78B' },
      { name: 'MySQL',      icon: `${DI}/mysql/mysql-original.svg`,              color: '#4479A1' },
      { name: 'PostgreSQL', icon: `${DI}/postgresql/postgresql-original.svg`,    color: '#336791' },
      { name: 'Docker',     icon: `${DI}/docker/docker-original.svg`,            color: '#2496ED' },
      { name: 'GCP',        icon: `${DI}/googlecloud/googlecloud-original.svg`,  color: '#4285F4' },
    ],
  },
  {
    key: 'roboticsAI',
    skills: [
      { name: 'Python',   icon: `${DI}/python/python-original.svg`,        color: '#3776AB' },
      { name: 'Selenium', icon: `${DI}/selenium/selenium-original.svg`,    color: '#43B02A' },
      { name: 'Pandas',   icon: `${DI}/pandas/pandas-original.svg`,        color: '#150458' },
      { name: 'C++',      icon: `${DI}/cplusplus/cplusplus-original.svg`,  color: '#00599C' },
      { name: 'Arduino',  icon: `${DI}/arduino/arduino-original.svg`,      color: '#00979D' },
    ],
  },
  {
    key: 'tools',
    skills: [
      { name: 'Git',     icon: `${DI}/git/git-original.svg`,              color: '#F05032' },
      { name: 'GitHub',  icon: `${DI}/github/github-original.svg`,        color: '#ffffff' },
      { name: 'Figma',   icon: `${DI}/figma/figma-original.svg`,          color: '#F24E1E' },
      { name: 'Postman', icon: `${DI}/postman/postman-original.svg`,       color: '#FF6C37' },
      { name: 'C#',      icon: `${DI}/csharp/csharp-original.svg`,        color: '#239120' },
    ],
  },
]
</script>

<style scoped>
/* ── Section ── */
.about-section {
  padding-block: var(--space-20);
}

/* ── Header row ── */
.about-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-8);
  align-items: start;
  margin-bottom: var(--space-16);
}

.about-headline {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 4.5vw, var(--text-5xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  line-height: var(--leading-tight);
  margin: 0;
}

.about-headline .highlight {
  color: var(--color-primary);
}

/* ── Bio row ── */
.about-bio {
  display: grid;
  grid-template-columns: 1fr 1.7fr;
  gap: var(--space-16);
  align-items: start;
  margin-bottom: var(--space-12);
}

.about-photo-wrap {
  display: flex;
  justify-content: center;
}

.about-photo {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.bio-drop {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-4);
}

.bio-drop::first-letter {
  font-family: var(--font-display);
  font-size: clamp(var(--text-4xl), 6vw, var(--text-5xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  float: left;
  line-height: 0.85;
  margin-right: var(--space-2);
  margin-top: var(--space-1);
}

.bio-regular {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin: 0;
}

.about-quote {
  border-left: 2px solid var(--color-primary);
  padding-left: var(--space-4);
  margin: var(--space-6) 0 0;
  font-style: italic;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-base);
}

/* ── Areas row ── */
.about-areas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.area-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.area-card__label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

.area-card__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0 0 var(--space-4);
  line-height: var(--leading-tight);
}

.area-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

/* ── Tablet ── */
@media (min-width: 768px) and (max-width: 1023px) {
  .about-bio {
    grid-template-columns: 1fr 1.4fr;
    gap: var(--space-10);
  }

  .area-card__title {
    font-size: var(--text-2xl);
  }
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .about-section {
    padding-block: var(--space-12);
  }

  .about-header {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-10);
  }

  .about-bio {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    margin-bottom: var(--space-10);
  }

  .about-photo {
    max-width: 220px;
  }

  .about-areas {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .area-card__title {
    font-size: var(--text-2xl);
  }
}
</style>
