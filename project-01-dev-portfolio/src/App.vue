<template>
  <div class="min-h-screen bg-[#0f0c29]">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <footer class="py-8 text-center text-slate-500 text-sm border-t border-white/5">
      <p>© 2024 Alexandre Leclerc — Tous droits réservés</p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useGsapScrollAnimations } from './composables/useGsap.js'

useGsapScrollAnimations()
</script>
