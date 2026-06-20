<template>
  <section class="projects-section" id="projects" aria-labelledby="projects-heading">
    <div class="container-site">
      <!-- Header row -->
      <div class="projects-header">
        <SectionTitle :label="$t('projects.label')" :subtitle="$t('projects.subtitle')" />
        <h2 id="projects-heading" v-reveal class="projects-headline">
          {{ $t('projects.headline.p1') }}<span class="hl">{{ $t('projects.headline.h1') }}</span
          >{{ $t('projects.headline.p2') }}<span class="hl">{{ $t('projects.headline.h2') }}</span
          >{{ $t('projects.headline.p3') }}
        </h2>
      </div>

      <!-- Tabs -->
      <div class="tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          role="tab"
          :aria-selected="activeTab === tab.key"
          :class="['tab-btn', { 'tab-btn--active': activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ $t(`projects.tab_${tab.key}`) }}
          <span class="tab-count">{{ String(tab.count).padStart(2, '0') }}</span>
        </button>
      </div>

      <!-- Cards grid -->
      <div v-reveal class="cards-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.key"
          :title="$t(`projects.list.${project.key}.title`)"
          :description="$t(`projects.list.${project.key}.description`)"
          :company="$te(`projects.list.${project.key}.company`) ? $t(`projects.list.${project.key}.company`) : project.company"
          :year="project.year"
          :status="project.status"
          :is-private="project.isPrivate"
          :github="project.github"
          :link="project.link"
          :award="project.award"
          :award-title="project.awardTitle"
          :images="project.images || []"
          :tech="project.tech"
          @open="selectedProject = project"
        />
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import ProjectModal from '@/components/ui/ProjectModal.vue'
import terrasafe1 from '@/assets/images/smartcamp2.jpeg'
import terrasafe2 from '@/assets/images/smartcamp1.jpeg'
import terrasafe3 from '@/assets/images/cad-image.png'

const SI = 'https://cdn.simpleicons.org'

const allProjects = [
  {
    key: 'plataforma',
    company: 'ETHO SOLUÇÕES',
    year: '2025–2026',
    status: 'wip',
    isPrivate: true,
    github: null,
    type: 'work',
    tech: [
      { name: 'Vue.js', icon: `${SI}/vuedotjs`, color: '#42B883' },
      { name: 'Go', icon: `${SI}/go`, color: '#00ACD7' },
      { name: 'MySQL', icon: `${SI}/mysql/mysql-original.svg`, color: '#4479A1' },
      { name: 'GCP', icon: `${SI}/googlecloud`, color: '#4285F4' },
    ],
  },
  {
    key: 'agent',
    company: 'PERSONAL',
    year: '2026',
    status: 'wip',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/personal-agent',
    type: 'projects',
    tech: [
      { name: 'Python', icon: `${SI}/python`, color: '#43A047' },
      { name: 'FastAPI', icon: `${SI}/fastapi`, color: '#009688' },
      { name: 'Docker', icon: `${SI}/docker`, color: '#2496ED' },
    ],
  },
  {
    key: 'tagbot',
    company: 'NERO UFV',
    year: '2026',
    status: 'wip',
    isPrivate: true,
    github: null,
    type: 'work',
    tech: [
      { name: 'C++', icon: `${SI}/cplusplus`, color: '#00599C' },
      { name: 'Flutter', icon: `${SI}/flutter`, color: '#02569B' },
      { name: 'PlatformIO', icon: `${SI}/platformio`, color: '#F5822A' },
      { name: 'ESP32', icon: `${SI}/espressif`, color: '#E7352C' },
      { name: 'Bluetooth', icon: `${SI}/bluetooth`, color: '#0082FC' },
    ],
  },
  {
    key: 'lineFollower',
    company: 'PROJETO ROBOTICISTA',
    year: '2026',
    status: 'wip',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/robotics-line-follower',
    type: 'projects',
    tech: [
      { name: 'C++', icon: `${SI}/cplusplus`, color: '#00599C' },
      { name: 'PlatformIO', icon: `${SI}/platformio`, color: '#F5822A' },
      { name: 'ESP32', icon: `${SI}/espressif`, color: '#E7352C' },
    ],
  },
  {
    key: 'terrasafe',
    company: 'SMARTCAMP UFV',
    year: '2026',
    status: 'completed',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/smartcamp-project',
    link: 'https://smartcamp-project.vercel.app',
    type: 'projects',
    award: 'projects.award_first_place',
    awardTitle:
      '1º Lugar, SmartCamp Cidades Inteligentes · UFV, 13–14 jun. 2026, TecnoParque UFV. Prêmio de R$ 2.000. Org.: Viçosa SMART, LabMAKER e VUEI/UFV.',
    images: [terrasafe1, terrasafe2, terrasafe3],
    isNarrative: true,
    narrativeSections: ['resultado', 'img_group', 'contexto', 'construido', 'hardware', 'escala'],
    tech: [
      { name: 'ESP32', icon: `${SI}/espressif`, color: '#E7352C' },
      { name: 'FastAPI', icon: `${SI}/fastapi`, color: '#009688' },
      { name: 'Python', icon: `${SI}/python`, color: '#3776AB' },
      { name: 'IoT', icon: `${SI}/mqtt`, color: '#8B6914' },
      { name: 'ESP-NOW', icon: `${SI}/espressif`, color: '#FF6B35' },
    ],
  },
]

const activeTab = ref('all')
const selectedProject = ref(null)

const tabs = computed(() => [
  { key: 'all', count: allProjects.length },
  { key: 'projects', count: allProjects.filter((p) => p.type === 'projects').length },
  { key: 'work', count: allProjects.filter((p) => p.type === 'work').length },
])

const filteredProjects = computed(() =>
  activeTab.value === 'all' ? allProjects : allProjects.filter((p) => p.type === activeTab.value),
)
</script>

<style scoped>
.projects-section {
  padding-block: var(--space-20);
}

/* ── Header ── */
.projects-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-8);
  align-items: start;
  margin-bottom: var(--space-10);
}

.projects-headline {
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

/* ── Tabs ── */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-8);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5) var(--space-3) 0;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
}

.tab-btn:hover {
  color: var(--color-text-secondary);
}

.tab-btn--active {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

.tab-count {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-primary);
}

/* ── Cards grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-5);
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .projects-section {
    padding-block: var(--space-12);
  }

  .projects-header {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
