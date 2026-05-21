<template>
  <section id="contact" class="py-24 bg-[#0f0c29] relative overflow-hidden">
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 gsap-section">
        <p class="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-3">Contact</p>
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Travaillons <span class="text-gradient">ensemble</span>
        </h2>
        <p class="text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Disponible pour des missions freelance et des opportunités full-time.
          N'hésitez pas à me contacter pour discuter de votre projet.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Contact info -->
        <div class="gsap-section space-y-6">
          <div v-for="item in contactInfo" :key="item.label" class="flex items-center gap-4 glass rounded-2xl p-5 hover:glow-purple-sm transition-all duration-300">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background: rgba(168,85,247,0.2)">
              {{ item.icon }}
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">{{ item.label }}</p>
              <a :href="item.href" target="_blank" rel="noopener" class="text-slate-200 hover:text-purple-400 transition-colors duration-200 font-medium">
                {{ item.value }}
              </a>
            </div>
          </div>

          <!-- Availability -->
          <div class="glass rounded-2xl p-6 border border-green-500/20">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span class="text-green-400 font-semibold">Actuellement disponible</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">
              Recherche de nouvelles missions et projets à partir de <strong class="text-white">juin 2024</strong>.
              Réponse sous 24h garantie.
            </p>
          </div>
        </div>

        <!-- Contact form -->
        <form
          @submit.prevent="handleSubmit"
          class="gsap-section glass rounded-2xl p-8 space-y-5"
        >
          <div v-if="submitted" class="text-center py-8">
            <div class="text-5xl mb-4">🎉</div>
            <h3 class="text-white font-bold text-xl mb-2">Message envoyé !</h3>
            <p class="text-slate-400">Je vous répondrai dans les plus brefs délais.</p>
          </div>
          <template v-else>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Prénom *</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Jean"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                />
                <p v-if="errors.firstName" class="text-red-400 text-xs mt-1">{{ errors.firstName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Dupont"
                  class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                />
                <p v-if="errors.lastName" class="text-red-400 text-xs mt-1">{{ errors.lastName }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Email *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="jean.dupont@example.com"
                required
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
              />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Sujet *</label>
              <select
                v-model="form.subject"
                required
                class="w-full px-4 py-3 rounded-xl bg-[#1a1740] border border-white/10 text-white focus:outline-none focus:border-purple-500/60 transition-all duration-200"
              >
                <option value="" disabled>Choisir un sujet...</option>
                <option>Mission freelance</option>
                <option>Opportunité full-time</option>
                <option>Collaboration projet</option>
                <option>Question technique</option>
                <option>Autre</option>
              </select>
              <p v-if="errors.subject" class="text-red-400 text-xs mt-1">{{ errors.subject }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Message *</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Décrivez votre projet ou votre demande..."
                required
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200 resize-none"
              />
              <p v-if="errors.message" class="text-red-400 text-xs mt-1">{{ errors.message }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              :class="[
                'w-full py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-95',
                loading
                  ? 'bg-purple-700/50 text-purple-300 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-400 text-white glow-purple-sm'
              ]"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Envoi en cours...
              </span>
              <span v-else>Envoyer le message ✉️</span>
            </button>
          </template>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const submitted = ref(false)
const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'alexandre@example.com', href: 'mailto:alexandre@example.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/alexandre-leclerc', href: 'https://linkedin.com' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/Alex00121', href: 'https://github.com/Alex00121' },
  { icon: '📍', label: 'Localisation', value: 'Paris, France (remote OK)', href: '#' },
]

function validate() {
  let valid = true
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (form.firstName.trim().length < 2) {
    errors.firstName = 'Le prénom doit faire au moins 2 caractères.'
    valid = false
  }
  if (form.lastName.trim().length < 2) {
    errors.lastName = 'Le nom doit faire au moins 2 caractères.'
    valid = false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Adresse email invalide.'
    valid = false
  }
  if (!form.subject) {
    errors.subject = 'Veuillez choisir un sujet.'
    valid = false
  }
  if (form.message.trim().length < 10) {
    errors.message = 'Le message doit faire au moins 10 caractères.'
    valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  loading.value = false
  submitted.value = true
}
</script>
