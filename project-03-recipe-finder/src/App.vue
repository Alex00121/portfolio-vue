<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <RouterLink to="/" class="flex items-center gap-2 group">
            <span class="text-2xl">🍴</span>
            <span class="text-xl font-bold text-gray-900">
              Recipe<span class="text-warm-500">Finder</span>
            </span>
          </RouterLink>

          <!-- Desktop nav -->
          <div class="hidden sm:flex items-center gap-6">
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-warm-500 font-medium transition-colors duration-200"
              :class="{ 'text-warm-500': route.name === 'home' }"
            >
              Recettes
            </RouterLink>
            <RouterLink
              to="/favorites"
              class="flex items-center gap-1.5 text-gray-600 hover:text-warm-500 font-medium transition-colors duration-200"
              :class="{ 'text-warm-500': route.name === 'favorites' }"
            >
              <span>❤️ Favoris</span>
              <span
                v-if="favoritesStore.favorites.length > 0"
                class="bg-warm-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ favoritesStore.favorites.length }}
              </span>
            </RouterLink>
          </div>

          <!-- Mobile nav -->
          <div class="sm:hidden flex items-center gap-4">
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-warm-500 transition-colors duration-200"
              :class="{ 'text-warm-500': route.name === 'home' }"
            >
              🔍
            </RouterLink>
            <RouterLink
              to="/favorites"
              class="relative text-gray-600 hover:text-warm-500 transition-colors duration-200"
              :class="{ 'text-warm-500': route.name === 'favorites' }"
            >
              ❤️
              <span
                v-if="favoritesStore.favorites.length > 0"
                class="absolute -top-1 -right-1 bg-warm-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
              >
                {{ favoritesStore.favorites.length }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- Footer -->
    <footer class="bg-white border-t border-warm-100 mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p>Données fournies par <a href="https://www.themealdb.com" target="_blank" rel="noopener" class="text-warm-500 hover:underline">TheMealDB</a> · RecipeFinder © 2024</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFavoritesStore } from './stores/favorites'

const route = useRoute()
const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
