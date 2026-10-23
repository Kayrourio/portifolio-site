<template>
  <section :class="['projects-section', { 'projects-section--page': isProjectsPage }]" id="projects" aria-labelledby="projects-heading">
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

      <div :class="['projects-body', { 'projects-body--split': isWideLayout }]">
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
            :hero-position="project.heroPosition"
            :hero-fit="project.heroFit"
            :hero-background="project.heroBackground"
            :role="$t(`projects.list.${project.key}.role`)"
            :selected="isWideLayout && activeInlineProject?.key === project.key"
            @open="selectedProject = project"
          />
        </div>

        <aside v-if="isWideLayout" class="project-detail">
          <ProjectModal :project="activeInlineProject" inline />
        </aside>
      </div>
    </div>

    <ProjectModal :project="isWideLayout ? null : selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import ProjectModal from '@/components/ui/ProjectModal.vue'
import terrasafe1 from '@/assets/images/smartcamp2.jpeg'
import terrasafe2 from '@/assets/images/smartcamp1.jpeg'
import terrasafe3 from '@/assets/images/cad-image.png'
import tagbot1 from '@/assets/images/tagbot-device.jpg'
import tagbot2 from '@/assets/images/tagbot-receita-federal.jpg'
import tagbot3 from '@/assets/images/tagbot-fazendeiro.jpg'
import robosHub1 from '@/assets/images/robos-hub-home.png'
import robosHub2 from '@/assets/images/robos-hub-grafo.png'
import asimavLogo from '@/assets/images/asimav-identity.png'
import calourosPhoto from '@/assets/images/calouros-maratona-si.jpg'
import fluxoTeam from '@/assets/images/fluxo-team.webp'
import fluxoAward from '@/assets/images/fluxo-award.webp'
import asimavTeam from '@/assets/images/asimav-team.webp'
import r2d2Logo from '@/assets/images/r2d2-project-logo.png'

const SI = 'https://cdn.simpleicons.org'

const allProjects = [
  {
    key: 'plataforma',
    company: 'ETHO SOLUÇÕES',
    year: '2025-2026',
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
    key: 'tagbot',
    company: 'NERO UFV',
    year: '2026',
    status: 'wip',
    isPrivate: true,
    github: null,
    type: 'projects',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido', 'hardware'],
    images: [tagbot1, tagbot2, tagbot3],
    heroPosition: 'center',
    tech: [
      { name: 'C++', icon: `${SI}/cplusplus`, color: '#00599C' },
      { name: 'PIO', icon: `${SI}/platformio`, color: '#F5822A' },
      { name: 'ESP32', icon: `${SI}/espressif`, color: '#E7352C' },
      { name: 'Flutter', icon: `${SI}/flutter`, color: '#02569B' },
      { name: 'Dart', icon: `${SI}/dart`, color: '#0175C2' },
    ],
  },
  {
    key: 'asimav',
    company: 'NERO UFV · CBR FRL',
    year: '2026',
    status: 'wip',
    isPrivate: false,
    github: null,
    link: 'https://www.instagram.com/asimav.ufv/',
    type: 'projects',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido', 'localizacao', 'hardware'],
    images: [asimavTeam, asimavLogo],
    heroPosition: 'center',
    tech: [
      { name: 'ROS2', icon: `${SI}/ros`, color: '#5C8DFF' },
      { name: 'Gazebo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gazebo/gazebo-original.svg', color: '#F58113' },
      { name: 'Python', icon: `${SI}/python`, color: '#3776AB' },
      { name: 'OpenCV', icon: `${SI}/opencv`, color: '#5C3EE8' },
    ],
  },
  {
    key: 'r2d2',
    company: 'NERO UFV · EQUIPE DE 15 PESSOAS',
    year: '2026',
    status: 'wip',
    isPrivate: true,
    github: null,
    type: 'projects',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido', 'interacao', 'navegacao', 'plataformas'],
    images: [r2d2Logo],
    heroFit: 'contain',
    heroBackground: '#8c0f18',
    tech: [
      { name: 'ROS 2', icon: `${SI}/ros`, color: '#5C8DFF' },
      { name: 'Python', icon: `${SI}/python`, color: '#3776AB' },
      { name: 'C++', icon: `${SI}/cplusplus`, color: '#00599C' },
      { name: 'OpenCV', icon: `${SI}/opencv`, color: '#5C3EE8' },
    ],
  },
  {
    key: 'fluxo',
    company: 'HACKATHON ABRASEL',
    year: '2026',
    status: 'completed',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/fluxo-project',
    link: 'https://fluxo-hackathon.vercel.app',
    type: 'projects',
    award: 'projects.award_third_place',
    awardTitle: '3º Lugar, Hackathon Abrasel · TecnoPARQ, 21 a 23 ago. 2026, Viçosa, MG.',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido', 'hardware'],
    images: [fluxoAward, fluxoTeam],
    tech: [
      { name: 'Python', icon: `${SI}/python`, color: '#3776AB' },
      { name: 'FastAPI', icon: `${SI}/fastapi`, color: '#009688' },
      { name: 'React', icon: `${SI}/react`, color: '#61DAFB' },
      { name: 'TSX', icon: `${SI}/typescript`, color: '#3178C6' },
    ],
  },
  {
    key: 'neroSite',
    company: 'NERO UFV',
    year: '2026',
    status: 'wip',
    isPrivate: true,
    github: null,
    type: 'work',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido'],
    tech: [
      { name: 'FastAPI', icon: `${SI}/fastapi`, color: '#009688' },
      { name: 'Vue.js', icon: `${SI}/vuedotjs`, color: '#42B883' },
    ],
  },
  {
    key: 'robosPlatform',
    company: 'ENGENHARIA DE ROBÔS · UFV',
    year: '2026',
    status: 'completed',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/ero-ufv',
    link: 'https://robos.eng.br',
    type: 'projects',
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido'],
    images: [robosHub1, robosHub2],
    tech: [
      { name: 'Vue.js', icon: `${SI}/vuedotjs`, color: '#42B883' },
    ],
  },
  {
    key: 'calouros',
    company: 'MARATONA SI',
    year: '2026',
    status: 'completed',
    isPrivate: true,
    github: null,
    type: 'projects',
    award: 'projects.award_third_place',
    images: [calourosPhoto],
    tech: [
      { name: 'Python', icon: `${SI}/python`, color: '#3776AB' },
    ],
  },
  {
    key: 'terrasafe',
    company: 'BOOTCAMP · SMARTCAMP',
    year: '2026',
    status: 'completed',
    isPrivate: false,
    github: 'https://github.com/Kayrourio/smartcamp-project',
    link: 'https://smartcamp-project.vercel.app',
    type: 'projects',
    award: 'projects.award_first_place',
    awardTitle:
      '1º Lugar, SmartCamp Cidades Inteligentes · UFV, 13 e 14 jun. 2026, TecnoParque UFV. Prêmio de R$ 2.000. Org.: Viçosa SMART, LabMAKER e VUEI/UFV.',
    images: [terrasafe1, terrasafe2, terrasafe3],
    isNarrative: true,
    narrativeSections: ['resultado', 'contexto', 'construido', 'hardware', 'escala'],
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
const isWideLayout = ref(false)
const route = useRoute()
const isProjectsPage = computed(() => route.path === '/projects')
let viewportQuery

function updateLayout() {
  const wasWide = isWideLayout.value
  isWideLayout.value = viewportQuery.matches
  if (wasWide && !isWideLayout.value) selectedProject.value = null
}

onMounted(() => {
  viewportQuery = window.matchMedia('(min-width: 1100px)')
  updateLayout()
  viewportQuery.addEventListener('change', updateLayout)
})

onUnmounted(() => viewportQuery?.removeEventListener('change', updateLayout))

const tabs = computed(() => [
  { key: 'all', count: allProjects.length },
  { key: 'projects', count: allProjects.filter((p) => p.type === 'projects').length },
  { key: 'work', count: allProjects.filter((p) => p.type === 'work').length },
])

const projectOrder = ['terrasafe', 'asimav', 'r2d2', 'fluxo', 'tagbot', 'neroSite', 'robosPlatform', 'plataforma', 'calouros']
const filteredProjects = computed(() =>
  allProjects
    .filter((project) => activeTab.value === 'all' || project.type === activeTab.value)
    .sort((first, second) => projectOrder.indexOf(first.key) - projectOrder.indexOf(second.key)),
)
const activeInlineProject = computed(() =>
  filteredProjects.value.find((project) => project.key === selectedProject.value?.key)
    || filteredProjects.value[0],
)
</script>

<style scoped>
.projects-section {
  padding-block: var(--space-20);
}

.projects-section--page {
  padding-block: var(--space-10) var(--space-16);
}

.projects-section--page .projects-header {
  margin-bottom: var(--space-6);
}

.projects-section--page .projects-headline {
  font-size: clamp(var(--text-3xl), 3.2vw, var(--text-4xl));
}

.projects-section--page .tabs {
  margin-bottom: var(--space-5);
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

/* ── Browsing layout ── */
.projects-body {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: var(--space-5);
  align-items: start;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.project-detail {
  position: sticky;
  top: 80px;
  min-width: 0;
}

.projects-body--split :deep(.card-media) {
  height: 132px;
}

.projects-body--split :deep(.card-role) {
  display: none;
}

@media (max-width: 1099px) {
  .projects-body {
    display: block;
  }

  .cards-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) and (max-width: 899px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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
