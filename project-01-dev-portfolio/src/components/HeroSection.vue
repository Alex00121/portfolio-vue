<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0" style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" />
      <div class="absolute inset-0 opacity-30" style="background: radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.4) 0%, transparent 60%)" />
    </div>

    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="shape absolute w-16 h-16 rounded-2xl border border-purple-500/30 animate-float" style="top: 15%; left: 10%" />
      <div class="shape absolute w-10 h-10 rounded-full bg-purple-500/10 border border-purple-400/20 animate-float-slow" style="top: 25%; right: 15%" />
      <div class="shape absolute w-20 h-20 rounded-3xl border-2 border-pink-500/20 animate-float-delayed" style="bottom: 30%; left: 20%" />
      <div class="shape absolute w-8 h-8 bg-purple-600/20 rotate-45 animate-float" style="top: 60%; right: 25%" />
      <div class="shape absolute w-14 h-14 rounded-xl border border-cyan-400/20 animate-float-slow" style="bottom: 20%; right: 10%" />
      <div class="shape absolute w-6 h-6 rounded-full bg-pink-500/30 animate-float-delayed" style="top: 45%; left: 5%" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
      <div class="max-w-3xl">
        <p class="text-purple-400 font-medium text-lg mb-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.2s_forwards]">
          👋 Bonjour, je suis
        </p>

        <h1 class="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 opacity-0 animate-[slideUp_0.6s_ease-out_0.4s_forwards]">
          <span class="text-white">Alexandre</span>
          <br />
          <span class="text-gradient">Leclerc</span>
        </h1>

        <div class="flex items-center gap-3 mb-8 opacity-0 animate-[slideUp_0.6s_ease-out_0.6s_forwards]">
          <span class="text-slate-300 text-xl md:text-2xl font-light">Développeur</span>
          <span class="text-purple-400 text-xl md:text-2xl font-semibold min-w-[180px]">
            {{ currentRole }}<span class="animate-pulse">|</span>
          </span>
        </div>

        <p class="text-slate-400 text-lg leading-relaxed max-w-xl mb-10 opacity-0 animate-[slideUp_0.6s_ease-out_0.8s_forwards]">
          Passionné par la création d'expériences web modernes et performantes.
          Je transforme des idées complexes en interfaces intuitives et en APIs robustes.
        </p>

        <div class="flex flex-wrap gap-4 opacity-0 animate-[slideUp_0.6s_ease-out_1s_forwards]">
          <a
            href="#projects"
            class="px-8 py-3.5 rounded-2xl bg-purple-500 text-white font-semibold hover:bg-purple-400 transition-all duration-200 active:scale-95 glow-purple-sm"
            @click.prevent="scrollTo('#projects')"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            class="px-8 py-3.5 rounded-2xl glass text-white font-semibold hover:bg-white/10 transition-all duration-200 active:scale-95"
            @click.prevent="scrollTo('#contact')"
          >
            Me contacter
          </a>
        </div>

        <div class="flex gap-4 mt-10 opacity-0 animate-[slideUp_0.6s_ease-out_1.2s_forwards]">
          <a
            href="https://github.com/Alex00121"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"
          >
            <IconGitHub />
            GitHub
          </a>
          <a
            href="mailto:alexandre@example.com"
            class="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Email
          </a>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
      <span class="text-xs text-slate-400 tracking-widest uppercase">Défiler</span>
      <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollTo } from '../composables/useScrollTo.js'
import IconGitHub from './icons/IconGitHub.vue'

const { scrollTo } = useScrollTo()

const roles = ['Full Stack', 'Vue.js', 'React', 'Node.js', 'TypeScript']
const currentRole = ref(roles[0])
let roleIndex = 0
let charIndex = roles[0].length
let isDeleting = false
let timer = null

function typeWriter() {
  const current = roles[roleIndex]
  if (isDeleting) {
    currentRole.value = current.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      timer = setTimeout(typeWriter, 500)
      return
    }
  } else {
    currentRole.value = current.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      isDeleting = true
      timer = setTimeout(typeWriter, 1800)
      return
    }
  }
  timer = setTimeout(typeWriter, isDeleting ? 80 : 120)
}

onMounted(() => { timer = setTimeout(typeWriter, 2000) })
onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<style scoped>
.shape {
  filter: blur(0.5px);
}
</style>
