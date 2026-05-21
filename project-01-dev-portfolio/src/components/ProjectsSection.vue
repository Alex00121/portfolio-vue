<template>
  <section id="projects" class="py-24 bg-[#12103a] relative overflow-hidden">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-purple-900/10 to-transparent" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 gsap-section">
        <p class="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-3">Projets</p>
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mes <span class="text-gradient">réalisations</span>
        </h2>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto">
          Une sélection de projets représentatifs de mes compétences en développement web full stack.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.title"
          class="gsap-section group relative glass rounded-2xl overflow-hidden hover:-translate-y-2 hover:glow-purple-sm transition-all duration-300"
        >
          <!-- Thumbnail -->
          <div class="h-48 relative overflow-hidden" :style="{ background: project.gradient }">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-5xl">{{ project.emoji }}</span>
            </div>
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                Code
              </a>
              <a
                :href="project.live"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/60 hover:bg-purple-500/80 text-white text-sm font-medium transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Demo
              </a>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5">
            <h3 class="font-bold text-white text-lg mb-2">{{ project.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View more -->
      <div class="text-center mt-12">
        <a
          href="https://github.com/Alex00121"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl glass border border-purple-500/30 text-purple-300 font-semibold hover:bg-purple-500/10 hover:border-purple-500/60 transition-all duration-200 active:scale-95"
        >
          Voir plus sur GitHub
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Weather Dashboard',
    description: 'Application météo en temps réel avec prévisions 7 jours, graphiques horaires et géolocalisation automatique.',
    emoji: '🌤️',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%)',
    tech: ['React', 'Recharts', 'Open-Meteo API', 'TailwindCSS'],
    github: 'https://github.com/Alex00121/portfolio-react',
    live: 'https://github.com/Alex00121/portfolio-react',
  },
  {
    title: 'E-commerce Landing',
    description: 'Page de vente moderne avec panier d\'achat, filtres par catégorie et animations Framer Motion élaborées.',
    emoji: '🛍️',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #6366f1 100%)',
    tech: ['React', 'Framer Motion', 'Zustand', 'TailwindCSS'],
    github: 'https://github.com/Alex00121/portfolio-react',
    live: 'https://github.com/Alex00121/portfolio-react',
  },
  {
    title: 'Blog MDX',
    description: 'Blog technique Next.js avec articles MDX, table des matières interactive, dark mode et flux RSS.',
    emoji: '✍️',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    tech: ['Next.js', 'MDX', 'Shiki', 'TypeScript'],
    github: 'https://github.com/Alex00121/portfolio-nextjs',
    live: 'https://github.com/Alex00121/portfolio-nextjs',
  },
  {
    title: 'CLI Todo Manager',
    description: 'Gestionnaire de tâches en ligne de commande avec priorités, dates d\'échéance, tags et mode interactif.',
    emoji: '✅',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    tech: ['TypeScript', 'Node.js', 'Commander.js', 'Inquirer'],
    github: 'https://github.com/Alex00121/portfolio-typescript',
    live: 'https://github.com/Alex00121/portfolio-typescript',
  },
  {
    title: 'Blog API Django',
    description: 'API REST complète avec JWT, gestion des commentaires, catégories, tags, Swagger et workflow d\'approbation.',
    emoji: '🐍',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #1e7e34 100%)',
    tech: ['Django', 'DRF', 'JWT', 'PostgreSQL', 'Swagger'],
    github: 'https://github.com/Alex00121/portfolio-django',
    live: 'https://github.com/Alex00121/portfolio-django',
  },
  {
    title: 'Realtime Chat',
    description: 'Application de chat en temps réel avec Socket.io, rooms multiples, indicateur de frappe et historique SQLite.',
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #a855f7 100%)',
    tech: ['React', 'Node.js', 'Socket.io', 'SQLite', 'Express'],
    github: 'https://github.com/Alex00121/portfolio-fullstack',
    live: 'https://github.com/Alex00121/portfolio-fullstack',
  },
]
</script>
