<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'glass py-3 shadow-lg shadow-black/20' : 'py-5 bg-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" class="text-xl font-bold text-gradient tracking-tight">
        Alexandre.dev
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            :class="['nav-link text-sm font-medium transition-colors duration-200', activeSection === link.section ? 'text-purple-400 active' : 'text-slate-300 hover:text-white']"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-sm font-medium hover:bg-purple-500/30 hover:border-purple-500/60 transition-all duration-200 active:scale-95"
        @click.prevent="scrollTo('#contact')"
      >
        Me contacter
      </a>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="mobileOpen = !mobileOpen"
        aria-label="Menu"
      >
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300', mobileOpen ? 'rotate-45 translate-y-2' : '']" />
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300', mobileOpen ? 'opacity-0' : '']" />
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300', mobileOpen ? '-rotate-45 -translate-y-2' : '']" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden glass mt-2 mx-4 rounded-2xl px-6 py-4">
        <ul class="flex flex-col gap-4">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="text-slate-200 hover:text-purple-400 transition-colors duration-200 font-medium"
              @click.prevent="scrollTo(link.href); mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('hero')

const navLinks = [
  { href: '#hero', label: 'Accueil', section: 'hero' },
  { href: '#about', label: 'À propos', section: 'about' },
  { href: '#skills', label: 'Compétences', section: 'skills' },
  { href: '#projects', label: 'Projets', section: 'projects' },
  { href: '#contact', label: 'Contact', section: 'contact' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() {
  scrolled.value = window.scrollY > 50

  const sections = ['hero', 'about', 'skills', 'projects', 'contact']
  for (const s of [...sections].reverse()) {
    const el = document.getElementById(s)
    if (el && window.scrollY >= el.offsetTop - 100) {
      activeSection.value = s
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
