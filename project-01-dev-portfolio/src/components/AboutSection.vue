<template>
  <section id="about" class="py-24 bg-[#12103a] relative overflow-hidden">
    <!-- Background accent -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="gsap-section flex flex-col lg:flex-row gap-16 items-center">
        <!-- Photo placeholder -->
        <div class="flex-shrink-0">
          <div class="relative w-64 h-64 rounded-3xl overflow-hidden glow-purple">
            <div class="w-full h-full" style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 40%, #ec4899 100%)" />
            <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <span class="text-4xl font-bold">AL</span>
              </div>
              <span class="text-sm font-medium text-white/70">Alexandre Leclerc</span>
            </div>
          </div>
          <!-- Status badge -->
          <div class="mt-4 flex items-center justify-center gap-2 glass rounded-xl px-4 py-2">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span class="text-sm text-slate-300">Disponible pour missions</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <p class="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-3">À propos</p>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Créateur d'expériences<br />
            <span class="text-gradient">numériques</span>
          </h2>
          <p class="text-slate-400 leading-relaxed text-lg mb-4">
            Développeur full stack avec 5 ans d'expérience, je me spécialise dans la création
            d'applications web performantes et élégantes. Mon approche combine rigueur technique
            et sens du détail UX pour livrer des produits dont les utilisateurs tombent amoureux.
          </p>
          <p class="text-slate-400 leading-relaxed mb-8">
            Basé à Paris, j'ai travaillé avec des startups en croissance et des entreprises établies,
            en apportant des solutions sur mesure adaptées à leurs besoins spécifiques.
            En dehors du code, je contribue à des projets open source et partage mes apprentissages
            via des articles techniques.
          </p>

          <!-- Stats counters -->
          <div class="grid grid-cols-3 gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="glass rounded-2xl p-4 text-center hover:glow-purple-sm transition-all duration-300"
            >
              <div class="text-3xl font-extrabold text-gradient mb-1">
                {{ stat.animated }}{{ stat.suffix }}
              </div>
              <div class="text-xs text-slate-400 leading-tight">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { label: "Années d'expérience", target: 5, suffix: '+', animated: '0' },
  { label: 'Projets livrés', target: 42, suffix: '+', animated: '0' },
  { label: 'Clients satisfaits', target: 28, suffix: '', animated: '0' },
])

function animateCounter(stat) {
  const duration = 1500
  const start = performance.now()
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    stat.animated = Math.round(eased * stat.target).toString()
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.value.forEach(animateCounter)
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  const section = document.getElementById('about')
  if (section) observer.observe(section)
})
</script>
