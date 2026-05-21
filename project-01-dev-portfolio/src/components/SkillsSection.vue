<template>
  <section id="skills" class="py-24 bg-[#0f0c29] relative">
    <div class="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 gsap-section">
        <p class="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-3">Compétences</p>
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mon <span class="text-gradient">stack technique</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in skillCategories"
          :key="category.name"
          class="gsap-section glass rounded-2xl p-6 hover:glow-purple-sm hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl" :style="{ background: category.bg }">
              {{ category.icon }}
            </div>
            <h3 class="font-bold text-white">{{ category.name }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="skill in category.skills" :key="skill.name">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-slate-300 font-medium">{{ skill.name }}</span>
                <span class="text-xs text-purple-400 font-mono">{{ skill.level }}%</span>
              </div>
              <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full skill-bar-fill skill-bar-gradient"
                  :style="{ width: animated ? skill.level + '%' : '0%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'

const animated = ref(false)

const skillCategories = [
  {
    name: 'Frontend',
    icon: '🎨',
    bg: 'rgba(168,85,247,0.2)',
    skills: [
      { name: 'Vue.js / Nuxt', level: 92 },
      { name: 'React / Next.js', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    bg: 'rgba(236,72,153,0.2)',
    skills: [
      { name: 'Node.js / Express', level: 87 },
      { name: 'Python / Django', level: 80 },
      { name: 'REST API / GraphQL', level: 85 },
      { name: 'PHP / Laravel', level: 72 },
    ],
  },
  {
    name: 'Base de données',
    icon: '🗄️',
    bg: 'rgba(34,211,238,0.15)',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 78 },
      { name: 'Redis', level: 70 },
      { name: 'SQLite / MySQL', level: 85 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: '☁️',
    bg: 'rgba(74,222,128,0.15)',
    skills: [
      { name: 'Docker / Docker Compose', level: 80 },
      { name: 'GitHub Actions / CI-CD', level: 75 },
      { name: 'AWS / Vercel', level: 70 },
      { name: 'Linux / Bash', level: 78 },
    ],
  },
  {
    name: 'Outils & Méthodes',
    icon: '🛠️',
    bg: 'rgba(251,191,36,0.15)',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Figma / Design', level: 65 },
      { name: 'Tests / Jest / Vitest', level: 80 },
      { name: 'Agile / Scrum', level: 85 },
    ],
  },
  {
    name: 'Mobile & Extras',
    icon: '📱',
    bg: 'rgba(239,68,68,0.15)',
    skills: [
      { name: 'React Native', level: 68 },
      { name: 'PWA', level: 75 },
      { name: 'WebSockets / Socket.io', level: 82 },
      { name: 'SEO / Performance', level: 78 },
    ],
  },
]

useIntersectionObserver('skills', () => { animated.value = true }, { threshold: 0.2 })
</script>

<style scoped>
.skill-bar-gradient {
  background: linear-gradient(to right, #a855f7, #ec4899);
}
</style>
